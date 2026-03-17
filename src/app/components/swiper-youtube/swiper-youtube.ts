import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

// Swiper elementlerini tarayıcıya kaydeder
register();

@Component({
  selector: 'app-swiper-youtube',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper-youtube.html',
  styleUrls: ['./swiper-youtube.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Web component hatasını önler
})
export class SwiperYoutubeComponent implements OnInit {
  
  // React örneğindeki görseller
  images = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
  ];

  // Template'de JSON hatası almamak için objeyi string'e çeviren yardımcı fonksiyon
  convertToJSON(obj: any): string {
    return JSON.stringify(obj);
  }

  ngOnInit(): void {}
}