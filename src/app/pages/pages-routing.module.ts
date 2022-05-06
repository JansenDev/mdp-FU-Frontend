import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { ApproveHiringRequestComponent } from './approve-hiring-request/approve-hiring-request.component';
import { ContractImboxComponent } from './contract-imbox/contract-imbox.component';
import { CreatePeriodComponent } from './create-period/create-period.component';
import { HiringRequestComponent } from './hiring-request/hiring-request.component';
import { HomeComponent } from './home/home.component';
import { InitPageComponent } from './init-page/init-page.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PeriodAdministrationComponent } from './period-administration/period-administration.component';
import { ResourceMapComponent } from './resource-map/resource-map.component';
import { ServiceMapComponent } from './service-map/service-map.component';
import { ServicesConfigurationComponent } from './services-configuration/services-configuration.component';
import { UpdatePeriodComponent } from './update-period/update-period.component';

const routes: Routes = [
  {
    path: '',
    component: InitPageComponent,

    // canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'resources',
        component: ResourceMapComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'service-map',
        component: ServiceMapComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'services-configuration',
        component: ServicesConfigurationComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'services-configuration/:cod_servicio',
        component: ServicesConfigurationComponent,
        // canActivate: [AuthorizationGuard],
      },
      {
        path: 'hiring-request',
        component: HiringRequestComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'contract-imbox',
        component: ContractImboxComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'contract-imbox/approveHiringRequestComponent/:idHiringRequest',
        component: ApproveHiringRequestComponent,
        // canActivate: [AuthorizationGuard],
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'period-administration',
    component: PeriodAdministrationComponent,
  },
  {
    path: 'create-period',
    component: CreatePeriodComponent,
  },
  {
    path: 'update-period',
    component: UpdatePeriodComponent,
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
