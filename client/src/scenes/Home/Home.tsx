import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreweries, setBreweryCities, setBreweryTypes, setBreweryNames } from '../../state';
import Navbar from "../Navbar/Navbar";
import SearchBox from "../Search/SearchBox";

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

const Home = () => {
  const dispatch = useDispatch();
  const breweries = useSelector((state: Breweries) => state?.breweries);

  const fetchBreweries = async () => {
    try {
      const url = 'https://api.openbrewerydb.org/v1/breweries';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const parsedResponse = await response.json();
      console.log("fetching breweries");
      console.log(parsedResponse);
      dispatch(setBreweries({ breweries: parsedResponse }));

      // Extract unique names, cities, and types from the list of breweries
      const uniqueNames = Array.from(new Set(breweries.map(brewery => brewery.name)));
      const uniqueCities = Array.from(new Set(breweries.map(brewery => brewery.city)));
      const uniqueTypes = Array.from(new Set(breweries.map(brewery => brewery.brewery_type)));

      // Dispatch actions to update the state
      dispatch(setBreweries({ breweries: parsedResponse }));
      dispatch(setBreweryNames({ breweryNames: uniqueNames }));
      dispatch(setBreweryCities({ breweryCities: uniqueCities }));
      dispatch(setBreweryTypes({ breweryTypes: uniqueTypes }));
    } catch (error) {
      console.error('Error fetching breweries:', error);
    }
  };

  useEffect(() => {
    fetchBreweries();
  }, []);

  return (
    <>
      <Navbar />
      <SearchBox />
    </>
  )
}
export default Home;