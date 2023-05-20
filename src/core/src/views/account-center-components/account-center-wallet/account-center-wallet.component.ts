import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {connectWallet$} from '../../../streams';
import {Account, WalletState} from "../../../types";
import {selectAccounts} from "../../../provider";
import {ProviderRpcErrorCode} from "../../../../../common";
import { setPrimaryWallet } from '../../../store/actions';
import {copyWalletAddress, shortenAddress} from "../../../utils";
import disconnect from '../../../disconnect';
import {elipsisIcon, successIcon} from "../../../icons";
import {getTranslations, Translation} from "../../../locales";

@Component({
  selector: 'account-center-wallet',
  templateUrl: './account-center-wallet.component.html',
  styleUrls: ['./account-center-wallet.component.scss'],
})

export class AccountCenterWalletComponent implements AfterContentInit{
  @Input() public primary: boolean;
  @Input() public wallet: WalletState;
  protected readonly translation: Translation = getTranslations();
  protected readonly successIcon: string = successIcon;
  protected readonly elipsisIcon: string = elipsisIcon;
  public showMenu: string = '';

  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  constructor(private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef )  {

  }

  ngAfterContentInit() {
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(this.showMenu !='' && !this.menu.nativeElement.contains(e.target)) {
        this.hideMenuAction();
      }
    });
  }


  public toggleMenuAction($event, address: string): void {
    $event.stopPropagation();
    this.showMenu = this.showMenu === address ? '' : address;
    this.changeDetectorRef.detectChanges();
  }

  public hideMenuAction(): void {
    this.showMenu = '';
    this.changeDetectorRef.detectChanges();
  }

 public formatBalance(balance: WalletState['accounts']['0']['balance']): string {
    if(balance) {
      const [asset] = Object.keys(balance)
      return `${
        balance[asset].length > 7 ? balance[asset].slice(0, 7) : balance[asset]
      } ${asset}`
    }

  }

  public setPrimaryWallet(account: Account): void {
    this.hideMenuAction();
    setPrimaryWallet(this.wallet, account.address)
  }
  public async disconnect(event:Event): Promise<void> {
    event.stopPropagation();
    this.hideMenuAction();
    await disconnect( {label: this.wallet.label });
  }
  public async copyWalletAddress(event:Event, account: Account): Promise<void> {
    event.stopPropagation();
    this.hideMenuAction();
    await copyWalletAddress( account.address ? account.address: null);
  }

  public async selectAnotherAccount(wallet: WalletState): Promise<void> {
    this.hideMenuAction();
    try {
      await selectAccounts(wallet.provider)
    } catch (error) {
      const { code } = error as { code: number }
      if (
        code === ProviderRpcErrorCode.UNSUPPORTED_METHOD ||
        code === ProviderRpcErrorCode.DOES_NOT_EXIST
      ) {
        connectWallet$.next({
          inProgress: false,
          actionRequired: wallet.label
        })
      }
    }
  }

  public shortenAddress(address: string): string | null {
    return address ? shortenAddress(address) : null
  }


}


