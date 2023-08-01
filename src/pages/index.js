// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';

import React, { useEffect } from 'react';
import Router from 'next/router';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

// HomePage.getLayout = function getLayout(page) {
//   return <Layout variant="main">{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function HomePage() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == '/') {
      Router.push('/dashboard');
    }
  }, []);
  return (
    <Page title="The starting point for your next project">
      <HomeHero />

      <ContentStyle>
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricingPlans />

        <HomeLookingFor />

        <HomeAdvertisement />
      </ContentStyle>
    </Page>
  );
}
