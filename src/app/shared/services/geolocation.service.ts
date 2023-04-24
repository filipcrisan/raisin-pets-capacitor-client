import { Injectable } from '@angular/core';
import {
  Geolocation,
  Position,
  WatchPositionCallback,
} from '@capacitor/geolocation';
import { PermissionStatus } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  requestPermission(): Promise<PermissionStatus> {
    return Geolocation.requestPermissions();
  }

  canUseLocation(): Promise<boolean> {
    return Geolocation.checkPermissions().then((x) => {
      return x.location === 'granted';
    });
  }

  watchLocation(successCallback: WatchPositionCallback): Promise<string> {
    return Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        maximumAge: 0.4,
      },
      successCallback
    );
  }

  clearWatch(id: string): Promise<void> {
    return Geolocation.clearWatch({
      id,
    });
  }

  getTotalDistance(locations: Position[]): number {
    if (locations.length < 2) {
      return 0;
    }

    locations = locations.sort(
      (a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()
    );

    let result = 0;
    for (let i = 0; i < locations.length - 1; i++) {
      result += this.distance(
        locations[i + 1].coords.latitude,
        locations[i + 1].coords.longitude,
        locations[i].coords.latitude,
        locations[i].coords.longitude
      );
    }

    return result;
  }

  getAverageSpeed(locations: Position[]): number {
    if (locations.length < 2) {
      return 0;
    }

    let total = 0;
    locations.forEach((x) => (total += x.coords.speed));

    let average = total / locations.length;
    average *= 3.6;
    return Math.max(0, average);
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    }

    const R = 6371e3; // Earth's radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // distance in kilometers
    return (R * c) / 1000;
  }
}
