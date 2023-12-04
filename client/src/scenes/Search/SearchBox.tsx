import React, { useState, useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import BreweryList from "../Breweries/BreweryList";
import { useSelector, useDispatch } from 'react-redux';
import { setBreweries } from '../../state';
import {
  Menu,
  MenuItem,
  Paper,
  Card,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import './SearchBox.css'


interface BreweryNames {
  breweryNames: string[];
}

interface BreweryTypes {
  breweryTypes: string[];
}

interface BreweryCities {
  breweryCities: string[];
}


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const SearchBox = () => {
  const dispatch = useDispatch();

  const [showBreweryList, setShowBreweryList] = useState<Boolean>(false);
  const breweryListRef = useRef<HTMLDivElement | null>(null);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const breweryNames = useSelector((state: BreweryNames) => state?.breweryNames);
  const breweryTypes = useSelector((state: BreweryTypes) => state?.breweryTypes);
  const breweryCities = useSelector((state: BreweryCities) => state?.breweryCities);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSearchCriteria(null);
    setAnchorEl(null);
  };

  const handleMenuClick = (searchCriteria: string) => {
    setSearchCriteria(searchCriteria);
  }

  const handleSearch = async (searchText: string) => {
    try {
      const searchBasedOn = 'by_' + searchCriteria?.toLocaleLowerCase();
      const searchValue = searchText.toLocaleLowerCase();
      const url = `https://api.openbrewerydb.org/v1/breweries?${searchBasedOn}=${searchValue}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const parsedResponse = await response.json();
      dispatch(setBreweries({ breweries: parsedResponse }));
      setShowBreweryList(true);
    } catch (error) {
      console.error('Error fetching breweries:', error);
    }
    handleClose();
  };

  useEffect(() => {
    if (showBreweryList && breweryListRef.current) {
      // Scroll to the BreweryList component
      breweryListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showBreweryList]);

  return (
    <>
      <div className='static-banner'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={4} sx={{ width: 500, margin: 2 }}>
            <Card sx={{ boxShadow: 4 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search breweries…"
                  inputProps={{ 'aria-label': 'search' }}
                  onClick={handleClick}
                />
              </Search>
            </Card>
          </Paper>
        </div >
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {searchCriteria === null && <MenuItem value="city" onClick={() => handleMenuClick("city")}>by city</MenuItem>}
        {searchCriteria === null && <MenuItem value="name" onClick={() => handleMenuClick("name")}>by name</MenuItem>}
        {searchCriteria === null && <MenuItem value="type" onClick={() => handleMenuClick("type")}>by type</MenuItem>}

        {searchCriteria === 'city' &&
          breweryCities.map((city) => (
            <MenuItem key={city} onClick={() => handleSearch(city)}>
              {city}
            </MenuItem>
          ))}
        {searchCriteria === 'name' &&
          breweryNames.map((name) => (
            <MenuItem key={name} onClick={() => handleSearch(name)}>
              {name}
            </MenuItem>
          ))}
        {searchCriteria === 'type' &&
          breweryTypes.map((type) => (
            <MenuItem key={type} onClick={() => handleSearch(type)}>
              {type}
            </MenuItem>
          ))}
      </Menu>

      {showBreweryList && (
        <div ref={breweryListRef}>
          <BreweryList />
        </div>
      )}

    </>
  )
}
export default SearchBox;
