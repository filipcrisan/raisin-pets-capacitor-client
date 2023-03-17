import { createAction } from '@ngrx/store';

export const getAllPets = createAction('[Pets] Get all pets');

export const addPet = createAction('[Pets] Add pet');

export const editPet = createAction('[Pets] Edit pet');

export const deletePet = createAction('[Pets] Delete pet');

export const getTutorialsByCategory = createAction(
  '[Pets] Get tutorials by category'
);

export const clearTutorials = createAction('[Pets] Clear tutorials');

export const getAllExercises = createAction('[Pets] Get all exercises');

export const addExercise = createAction('[Pets] Add exercise');

export const clearExercises = createAction('[Pets] Clear exercises');
