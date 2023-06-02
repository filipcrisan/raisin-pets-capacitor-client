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
  @Input() isGoogleMapsApiLoaded: boolean;

  @Output() back = new EventEmitter<void>();

  vertices: google.maps.LatLngLiteral[] = [];
  mapOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false,
    zoom: 16,
  };
  polylineOptions = {
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 10,
  };

  @ViewChild('googleMap') googleMap: GoogleMap;

  ngOnChanges(changes: NgChanges<ExerciseDetailsComponent>): void {
    if (changes.exercise?.currentValue) {
      const checkpoints = ([...this.exercise.checkpoints] ?? []).sort(
        (a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()
      );

      this.vertices = checkpoints.map((x) => ({
        lat: x.latitude,
        lng: x.longitude,
      }));
    }

    this.refreshMap();
  }

  onBack(): void {
    this.back.emit();
  }

  private refreshMap(): void {
    if (!this.isGoogleMapsApiLoaded) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();

    this.vertices.forEach((marker: any) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });

    this.googleMap?.fitBounds(bounds);

    this.mapOptions = {
      ...this.mapOptions,
      center: bounds.getCenter(),
    };
  }
}
