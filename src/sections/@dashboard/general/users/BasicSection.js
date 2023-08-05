import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

BasicSection.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BasicSection({ title, subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ m: 3 }} dir="ltr">
        This Basic section for users
      </Box>
    </Card>
  );
}
