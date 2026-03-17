import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import Swiper from 'swiper';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { SwiperYoutubeComponent } from '../../components/swiper-youtube/swiper-youtube';
const swiper = new Swiper('.mySwiper', {
  modules: [Pagination, EffectCoverflow],

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
});
@Component({
  selector: 'app-home',
  imports: [Card,SwiperYoutubeComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

}
