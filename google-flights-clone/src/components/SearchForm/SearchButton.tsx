import React from 'react';
import { Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{ borderRadius: '50px', padding: '10px 20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', position: 'absolute', bottom: '-50px' }}
        onClick={onClick}
      >
        Explore
      </Button>
    </Grid>
  );
};

export default SearchButton;
