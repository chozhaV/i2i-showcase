import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit {
  @HostBinding('style.opacity') opacity = '0';
  @HostBinding('style.transform') transform = 'translateY(40px)';
  @Input() animationDelay = '0s';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `all 0.6s ease-out ${this.animationDelay}`);

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.opacity = '1';
        this.transform = 'translateY(0)';
        this.observer.disconnect();
      }
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.el.nativeElement);
  }
}
