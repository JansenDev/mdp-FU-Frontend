import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestpPipe } from './pipes/testp.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { StatePipe } from './pipes/state.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestpPipe, StatePipe],
  imports: [CommonModule],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es',
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    },
    DatePipe

  ],
  exports: [
    TestpPipe,
    StatePipe,
    MatSliderModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMomentDateModule,
    MatDividerModule,
    MaterialFileInputModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
