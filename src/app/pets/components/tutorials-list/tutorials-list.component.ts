import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Const } from '../../models/constants.model';
import { FormControl, FormGroup } from '@angular/forms';
import { TutorialCategory } from '../../models/tutorial-category.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsListComponent implements OnInit {
  @Input() tutorials: Tutorial[];
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() getTutorials = new EventEmitter<TutorialCategory>();

  categoriesOptions = Const.TutorialCategoryOptions;

  tutorialsForm = new FormGroup({
    category: new FormControl(TutorialCategory.Hygiene),
  });

  ngOnInit() {
    this.getTutorials.emit(this.tutorialsForm.controls.category.value);

    this.tutorialsForm.controls.category.valueChanges
      .pipe(
        untilDestroyed(this),
        filter((x) => !!x),
        distinctUntilChanged()
      )
      .subscribe((x) => {
        this.getTutorials.emit(x);
      });
  }
}
