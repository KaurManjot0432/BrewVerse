import React from 'react';
import { Card, CardHeader, CardContent, Typography, Badge, Button, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/system/Box';
import LinkIcon from '@mui/icons-material/Link';
import Rating from '@mui/material/Rating';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ width: 500, margin: 2 }}>
        <Card sx={{ boxShadow: 4 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: avatarBackgroundColor }}>{brewery.name.match(/[a-zA-Z]/)}</Avatar>}
            action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
            title={<Typography variant="h6">{brewery.name}</Typography>}
            subheader={<Typography variant="subtitle1">{`${brewery.state}, ${brewery.country}`}</Typography>}
          />

          <CardContent>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography fontSize="16px" color="textSecondary" gutterBottom>
                {brewery.phone}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography fontSize="16px" color="textSecondary" gutterBottom>
                {brewery.address_1}, {brewery.city}
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

          </CardContent>

          <CardActions disableSpacing>
            <Typography variant="h6" margin="2px" fontSize="20px">
              Reviews
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>

          </Collapse>
        </Card>
      </Paper>
    </div>
  );
};

export default BreweryListItem;
