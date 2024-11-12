import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositMethodService {

  constructor() { }
  paymentDetails = new BehaviorSubject<any>(1);

  setDepositDetails(payment: any) {
    this.paymentDetails.next(payment);
  }

  getDepositDetails(): Observable<any> {
    return this.paymentDetails.asObservable();
  }
}
