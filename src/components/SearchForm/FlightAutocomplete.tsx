import React from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

interface FlightAutocompleteProps {
  label: string;
  suggestions: any[];
  onInputChange: (value: string) => void;
  onSelect: (selectedValue: any) => void;
}

const FlightAutocomplete: React.FC<FlightAutocompleteProps> = ({ label, suggestions, onInputChange, onSelect }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => option.label}
        onInputChange={(_event, value) => onInputChange(value)}
        onChange={(_event, selectedValue) => selectedValue && onSelect(selectedValue)}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" fullWidth />}
      />
    </Grid>
  );
};

export default FlightAutocomplete;
