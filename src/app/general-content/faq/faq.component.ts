import { Component, OnInit } from '@angular/core';

import fileaa from './../../../assets/faq.js'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: []
})
export class FaqComponent implements OnInit {


  faqs: any
  constructor() { }

  ngOnInit(): void {
    this.faqs = fileaa();
  }

}
