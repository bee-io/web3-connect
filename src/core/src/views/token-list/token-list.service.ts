import { Injectable } from "@angular/core";
import {SettingsModel, TokenModel, WalletBalancesModel} from "../../types";
import {
  buildHash,
  fetchAsync,
  formatWei,
  getLocalStore,
  getPriceByRate,
  numberToCurrency,
  setLocalStore
} from "../../utils";
import TimeoutCache from "../../timeout-cache";
import {
  DEFAULT_CACHE_TIMEOUT,
  DEFAULT_SETTING_LIST,
  NETWORK_LIST,
  STORAGE_KEYS,
  TOGGLE_LIST,
  TOKENS_PRICE_RATE_URL
} from "../../constants";
import balances from "../../balances-contract";

@Injectable()
export class TokenListService {
    public cache: any;
    constructor() {
      this.setSettings();
      this.cache = new TimeoutCache(DEFAULT_CACHE_TIMEOUT);
    }

  public setSettings(): void {
    if (!this.settings) {
      setLocalStore(STORAGE_KEYS.BALANCES_SETTING,  JSON.stringify(DEFAULT_SETTING_LIST));
    }
  }

  public updateSettings(key:string, value: any): void {
    if (this.settings) {
      const settings = this.settings;
      settings[key] = value;
      setLocalStore(STORAGE_KEYS.BALANCES_SETTING,  JSON.stringify(settings));
    }
  }

  public get settings(): SettingsModel  {
    return JSON.parse(getLocalStore(STORAGE_KEYS.BALANCES_SETTING));
  }

   public currencySymbols(data): Array<string> {
        const currencySymbols = []
        for (const network of data) {
            network.tokens.included.forEach(token => {
                if(!currencySymbols.includes(token.symbol)){
                    currencySymbols.push(token.symbol);
                }
            })
        }
        return currencySymbols;
    }

   public buildTokenInfo(token, balance, priceRate, setting) {
        return new TokenModel({
            address: token.address,
            balance: formatWei(balance, token.decimals, Number(setting.digitsPrice)),
            price: getPriceByRate(formatWei(balance, token.decimals, Number(setting.digitsPrice)), priceRate),
            rateToUSD: priceRate,
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            isActive: token.isActive,
        })
    }

   public networkTotalBalances(walletData, setting) {
        const totalBalance = [];
        const ethereumMainnetBalance = [];
        const binanceSmartChainBalance = [];
        const polygonBalance = [];
     if(walletData) {
       walletData.map( network => {
         const tokens = [...network.tokens.included, ...network.tokens.excluded]
         tokens.map(item => {
           if( (setting.enableTotalByAllTokens === TOGGLE_LIST.Off && network.tokens.included.includes(item)) || setting.enableTotalByAllTokens === TOGGLE_LIST.On) {
             const price = item.price ? Number(item.price.toString().replace(/[^0-9.-]+/g, "")): 0;
             totalBalance.push(price)
             switch (network.name) {
               case NETWORK_LIST.MAINNET : {
                 ethereumMainnetBalance.push(price)
                 break;
               }
               case NETWORK_LIST.BSC : {
                 binanceSmartChainBalance.push(price)
                 break;
               }
               case NETWORK_LIST.POLYGON : {
                 polygonBalance.push(price)
                 break;
               }
             }
           }
         });
       });
     }

        return {
            totalBalance: numberToCurrency(totalBalance.reduce((partialSum, a) => partialSum + a, 0)),
            [NETWORK_LIST.MAINNET]: numberToCurrency(ethereumMainnetBalance.reduce((partialSum, a) => partialSum + a, 0)),
            [NETWORK_LIST.BSC]: numberToCurrency(binanceSmartChainBalance.reduce((partialSum, a) => partialSum + a, 0)),
            [NETWORK_LIST.POLYGON]: numberToCurrency(polygonBalance.reduce((partialSum, a) => partialSum + a, 0)),
        };


    }

   public async getWalletBalancesAndRate(chainId: string, address: string): Promise<WalletBalancesModel> {
     const setting: SettingsModel = this.settings;
     console.log('setting', setting)
     if(setting && setting.defaultConfig.filter((item => item.chainId === chainId )).length > 0) {
       let updateData = setting.defaultConfig;
       const currencySymbols = this.currencySymbols(updateData);
       let rateList;
       try{
         const rateUrl = TOKENS_PRICE_RATE_URL + Object.values(currencySymbols).toString();
         rateList = await this._interactWithCacheAndApi(rateUrl);
       } catch(e) {
         console.log(e);
       }
       for (const network of updateData) {

         const tokens = [...network.tokens.included, ...network.tokens.excluded];
         if (network.chainId === chainId && tokens.length) {
           try {
             const includedTokensAddress = network.tokens.included.map(t => t.address);
             let includedBalancesAmount = await this._interactWithCacheAndContract(network.rpc, network.balancesContract, address, includedTokensAddress);
             network.tokens.included = network.tokens.included.map(( token, index) => {
               return this.buildTokenInfo( token, includedBalancesAmount[index], rateList[token.symbol], setting);
             })
             if(setting.enableTotalByAllTokens === TOGGLE_LIST.On) {
               let excludedTokensAddress = network.tokens.excluded.map(t => t.address);
               let excludedBalancesAmount = await this._interactWithCacheAndContract(network.rpc, network.balancesContract, address, excludedTokensAddress);
               network.tokens.excluded =  network.tokens.excluded.map(( token, index) => {
                 return this.buildTokenInfo( token, excludedBalancesAmount[index], rateList[token.symbol], setting);
               })
             }
           }
           catch(e) {
             console.log(e);
           }
         }
       }
       const networksBalance = this.networkTotalBalances(updateData, setting);
       for (const network of updateData) {
         network.totalBalance = networksBalance[network.name]
       }
       return new WalletBalancesModel({wallet: address, data: updateData, totalBalance: networksBalance.totalBalance});
     } else {
       return null;
     }}

   public async _interactWithCacheAndContract(rpc, balancesContract, wallet, tokensAddress) {
        const hash = buildHash(rpc, balancesContract, wallet, tokensAddress)
        const cache = this.cache.get(hash)
        if(cache){
            return cache;
        } else {
            // TODO: Should do all query parallel for speed up show panel
            const walletsBalances = await balances(rpc, balancesContract, wallet, tokensAddress);
            this.cache.set(hash, walletsBalances);
            return walletsBalances;
        }
    }

    async _interactWithCacheAndApi(url) {
        const hash = buildHash(url)
        const cache = this.cache.get(hash)
        if(cache) {
            return cache;
        } else {
            // TODO: Should do all query parallel for speed up show panel
            const response = await fetchAsync(url);
            this.cache.set(hash, response);
            return response;
        }

    }
}

