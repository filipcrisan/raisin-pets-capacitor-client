import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Pet } from '../../models/pet.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Size } from '../../models/size.model';
import { Species } from '../../models/species.model';
import { Const } from '../../models/constants.model';
import { NgChanges } from '../../../shared/models/simple-changes-typed';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetComponent implements OnChanges {
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;
  @Input() avatarInBase64: string;

  @Output() addPet = new EventEmitter<Pet>();
  @Output() cancel = new EventEmitter<void>();
  @Output() takePicture = new EventEmitter<void>();

  petForm = new FormGroup({
    name: new FormControl('', Validators.required),
    avatarInBase64: new FormControl(''),
    species: new FormControl(Species.Dog),
    size: new FormControl(Size.Medium),
    dateOfBirth: new FormControl<Date>(new Date(Date.now())),
  });

  speciesOptions = Const.SpeciesOptions;
  sizeOptions = Const.SizeOptions;

  ngOnChanges(changes: NgChanges<AddPetComponent>): void {
    if (changes.avatarInBase64?.currentValue) {
      this.petForm.controls.avatarInBase64.setValue(this.avatarInBase64);
    }
  }

  onSave(): void {
    if (!this.petForm.valid) {
      return;
    }

    this.addPet.emit(this.formValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onCreateAvatar(): void {
    this.takePicture.emit();
  }

  get formValue(): Pet {
    return this.petForm.value as Pet;
  }
}
