import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FullPizzaBlock } from './components';
import { TemplateLayout } from './layout/TemplateLayout';
import { Home, Cart, NotFound } from './pages';
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<TemplateLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
        <Route path='pizza/:id' element={<FullPizzaBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
