import { Component, ViewChildren, QueryList, OnChanges, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('changeDiapositive', [
      transition('void => *', [
        animate(500, keyframes([
          style({left: 0})
        ]))
      ]),
      transition('toLeft => void', [
        animate(500, keyframes([
          style({'z-index': 3}),
          style({left: '100%'})
        ]))
      ]),
      transition('toRight => void', [
        animate(500, keyframes([
          style({'z-index': 3}),
          style({left: '-100%'})
        ]))
      ]),
    ]),
  ],
})
export class AppComponent {
  diapositiva = 1;

  animationDirection;

  private totalDiapositivas = 3;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 37: // Left
        event.stopPropagation();
        this.onPrevious();
        break;

      case 39: // Right
        this.onNext();
        event.stopPropagation();
        break;
    }
  }

  onPrevious() {
    this.animationDirection = 'toLeft';
    setTimeout(() => {
      if (this.diapositiva > 1) {
        this.diapositiva--;
      }
    }, 0);
  }

  onNext() {
    if (this.diapositiva < this.totalDiapositivas) {
      this.animationDirection = 'toRight';
      setTimeout(() => {
        this.diapositiva++;
      }, 0);
    }
  }
}
