import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


export const Home = () => {
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
        </Grid>
        <Grid xs={4} item>
        </Grid>
      </Grid>
    </>
  );
};