import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/component.module';
import { PagesRoutingModule } from './pages-routing.module';
// components
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResourceMapComponent } from './resource-map/resource-map.component';
import { ServicesConfigurationComponent } from './services-configuration/services-configuration.component';
import { HiringRequestComponent } from './hiring-request/hiring-request.component';
import { ContractImboxComponent } from './contract-imbox/contract-imbox.component';
import { ApproveHiringRequestComponent } from './approve-hiring-request/approve-hiring-request.component';
import { ServiceMapComponent } from './service-map/service-map.component';
import { LoginComponent } from './login/login.component';
import { PeriodAdministrationComponent } from './period-administration/period-administration.component';
import { CreatePeriodComponent } from './create-period/create-period.component';
import { UpdatePeriodComponent } from './update-period/update-period.component';

@NgModule({
  declarations: [
    HomeComponent,
    ResourceMapComponent,
    NotFoundComponent,
    HiringRequestComponent,
    ContractImboxComponent,
    ServicesConfigurationComponent,
    ApproveHiringRequestComponent,
    ServiceMapComponent,
    LoginComponent,
    PeriodAdministrationComponent,
    CreatePeriodComponent,
    UpdatePeriodComponent
  ],

  imports: [CommonModule, SharedModule, ComponentModule, PagesRoutingModule],
  exports: [
    HomeComponent,
    ResourceMapComponent,
    PagesRoutingModule,
    HiringRequestComponent,
    ServicesConfigurationComponent,
  ],
})
export class PageModule {}
