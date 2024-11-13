



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-terms-condition-popup',
  template: `
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header mb-2 pb-1 border-0">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2"> {{ "termsandconditions" | translate }}
          </h1>
          <button type="button" class="btn-close" (click)="closeModal()">
            <i class="bi bi-x"></i>
          </button>
        </div>
      <div class="modal-body sm-fs-13">
        <div id="term">

          <p dir="ltr" id="docs-internal-guid-8d14f752-7c32-81fc-9889-619030480c2d">
            <strong>{{'account'|translate}}</strong></p>
          <p dir="ltr">{{'terms1'|translate}}</p>
          <p dir="ltr"><strong>{{'betting'|translate}}</strong></p>
          <p dir="ltr">{{'bettingterms'|translate}}</p>
          <ul>
            <li dir="ltr">
              <p dir="ltr">{{'bettingterms2'|translate}}</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">{{'bettingsection2'|translate}}</p>
            </li>
          </ul>
          <p dir="ltr"><strong>{{'accountterms'|translate}}</strong></p>
          <p dir="ltr">{{'plsreadterms'|translate}}</p>
          <p dir="ltr">{{'plsreadprivacy'|translate}}</p>
          <p dir="ltr">{{'acceptbyclick'|translate}}</p>
          <p dir="ltr">{{'openaccount'|translate}}</p>
          <ol>
            <li dir="ltr">
              <p dir="ltr"><strong>{{'youraccount'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'accepttoopenaccount'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'yourare18'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'binformation'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'cinfo'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'dinfo'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'einfo'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'finfo'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ginfo'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'yourresponsibility'|translate}}</p>
          <p dir="ltr">{{'securityrespons'|translate}}</p>
          <p dir="ltr">{{'nosellaccount'|translate}}
          </p>
          <p dir="ltr">{{'managegambling'|translate}}</p>
          <ol start="2">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'depositfund'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'betexchange'|translate}}</p>
          <p dir="ltr">{{'undertake'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'alldeposit'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'allpayment'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'alltransaction'|translate}}
          </p>
          <p dir="ltr">{{'numberofcontrolls'|translate}}</p>
          <ol start="3">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'privacy'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'privacy1'|translate}}
          </p>
          <p dir="ltr">{{'privacy2'|translate}}</p>
          <p dir="ltr">{{'privacy3'|translate}}</p>
          <p dir="ltr">{{'privacy4'|translate}}</p>
          <ol start="4">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Indemnity'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{"indem1"|translate}}</p>
          <ol start="5">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'eo'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'eo1'|translate}}</p>
          <ol start="6">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'sot'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'eo2'|translate}}
          </p>
          <p dir="ltr">{{'sot1'|translate}}</p>
          <p dir="ltr">{{'sot2'|translate}}</p>
          <p dir="ltr">{{'sot3'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'sota'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'sotab'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'sot4'|translate}}</p>
          <p dir="ltr">{{'sot5'|translate}}</p>
          <p dir="ltr">{{'sot6'|translate}}</p>
          <ol start="7">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'assignment'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'as2'|translate}}</p>
          <ol start="8">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Severability'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'sev1'|translate}}</p>
          <p dir="ltr">{{'sev2'|translate}}</p>
          <ol start="9">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'dr'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'dr1'|translate}}</p>
          <ol start="10">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Amendments'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'am1'|translate}}
          </p>
          <ol start="11">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'c&n'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'c&n1'|translate}}</p>
          <ol start="12">
            <li dir="ltr">
              <p dir="ltr"><strong>{{"gl&j"|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'gl1'|translate}}</p>
          <p dir="ltr">{{'gl2'|translate}}</p>
          <ol start="13">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'EnglishVersion'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'ev1'|translate}}</p>
          <p dir="ltr"><strong>{{'bc'|translate}}</strong></p>
          <ul>
            <li dir="ltr">
              <p dir="ltr">{{'sec1'|translate}}</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">{{'sec2'|translate}}</p>
            </li>
          </ul>
          <p dir="ltr"><strong>{{'bgc'|translate}}</strong></p>
          <p dir="ltr">{{'bgc1'|translate}}</p>
          <p dir="ltr">{{'bgc2'|translate}}</p>
          <p dir="ltr">{{'bgc3'|translate}}</p>
          <ul>
            <li dir="ltr">
              <p dir="ltr">{{'bgca'|translate}}</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">{{'bgcb'|translate}}</p>
            </li>
          </ul>
          <p dir="ltr">{{'bgc4'|translate}}</p>
          <p dir="ltr">{{'bgc5'|translate}}</p>
          <p dir="ltr">{{'bgc6'|translate}}</p>
          <p dir="ltr">{{'bgc7'|translate}}</p>
          <p dir="ltr">{{'bgc8'|translate}}</p>
          <p dir="ltr">{{'bgc9'|translate}}</p>
          <p dir="ltr">{{'bgc10'|translate}}</p>
          <p dir="ltr"><strong>{{'conditions'|translate}}</strong></p>
          <ol>
            <li dir="ltr">
              <p dir="ltr"><strong>{{'liscense'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{"cond1"|translate}}</p>
          <p dir="ltr">{{'cond2'|translate}}</p>
          <p dir="ltr">{{'cond3'|translate}}</p>
          <ol start="2">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'serviceuse'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'use1'|translate}}</p>
          <p dir="ltr">{{'use2'|translate}}</p>
          <p dir="ltr">{{'use3'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'use4'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'use5'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'use6'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'use7'|translate}}</p>
              </li>
            </ul>
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Your_Conduct'|translate}}</strong></p>
            </li>
          </ul>
          <p dir="ltr">{{'conduct1'|translate}}</p>
          <p dir="ltr">{{'conduct2'|translate}}</p>
          <p dir="ltr">{{'conduct3'|translate}}</p>
          <p dir="ltr">{{'conduct4'|translate}}</p>
          <p dir="ltr">{{'conduct5'|translate}}</p>
          <p dir="ltr">{{'conduct6'|translate}}</p>
          <ol start="4">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'privacy'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'privacy1'|translate}}</p>
          <p dir="ltr">{{'privacy2'|translate}}&nbsp;</p>
          <p dir="ltr">{{'priv1'|translate}}</p>
          <p dir="ltr">{{'privacy3'|translate}}</p>
          <p dir="ltr"><strong>{{'bettingcond'|translate}}</strong></p>
          <ol start="5">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'opofServices'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'serv1'|translate}}</p>
          <p dir="ltr">{{'serv2'|translate}}</p>
          <p dir="ltr">{{'serv3'|translate}}</p>
          <p dir="ltr">{{'serv4'|translate}}</p>
          <p dir="ltr">{{'serv5'|translate}}</p>
          <ol start="6">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'ctsb'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'ctsb1'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb-1'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb2'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb3'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb4'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb5'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb6'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'ctsb7'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'ctsb8'|translate}}</p>
          <ol start="7">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'gamblingage'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'gambling'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'gambling1'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'gambling2'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'gambling3'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'gambling4'|translate}}</p>
              </li>
            </ul>
            <li dir="ltr">
              <p dir="ltr"><strong>{{'cancelbet'|translate}}</strong></p>
            </li>
          </ul>
          <p dir="ltr">{{'unmatchedbet'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'cancelbet1'|translate}}&nbsp;</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'cancelbet2'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'cancelbetp1'|translate}}</p>
          <p dir="ltr">{{'cancelbetp2'|translate}}</p>
          <p dir="ltr">{{'cancelbetp3'|translate}}</p>
          <p dir="ltr">{{'cancelbetp4'|translate}}
          </p>
          <ol start="9">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'minmaxbet'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'minmaxbet1'|translate}}
          </p>
          <p dir="ltr">{{'minmaxbet2'|translate}}</p>
          <ol start="10">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'betsetlment'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'betsetlment1'|translate}}&nbsp;</p>
          <p dir="ltr">{{'betsetlment2'|translate}}</p>
          <p dir="ltr"><strong>{{'conditionsrelatingtous'|translate}}</strong></p>
          <ol start="11">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'commissions'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'commissions1'|translate}}</p>
          <p dir="ltr">{{'commissions2'|translate}}</p>
          <p dir="ltr">{{'commissions3'|translate}}</p>
          <p dir="ltr">{{'commissions4'|translate}}</p>
          <p dir="ltr">{{'commissions5'|translate}}</p>
          <ol start="12">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'mattersbeyondourcontrol'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'matters1'|translate}}</p>
          <p dir="ltr">{{'matters2'|translate}}&nbsp;</p>
          <p dir="ltr">{{'matters3'|translate}}</p>
          <p dir="ltr">{{'matters4'|translate}}</p>
          <ol start="13">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Indemnity'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'indemn1'|translate}}</p>
          <p dir="ltr">{{'indemn2'|translate}}</p>
          <ol start="14">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'ll'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'ll1'|translate}}</p>
          <p dir="ltr">{{'ll2'|translate}}
          </p>
          <p dir="ltr">{{'ll3'|translate}}</p>
          <p dir="ltr">{{'ll4'|translate}}</p>
          <ol start="15">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'rs'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'rsp'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'rsa'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'rsb'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr"><strong>{{'condrelatedtoservice'|translate}}</strong></p>
          <ol start="16">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Information_Services'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'is1'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'is-1'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'is2'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'information'|translate}}
          </p>
          <p dir="ltr">{{'info1'|translate}}</p>
          <p dir="ltr">{{'info2'|translate}}</p>
          <p dir="ltr">{{'info3'|translate}}</p>
          <p dir="ltr"><strong>{{'General_Conditions'|translate}}</strong></p>
          <ol start="17">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'assignment'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'as2'|translate}}</p>
          <ol start="18">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Severability'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'sev1'|translate}}</p>
          <ol start="19">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'dr'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'dr1'|translate}}</p>
          <ol start="20">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Amendments'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'am1'|translate}}</p>
          <ol start="21">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'c&n'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'c&n1'|translate}}</p>
          <ol start="22">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'EnglishVersion'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'agreement'|translate}}</p>
          <ol start="23">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Entire_Agreement'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'agr1'|translate}}</p>
          <ol start="24">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'No_waiver'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'nofailure'|translate}}</p>
          <ol start="25">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'gl&j'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'gl1'|translate}}</p>
          <p dir="ltr"><strong>{{'specific'|translate}}</strong></p>
          <ol>
            <li dir="ltr">
              <p dir="ltr"><strong>{{'Your_Conduct'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'yourcon1'|translate}}</p>
          <ol start="2">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'privacy'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'pri1'|translate}}</p>
          <p dir="ltr"><strong>{{'betexchange1'|translate}}</strong></p>
          <ol start="3">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'OperationoftheExchange'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'priornotice'|translate}}
          </p>
          <p dir="ltr">{{'usedbot'|translate}}</p>
          <ul>
            <ul>
              <li dir="ltr">
                <p dir="ltr">{{'business'|translate}}</p>
              </li>
              <li dir="ltr">
                <p dir="ltr">{{'b2'|translate}}</p>
              </li>
            </ul>
          </ul>
          <p dir="ltr">{{'nominate'|translate}}</p>
          <ol start="4">
            <li dir="ltr">
              <p dir="ltr"><strong>{{'gl&j'|translate}}</strong></p>
            </li>
          </ol>
          <p dir="ltr">{{'gl1'|translate}}</p>
          <p dir="ltr">{{'ggglj'|translate}}</p>
          <p dir="ltr">{{'refev'|translate}}</p>

        </div>
        <div id="cookiepolicy">
          <h5>{{'cookiepolicy'|translate}}</h5>
          <p>{{'cookie1'|translate}}</p>
          <h6>{{'whatiscookie'|translate}}</h6>
          <p>
            {{'cookiep1'|translate}}
          </p>
          <p>
            {{'cookiep2'|translate}}
          </p>
          <p>
            {{'cookiep3'|translate}} <b>{{'cookieb'|translate}}</b>.
          </p>
          <hr>
        </div>
        <div id="parentalsupervision">
          <h5>{{'over18a'|translate}}</h5>
          <p>{{'over181'|translate}}</p>
          <h6>{{'Filtering_systems'|translate}}</h6>
          <p>{{'fs'|translate}}</p>
          <hr>
        </div>
        <div id="responsiblegambling">
          <h5>{{'Understanding_Gambling'|translate}}</h5>
          <p>{{'ensuremaintaincontrol'|translate}}
          </p>
          <h4>{{'Maintaining_Control'|translate}}</h4>
          <ul>
            <li>{{'control1'|translate}}</li>
            <li>{{'Avoid_chasing_losses'|translate}}</li>
            <li>{{'gamblewithmoney'|translate}}</li>
            <li>{{'keeptrack'|translate}}</li>
            <li>{{'balancegamble'|translate}}</li>
            <li>{{'trytounderstand'|translate}}
            </li>
          </ul>
          <h4>{{'Self_Assessment'|translate}}</h4>
          <p>{{'sfp'|translate}}</p>
          <ol>
            <li>{{'Haveothersevercriticisedyourgambling?'|translate}}</li>
            <li>{{'boringorunhappy'|translate}}</li>
            <li>{{'arguments'|translate}}</li>
            <li>{{'longperiods'|translate}}</li>
            <li>{{'collorschool'|translate}}</li>
            <li>{{'moneyortime'|translate}}</li>
            <li>{{'bettinghabits'|translate}}</li>
            <li>{{'gamblingmoney'|translate}}</li>
            <li>{{'lostfamily'|translate}}</li>
            <li>{{'winback'|translate}}</li>
            <li>{{'runoutmoney'|translate}}</li>
            <li>{{'busfare'|translate}}</li>
            <li>{{'suicidal'|translate}}</li>
          </ol>
          <p>{{'advice&support'|translate}}</p>

        </div>
      </div>

    </div>
  </div>

`,
  standalone: true,
  imports: [TranslateModule, CommonModule]

})
export class SignupTermsConditionComponent {

  constructor(private dialogRef: MatDialogRef<SignupTermsConditionComponent>) { }
  closeModal() {
    this.dialogRef.close()
  }


}
