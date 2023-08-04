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
  phase: string = 'Inhale';
  phaseIndex: number = 0;
  phases: string[] = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  isReset: boolean = false; 

  playPause() {
    if (this.playPauseButtonText === 'Start' || this.playPauseButtonText === 'Resume') {
      this.playPauseButtonText = 'Pause';
      this.stopResetButtonText = 'Stop';
      this.isReset = false; 
      this.intervalId = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown < 0) {
          this.countdown = this.initialCountdownValue;
          this.phaseIndex = (this.phaseIndex + 1) % this.phases.length;
          this.phase = this.phases[this.phaseIndex];
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
      this.phase = 'Inhale';
      this.phaseIndex = 0;
      this.isReset = true; 
    }
  }
}
