import React from 'react';
import { setSelectedBrewery } from '../../state';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, Typography, Badge, Button, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/system/Box';
import LinkIcon from '@mui/icons-material/Link';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';


interface BreweryItemProps {
  brewery: {
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
  };
}

const BreweryListItem: React.FC<BreweryItemProps> = ({ brewery }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAvatarBackgroundColor = (name: string): string => {
    // Find the first alphabet in the name
    const firstAlphabet = name.match(/[a-zA-Z]/);
    if (firstAlphabet) {
      const charCode = firstAlphabet[0].charCodeAt(0);
      const colorIndex = charCode % 5;
      const colors = [red[500], 'blue', 'green', 'orange', 'purple'];
      return colors[colorIndex];
    }
    // Return a default color if no alphabet is found
    return 'red';
  };

  const avatarBackgroundColor = getAvatarBackgroundColor(brewery.name);

  const handleReadMoreClick = () => {
    dispatch(setSelectedBrewery({ selectedBrewery: brewery }));
    navigate('/brewery-details');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Paper elevation={4} sx={{ width: 500, margin: 2 }}>
        <Card sx={{ boxShadow: 4 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: avatarBackgroundColor }}>{brewery.name.match(/[a-zA-Z]/)}</Avatar>}
            title={<Typography variant="h6">{brewery.name}</Typography>}
          />
          <Divider />
          <CardContent>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography fontSize="16px" color="textSecondary" gutterBottom>
                {brewery.address_1}, {brewery.city}. {brewery.state}, {brewery.country}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography fontSize="16px" color="textSecondary" gutterBottom>
                {brewery.phone}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Link href={brewery.website_url} target="_blank" underline="hover">
                <Typography>
                  <LinkIcon style={{ color: 'black' }} /> Visit
                </Typography>
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
            </Box>
            <Box display="flex" alignItems="center">
              <Button variant="outlined" onClick={handleReadMoreClick}>Read More</Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default BreweryListItem;
