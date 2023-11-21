import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heros.interface';
import { HerosService } from '../../service/hero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroesService: HerosService) {}

  ngOnInit(): void {
    this.heroesService.getHeros().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
