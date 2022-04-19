import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// modules
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/component.module';
import { PagesRoutingModule } from './pages-routing.module';
// components
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResourceMapComponent } from './resource-map/resource-map.component';
import { ServicesConfigurationComponent } from './services-configuration/services-configuration.component';

@NgModule({
  declarations: [HomeComponent, ResourceMapComponent, ServicesConfigurationComponent, NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule,
    PagesRoutingModule,

    ReactiveFormsModule,
  ],
  exports: [HomeComponent, ResourceMapComponent, ServicesConfigurationComponent, PagesRoutingModule],
})
export class PageModule {}
