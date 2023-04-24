import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ExercisesService {
  apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  getAllExercises(petId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/${petId}/exercises/list`);
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(
      `${this.apiUrl}/${exercise.petId}/exercises`,
      exercise
    );
  }

  deleteExercise(petId: number, exerciseId: number): Observable<Exercise> {
    return this.http.delete<Exercise>(
      `${this.apiUrl}/${petId}/exercises/${exerciseId}`
    );
  }

  isGoogleMapsApiLoaded(): Observable<boolean> {
    return this.http
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCqYxBHkSb43EaeKS3U1MJ54_htPSFVj4E',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError((e) => {
          console.log(e);
          return of(false);
        })
      );
  }
}
