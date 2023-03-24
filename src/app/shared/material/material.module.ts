import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

const MODULES = [
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatCardModule,
  MatProgressBarModule,
  MatSortModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatChipsModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatBadgeModule,
  DragDropModule,
  MatExpansionModule,
  MatSlideToggleModule,
  NgxMatTimepickerModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [MatNativeDateModule],
})
export class MaterialModule {}
