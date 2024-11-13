import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { _window } from '../../services/backend.service';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss'],
})
export class TutorialPageComponent implements OnInit {
  constructor() { }
  filterData: any = [];
  data: any = [];

  private inputSubject: Subject<string> = new Subject();
  private inputSubscription: any;
  ngOnInit(): void {
    this.data = _window().tutorialVideo ? _window().tutorialVideo : [];
    this.filterData = this.data;

    this.inputSubscription = this.inputSubject
      .pipe(
        debounceTime(500) // Adjust the debounce time as needed
      )
      .subscribe((value) => {
        this.filterData = this.filterByCategroyAndName(
          value.toLowerCase().trim()
        );
      });
  }

  filterByCategroyAndName(filterData) {
    return this.data
      .map((item) => ({
        ...item,
        tutorialVideo: item.tutorialVideo.filter((video) =>
          video.name?.toLowerCase().trim().includes(filterData)
        ),
      }))
      .filter((item) => item.tutorialVideo.length > 0);
  }

  onUserFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputSubject.next(value);
  }

  ngOnDestroy() {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
  }
}
