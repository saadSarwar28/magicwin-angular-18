import { Component, OnInit } from '@angular/core';
import { GenericService } from '../..//services/generic.service';

@Component({
  selector: 'app-general-header',
  templateUrl: './general-header.component.html',
  styleUrls: ['./general-header.component.css']
})
export class GeneralHeaderComponent implements OnInit {

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.genericService.openLoginModal();
  }

}
