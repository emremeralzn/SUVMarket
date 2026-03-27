import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suv-market',
  imports: [],
  templateUrl: './suv-market.html',
  styleUrl: './suv-market.scss',
})
export class SuvMarket {
  constructor(private route : ActivatedRoute){}
scrollTo(section: string) {

  const el = document.querySelector(`#${section}`);
  el?.scrollIntoView({ behavior: 'smooth' });
}
ngOnInit() {
  window.scrollTo(0, 0);
}

ngAfterViewInit() {
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      setTimeout(() => {
        const el = document.getElementById(fragment);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // DOM render beklemek için
    }
  });
  
  const sections = [
    { id: 'iadeSection', link: 'link-iade' },
    { id: 'ekspertizSection', link: 'link-ekspertiz' },
    { id: 'hijyenSection', link: 'link-hijyen' },
    { id: 'takasSection', link: 'link-takas' },
    { id: 'krediSection', link: 'link-kredi' },
  ];

  window.addEventListener('scroll', () => {
    let currentSectionId: string | null = null;

    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // daha geniş ve stabil aralık
      if (rect.top <= 200 && rect.bottom >= 200) {
        currentSectionId = sec.link;
      }
    });

    // en alta gelince son item aktif
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
      currentSectionId = 'link-kredi';
    }

    // önce hepsini temizle
    document.querySelectorAll('.title').forEach(item =>
      item.classList.remove('active')
    );

    // sonra aktif olanı ekle
    if (currentSectionId) {
      document.getElementById(currentSectionId)?.classList.add('active');
    }
  });
}


}
