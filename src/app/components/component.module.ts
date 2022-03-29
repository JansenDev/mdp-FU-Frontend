import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TestComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [TestComponent, FooterComponent, HeaderComponent],
})
export class ComponentModule {}
