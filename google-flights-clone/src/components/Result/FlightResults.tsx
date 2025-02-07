import React, { useState } from "react";
import { 
  Box, Typography, Grid, Paper, Divider, Button, IconButton, 
  FormControl, Slider 
} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define the structure of a Flight object
interface Flight {
  price: { formatted: string; raw: number };
  legs: {
    departure: string;
    arrival: string;
    durationInMinutes: number;
    stops: number;
    origin: { displayCode: string; city: string, name?: string };
    destination: { displayCode: string; city: string, name?: string };
    itineraries: { name: string };
    carriers: {
      marketing: { name: string; logoUrl: string; alternateId: string }[];
      operating: { name: string; logoUrl?: string }[];
    };
    segments: {
      flightNumber: string;
      marketingCarrier?: { alternateId: string };
    }[];
  }[];
}

// Define the props structure for FlightResults component
interface FlightResultsProps {
  flights: { data?: { itineraries?: Flight[] } };
}

// Helper function to format duration from minutes to "X hr Y min"
const formatDuration = (minutes: number) =>
  `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;

// Helper function to format time from ISO string to "hh:mm AM/PM"
const formatTime = (dateTime: string) =>
  new Date(dateTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  // State for managing visible flights
  const [visibleCount, setVisibleCount] = useState(6);
  // State for managing expanded flight details
  const [expandedFlights, setExpandedFlights] = useState<Record<number, boolean>>({});
  // State for maximum price filter
  const [maxPrice, setMaxPrice] = useState(1000);

  // Return early if no flight data is available
  if (!flights?.data?.itineraries) return null;

  const itineraries = flights.data.itineraries;
  // Filter flights based on the max price selected
  const filteredFlights = itineraries.filter((flight) => flight.price.raw <= maxPrice);

  // Toggle function for expanding/collapsing flight details
  const handleToggle = (index: number) => {
    setExpandedFlights((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* Price Filter Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Filter by Price
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography gutterBottom>Max Price: ${maxPrice}</Typography>
          <Slider
            value={maxPrice}
            min={100}
            max={2000}
            step={50}
            onChange={(e, newValue) => setMaxPrice(newValue as number)}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </Paper>

      {/* Flight List */}
      {filteredFlights.length > 0 ? (
        filteredFlights.slice(0, visibleCount).map((flight, index) => {
          const leg = flight.legs[0]; // Get the first leg of the journey
          const { departure, arrival, durationInMinutes, origin, destination, carriers, segments } = leg;
          const airlineLogo = carriers?.marketing?.[0]?.logoUrl;
          const operatingAirline = carriers?.marketing?.[0]?.name;

          return (
            <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
              <Grid container alignItems="center" spacing={3}>
                {/* Airline Logo */}
                <Grid item xs={2} textAlign="center">
                  <Box sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", p: 1 }}>
                    <img src={airlineLogo} alt={operatingAirline || "Airline Logo"} width="60" height="60" loading="lazy" />
                  </Box>
                </Grid>

                {/* Flight Time & Airline Name */}
                <Grid item xs={4}>
                  <Typography fontWeight="600">
                    {formatTime(departure)} – {formatTime(arrival)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {operatingAirline}
                  </Typography>
                </Grid>

                {/* Duration and Route */}
                <Grid item xs={3} textAlign="center">
                  <Typography variant="body1" fontWeight="500">
                    {formatDuration(durationInMinutes)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {origin.displayCode} → {destination.displayCode}
                  </Typography>
                </Grid>

                {/* Price and Expand Button */}
                <Grid item xs={3} textAlign="right">
                  <Typography variant="h6" color="green">
                    {flight.price?.formatted || "N/A"}
                  </Typography>
                  <IconButton onClick={() => handleToggle(index)}>
                    {expandedFlights[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Grid>
              </Grid>

              {/* Expanded Flight Details */}
              {expandedFlights[index] && (
                <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "background.paper" }}>
                  <Typography variant="body1">
                    {formatTime(departure)} • {origin.name} ({origin.displayCode})
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Travel time: {formatDuration(durationInMinutes)}
                  </Typography>
                  <Typography variant="body1">
                    {formatTime(arrival)} • {destination.name} ({destination.displayCode})
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    {operatingAirline} • {leg.segments[0].marketingCarrier?.alternateId} {leg.segments[0].flightNumber}
                  </Typography>
                </Box>
              )}

              {index < itineraries.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Paper>
          );
        })
      ) : (
        <Typography textAlign="center" mt={3}>
          No options matching your search. Try changing your dates, destination, or filter price.
        </Typography>
      )}

      {/* Show More & Show Less Buttons */}
      {filteredFlights.length > 0 && (
        <>
          {visibleCount < filteredFlights.length && (
            <Box textAlign="center" mt={3}>
              <Button variant="contained" color="primary" onClick={() => setVisibleCount((prev) => prev + 6)}>
                Show More Flights
              </Button>
            </Box>
          )}

          {visibleCount > 6 && (
            <Box textAlign="center" mt={3}>
              <Button variant="contained" color="primary" onClick={() => setVisibleCount((prev) => prev - 6)}>
                Show Less Flights
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default FlightResults;
