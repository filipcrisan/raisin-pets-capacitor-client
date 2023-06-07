import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Pet } from '../../models/pet.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Species } from '../../models/species.model';
import { Const } from '../../models/constants.model';
import { NgChanges } from '../../../shared/models/simple-changes-typed';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListComponent implements OnChanges {
  @Input() pets: Pet[];
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() error: HttpErrorResponse;

  @Output() editDetails = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() selectPet = new EventEmitter<number>();

  ngOnChanges(changes: NgChanges<PetsListComponent>): void {
    if (changes.pets?.currentValue) {
      this.pets = [...this.pets].sort((a, b) => a.id - b.id);
    }
  }

  onEditDetails(pet: Pet): void {
    this.editDetails.emit(pet.id);
  }

  onDelete(pet: Pet): void {
    this.delete.emit(pet.id);
  }

  onSelectPet(id: number): void {
    this.selectPet.emit(id);
  }

  getAvatarUrlOrDefault(pet: Pet): string {
    if (pet.avatarInBase64.length) {
      return pet.avatarInBase64;
    }

    if (pet.species == Species.Dog) {
      return Const.DEFAULT_DOG_AVATAR_URL;
    }

    return Const.DEFAULT_CAT_AVATAR_URL;
  }
}
