// src/App.tsx
import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import FlightSearchForm from './components/SearchForm/FlightSearchForm';
import FlightResults from './components/Result/FlightResults';
const App: React.FC = () => {
  const [flights, setFlights] = useState<any>(null);

  const handleSearch = (flights: any) => {
    setFlights(flights);
  };

  return (
    <Container>
      <FlightSearchForm onSearch={handleSearch} />
      <FlightResults flights={flights} />
    </Container>
  );
};

export default App;
