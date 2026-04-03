import { Component, Input } from '@angular/core';
import { Share } from '../share/share';

@Component({
  selector: 'app-card',
  imports: [Share],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
@Input() type: 'home' | 'car-list' = 'car-list';
  @Input() showShare: boolean = true;
  @Input() showLike: boolean = true;
requireLogin(){window.alert("Favorilerinize Ekliyebilmeniz İçin, Lütfen Üye Girişi Yapınız!");}

}
