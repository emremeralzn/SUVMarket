import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  imports: [Card,RouterLink],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.scss',
})
export class CarDetail {
  activeIndex = 0;
  carImages: string[] = [
  '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
  '/bmw.jpg',
  '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
  '/bmw.jpg',
  '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
  '/bmw.jpg'
];
prevSlide() {
  this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.carImages.length - 1;
}

nextSlide() {
  this.activeIndex = (this.activeIndex < this.carImages.length - 1) ? this.activeIndex + 1 : 0;
}
prevThumb() {
  if(this.activeIndex > 0) {
    this.activeIndex--;
  } else {
    this.activeIndex = 5; // Thumbnail sayısına göre
  }
}

nextThumb() {
  if(this.activeIndex < 5) {
    this.activeIndex++;
  } else {
    this.activeIndex = 0;
  }
}
thumbnails = [
  '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
  '/bmw.jpg',
  '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
  '/bmw.jpg',
  '/MG-HS-1.5T-GDiLuxury-0-8_orta.jpg',
  '/bmw.jpg'
];

  setIndex(index: number) {
    this.activeIndex = index;
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
  const sections = [
    { id: 'teknikSection', link: 'link-teknik' },
    { id: 'donanimSection', link: 'link-donanım' },
    { id: 'ekspertizSection', link: 'link-ekspertiz' },
    { id: 'saticiSection', link: 'link-satici' },
    { id: 'benzerSection', link: 'link-benzer' },
  ];

  window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  // 🔥 EN ÜSTTEYKEN HİÇBİRİNİ AKTİF YAPMA
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
