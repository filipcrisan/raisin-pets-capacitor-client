import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PetsFacades } from '../../facades/pets.facades';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pet } from '../../models/pet.model';
import { CameraService } from '../../../shared/services/camera.service';

@UntilDestroy()
@Component({
  selector: 'app-add-pet-container',
  templateUrl: './add-pet-container.component.html',
  styleUrls: ['./add-pet-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetContainerComponent {
  petsQuery = this.petsFacades.query;

  avatarInBase64$ = new BehaviorSubject<string>(null);

  constructor(
    private petsFacades: PetsFacades,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cameraService: CameraService
  ) {}

  onAddPet(pet: Pet): void {
    this.petsFacades
      .addPet(pet)
      .pipe(
        untilDestroyed(this),
        tap({
          next: () => {
            this.router
              .navigate(['list'], {
                relativeTo: this.activatedRoute.parent,
              })
              .then();
          },
        })
      )
      .subscribe();
  }

  onCancel(): void {
    this.router
      .navigate(['list'], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  async onTakePicture(): Promise<void> {
    const canUseCamera = await this.cameraService.canUseCamera();

    if (!canUseCamera) {
      this.cameraService.requestPermission().then(
        async () => {
          await this.takePicture();
        },
        () => {}
      );

      return;
    }

    await this.takePicture();
  }

  private async takePicture(): Promise<void> {
    const image = await this.cameraService.takePicture();

    this.avatarInBase64$.next(
      this.cameraService.getImageUrl(image.base64String)
    );
  }
}
