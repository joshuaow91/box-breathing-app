import { Component } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
})
export class BoxComponent {
  initialCountdownValue: number = 4;
  countdown: number = this.initialCountdownValue;
  intervalId: any;
  playPauseButtonText: string = 'Start';
  stopResetButtonText: string = 'Stop';

  playPause() {
    if (this.playPauseButtonText === 'Start' || this.playPauseButtonText === 'Resume') {
      this.playPauseButtonText = 'Pause';
      this.intervalId = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown < 0) {
          this.countdown = this.initialCountdownValue;
        }
      }, 1000);
    } else {
      this.playPauseButtonText = 'Resume';
      clearInterval(this.intervalId);
    }
  }

  stopReset() {
    if (this.stopResetButtonText === 'Stop') {
      this.stopResetButtonText = 'Reset';
      clearInterval(this.intervalId);
      this.playPauseButtonText = 'Start';
    } else {
      this.stopResetButtonText = 'Stop';
      this.countdown = this.initialCountdownValue;
    }
  }
}
