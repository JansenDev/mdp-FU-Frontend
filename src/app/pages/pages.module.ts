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
import { HiringRequestComponent } from './hiring-request/hiring-request.component';
import { ContractImboxComponent } from './contract-imbox/contract-imbox.component';

@NgModule({
  declarations: [
    HomeComponent,
    ResourceMapComponent,
    NotFoundComponent,
    HiringRequestComponent,
    ContractImboxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule,
    PagesRoutingModule,
  ],
  exports: [
    HomeComponent,
    ResourceMapComponent,
    PagesRoutingModule,
    HiringRequestComponent
  ],
})
export class PageModule {}
