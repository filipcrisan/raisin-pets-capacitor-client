import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PetsFacades } from '../../facades/pets.facades';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialCategory } from '../../models/tutorial-category.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-tutorials-list-container',
  templateUrl: './tutorials-list-container.component.html',
  styleUrls: ['./tutorials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsListContainerComponent implements OnDestroy {
  tutorialsQuery = this.petsFacades.query.tutorials;

  petId!: number;

  constructor(
    private petsFacades: PetsFacades,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
  }

  onGetTutorials(category: TutorialCategory): void {
    this.petsFacades
      .getTutorialsByCategory(this.petId, category)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.petsFacades.clearTutorials();
  }

  onBack(): void {
    this.router
      .navigate([`menu/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }
}