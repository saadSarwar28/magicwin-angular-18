import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-reports-input',
  templateUrl: './reports-input.component.html',
  styleUrls: ['./reports-input.component.scss']
})
export class ReportsInputComponent implements OnInit {
  @ViewChild('startDatePicker') startDatePicker!: ElementRef;
  @ViewChild('startTimePicker') startTimePicker!: ElementRef;
  @ViewChild('endDatePicker') endDatePicker!: ElementRef;
  @ViewChild('endTimePicker') endTimePicker!: ElementRef;
  @Output() valueChange = new EventEmitter();
  @Input() filters: any;
  @Input() startDateRequired: any;
  toasterMessage: any;
  startDateVal: any;
  endDateVal: any;
  maxDate: string | undefined;
  constructor(private translate: TranslateService, private toasterService: ToastService, private elementRef: ElementRef) {
    let curr = new Date();
    let first = curr.getDate();
    let last = first - 6;
    this.endDateVal = this.getISOString(new Date());
    this.startDateVal = this.getISOString(new Date(curr.setDate(last)));
  }

  openStartDatePicker() {
    this.startDatePicker.nativeElement.focus()
    this.startDatePicker.nativeElement.showPicker()
  }

  openStartTimePicker() {
    this.startTimePicker.nativeElement.focus()
    this.startTimePicker.nativeElement.showPicker()
  }

  openEndDatePicker() {
    this.endDatePicker.nativeElement.focus()
    this.endDatePicker.nativeElement.showPicker()
  }

  openEndTimePicker() {
    this.endTimePicker.nativeElement.focus()
    this.endTimePicker.nativeElement.showPicker()
  }

  public dateInputForm = new FormGroup({
    filterType: new FormControl(''),
    startDate: new FormControl('', { validators: Validators.compose([Validators.required]) }),
    startTime: new FormControl('',),
    endDate: new FormControl('', { validators: Validators.compose([Validators.required]) }),
    endTime: new FormControl('')

  });


  ngOnInit(): void {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getUTCMinutes() - currentDate.getTimezoneOffset());
    this.maxDate = currentDate.toISOString().slice(0, 16);
    this.dateInputForm.controls.filterType.setValue(this.filters[0]);
    const startDate = new Date(this.startDateVal);
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedStartTime = startDate.toTimeString().split(' ')[0];
    this.dateInputForm.controls.startDate.setValue(formattedStartDate);
    this.dateInputForm.controls.startTime.setValue(formattedStartTime);
    const endDate = new Date(this.endDateVal);
    const formattedEndDate = endDate.toISOString().split('T')[0];
    const formattedEndTime = endDate.toTimeString().split(' ')[0];
    this.dateInputForm.controls.endDate.setValue(formattedEndDate);
    this.dateInputForm.controls.endTime.setValue(formattedEndTime);

    let finalstartdatewithtime = `${formattedStartDate}T${formattedStartTime}`
    let finalenddatewithtime = `${formattedEndDate}T${formattedEndTime}`
    this.dateInputForm.value.startDate = finalstartdatewithtime;
    this.dateInputForm.value.endDate = finalenddatewithtime;
    if (this.startDateRequired == 'No') {
      this.dateInputForm.controls.startDate.clearValidators()
    }
    this.valueChange.emit(this.dateInputForm);
  }


  getISOString(date: any) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear(),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes(),
      seconds = '' + d.getSeconds();
    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;
    hours = hours.length < 2 ? '0' + hours : hours;
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    seconds = seconds.length < 2 ? '0' + seconds : seconds;
    return ([year, month, day].join('-') + 'T' + [hours, minutes, seconds].join(':') + '.000');
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  get startDate() {
    return this.dateInputForm.get('startDate');
  }

  get startTime() {
    return this.dateInputForm.get('startTime');
  }

  get endDate() {
    return this.dateInputForm.get('endDate');
  }

  get endTime() {
    return this.dateInputForm.get('endTime');
  }

  submitFormToParent() {
    const startDate = new Date(this.dateInputForm.value.startDate);
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const endDate = new Date(this.dateInputForm.value.endDate);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    let finalstartdatewithtime = `${formattedStartDate}T${this.dateInputForm.value.startTime}`
    let finalenddatewithtime = `${formattedEndDate}T${this.dateInputForm.value.endTime}`
    if (this.dateInputForm.invalid) {
    } else if (this.startDateRequired == 'No') {
      if ((this.dateInputForm.controls.endDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("End date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light', delay: 2000, });
      } else {
        this.dateInputForm.value.startDate = finalstartdatewithtime
        this.dateInputForm.value.endDate = finalenddatewithtime
        this.valueChange.emit(this.dateInputForm)
      }
    } else {
      if ((this.dateInputForm.controls.startDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("Start date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light', delay: 2000, });
      } else if ((this.dateInputForm.controls.endDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("End date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light', delay: 2000, });
      } else if ((this.dateInputForm.controls.startDate.value) > (this.dateInputForm.controls.endDate.value)) {
        const translatedResponse = this.toasterTranslationMethod("Please select a valid date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light', delay: 2000, });
      } else {


        this.dateInputForm.value.startDate = finalstartdatewithtime;
        this.dateInputForm.value.endDate = finalenddatewithtime;
        this.valueChange.emit(this.dateInputForm)
      }
    }

  }




  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    if (resp.substring('</br>')) {
      resp = resp.replace(' </br>', '');
    }
    resp = resp.split(/(\d+)/);
    if (resp.length) {
      for (let i = 0; i < resp.length; i++) {
        if (isNaN(resp[i])) {
          this.translate.get(resp[i]).subscribe((res: string) => {
            this.toasterMessage = this.toasterMessage + res;
          });
        } else {
          this.toasterMessage = this.toasterMessage + resp[i];
        }
      }
    } else {
      this.translate.get(resp).subscribe((res: string) => {
        this.toasterMessage = res;
      });
    }
    return this.toasterMessage;
  }
}
