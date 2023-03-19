import { Injectable, SecurityContext } from '@angular/core';
import {
  Camera,
  CameraResultType,
  PermissionStatus,
  Photo,
} from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor(private domSanitizer: DomSanitizer) {}

  requestPermission(): Promise<PermissionStatus> {
    return Camera.requestPermissions();
  }

  canUseCamera(): Promise<boolean> {
    return Camera.checkPermissions().then((x) => {
      return x.camera === 'granted';
    });
  }

  async takePicture(): Promise<Photo> {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
  }

  getImageUrl(imageInBase64: string): string {
    return this.domSanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + imageInBase64
      )
    );
  }
}
