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
  mapDimensions = {
    width: 350,
    height: 350,
  };

  @ViewChild('googleMap') googleMap: GoogleMap;

  ngOnChanges(changes: NgChanges<ExerciseDetailsComponent>): void {
    if (changes.exercise?.currentValue) {
      const checkpoints = ([...this.exercise.checkpoints] ?? []).sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
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

    const bounds = this.getBounds();
    const zoom = this.getZoomLevel(bounds);

    this.mapOptions = {
      ...this.mapOptions,
      center: bounds.getCenter(),
      zoom,
    };
  }

  private getBounds(): google.maps.LatLngBounds {
    const bounds = new google.maps.LatLngBounds();

    this.vertices.forEach((marker: any) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });

    return bounds;
  }

  private getZoomLevel(bounds: google.maps.LatLngBounds): number {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    function latRad(lat: number) {
      const sin = Math.sin((lat * Math.PI) / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx: number, worldPx: number, fraction: number) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    const latZoom = zoom(
      this.mapDimensions.height,
      WORLD_DIM.height,
      latFraction
    );
    const lngZoom = zoom(
      this.mapDimensions.width,
      WORLD_DIM.width,
      lngFraction
    );

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }
}
