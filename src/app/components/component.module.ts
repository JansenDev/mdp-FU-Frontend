import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules
import { SharedModule } from '../shared/shared.module';
// components
import { TestComponent } from './test/test.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { ResourceMapDetailComponent } from './resource-map-detail/resource-map-detail.component';
import { ServiceDataComponent } from './service-data/service-data.component';

@NgModule({
  declarations: [
    TestComponent,
    FooterComponent,
    HeaderComponent,
    SummaryComponent,
    ResourceMapDetailComponent,
    ServiceDataComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    TestComponent,
    FooterComponent,
    HeaderComponent,
    SummaryComponent,
    ResourceMapDetailComponent,
    ServiceDataComponent,
    RouterModule
  ],
})
export class ComponentModule {}
