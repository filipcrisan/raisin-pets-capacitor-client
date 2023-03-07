import { Species } from './species.model';
import { Size } from './size.model';
import { TutorialCategory } from './tutorial-category.model';

export const Const = {
  DEFAULT_DOG_AVATAR_URL: '/assets/images/dog-avatar-1.png',
  DEFAULT_CAT_AVATAR_URL: '/assets/images/cat-avatar-1.png',
  SpeciesOptions: [
    {
      value: Species.Dog,
      name: 'Dog',
    },
    {
      value: Species.Cat,
      name: 'Cat',
    },
  ],
  SizeOptions: [
    {
      value: Size.Small,
      name: 'Small',
    },
    {
      value: Size.Medium,
      name: 'Medium',
    },
    {
      value: Size.Large,
      name: 'Large',
    },
  ],
  TutorialCategoryOptions: [
    {
      value: TutorialCategory.Hygiene,
      name: 'Hygiene',
    },
    {
      value: TutorialCategory.Food,
      name: 'Food',
    },
    {
      value: TutorialCategory.Entertainment,
      name: 'Entertainment',
    },
  ],
};
