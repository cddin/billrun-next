import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

DemoSection01.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function DemoSection01({ title, subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ m: 3 }} dir="ltr">
        This is test panel
      </Box>
    </Card>
  );
}
