/**
 * TIPS：DEMO
 */
import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {CustomNotification, Theme, Locale, AccountCenterPosition,WalletState} from "@b-ee/web3-connect";
import {AppService, SiteTheme} from "../../app.service";
import {ethers} from "ethers";
import {Router} from "@angular/router";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Observable, share} from "rxjs";
import {Destroyable} from "../../utils/destroyable.base";
import {takeUntil} from "rxjs/operators";
import {ConnectBtnComponent} from "../../share/connect-btn";

@Component({
  selector: 'add-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['demo.component.scss']
})
export class DEMOComponent extends Destroyable {
  @ViewChild(ConnectBtnComponent) connectBtnComponent: ConnectBtnComponent;

  public wallets$: Observable<any> = this.appService.web3Connect.state.select('wallets').pipe(share());
  public wallets: WalletState[] = [];
  public selectedWallet: WalletState;
  public appThemeValue: Theme = (localStorage.getItem('site-theme') as SiteTheme) || 'dark';
  public appLocaleValue: Locale = 'en' || 'ua';
  public appPositionValue: AccountCenterPosition = 'topRight';

  public transactionForm!: UntypedFormGroup;

  constructor(public appService: AppService, private router: Router, private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef) {
    super()
  }

  async ngOnInit(): Promise<void> {
    this.transactionForm = this.fb.group({
      network: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
    this.wallets$.pipe(takeUntil(this.unsubscribe$)).subscribe(wallets => {
      this.wallets = wallets;
      this.selectedWallet =  this.wallets.length ? this.wallets[0] : null;
      if(this.selectedWallet) {
        this.transactionForm.patchValue({
          network: this.selectedWallet.chains[0].id,
        });
        this.cdr.detectChanges();
      }
    })
    this.updateTheme(this.appThemeValue);
  }


  public sendTransaction = async () => {
    if (!this.selectedWallet){
       return this.connectBtnComponent.connect();
    }

    if (this.transactionForm.valid) {
      // const balanceValue = Object.values(balance)[0]
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      const ethersProvider = new ethers.providers.Web3Provider(this.selectedWallet.provider, 'any')
      const signer = ethersProvider.getSigner()
      const txDetails = {
        to:  this.transactionForm.value.address,
        value: 100000000000000
      }
      const sendTransaction = () => {
        return signer.sendTransaction(txDetails).then(tx => tx.hash)
      }
      const gasPrice = () => ethersProvider.getGasPrice().then(res => res.toString());
      const estimateGas = () => {return ethersProvider.estimateGas(txDetails).then(res => res.toString())}

      const transactionHash = await this.appService.web3Connect.state.actions.preflightNotifications({
        sendTransaction,
        gasPrice,
        estimateGas,
        balance: '0.0000001',
        txDetails: txDetails
      })
      if(transactionHash){
        let linkUrl;
        if(this.selectedWallet.chains[0].id === '0x38') {
          linkUrl = `https://bscscan.com/tx/${transactionHash}`
        }if(this.selectedWallet.chains[0].id === '0x1') {
          linkUrl = `https://etherscan.io/tx/${transactionHash}`
        }if(this.selectedWallet.chains[0].id === '0x5') {
          linkUrl = `https://goerli.etherscan.io/tx/${transactionHash}`
        }

        const customNotification: CustomNotification = {
          message: `This is a custom DApp success notification hover to see link`,
          autoDismiss: 0,
          type: 'success',
          link: linkUrl,
        }
        this.appService.web3Connect.state.actions.customNotification(customNotification);
      }
    } else {
      Object.values(this.transactionForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  public updateTheme = (selectedTheme: Theme): void => {
    this.appService.web3Connect.state.actions.updateTheme(selectedTheme);
  }
  public updateLanguage = (locale: Locale): void => {
    this.appService.web3Connect.state.actions.setLocale(locale);
  }
  public updatePosition = (position: AccountCenterPosition): void => {
    this.appService.web3Connect.state.actions.updateAccountCenter({ position: position });
  }
  public backToDocs = (): void=> {
    this.router.navigate(['docs', 'introduction']);
  }

  async networkChange(value): Promise<void> {
    await this.appService.web3Connect.setChain({ chainId: value});
  }
  public sendNotification(type): void {
    if(type === 'success') {
      const { update, dismiss } =
        this.appService.web3Connect.state.actions.customNotification({
          type: 'pending',
          message:
            'This is a custom DApp pending notification to use however you want',
          autoDismiss: 0
        })
      setTimeout(
        () =>
          update({
            eventCode: 'dbUpdateSuccess',
            message: 'Updated status for custom notification',
            type: 'success',
            autoDismiss: 4000
          }),
        4000
      )
    } else {
      const customNotification: CustomNotification = {
        message:
          'This is a custom DApp success notification to use however you want',
        autoDismiss: 4000,
        type: type
      }
      this.appService.web3Connect.state.actions.customNotification(customNotification)
    }
  }


}
