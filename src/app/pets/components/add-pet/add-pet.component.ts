import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetComponent {
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;

  @Output() addPet = new EventEmitter<Pet>();
}
