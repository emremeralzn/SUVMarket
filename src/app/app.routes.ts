import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'suv-market',
        loadComponent: () => import('./pages/suv-market/suv-market').then((m) => m.SuvMarket),
      },
      {
        path: 'iletisim',
        loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'subelerimiz',
        loadComponent: () => import('./pages/our-stores/our-stores').then((m) => m.OurStores),
      },
      {
        path: 'arac-detay',
        loadComponent: () => import('./pages/car-detail/car-detail').then((m) => m.CarDetail),
      },
      {
        path: 'sizi-arayalim',
        loadComponent: () => import('./pages/request-a-call/request-a-call').then((m) => m.RequestACall),
      },
      {
        path: 'aracimi-takasa-vermek-istiyorum',
        loadComponent: () => import('./pages/trade-in-form/trade-in-form').then((m) => m.TradeInForm),
      },
      {
        path: 'uye-ol',
        loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUp),
      },
      {
        path: 'ikinci-el',
        loadComponent: () => import('./pages/car-list/car-list').then((m) => m.CarList),
      },
      {
        path: 'sifremi-unuttum',
        loadComponent: () => import('./pages/forget-password/forget-password').then((m) => m.ForgetPassword),
      },
      {
        path: 'aracimin-degerini-bul',
        loadComponent: () => import('./pages/car-value-found/car-value-found').then((m) => m.CarValueFound),
      },
       {
        path: 'kvkk',
        loadComponent: () => import('./pages/kvkk/kvkk').then((m) => m.Kvkk),
      },
       {
        path: '**', // diğer tüm eşleşmeyen URL’ler için
        loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
];
