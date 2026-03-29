import { Component } from '@angular/core';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-request-a-call',
  imports: [Card],
  templateUrl: './request-a-call.html',
  styleUrl: './request-a-call.scss',
})
export class RequestACall {
ngOnInit() {
  window.scrollTo(0, 0);
}
}
