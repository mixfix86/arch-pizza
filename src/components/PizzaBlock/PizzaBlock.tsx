import React from 'react';

import { addProduct } from '../../redux/cart/slice';
import { selectCartItemById } from '../../redux/cart/selectors';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { CartItem } from '../../redux/cart/types';

const typesPizza = ['тонкое', 'традиционное'];
const sizeType = ['26', '30', '40'];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: string[];
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const [typeActive, setTypeActive] = React.useState(0);
  const [sizeActive, setSizeActive] = React.useState(0);

  const cartItem = useAppSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const dispatch = useAppDispatch();

  const addToCart = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesPizza[typeActive],
      size: sizeType[sizeActive],
      count: 0,
    };
    dispatch(addProduct(item));
  };

  return (
    <div className='pizza-block__wrapper'>
      <div className='pizza-block'>
        <Link to={'/pizza/' + id}>
          <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        </Link>
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((value, index) => (
              <li
                key={value}
                onClick={() => setTypeActive(index)}
                className={typeActive === index ? 'active' : ''}
              >
                {typesPizza[value]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((value, index) => (
              <li
                key={value}
                onClick={() => setSizeActive(index)}
                className={sizeActive === index ? 'active' : ''}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button
            onClick={addToCart}
            className='button button--outline button--add'
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
