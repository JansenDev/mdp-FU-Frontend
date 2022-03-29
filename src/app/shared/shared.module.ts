import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestpPipe } from './pipes/testp.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TestpPipe],
  imports: [CommonModule, MatSliderModule, MatCardModule],
  exports: [TestpPipe, MatSliderModule, MatCardModule],
})
export class SharedModule {}
