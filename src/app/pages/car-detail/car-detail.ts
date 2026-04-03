import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Card } from '../../components/card/card';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { PrintTemplate } from '../print-template/print-template';
import { Share } from '../../components/share/share';

register(); // Swiper web bileşenlerini kaydeder

@Component({
  selector: 'app-car-detail',
  standalone: true, // Eğer projen standalone ise kalsın, değilse silebilirsin
  imports: [Card, RouterLink, PrintTemplate,Share],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarDetail implements OnInit, AfterViewInit {
  constructor(private cd: ChangeDetectorRef) {}
  menuOpen = false;
  activeIndex = 0;
  

  // expertiseIcons: { [key: string]: string } = {
  //   boyali: `
  //   <circle id="boyali-ikon" data-name="boyali-ikon" cx="10" cy="10" r="10" fill="#ff4114"/>
  //   <path id="B" d="M58.425,4.346a2.064,2.064,0,0,1,1.128,1.981A2.109,2.109,0,0,1,58.7,8.172a3.782,3.782,0,0,1-2.24.607H53.164a.142.142,0,0,1-.105-.043.144.144,0,0,1-.043-.105V.261a.147.147,0,0,1,.043-.105.146.146,0,0,1,.105-.043h3.2a3.832,3.832,0,0,1,2.284.57,2.14,2.14,0,0,1,.774,1.845,1.83,1.83,0,0,1-.991,1.746q-.073.037,0,.074M55.07,1.932v1.56a.055.055,0,0,0,.063.062h1.226a1.227,1.227,0,0,0,.779-.217.738.738,0,0,0,.272-.613.77.77,0,0,0-.272-.631,1.2,1.2,0,0,0-.779-.223H55.133a.055.055,0,0,0-.063.062m2.154,4.847a.814.814,0,0,0,.273-.662.814.814,0,0,0-.266-.65,1.16,1.16,0,0,0-.774-.229H55.133a.055.055,0,0,0-.063.062V6.946a.055.055,0,0,0,.063.062h1.325a1.155,1.155,0,0,0,.767-.229" transform="translate(-46.284 5.555)" fill="#fff"/>
  //   `,
  //   orijinal: `
  //   <circle id="Ellipse_260" data-name="Ellipse 260" cx="10" cy="10" r="10" fill="#04de82"/>
  //   <path id="O" d="M71.457,9.548a3.25,3.25,0,0,1-1.329-1.273,3.752,3.752,0,0,1-.473-1.905V3.588a3.658,3.658,0,0,1,.473-1.871A3.266,3.266,0,0,1,71.457.452,4.177,4.177,0,0,1,73.438,0a4.221,4.221,0,0,1,1.989.452,3.259,3.259,0,0,1,1.336,1.266,3.658,3.658,0,0,1,.472,1.871V6.37a3.752,3.752,0,0,1-.472,1.905,3.244,3.244,0,0,1-1.336,1.273A4.221,4.221,0,0,1,73.438,10a4.177,4.177,0,0,1-1.981-.452m3.059-1.954a1.607,1.607,0,0,0,.41-1.154V3.561a1.612,1.612,0,0,0-.41-1.147,1.407,1.407,0,0,0-1.078-.438,1.388,1.388,0,0,0-1.063.438,1.608,1.608,0,0,0-.41,1.147V6.439a1.6,1.6,0,0,0,.41,1.154,1.4,1.4,0,0,0,1.063.431,1.417,1.417,0,0,0,1.078-.431" transform="translate(-63.445 5)" fill="#fff"/>
  //   `,
  //   degismis: `
  //   <circle id="Ellipse_257" data-name="Ellipse 257" cx="10" cy="10" r="10" fill="#7769fd"/>
  //   <path id="D" d="M82.155,8.4a.137.137,0,0,1-.042-.1V.255a.137.137,0,0,1,.042-.1.137.137,0,0,1,.1-.042h3.036a3.966,3.966,0,0,1,1.643.321,2.528,2.528,0,0,1,1.107.917,2.428,2.428,0,0,1,.393,1.369V5.838a2.428,2.428,0,0,1-.393,1.369,2.528,2.528,0,0,1-1.107.917,3.966,3.966,0,0,1-1.643.321H82.256a.137.137,0,0,1-.1-.042m1.994-1.649h1.226a.984.984,0,0,0,.775-.339,1.382,1.382,0,0,0,.309-.911V3.052a1.315,1.315,0,0,0-.3-.911,1.012,1.012,0,0,0-.792-.339H84.149a.052.052,0,0,0-.06.06V6.7a.052.052,0,0,0,.06.06" transform="translate(-74.921 5.354)" fill="#fff"/>
  //   `,
  //   lokalBoyali: `
  //   <circle id="Ellipse_258" data-name="Ellipse 258" cx="10" cy="10" r="10" fill="#ffbc24"/>
  //   <path id="L" d="M-14971.7-704.667a.284.284,0,0,1-.211-.09.279.279,0,0,1-.084-.208V-712.7a.29.29,0,0,1,.084-.211.292.292,0,0,1,.211-.087h1.626a.294.294,0,0,1,.211.087.293.293,0,0,1,.087.211v6.09h3.55a.286.286,0,0,1,.21.084.29.29,0,0,1,.088.211v1.352a.29.29,0,0,1-.088.211.289.289,0,0,1-.21.087Z" transform="translate(14979.678 718.174)" fill="#fff"/>
  //   `
  // };

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
            1800: { slidesPerView: 5 },
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
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-10_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-7_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-11_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-7_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-10_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-11_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-10_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-7_buyuk.jpg',
    '/Suzuki-Vitara-MiLDHYBRiD1.4129GLELEGANCE4x2ATTEKRENKMK-0-11_buyuk.jpg',
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
    this.menuOpen = false;
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
        document.querySelectorAll('.title').forEach((item) => item.classList.remove('active'));
        return;
      }

      let activeFound = false;
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        const link = document.getElementById(sec.link);
        if (!el || !link) return;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          document.querySelectorAll('.title').forEach((item) => item.classList.remove('active'));
          link.classList.add('active');
          activeFound = true;
        }
      });

      if (!activeFound) {
        document.querySelectorAll('.title').forEach((item) => item.classList.remove('active'));
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        document.querySelectorAll('.title').forEach((item) => item.classList.remove('active'));
        document.getElementById('link-benzer')?.classList.add('active');
      }
    });
  }
  requireLogin() {
    alert('Favorilerinize ekleyebilmeniz için, lütfen üye girişi yapınız!');
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
