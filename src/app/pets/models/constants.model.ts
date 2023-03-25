import { Species } from './species.model';
import { Size } from './size.model';
import { TutorialCategory } from './tutorial-category.model';

export const Const = {
  DEFAULT_DOG_AVATAR_URL: 'https://img.icons8.com/dusk/64/null/dog.png',
  DEFAULT_CAT_AVATAR_URL: 'https://img.icons8.com/dusk/50/null/kitty.png',
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
