import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {STORAGE_KEYS} from "../../../constants";
import {delLocalStore, getLocalStore, setLocalStore} from "../../../utils";
import {configuration} from "../../../configuration";
import {TermsOfServiceAgreementOptions} from "../../../../../common";
import {getTranslations, Translation} from "../../../locales";

@Component({
  selector: 'agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss'],
})

export class AgreementComponent implements OnInit{
  @Output() public agreedEvent: EventEmitter<any> = new EventEmitter();

  public agreed: boolean;
  protected readonly translation: Translation =  getTranslations();
  public localStoreAgreements = JSON.parse(getLocalStore(STORAGE_KEYS.TERMS_AGREEMENT) || '{}');
  public blankAgreement = { termsUrl: '', privacyUrl: '', version: '' };
  public agreements: TermsOfServiceAgreementOptions =   (configuration.appMetadata && configuration.appMetadata.agreement) || this.blankAgreement
  public showTermsOfService: boolean = !!(
    (this.agreements.termsUrl && !this.localStoreAgreements.terms) ||
    (this.agreements.privacyUrl && !this.localStoreAgreements.privacy) ||
    (this.agreements.version && this.agreements.version !== this.localStoreAgreements.version)
  )
   constructor()  {
  }
  public ngOnInit(): void {
    this.agreed = !this.showTermsOfService;
    setTimeout(() => {
      this.agreedEvent.emit(this.agreed);
    })
  }
  public toggleClick(): void {
    this.agreed = !this.agreed;
    this.agreedEvent.emit(this.agreed)
    if (this.agreed) {
      setLocalStore(
        STORAGE_KEYS.TERMS_AGREEMENT,
        JSON.stringify({
          version: configuration.appMetadata?.agreement?.version,
          terms: !!configuration.appMetadata?.agreement?.termsUrl,
          privacy: !!configuration.appMetadata?.agreement?.privacyUrl
        })
      )
    } else if (this.agreed === false) {
      delLocalStore(STORAGE_KEYS.TERMS_AGREEMENT);
    }
  }
}


