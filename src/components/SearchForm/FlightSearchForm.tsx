import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { fetchFlights, fetchSuggestions } from '../../Services/apiServices';
import BackgroundHeader from './BackgroundHeader';
import FlightAutocomplete from './FlightAutocomplete';
import DateInput from './DateInput';
import SearchButton from './SearchButton';

interface FlightSearchFormProps {
  onSearch: (flights: any) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch }) => {
  // State for storing selected locations and dates
  const [originSkyId, setOriginSkyId] = useState('');
  const [destinationSkyId, setDestinationSkyId] = useState('');
  const [originEntityId, setOriginEntityId] = useState('');
  const [destinationEntityId, setDestinationEntityId] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);

  // Fetch flight search results when clicking "Explore"
  const handleSearch = async () => {
    if (!originSkyId || !destinationSkyId || !departureDate || !returnDate) {
      console.error("Please fill in all fields.");
      return;
    }
    const flights = await fetchFlights(originSkyId, destinationSkyId, originEntityId, destinationEntityId, departureDate, returnDate);
    onSearch(flights);
  };

  // Fetch suggestions for the "From" field
  const handleFromInputChange = async (value: string) => {
    if (value.length > 2) {
      const suggestions = await fetchSuggestions(value);
      setFromSuggestions(suggestions);
    }
  };

  // Fetch suggestions for the "To" field
  const handleToInputChange = async (value: string) => {
    if (value.length > 2) {
      const suggestions = await fetchSuggestions(value);
      setToSuggestions(suggestions);
    }
  };

  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      {/* Background Header */}
      <BackgroundHeader title="Flights" />

      {/* Search Form */}
      <Grid container spacing={2} sx={{ maxWidth: 800, margin: "-40px auto 0", background: "#fff", padding: 3, borderRadius: 3, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        
        {/* From Input */}
        <FlightAutocomplete
          label="Where From?"
          suggestions={fromSuggestions}
          onInputChange={handleFromInputChange}
          onSelect={(selected) => {
            setOriginSkyId(selected.skyId);
            setOriginEntityId(selected.entityId);
          }}
        />

        {/* To Input */}
        <FlightAutocomplete
          label="Where To?"
          suggestions={toSuggestions}
          onInputChange={handleToInputChange}
          onSelect={(selected) => {
            setDestinationSkyId(selected.skyId);
            setDestinationEntityId(selected.entityId);
          }}
        />

        {/* Departure Date */}
        <DateInput label="Departure Date" value={departureDate} onChange={setDepartureDate} />

        {/* Return Date */}
        <DateInput label="Return Date" value={returnDate} onChange={setReturnDate} />

        {/* Search Button */}
        <SearchButton onClick={handleSearch} />
      </Grid>
    </Box>
  );
};

export default FlightSearchForm;
