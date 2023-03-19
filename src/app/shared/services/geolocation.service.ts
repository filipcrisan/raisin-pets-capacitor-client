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

    return total / locations.length;
  }

  private distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    }

    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = (dist * 1.609344) / 1000;
    return dist;
  }
}
