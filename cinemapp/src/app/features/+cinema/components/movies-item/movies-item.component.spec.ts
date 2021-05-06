import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesItemComponent } from './movies-item.component';
import { Movie } from '../../models/movie.model';

describe('MovieItemComponent', () => {
  let component: MoviesItemComponent;
  let fixture: ComponentFixture<MoviesItemComponent>;
  let nativeElement: HTMLElement;

  const movie: Movie = {
    title: 'The Matrix',
    category: '',
    categoryId: 0,
    id: 0,
    imgSrc: '',
    releasedDate: '',
    summary: '',
    videoYoutube: '',
    schedules: [],
    schedulesGroups: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesItemComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesItemComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {

    const title = nativeElement.querySelector('mat-card-title')?.innerHTML;

    expect(title).toContain(movie.title);

  });

});
