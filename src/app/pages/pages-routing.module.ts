import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveHiringRequestComponent } from './approve-hiring-request/approve-hiring-request.component';
import { ContractImboxComponent } from './contract-imbox/contract-imbox.component';
import { HiringRequestComponent } from './hiring-request/hiring-request.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResourceMapComponent } from './resource-map/resource-map.component';
import { ServicesConfigurationComponent } from './services-configuration/services-configuration.component';

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
    path: 'services-configuration',
    component: ServicesConfigurationComponent,
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
    path: 'contract-imbox/approveHiringRequestComponent/:idHiringRequest',
    component: ApproveHiringRequestComponent,
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
