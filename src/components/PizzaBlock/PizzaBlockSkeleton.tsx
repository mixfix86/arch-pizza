import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaBlockSkeleton: React.FC = () => (
  <ContentLoader
    className='pizza-block__skeleton'
    speed={2}
    width={280}
    height={466}
    viewBox='0 0 280 466'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='1' y='265' rx='10' ry='10' width='278' height='27' />
    <circle cx='140' cy='120' r='120' />
    <rect x='1' y='312' rx='10' ry='10' width='278' height='87' />
    <rect x='1' y='427' rx='10' ry='10' width='90' height='27' />
    <rect x='127' y='418' rx='25' ry='25' width='152' height='44' />
  </ContentLoader>
);
