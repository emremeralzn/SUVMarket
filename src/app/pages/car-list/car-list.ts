import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { SwapCard } from '../../components/swap-card/swap-card';
import { RouterLink } from '@angular/router';
import { Share } from '../../components/share/share';

@Component({
  selector: 'app-car-list',
  imports: [Card,SwapCard,RouterLink,Share],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
})
export class CarList {
    menuOpen = false;
ngOnInit() {
  window.scrollTo(0, 0);
}
}
