import { Component, Input, OnInit } from '@angular/core';
import {
  Instructor,
  Student,
} from '../../../types/api-output';

@Component({
  selector: 'tm-preview-session-panel',
  templateUrl: './preview-session-panel.component.html',
  styleUrls: ['./preview-session-panel.component.scss']
})
export class PreviewSessionPanelComponent implements OnInit {

  @Input()
  emailOfStudentToPreview: string = '';
  
  @Input()
  studentsOfCourse: Student[] = [];
  
  @Input()
  instructorsCanBePreviewedAs: Instructor[] = [];
   
  @Input()
  emailOfInstructorToPreview: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
