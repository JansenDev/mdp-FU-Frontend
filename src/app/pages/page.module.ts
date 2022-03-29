import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ComponentModule } from '../components/component.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, ComponentModule],
  exports: [HomeComponent],
})
export class PageModule {}
