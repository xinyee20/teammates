import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SectionTabModel } from '../../pages-instructor/instructor-session-result-page/instructor-session-result-page.component';
import { InstructorSessionResultSectionType } from '../../pages-instructor/instructor-session-result-page/instructor-session-result-section-type.enum';
import { InstructorSessionResultViewType } from '../../pages-instructor/instructor-session-result-page/instructor-session-result-view-type.enum';

import {
  FeedbackSession,
  FeedbackSessionPublishStatus,
  FeedbackSessionSubmissionStatus,
  ResponseVisibleSetting,
  SessionVisibleSetting,
} from '../../../types/api-output';

/**
 * Displaying the view results panel.
 */
@Component({
  selector: 'tm-view-results-panel',
  templateUrl: './view-results-panel.component.html',
  styleUrls: ['./view-results-panel.component.scss'],
})
export class ViewResultsPanelComponent implements OnInit {

  // enum
  InstructorSessionResultViewType: typeof InstructorSessionResultViewType = InstructorSessionResultViewType;

  @Input()
  session: FeedbackSession = {
    courseId: '',
    timeZone: '',
    feedbackSessionName: '',
    instructions: '',
    submissionStartTimestamp: 0,
    submissionEndTimestamp: 0,
    gracePeriod: 0,
    sessionVisibleSetting: SessionVisibleSetting.AT_OPEN,
    responseVisibleSetting: ResponseVisibleSetting.AT_VISIBLE,
    submissionStatus: FeedbackSessionSubmissionStatus.OPEN,
    publishStatus: FeedbackSessionPublishStatus.NOT_PUBLISHED,
    isClosingEmailEnabled: true,
    isPublishedEmailEnabled: true,
    createdAtTimestamp: 0,
  };

  @Input()
  viewTooltipText: string = 'View results in different formats';

  @Input()
  viewType: string = InstructorSessionResultViewType.QUESTION;

  @Input()
  instructorSessionResultSectionTypes: InstructorSessionResultSectionType[] = [];

  @Input()
  section: string = '';

  @Input()
  sectionsModel: Record<string, SectionTabModel> = {};

  @Input()
  sectionType: InstructorSessionResultSectionType = InstructorSessionResultSectionType.EITHER;

  @Input()
  groupByTeam: boolean = true;

  @Input()
  showStatistics: boolean = true;

  @Input()
  indicateMissingResponses: boolean = true;

  @Output()
  viewTypeChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  viewTooltipTextChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  collapseAllTabsEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  collapseAllTabsHandler(): void {
    this.collapseAllTabsEvent.emit();
  }

  /**
   * Handles view type changes.
   */
  handleViewTypeChange(newViewType: InstructorSessionResultViewType): void {
    if (this.viewType === newViewType) {
      // do nothing
      return;
    }
    this.viewTypeChange.emit(newViewType);

    // change tooltip text based on currently selected view type
    switch (this.viewType) {
      case InstructorSessionResultViewType.QUESTION:
        this.viewTooltipText = 'Group responses by recipient, then by giver, and then by question';
        this.viewTooltipTextChange.emit(this.viewTooltipText);
        break;
      case InstructorSessionResultViewType.GQR:
        this.viewTooltipText = 'Group responses by giver, then by question, and then by recipient';
        this.viewTooltipTextChange.emit(this.viewTooltipText);
        break;
      case InstructorSessionResultViewType.RQG:
        this.viewTooltipText = 'Group responses by recipient, then by question, and then by giver';
        this.viewTooltipTextChange.emit(this.viewTooltipText);
        break;
      default:
        this.viewTooltipText = 'View results in different formats';
        this.viewTooltipTextChange.emit(this.viewTooltipText);
    }

    // the expand all will be reset if the view type changed
    this.collapseAllTabsHandler();
  }

}
