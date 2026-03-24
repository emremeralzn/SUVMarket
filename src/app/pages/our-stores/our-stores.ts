import { Component } from '@angular/core';

@Component({
  selector: 'app-our-stores',
  imports: [],
  templateUrl: './our-stores.html',
  styleUrl: './our-stores.scss',
})
export class OurStores {
scrollTo(section: string) {

  const el = document.querySelector(`#${section}`);
  el?.scrollIntoView({ behavior: 'smooth' });
}
ngOnInit() {
  window.scrollTo(0, 0);
}
ngAfterViewInit() {
  const sections = [
    { id: 'technicalSection', link: 'link-teknik' },
    { id: 'donanimSection', link: 'link-donanim' },
    { id: 'ekspertizSection', link: 'link-ekspertiz' },
    { id: 'yetkiliSaticiSection', link: 'link-yetkili' },
    { id: 'benzerOtoSection', link: 'link-benzer' },
  ];

  window.addEventListener('scroll', () => {
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      const link = document.getElementById(sec.link);

      if (!el || !link) return;

      const rect = el.getBoundingClientRect();

      if (rect.top <= 200 && rect.bottom >= 150 ) {
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
