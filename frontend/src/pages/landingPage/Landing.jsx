import React from 'react';
import { Category, Header } from '../../components';
import { MainLayout } from '../../layout';

const Landing = () => {

  return (
    <MainLayout>
      <Header />
        <Category />
    </MainLayout>
  );
};

export default Landing;