import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PetsFacades } from '../../facades/pets.facades';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { distinctUntilChanged, filter, of, switchMap } from 'rxjs';

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
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.petsQuery.loaded$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter((loaded) => !loaded),
        switchMap(() => this.petsFacades.getAllPets())
      )
      .subscribe();
  }

  onRefreshList(): void {
    this.petsFacades.getAllPets().pipe(untilDestroyed(this)).subscribe();
  }

  onAddPet(): void {
    this.router
      .navigate(['add'], { relativeTo: this.activatedRoute.parent })
      .then();
  }

  onEditDetails(id: number): void {
    this.router
      .navigate([`edit/${id}`], { relativeTo: this.activatedRoute.parent })
      .then();
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete pet',
        message: 'Are you sure you want to delete this pet?',
        buttonLabel: 'Delete',
      },
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((x) => !!x),
        switchMap(() => this.petsFacades.deletePet(id))
      )
      .subscribe();
  }

  onSelectPet(id: number): void {
    this.router
      .navigate([`menu/${id}`], { relativeTo: this.activatedRoute.parent })
      .then();
  }
}
