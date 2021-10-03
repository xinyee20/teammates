import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestionResponsePanelComponent } from './question-response-panel.component';

/**
 * X module.
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    QuestionResponsePanelComponent,
  ],
  exports: [
    QuestionResponsePanelComponent,
  ],
})
export class QuestionResponsePanelModule { }
