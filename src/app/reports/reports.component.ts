import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-reports',
  template: `

<div style="margin-bottom: 47px;">
  <reports-top-nav></reports-top-nav>
  <router-outlet></router-outlet>
</div>


  `,
  styleUrls: []
})
export class ReportsComponent implements OnInit {

  ngOnInit(): void {

  }

}
