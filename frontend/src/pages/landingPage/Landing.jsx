import React from 'react'
import { Header, Category } from '../../components';
import { MainLayout } from '../../layout';

const Landing = () => {
  return (
    <div>
      <MainLayout>
        <Header />
        <Category />
      </MainLayout>
    </div>
  )
}

export default Landing
