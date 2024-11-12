import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotions-and-bonus',
  templateUrl: './promotions-and-bonus.component.html',
  styleUrls: ['./promotions-and-bonus.component.css']
})
export class PromotionsAndBonusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  images: any = [
    {id:'1', path:'assets/images/5 Banner Small.webp'},
    {id:'2', path:'assets/images/2 Line Line Banner Small.webp'},
    {id:'3', path:'assets/images/10 Iphones Banner Small.webp'},
    {id:'4', path:'assets/images/25k Banner Small.webp'},
    {id:'5', path:'assets/images/100k Banner Small.webp'},
  ]

}
