import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {TokenListService} from "./token-list.service";
import {Account, ConnectedChain, SettingsModel, TokenModel, WalletBalancesModel, WalletState} from "../../types";
import {CRYPTO_CURRENCY_ICONS_URL} from "../../constants";
import {wallets$} from "../../streams";
import {takeUntil} from "rxjs/operators";
import {Destroyable} from "../../destroyable.base";
import {chainIdToLabel} from "../../utils";
import {getTranslations, Translation} from "../../locales";
import {Observable} from "rxjs";

@Component({
  selector: 'token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss'],
  providers: [TokenListService]
})
export class TokenListComponent extends Destroyable implements OnInit {
  @Input() public isSettings: boolean = false;
  @Input() public changeSettingsEvents: Observable<void>;

  public wallets: WalletState[];
  protected readonly translation: Translation = getTranslations();
  protected readonly chainIdToLabel: Record<string, string> = chainIdToLabel;
  public tokenLoaderList: Array<number>
  public walletBalancesAndRate: WalletBalancesModel | null;
  public isLoading: boolean = false;
  constructor(  private tokenListService: TokenListService, private changeDetectorRef: ChangeDetectorRef) {
    super()
  }

  ngOnInit(): void {
   this.changeSettingsEvents.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
     if(this.walletBalancesAndRate?.data){
       this.tokenListService.updateSettings('defaultConfig', this.walletBalancesAndRate.data);
       this.getTokenLostBalances();
     }
   });
    wallets$.pipe(takeUntil(this.unsubscribe$)).subscribe((wallets:WalletState[]) => {
      this.wallets = wallets;
      this.getTokenLostBalances();
      this.changeDetectorRef.detectChanges();
    })
     this.tokenLoaderList = new Array(this.settings ? this.settings.defaultConfig[this.indexByCurrentNetwork]?.tokens.included.length : 3);
  }

  public get settings(): SettingsModel | null  {
    return this.tokenListService.settings
  }

  public get indexByCurrentNetwork(): number | null  {
   return this.settings.defaultConfig.findIndex(x => x.chainId === this.primaryChain.id);
  }

  public get primaryWallet(): WalletState | null  {
    return this.wallets ? this.wallets[0] : null;
  }

  public get primaryChain() : ConnectedChain | null  {
    return this.primaryWallet && this.primaryWallet.chains[0]
  }

  public get primaryAccount(): Account | null {
    return this.primaryWallet ? this.primaryWallet.accounts[0] : null;
  }

  public get primaryAccountAddress(): string | null {
    return this.primaryAccount ? this.primaryAccount.address: null;
  }


  private getTokenLostBalances(): void {
    if(this.primaryChain &&  this.primaryAccount) {
      this.isLoading = true;
      this.tokenListService.getWalletBalancesAndRate(this.primaryChain.id, this.primaryAccountAddress).then((result: WalletBalancesModel) => {
        this.walletBalancesAndRate = result;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  public getUrlTokenIcon(token): string {
    if(token.symbol){
      const symbol = token.symbol.toLowerCase();
      return `${CRYPTO_CURRENCY_ICONS_URL}${symbol}.svg`;
    }
  }

  public filteredTokenByPrice(array, sortBy): Array<TokenModel> {
    if(sortBy) {
      const filtered = [...array].sort(function (a, b) {
        const prev = a.price ? Number(a.price.replace(/[^0-9.-]+/g,"")) : 0;
        const next = b.price ? Number(b.price.replace(/[^0-9.-]+/g,"")) : 0;
        return prev - next;
      });
      return filtered.reverse();
    } else {
      return array;
    }}

  public moveToken(networkIndex, event: CdkDragDrop<Array<TokenModel>>): void {
    moveItemInArray(this.walletBalancesAndRate.data[networkIndex].tokens.included, event.previousIndex, event.currentIndex);
  }
  public addToken(token, networkIndex, tokenIndex): void{
    this.walletBalancesAndRate.data[networkIndex].tokens.excluded.splice(tokenIndex, 1);
    this.walletBalancesAndRate.data[networkIndex].tokens.included.push(token);
  };
  public removeToken(token,  networkIndex, tokenIndex): void {
    this.walletBalancesAndRate.data[networkIndex].tokens.included.splice(tokenIndex, 1);
    this.walletBalancesAndRate.data[networkIndex].tokens.excluded.unshift(token);
  };
}
