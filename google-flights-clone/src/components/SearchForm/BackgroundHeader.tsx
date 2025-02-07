import React from 'react';
import { Box, Typography } from '@mui/material';
import backgroundImage from '../../assets/flights-background.svg'; // Adjust path

interface BackgroundHeaderProps {
  title: string;
}

const BackgroundHeader: React.FC<BackgroundHeaderProps> = ({ title }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "250px",
        position: "relative",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="400"
        sx={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#333",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default BackgroundHeader;
