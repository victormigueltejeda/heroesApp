import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heros.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hero-pages',
  templateUrl: './hero-pages.component.html',
  styles: [],
})
export class HeroPagesComponent implements OnInit {
  public hero?: Hero;
  constructor(
    private heroesService: HerosService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        delay(3000),
        switchMap(({ id }) => this.heroesService.getHerosById(id))
      )
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }

  getSuggestion(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`heroes?q=${query}&_limit=6`);
  }
}
