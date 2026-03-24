import { Component } from '@angular/core';

@Component({
  selector: 'app-suv-market',
  imports: [],
  templateUrl: './suv-market.html',
  styleUrl: './suv-market.scss',
})
export class SuvMarket {
scrollTo(section: string) {

  const el = document.querySelector(`#${section}`);
  el?.scrollIntoView({ behavior: 'smooth' });
}

ngAfterViewInit() {
  const sections = [
    { id: 'iadeSection', link: 'link-iade' },
    { id: 'ekspertizSection', link: 'link-ekspertiz' },
    { id: 'hijyenSection', link: 'link-hijyen' },
    { id: 'takasSection', link: 'link-takas' },
    { id: 'krediSection', link: 'link-kredi' },
  ];

  window.addEventListener('scroll', () => {
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      const link = document.getElementById(sec.link);

      if (!el || !link) return;

      const rect = el.getBoundingClientRect();

      if (rect.top <= 50 && rect.bottom >= 150 ) {
        // önce hepsinden active kaldır
        document.querySelectorAll('.title').forEach(item =>
          item.classList.remove('active')
        );

        // sonra aktif olanı ekle
        link.classList.add('active');
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            document.querySelectorAll('.title').forEach(item =>
              item.classList.remove('active')
            );
            document.getElementById('link-kredi')?.classList.add('active');
          }
    }
  );
  });
}


}
