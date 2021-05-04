import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SlideComponent } from './slide/slide.component';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    SlideshowComponent,
    PaginationComponent,
    SlideComponent,
    SliderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlideshowComponent,
    PaginationComponent,
    SlideComponent,
    SliderComponent
  ]
})
export class SlideshowModule { }
