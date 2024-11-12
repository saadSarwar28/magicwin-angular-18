import { Component, OnInit } from '@angular/core';
import { RULES } from './../../../assets/rule.js';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: [],
})
export class RuleComponent implements OnInit {
  constructor() { }

  rules: any;

  ngOnInit(): void {
    this.rules = RULES;
  }
}
