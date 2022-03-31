import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestpPipe } from './pipes/testp.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TestpPipe],
  imports: [CommonModule, MatSliderModule, MatCardModule, MatButtonModule, MatTabsModule, MatTableModule],
  exports: [TestpPipe, MatSliderModule, MatCardModule, MatButtonModule, MatTabsModule, MatTableModule],
})
export class SharedModule {}
