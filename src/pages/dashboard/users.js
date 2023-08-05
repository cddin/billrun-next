// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import { _bankingContacts, _bankingCreditCard, _bankingRecentTransitions } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import { BasicSection } from '../../sections/@dashboard/general/users';

// ----------------------------------------------------------------------

Users.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export default function Users() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: Users">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <BasicSection title="Users" subheader="Sub title goes here" />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
