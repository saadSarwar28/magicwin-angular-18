import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-condiitons',
  templateUrl: './terms-and-condiitons.component.html',
  styleUrls: []
})
export class TermsAndCondiitonsComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  currentRoute: any;
  ngOnInit(): void {
    this.router.params.subscribe((p) => {
      this.currentRoute = this.router.snapshot.paramMap.get('id') || '';
    })
  }

}
