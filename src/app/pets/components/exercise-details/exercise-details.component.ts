import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgChanges } from '../../../shared/models/simple-changes-typed';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsComponent implements OnChanges {
  @Input() exercise: Exercise;
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() back = new EventEmitter<void>();

  vertices: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false,
  };

  @ViewChild('googleMap') googleMap: GoogleMap;

  ngOnChanges(changes: NgChanges<ExerciseDetailsComponent>): void {
    if (changes.exercise?.currentValue) {
      this.vertices = this.exercise.checkpoints?.map((x) => ({
        lat: x.latitude,
        lng: x.longitude,
      }));

      this.onVerticesChanges();
    }
  }

  onBack(): void {
    this.back.emit();
  }

  private onVerticesChanges(): void {
    const bounds = new google.maps.LatLngBounds();

    this.vertices.forEach((marker: any) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });

    this.googleMap?.fitBounds(bounds);

    this.options = {
      ...this.options,
      center: {
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      },
    };
  }
}
