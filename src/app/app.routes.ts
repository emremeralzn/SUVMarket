import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { SuvMarket } from './pages/suv-market/suv-market';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        data: {
          title: 'Anasayfa | Suv Market',
          description: 'Suv Market İkinci El güvenilir ikinci el araç alım ve satım hizmeti sunar. Ekspertizli, garantili ve kaliteli araçları güvenle keşfedin.'
        },
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
      },
      {
        path: 'suv-market', 
        data: {
          title: 'Suv Market',
          description: 'Suv Market hakkında detaylı bilgiler ve hizmetlerimiz.'
        },
        loadComponent: () => import('./pages/suv-market/suv-market').then(m => m.SuvMarket),
      },
      {
        path: 'iletisim', 
        data: {
          title: 'İletişim | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.'
        },
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
      },
      {
        path: 'subelerimiz', 
        data: {
          title: 'İletişim | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.'
        },
        loadComponent: () => import('./pages/our-stores/our-stores').then(m => m.OurStores),
      },
      {
        path: 'arac-detay', 
        data: {
          title: 'Araç Detay | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.'
        },
        loadComponent: () => import('./pages/car-detail/car-detail').then(m => m.CarDetail),
      }
    ]
  }
];