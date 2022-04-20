import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractImboxComponent } from './contract-imbox/contract-imbox.component';
import { HiringRequestComponent } from './hiring-request/hiring-request.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResourceMapComponent } from './resource-map/resource-map.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'resources',
    component: ResourceMapComponent,
  },
  {
    path: 'hiring-request',
    component: HiringRequestComponent,
  },
  {
    path: 'contract-imbox',
    component: ContractImboxComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
