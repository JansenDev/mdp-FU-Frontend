import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestpPipe } from './pipes/testp.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TestpPipe],
  imports: [CommonModule, MatSliderModule, MatCardModule, MatTableModule],
  exports: [
    TestpPipe,
    MatSliderModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
})
export class SharedModule {}
