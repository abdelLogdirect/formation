import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SlideComponent } from './slide/slide.component';



@NgModule({
  declarations: [
    SlideshowComponent,
    PaginationComponent,
    SlideComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlideshowComponent,
    PaginationComponent,
    SlideComponent
  ]
})
export class SlideshowModule { }
