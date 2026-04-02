import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kvkk',
  imports: [],
  templateUrl: './kvkk.html',
  styleUrl: './kvkk.scss',
})
export class Kvkk {
 constructor(private route : ActivatedRoute){}
scrollTo(section: string) {

  const el = document.querySelector(`#${section}`);
  el?.scrollIntoView({ behavior: 'smooth' });
}

ngAfterViewInit() {
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
        const el = document.getElementById(fragment);
        el?.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  const sections = [
    { id: 'kvkk1', link: 'link-yasalUyari' },
    { id: 'kvkk2', link: 'link-cerezPolitikasi' },
    { id: 'kvkk3', link: 'link-kisiselVerilerinKorunmasi' },
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
