import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@core/environment';

import { CinemaService } from './cinema.service';
import { Movie } from '../models/movie.model';

describe('CinemasService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = TestBed.inject(CinemaService);
    expect(service).toBeTruthy();
  });

});
