import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PetsFacades } from '../../facades/pets.facades';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-pets-list-container',
  templateUrl: './pets-list-container.component.html',
  styleUrls: ['./pets-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListContainerComponent implements OnInit {
  petsQuery = this.petsFacades.query.pets;

  constructor(
    private petsFacades: PetsFacades,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.petsFacades.getAllPets().pipe(untilDestroyed(this)).subscribe();
  }

  onAddPet(): void {
    this.router
      .navigate(['add'], { relativeTo: this.activatedRoute.parent })
      .then();
  }
}
