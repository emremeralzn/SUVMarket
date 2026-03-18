import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-swiper-youtube',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper-youtube.html',
  styleUrls: ['./swiper-youtube.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperYoutubeComponent implements AfterViewInit {

  @ViewChild('swiperRef', { read: ElementRef }) swiperRef!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  activeIndex = 1;
  selectedVideo: string | null = null;

  videoUrls = [
    'https://www.youtube.com/watch?v=uX1XMjQF3D4',
    'https://www.youtube.com/watch?v=ahtrTUdNezA',
    'https://www.youtube.com/watch?v=uX1XMjQF3D4'
  ];

  extractVideoId(url: string): string {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : '';
  }

  videos = this.videoUrls.map(url => {
    const id = this.extractVideoId(url);
    return {
      videoId: id,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    };
  });

  openVideo(id: string, index: number) {
  const swiperEl = this.swiperRef.nativeElement;
  const swiperInstance = swiperEl.swiper; // swiper instance

  if (!swiperInstance) return;

  if (swiperInstance.activeIndex === index) {
    // Sadece aktif slide tıklandıysa modal aç
    this.selectedVideo = id;
  } else {
    // Aktif değilse modal açma, sadece geçiş yap
    swiperInstance.slideTo(index);
  }
}

  closeVideo() {
    this.selectedVideo = null;
  }

  getVideoUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1`
    );
  }

  ngAfterViewInit() {
  const swiperEl = this.swiperRef.nativeElement;

  Object.assign(swiperEl, {
    // slidesPerView: 'auto' diyerek genişliği CSS'teki width: 300px/450px değerlerine bırakıyoruz
    slidesPerView: '4', 
    centeredSlides: true,
    spaceBetween: -20, // Negatif değer slide'ları birbirine yaklaştırır, boşluğu öldürür
    initialSlide: 1,

    pagination: {
      el: '.custom-pagination',
      clickable: true
    },

    on: {
      slideChange: (swiper: any) => {
        this.activeIndex = swiper.activeIndex;
      }
    }
  });

  swiperEl.initialize();
}
}