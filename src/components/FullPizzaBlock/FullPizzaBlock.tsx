import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const FullPizzaBlock: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://635553b8483f5d2df3b21844.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  const { imageUrl, title, price} = pizza;

  return (
    <div className='container'>
      <img className='pizza-block__image' src={imageUrl} alt='' />
      <h2>{title}</h2>

      <h4>{price} ₽</h4>
    </div>
  );
};
