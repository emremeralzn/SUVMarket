import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

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
      }
]
}
]