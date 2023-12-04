import React, { useEffect } from 'react';
import config from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { setBreweries } from '../../state';
import BreweryListItem from './BreweryListItem';
import Box from '@mui/system/Box';
import Grid from '@material-ui/core/Grid';
import styled from '@mui/system/styled';

interface Token {
  token: string;
}

interface Breweries {
  breweries: Brewery[];
}

interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string;
  address_3: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  state: string;
  street: string;
}

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // border: '1px solid',
  // borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const BreweryList: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: Token) => state?.token);
  const breweries = useSelector((state: Breweries) => state?.breweries);

  const fetchBreweries = async () => {
    try {
      const url = `${config.apiUrl}/v1/breweries`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const parsedResponse = await response.json();
      dispatch(setBreweries({ breweries: parsedResponse }));
    } catch (error) {
      console.error('Error fetching breweries:', error);
    }
  };

  useEffect(() => {
    fetchBreweries();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {breweries &&
          breweries.map((brewery) => (
            <Grid xs={6}>
              <Item><BreweryListItem brewery={brewery} /></Item>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BreweryList;
