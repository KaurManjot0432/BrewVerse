import BreweryListItem from './BreweryListItem';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import { useSelector } from 'react-redux';
import { setBreweries } from '../../state';
import { useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
// import ImagesListItem from './ImagesListItem';

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


const BreweryList: React.FC = () => {

    const dispatch = useDispatch();
    const token = useSelector((state: Token) => state?.token);
    const breweries = useSelector((state: Breweries) => state?.breweries);

    const fetchBreweries = async () => {
        try {
            const url = `https://api.openbrewerydb.org/v1/breweries`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const parsedResponse = await response.json();
            dispatch(setBreweries({ breweries: parsedResponse }));
            console.log("breweries = ", breweries);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchBreweries();
    }, []);

    return (
        <Box sx={{ width: 1, p: 2, overflowY: 'scroll' }}>
            <div className="container">

                <div className="row">
                    {breweries && breweries.map((brewery) => {
                        return <div className="col-md-4">
                            <BreweryListItem brewery={brewery} />
                        </div>

                    })}
                </div>
            </div>
        </Box>
    );
};

export default BreweryList;