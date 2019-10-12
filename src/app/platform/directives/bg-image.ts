import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[bgImage]',
})

export class BgImageDirective {

  @Input('bgImage') set url(path: string) {
    this.renderer.addClass(this.elementRef.nativeElement, 'G-bg-image');
    if (path) {
      path = path.split(' ').join('%20');
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url("${path}")`);
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}
}
