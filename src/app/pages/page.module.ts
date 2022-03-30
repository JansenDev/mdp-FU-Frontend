import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ComponentModule } from '../components/component.module';
import { ResourceMapComponent } from './resource-map/resource-map.component';

@NgModule({
  declarations: [HomeComponent, ResourceMapComponent],
  imports: [CommonModule, SharedModule, ComponentModule],
  exports: [HomeComponent,ResourceMapComponent],
})
export class PageModule {}
