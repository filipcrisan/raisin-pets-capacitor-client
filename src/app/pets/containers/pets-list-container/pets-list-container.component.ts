import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PetsFacades } from '../../facades/pets.facades';

@UntilDestroy()
@Component({
  selector: 'app-pets-list-container',
  templateUrl: './pets-list-container.component.html',
  styleUrls: ['./pets-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListContainerComponent implements OnInit {
  petsQuery = this.petsFacades.query.pets;

  constructor(private petsFacades: PetsFacades) {}

  ngOnInit(): void {
    this.petsFacades.getAllPets().pipe(untilDestroyed(this)).subscribe();
  }
}
