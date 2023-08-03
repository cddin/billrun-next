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
import { DemoSection01 } from '../../sections/@dashboard/general/discount';

// ----------------------------------------------------------------------

Discount.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export default function Discount() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: Discount">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <BankingWidgetSummary
                title="Income"
                icon={'eva:diagonal-arrow-left-down-fill'}
                percent={2.6}
                total={18765}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />

              <BankingWidgetSummary
                title="Expenses"
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={8938}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
            </Stack>
          </Grid> */}

          {/* <Grid item xs={12} md={5}>
            <BankingCurrentBalance list={_bankingCreditCard} />
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <DemoSection01 title="Discount/LAD" subheader="Sub title goes here" />

              {/* <BankingExpensesCategories
                title="Expenses Categories"
                chartData={[
                  { label: 'Category 1', value: 14 },
                  { label: 'Category 2', value: 23 },
                  { label: 'Category 3', value: 21 },
                  { label: 'Category 4', value: 17 },
                  { label: 'Category 5', value: 15 },
                  { label: 'Category 6', value: 10 },
                  { label: 'Category 7', value: 12 },
                  { label: 'Category 8', value: 17 },
                  { label: 'Category 9', value: 21 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.darker,
                  theme.palette.chart.yellow[0],
                  theme.palette.chart.blue[0],
                  theme.palette.chart.red[0],
                  theme.palette.chart.violet[2],
                  theme.palette.chart.violet[0],
                  theme.palette.success.darker,
                  theme.palette.chart.green[0],
                ]}
              />

              <BankingRecentTransitions
                title="Recent Transitions"
                tableData={_bankingRecentTransitions}
                tableLabels={[
                  { id: 'description', label: 'Description' },
                  { id: 'date', label: 'Date' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              /> */}
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingQuickTransfer title="Quick Transfer" list={_bankingContacts} />

              <BankingContacts title="Contacts" subheader="You have 122 contacts" list={_bankingContacts.slice(-5)} />

              <BankingInviteFriends
                price="$50"
                title={`Invite friends \n and earn`}
                description="Praesent egestas tristique nibh. Duis lobortis massa imperdiet quam."
                img="/assets/illustrations/illustration_invite.png"
              />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
