import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pet-menu-container',
  templateUrl: './pet-menu-container.component.html',
  styleUrls: ['./pet-menu-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetMenuContainerComponent {
  petId!: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
  }

  onGoToTutorials(): void {
    this.router
      .navigate([`tutorials/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onGoToExerciseTracking(): void {
    this.router
      .navigate([`exercises/${this.petId}`], {
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
