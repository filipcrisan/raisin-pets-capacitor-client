import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFacades } from '../../facades/shared.facades';

@Component({
  selector: 'app-pet-menu-container',
  templateUrl: './pet-menu-container.component.html',
  styleUrls: ['./pet-menu-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetMenuContainerComponent implements AfterViewInit {
  petId!: number;

  constructor(
    private sharedFacades: SharedFacades,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
  }

  ngAfterViewInit(): void {
    console.log('Menu: ', performance.now());
  }

  onGoToTutorials(): void {
    console.log('Navigate to tutorials: ', performance.now());
    this.router
      .navigate([`tutorials/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onGoToExerciseTracking(): void {
    console.log('Navigate to exercises: ', performance.now());
    this.router
      .navigate([`exercises/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onGoToFoodReminders(): void {
    console.log('Navigate to reminders: ', performance.now());
    this.router
      .navigate([`reminders/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onBack(): void {
    this.router
      .navigate([`list`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }
}
