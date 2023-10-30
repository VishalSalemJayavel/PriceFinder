import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, Header } from '../../components';
import { images } from '../../constants';
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