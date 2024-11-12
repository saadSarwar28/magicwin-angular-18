import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
  <div style="margin-top:50px;margin-bottom:50px" class="404-image" class="text-center img-box">
  <img src="https://iriscdn.b-cdn.net/error_404.png" alt="">
</div>
  `,
  styles: [
    `
     .img-box img {
    height: 400px;
    width: 500px;
  }
@media only screen and (max-width: 768px) {
  .img-box img {
    height: 300px;
    width: 300px;
  }
}

    `
  ]
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
