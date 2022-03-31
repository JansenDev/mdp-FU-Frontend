import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { ResourceMapDetailComponent } from './resource-map-detail/resource-map-detail.component';

@NgModule({
  declarations: [
    TestComponent,
    FooterComponent,
    HeaderComponent,
    SummaryComponent,
    ResourceMapDetailComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [TestComponent, FooterComponent, HeaderComponent, SummaryComponent,ResourceMapDetailComponent],
})
export class ComponentModule {}
