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
          description:
            'Suv Market İkinci El güvenilir ikinci el araç alım ve satım hizmeti sunar. Ekspertizli, garantili ve kaliteli araçları güvenle keşfedin.',
        },
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'suv-market',
        data: {
          title: 'Suv Market',
          description: 'Suv Market hakkında detaylı bilgiler ve hizmetlerimiz.',
        },
        loadComponent: () => import('./pages/suv-market/suv-market').then((m) => m.SuvMarket),
      },
      {
        path: 'iletisim',
        data: {
          title: 'İletişim | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'subelerimiz',
        data: {
          title: 'İletişim | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () => import('./pages/our-stores/our-stores').then((m) => m.OurStores),
      },
      {
        path: 'arac-detay',
        data: {
          title: 'Araç Detay | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () => import('./pages/car-detail/car-detail').then((m) => m.CarDetail),
      },
      {
        path: 'sizi-arayalim',
        data: {
          title: 'Sizi Arayalım | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () =>
          import('./pages/request-a-call/request-a-call').then((m) => m.RequestACall),
      },
      {
        path: 'aracimi-takasa-vermek-istiyorum',
        data: {
          title: 'Aracimi-Takasa-Vermek-İstiyorum | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () =>
          import('./pages/trade-in-form/trade-in-form').then((m) => m.TradeInForm),
      },
      {
        path: 'uye-ol',
        data: {
          title: 'Üye Ol | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUp),
      },
      {
        path: 'ikinci-el',
        data: {
          title: '2. El SUV Modelleri | Suv Market',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () => import('./pages/car-list/car-list').then((m) => m.CarList),
      },
      {
        path: 'sifremi-unuttum',
        data: {
          title: 'Şifremi Unuttum',
          description: 'Suv Market hakkında bize ulaşın.',
        },
        loadComponent: () =>
          import('./pages/forget-password/forget-password').then((m) => m.ForgetPassword),
      },
      {
        path: 'aracimin-degerini-bul', // diğer tüm eşleşmeyen URL’ler için
        data: {
          title: 'Sayfa Bulunamadı | Suv Market',
          description: 'Aradığınız sayfa bulunamadı.',
        },
        loadComponent: () => import('./pages/car-value-found/car-value-found').then((m) => m.CarValueFound),
      },
      {
        path: '**', // diğer tüm eşleşmeyen URL’ler için
        data: {
          title: 'Sayfa Bulunamadı | Suv Market',
          description: 'Aradığınız sayfa bulunamadı.',
        },
        loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
];
