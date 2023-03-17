import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkpoint } from '../../models/checkpoint.model';
import { BehaviorSubject, tap } from 'rxjs';
import { GeolocationService } from '../../../shared/services/geolocation.service';
import { ExercisesFacades } from '../../facades/exercises.facades';
import { Position } from '@capacitor/geolocation';

@UntilDestroy()
@Component({
  selector: 'app-add-exercise-container',
  templateUrl: './add-exercise-container.component.html',
  styleUrls: ['./add-exercise-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExerciseContainerComponent {
  petId!: number;
  watchId: string = null;
  locations: Position[] = [];

  watchId$ = new BehaviorSubject<string>(null);

  constructor(
    private geolocationService: GeolocationService,
    private exercisesFacades: ExercisesFacades,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
  }

  async ngOnDestroy() {
    await this.stopWatchingLocation();
  }

  async onExerciseChanged(): Promise<void> {
    if (this.watchId) {
      await this.stopWatchingLocation();
      this.saveExercise();
      return;
    }

    await this.startWatchingLocation();
  }

  onBack(): void {
    this.router
      .navigate([`exercises/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  private async startWatchingLocation(): Promise<void> {
    const canUseLocation = await this.geolocationService.canUseLocation();

    if (!canUseLocation) {
      this.geolocationService.requestPermission().then(
        () => {
          this.geolocationService
            .watchLocation((location) => {
              this.locations = [...this.locations, location];
            })
            .then((watchId) => {
              this.watchId = watchId;
              this.watchId$.next(this.watchId);
            });
        },
        () => {}
      );

      return;
    }

    this.geolocationService
      .watchLocation((location) => {
        this.locations = [...this.locations, location];
      })
      .then((watchId) => {
        this.watchId = watchId;
        this.watchId$.next(this.watchId);
      });
  }

  private async stopWatchingLocation() {
    if (this.watchId) {
      await this.geolocationService.clearWatch(this.watchId);
      this.watchId = null;
      this.watchId$.next(null);
      console.log(this.geolocationService.getTotalDistance(this.locations));
    }
  }

  private saveExercise(): void {
    const checkpoints = this.locations.map((x) => {
      const checkpoint: Checkpoint = {
        latitude: x.coords.latitude,
        longitude: x.coords.longitude,
        speed: x.coords.speed,
        timestamp: new Date(x.timestamp),
      };
      return checkpoint;
    });

    const exercise = {
      petId: this.petId,
      totalDistance: this.geolocationService.getTotalDistance(this.locations),
      averageSpeed: this.geolocationService.getAverageSpeed(this.locations),
      checkpoints,
    };

    this.exercisesFacades
      .addExercise(exercise)
      .pipe(
        untilDestroyed(this),
        tap({
          next: () => {
            this.onBack();
          },
        })
      )
      .subscribe();
  }
}
