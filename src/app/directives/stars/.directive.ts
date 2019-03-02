import { style } from '@angular/animations';
import { AppService } from './../../services/app/app.service';
import { Directive,ElementRef,AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appStars]'
})
export class starsDirective implements AfterContentInit {
  public context: CanvasRenderingContext2D;
  constructor(public el: ElementRef,public appService:AppService) {
 }

 ngAfterContentInit(){
    this.context = (<HTMLCanvasElement>this.el.nativeElement).getContext('2d');
    this.drawStars();
 }

 drawStars(){
   let x = 10;
  for(let i = 0; i < this.appService.starsNumber; i++){
    this.startDraw(x);
    x+=25
  }
 }

 startDraw(x){
  let alpha = (2 * Math.PI) / 10;
  let radius = 12;
  let starXY = [x,20]
  this.context.beginPath();
  
  for(let i = 11; i != 0; i--)
  {
      let r = radius*(i % 2 + 1)/2;
      let omega = alpha * i;
      this.context.lineTo((r * Math.sin(omega)) + starXY[0], (r * Math.cos(omega)) + starXY[1]);
  }
  this.context.closePath();
  this.context.fillStyle = "yellow";
  this.context.fill();
 }

}
