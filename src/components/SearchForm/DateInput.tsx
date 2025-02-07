import React from 'react';
import { TextField, Grid } from '@mui/material';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        label={label}
        variant="outlined"
        type="date"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
         InputLabelProps={{
              shrink: true,
            }}
                      inputProps={{
              style: { textTransform: "uppercase" }, // Forces uppercase inside input
            }}
      />
    </Grid>
  );
};

export default DateInput;
