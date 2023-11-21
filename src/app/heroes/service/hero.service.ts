import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/heros.interface';
import { environments } from 'src/env/environments';

@Injectable({ providedIn: 'root' })
export class HerosService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHerosById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }
}
