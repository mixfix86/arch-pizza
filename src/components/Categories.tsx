import React from 'react';

type CategoriesProps = {
  selectedCategory: number;
  onChangeCategory: (index: number) => void;
};

const categoriesTypes = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ selectedCategory, onChangeCategory }) => {
    return (
      <div className='categories'>
        <ul>
          {categoriesTypes.map((value, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={selectedCategory === index ? 'active' : ''}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
