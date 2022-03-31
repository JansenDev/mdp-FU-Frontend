import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ComponentModule } from '../components/component.module';
import { ResourceMapComponent } from './resource-map/resource-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResourceMapDetailComponent } from '../components/resource-map-detail/resource-map-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    ResourceMapComponent,
    ResourceMapDetailComponent,
  ],
  imports: [CommonModule, SharedModule, ComponentModule, ReactiveFormsModule],
  exports: [HomeComponent, ResourceMapComponent, ResourceMapDetailComponent],
})
export class PageModule {}
