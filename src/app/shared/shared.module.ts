import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { SvgIconsModule } from './svg-icons/svg-icons.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const COMPONENTS = [ConfirmationDialogComponent];

const MODULES = [CommonModule, RouterModule, MaterialModule, SvgIconsModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
