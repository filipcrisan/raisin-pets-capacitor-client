import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsComponent implements AfterViewInit {
  @Input() exercise: Exercise;
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() back = new EventEmitter<void>();

  center: google.maps.LatLngLiteral;
  vertices: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    fullscreenControl: false,
  };

  @ViewChild('googleMap') googleMap: GoogleMap;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.vertices = this.exercise.checkpoints?.map((x) => ({
      lat: x.latitude,
      lng: x.longitude,
    }));

    this.processVertices();
  }

  onBack(): void {
    this.back.emit();
  }

  private processVertices(): void {
    const bounds = new google.maps.LatLngBounds();

    this.vertices.forEach((marker: any) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });

    this.googleMap.fitBounds(bounds);

    this.center = {
      lat: bounds.getCenter().lat(),
      lng: bounds.getCenter().lng(),
    };

    this.cdr.detectChanges();
  }
}
