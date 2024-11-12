import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetStatusService {

  private key = 'myBooleanKey';
  private key1 = 'myBooleanKey1';

  constructor() { }

  setMarqueeStatusVal(value: boolean): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  getMarqueeStatusVal(): boolean {
    const storedValue = localStorage.getItem(this.key);
    return storedValue ? JSON.parse(storedValue) : false;
  }
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  updateData(newValue: any) {
    this.dataSubject.next(newValue);
  }
  private marqueeSubject = new BehaviorSubject<any>(false);
  marquee$ = this.marqueeSubject.asObservable();

  updateDataMarquee(newValue: any) {
    this.marqueeSubject.next(newValue);
  }

  //
  private counterSubject = new BehaviorSubject<any>(false);
  dataCounter$ = this.counterSubject.asObservable();

  updateCounterData(newValue: any) {
    this.counterSubject.next(newValue);
  }

  private clientBalance = new BehaviorSubject<any>(false);
  balanceClient$ = this.clientBalance.asObservable();

  updateClientBalance(newValue: any) {
    this.clientBalance.next(newValue);
  }
}
