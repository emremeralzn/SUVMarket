import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-swap-card',
  imports: [],
  templateUrl: './swap-card.html',
  styleUrl: './swap-card.scss',
})
export class SwapCard {
@Input() type: 'takas' | 'yeni' = 'yeni';
}
