import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Card } from '../../components/card/card';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';

register(); // Swiper web bileşenlerini kaydeder

@Component({
  selector: 'app-car-detail',
  standalone: true, // Eğer projen standalone ise kalsın, değilse silebilirsin
  imports: [Card, RouterLink],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarDetail implements OnInit, AfterViewInit {
  constructor(private cd: ChangeDetectorRef) {}
menuOpen = false;
  activeIndex = 0;

  @ViewChild('mainSwiper') mainSwiper!: ElementRef;
  @ViewChild('thumbSwiper') thumbSwiper!: ElementRef;

  carImages: string[] = [
    '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
    '/bmw.jpg',
    '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
    '/bmw.jpg',
    '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
    '/bmw.jpg',
    '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
    '/bmw.jpg'
  ];

  // Thumbnail tıklanınca ana slider'ı o indexe sürükler
  setIndex(index: number) {
    this.activeIndex = index;
    this.mainSwiper.nativeElement.swiper.slideTo(index);
    this.thumbSwiper.nativeElement.swiper.slideTo(index);
    this.cd.detectChanges();
  }
// Ana slider (üstteki) değişince çalışan fonksiyon
onSlideChange(event: any) {
  // Swiper instance'ını güvenli şekilde alıyoruz
  const swiperInstance = event?.target?.swiper || event?.detail?.swiper;
  if (!swiperInstance) return;

  // Aktif indexi güncelle
  this.activeIndex = swiperInstance.activeIndex;

  // Thumbnail slider da aynı indexe kaydır
  if (this.thumbSwiper?.nativeElement?.swiper) {
    this.thumbSwiper.nativeElement.swiper.slideTo(this.activeIndex);
  }
    this.cd.detectChanges();

}
nextThumb() {
  this.thumbSwiper.nativeElement.swiper.slideNext();
}

prevThumb() {
  this.thumbSwiper.nativeElement.swiper.slidePrev();
}

  nextSlide() {
    this.mainSwiper.nativeElement.swiper.slideNext();
    // Programatik slidechange tetiklenmediği için manuel çağır
    setTimeout(() => {
      this.onSlideChange({ detail: { swiper: this.mainSwiper.nativeElement.swiper } });
    }, 0);
  }
  prevSlide() {
    this.mainSwiper.nativeElement.swiper.slidePrev();
    // Programatik slidechange tetiklenmediği için manuel çağır
    setTimeout(() => {
      this.onSlideChange({ detail: { swiper: this.mainSwiper.nativeElement.swiper } });
    }, 0);
  }

  scrollTo(section: string) {
    const el = document.getElementById(section);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    const thumbParams = {
      breakpoints: {
        0: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      },
    };
    Object.assign(this.thumbSwiper.nativeElement, thumbParams);
    this.thumbSwiper.nativeElement.initialize();

    // Main swiper için de initialize
    this.mainSwiper.nativeElement.initialize();

    // --- Scroll Spy Mantığı ---
    const sections = [
      { id: 'teknikSection', link: 'link-teknik' },
      { id: 'donanimSection', link: 'link-donanım' },
      { id: 'ekspertizSection', link: 'link-ekspertiz' },
      { id: 'saticiSection', link: 'link-satici' },
      { id: 'benzerSection', link: 'link-benzer' },
    ];

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;

      if (window.scrollY < 50) {
        document.querySelectorAll('.title').forEach(item => item.classList.remove('active'));
        return;
      }

      let activeFound = false;
      sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        const link = document.getElementById(sec.link);
        if (!el || !link) return;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          document.querySelectorAll('.title').forEach(item => item.classList.remove('active'));
          link.classList.add('active');
          activeFound = true;
        }
      });

      if (!activeFound) {
        document.querySelectorAll('.title').forEach(item => item.classList.remove('active'));
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        document.querySelectorAll('.title').forEach(item => item.classList.remove('active'));
        document.getElementById('link-benzer')?.classList.add('active');
      }
    });
  }
}