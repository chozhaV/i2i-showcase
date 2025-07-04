import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('bgVideo') bgVideoRef!: ElementRef<HTMLVideoElement>;
  title = 'i2i-showcase';
  isShow = false;
  isPaused = false;
  idleTimeout: any;

  ngOnInit(): void {
    this.setupUserActivityListener();
  }

  ngOnDestroy(): void {
    this.removeUserActivityListener();
    clearTimeout(this.idleTimeout);
  }

  toggleVideo(video: HTMLVideoElement): void {
    if (video.paused) {
      video.play();
      this.isPaused = false;
    } else {
      video.pause();
      this.isPaused = true;
    }
  }

  pauseVideoIfIdle(): void {
    const video = this.bgVideoRef?.nativeElement;
    if (video && !video.paused) {
      video.pause();
      this.isPaused = true;
    }
  }

  resumeVideoOnActivity(): void {
    const video = this.bgVideoRef?.nativeElement;
    if (video && video.paused) {
      video.play();
      this.isPaused = false;
    }
  }

  setupUserActivityListener(): void {
    const resetTimer = () => {
      clearTimeout(this.idleTimeout);
      this.resumeVideoOnActivity();
      this.idleTimeout = setTimeout(() => this.pauseVideoIfIdle(), 60000); // 1 min idle
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
  }

  removeUserActivityListener(): void {
    window.removeEventListener('mousemove', this.resumeVideoOnActivity);
    window.removeEventListener('keydown', this.resumeVideoOnActivity);
  }
}
