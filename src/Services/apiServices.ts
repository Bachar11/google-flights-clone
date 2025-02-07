import axios from 'axios';

// Define API URLs
const API_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights';
const SUGGESTIONS_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport';

// Store API credentials securely in environment variables
const API_KEY = '3c62ba3f69mshe6bbe5f11fb1e38p163506jsn4d160145cb9e';
const API_HOST = 'sky-scrapper.p.rapidapi.com';

// Ensure the API key is set before making requests
if (!API_KEY) {
  throw new Error("Missing API key. Please set REACT_APP_RAPIDAPI_KEY in your environment variables.");
}

// Reusable headers for API requests
const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_HOST,
};

/**
 * Fetches available flights based on search parameters.
 * @param originSkyId - The SkyScanner ID for the origin airport.
 * @param destinationSkyId - The SkyScanner ID for the destination airport.
 * @param originEntityId - The entity ID for the origin location.
 * @param destinationEntityId - The entity ID for the destination location.
 * @param departureDate - The date of departure (YYYY-MM-DD).
 * @param returnDate - The date of return (optional, YYYY-MM-DD).
 * @returns A list of flight options or null in case of an error.
 */
export const fetchFlights = async (
  originSkyId: string,
  destinationSkyId: string,
  originEntityId: string,
  destinationEntityId: string,
  departureDate: string,
  returnDate?: string // Return date is optional
) => {
  try {
    // Make a GET request to fetch flight data
    const response = await axios.get(API_URL, {
      headers,
      params: {
        originSkyId,        
        destinationSkyId,   
        originEntityId,      
        destinationEntityId, 
        date: departureDate, 
        returnDate,          
      },
    });

    // Return the response data
    return response.data;
  } catch (error: any) {
    // Handle errors and provide meaningful feedback
    console.error('Error fetching flights:', error.response?.data || error.message);
    return null;
  }
};

/**
 * Fetches airport suggestions based on user input.
 * @param query - The search query (e.g., city name, airport code).
 * @returns A list of suggested airports with relevant details.
 */
export const fetchSuggestions = async (query: string) => {
  try {
    // Make a GET request to fetch airport suggestions
    const response = await axios.get(SUGGESTIONS_URL, {
      headers,
      params: { query },
    });

    // Extract airport data and format it for UI display
    const airports = response.data.data || [];

    return airports.map((airport: any) => ({
      label: airport.presentation.suggestionTitle, // Display name of the airport
      skyId: airport.skyId, // Unique identifier for the airport
      entityId: airport.entityId, // Entity ID used in flight search
    }));
  } catch (error: any) {
    // Handle errors gracefully and return an empty array
    console.error('Error fetching suggestions:', error.response?.data || error.message);
    return [];
  }
};
