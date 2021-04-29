import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@core/environment';
import { APIData } from '@core/api';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Ask city suggestions to the API
   */
  getCitySuggestions(value: string): Observable<string[]> {

    return this.http.get<APIData<string[]>>(`${environment.apiUrl}/api/v2/autocomplete/${value}`).pipe(
      map((response) => response.data),
      catchError(() => []),
    );

  }

}
