import { Directive, ElementRef, Renderer2, Input, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[routeTo]',
})

export class RouteToDirective implements OnInit {

  @Input() routeTo: string | number;
  @Input() id: number;
  @Input() activated: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('click')
  public onClick() {
    if (this.routeTo) {
      if (this.activated) {
        this.id ?
        this.router.navigate([this.routeTo, this.id], {relativeTo: this.activatedRoute}) :
        this.router.navigate([this.routeTo], {relativeTo: this.activatedRoute});
      } else {
        this.id ?
        this.router.navigate([this.routeTo, this.id]) :
        this.router.navigate([this.routeTo]);
      }
    }
  }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }
}
