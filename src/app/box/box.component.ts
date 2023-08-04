import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, timer, Observable } from 'rxjs';
import { filter, takeUntil, switchMap, startWith, scan, map, take } from 'rxjs/operators';


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
})
export class BoxComponent implements OnInit {
  toggle$ = new BehaviorSubject<boolean>(false);
  countdown$!: Observable<number>;
  countdownValue = 4;
  buttonText = "Start";  


  ngOnInit() {
    this.countdown$ = this.toggle$.pipe(
      switchMap(isPlaying => isPlaying ? timer(0, 1000) : []),
      map(() => -1),
      startWith(this.countdownValue),
      scan((acc, curr) => {
        const newValue = acc + curr;
        if (newValue < 0) {
          this.buttonText = "Start";
          this.toggle$.next(false);
          return this.countdownValue;
        } else {
          return newValue;
        }
      }),
    );
  }

  onToggle() {
    this.toggle$.next(!this.toggle$.value);
    switch(this.buttonText) {
      case "Start":
        this.buttonText = "Pause";
        break;
      case "Pause":
        this.buttonText = "Resume";
        break;
      case "Resume":
        this.buttonText = "Pause";
        break;
    }
  }
}
