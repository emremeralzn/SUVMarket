import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Card } from '../../components/card/card';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { PrintTemplate } from '../print-template/print-template';

register(); // Swiper web bileşenlerini kaydeder

@Component({
  selector: 'app-car-detail',
  standalone: true, // Eğer projen standalone ise kalsın, değilse silebilirsin
  imports: [Card, RouterLink,PrintTemplate],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarDetail implements OnInit, AfterViewInit {
  constructor(private cd: ChangeDetectorRef) {}
  menuOpen = false;
  activeIndex = 0;



  
// component.ts içinde
isLightboxOpen = false;

openLightbox() {
  if (window.innerWidth < 992) {
    return;
  }
  this.isLightboxOpen = true;
  document.body.style.overflow = 'hidden'; // Sayfa kaymasını engelle
  
  // Modal açıldığında mevcut index'ten başlamasını sağla
  setTimeout(() => {
    if (this.lbmainSwiper?.nativeElement) {
      this.lbmainSwiper.nativeElement.initialize();
    }
    if (this.lbThumbSwiper?.nativeElement) {
      const thumbParams = {
        slidesPerView: 5,
        breakpoints: {
          992: { slidesPerView: 3 },
          1100: { slidesPerView: 4 },
          1200: { slidesPerView: 4 },
          1800: { slidesPerView:5 },
        },
      };
      Object.assign(this.lbThumbSwiper.nativeElement, thumbParams);
      this.lbThumbSwiper.nativeElement.initialize();
    }
    this.setIndex(this.activeIndex);
  }, 0);
}

closeLightbox() {
  this.isLightboxOpen = false;
  document.body.style.overflow = 'auto';
}
  @ViewChild('lbmainSwiper') lbmainSwiper!: ElementRef;
  @ViewChild('lbthumbSwiper') lbThumbSwiper!: ElementRef;

  @ViewChild('mainSwiper') mainSwiper!: ElementRef;
  @ViewChild('thumbSwiper') thumbSwiper!: ElementRef;

  carImages: string[] = [
    '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-10_buyuk.jpg',
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

  // 1. Orijinal Sayfadaki Swiper'ları Güncelle
  if (this.mainSwiper?.nativeElement?.swiper) {
    this.mainSwiper.nativeElement.swiper.slideTo(index);
  }
  if (this.thumbSwiper?.nativeElement?.swiper) {
    this.thumbSwiper.nativeElement.swiper.slideTo(index);
  }

  // 2. Eğer Lightbox Açıksa Modal İçindekileri de Güncelle
  // setTimeout kullanıyoruz çünkü modal @if ile DOM'a yeni girmiş olabilir
  setTimeout(() => {
    if (this.lbmainSwiper?.nativeElement?.swiper) {
      this.lbmainSwiper.nativeElement.swiper.slideTo(index);
    }
    if (this.lbThumbSwiper?.nativeElement?.swiper) {
      this.lbThumbSwiper.nativeElement.swiper.slideTo(index);
    }
  });

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

// Lightbox ana slider değişince çalışan fonksiyon
onLbSlideChange(event: any) {
  const swiperInstance = event?.target?.swiper || event?.detail?.swiper;
  if (!swiperInstance) return;

  this.activeIndex = swiperInstance.activeIndex;

  if (this.lbThumbSwiper?.nativeElement?.swiper) {
    this.lbThumbSwiper.nativeElement.swiper.slideTo(this.activeIndex);
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

  lbNextSlide() {
    if (this.lbmainSwiper?.nativeElement?.swiper) {
      this.lbmainSwiper.nativeElement.swiper.slideNext();
      setTimeout(() => {
        this.onLbSlideChange({ detail: { swiper: this.lbmainSwiper.nativeElement.swiper } });
      }, 0);
    }
  }

  lbPrevSlide() {
    if (this.lbmainSwiper?.nativeElement?.swiper) {
      this.lbmainSwiper.nativeElement.swiper.slidePrev();
      setTimeout(() => {
        this.onLbSlideChange({ detail: { swiper: this.lbmainSwiper.nativeElement.swiper } });
      }, 0);
    }
  }

  lbNextThumb() {
    if (this.lbThumbSwiper?.nativeElement?.swiper) {
      this.lbThumbSwiper.nativeElement.swiper.slideNext();
    }
  }

  lbPrevThumb() {
    if (this.lbThumbSwiper?.nativeElement?.swiper) {
      this.lbThumbSwiper.nativeElement.swiper.slidePrev();
    }
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
  printPage() {
  const printContents = document.getElementById('printComponent')?.innerHTML;
  if (!printContents) return;

  // Yeni, bağımsız bir pencere açıyoruz (DOM etkilenmemesi için en temiz yol)
  const popupWindow = window.open('', '_blank', 'width=1100,height=900');

  if (popupWindow) {
    popupWindow.document.open();
    popupWindow.document.write(`
      <html>
        <head>
          <title>Araç Detay - Yazdır</title>
          <style>
            /* Senin CSS'lerinin Birebir Aynısı */
            body { padding: 20px; font-family: sans-serif; }
            ${this.getPrintStyles()}
          </style>
        </head>
        <body>
          <div class="print-wrapper">
            ${printContents}
          </div>
          <script>
            window.onload = () => {
              window.print();
              // window.close(); // Yazdırma bitince kapansın istersen açabilirsin
            };
          </script>
        </body>
      </html>
    `);
    popupWindow.document.close();
  }
}

// Paylaştığın CSS'lerin Birebir Kopyası
private getPrintStyles(): string {
  return `
    .header{ display: flex; justify-content: space-between; align-items: end; }
    .kapsayiciyazi{ margin-left: 30px; display: flex; flex-direction: column; align-items: center; margin-top: 9px;padding-top:9px; }
    .ilkiki{ display: flex; }
    .ust-yazi{ font-size: 18px; font-weight: bold;margin-block: 0px; }
    .alt-yazi{ font-size: 16px; font-weight: bold;margin-block: 0px; }
    .price{ font-size: 24px; font-weight: bold; color: #FF5100; display: flex; align-items: end;}
    .logo{ width: 200px; height: 47px;align-self: center; }
    .resimler { display: flex; justify-content: space-between; gap: 10px; margin-top: 40px; }
    .resimler img { width: 300px; height: 200px; object-fit: cover; }
    .specs-container { display: flex; justify-content: center; margin-top: 35px; font-family: sans-serif; }
    .spec-column { flex: 1; }
    .spec-item { display: flex; margin-bottom: 12px; font-size: 13px; gap: 40px; }
    .label { width: 100px; font-weight: 700; }
    .value { color: #665e5e; }
    .donanim-section { margin-top: 15px; padding-top: 20px; }
    .donanim-title { font-size: 20px; font-weight: bold; color: #333; margin-bottom: 20px; text-transform: uppercase; }
    .donanim-item { display: flex; align-items: center; font-size: 13px; color: #666; }
    .check-icon { color: #FF5100; margin-right: 8px; font-weight: bold; }
    .expertise-section { margin-top: 30px; padding-top: 20px; border-top: 2px solid #f4f4f4; }
    .expertise-container { display: flex; gap: 30px; align-items: center; }
    .expertise-left { flex: 1; }
    .expertise-legend { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee; margin-bottom: 15px; }
    .legend-item { display: flex; flex-direction: column; align-items: center; font-size: 11px; text-align: center; }
    .legend-item img { width: 24px; height: 24px; margin-bottom: 5px; }
    .expertise-list { width: 100%; }
    .list-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #333; }
    .expertise-right { flex: 2; display: flex; justify-content: center; align-items: center; }
    .car-diagram-wrapper { position: relative; width: 100%; max-width: 350px; }
    .car-main-img { width: 100%; height: auto; display: block; }
    .exp-icon { position: absolute; width: 25px; height: 25px; transform: translate(-50%, -50%); }
    
    /* Yazdırma anında d-none olan template'i görünür yap */
    .d-none { display: block !important; }
  `;
}
}