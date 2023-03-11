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
import { Species } from '../../models/species.model';
import { Size } from '../../models/size.model';

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
  @Output() back = new EventEmitter<void>();

  categoriesOptions = Const.TutorialCategoryOptions;

  tutorialsForm = new FormGroup({
    category: new FormControl(TutorialCategory.Hygiene),
  });

  Species = Species;
  Size = Size;

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

  onBack(): void {
    this.back.emit();
  }
}
