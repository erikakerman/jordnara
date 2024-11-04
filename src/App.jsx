import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import {
  Spa,
  CalendarMonth,
  Grass,
  LocalFlorist,
  Agriculture,
} from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";

const crops = [
  {
    id: 1,
    name: "Carrot",
    pricePerKg: 50,
    growingPeriodDays: 70,
    Icon: Spa,
  },
  {
    id: 2,
    name: "Potato",
    pricePerKg: 40,
    growingPeriodDays: 90,
    Icon: Agriculture,
  },
  {
    id: 3,
    name: "Corn",
    pricePerKg: 45,
    growingPeriodDays: 80,
    Icon: Grass,
  },
  {
    id: 4,
    name: "Cabbage",
    pricePerKg: 35,
    growingPeriodDays: 65,
    Icon: LocalFlorist,
  },
  {
    id: 5,
    name: "Beetroot",
    pricePerKg: 55,
    growingPeriodDays: 60,
    Icon: Spa,
  },
  {
    id: 6,
    name: "Onion",
    pricePerKg: 30,
    growingPeriodDays: 75,
    Icon: LocalFlorist,
  },
];

// Define prop types for CropCard
CropCard.propTypes = {
  crop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pricePerKg: PropTypes.number.isRequired,
    growingPeriodDays: PropTypes.number.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onQuantityChange: PropTypes.func.isRequired,
};

// Default props
CropCard.defaultProps = {
  quantity: "",
};

function CropCard({ crop, quantity, onQuantityChange }) {
  const calculateHarvestDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4">
        {/* Icon and Title Section */}
        <Box className="text-center">
          <Box className="flex justify-center mb-2">
            <crop.Icon sx={{ fontSize: 80, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" className="font-medium">
            {crop.name}
          </Typography>
        </Box>

        <Divider />

        {/* Price and Harvest Info Section */}
        <Box className="text-center">
          <Typography variant="h6" color="primary" className="mb-1">
            ${crop.pricePerKg}/kg
          </Typography>
          <Box className="flex items-center justify-center gap-1 text-gray-600">
            <CalendarMonth fontSize="small" />
            <Typography variant="body1">
              Ready by {calculateHarvestDate(crop.growingPeriodDays)}
            </Typography>
          </Box>
        </Box>

        {/* Quantity Input Section */}
        <TextField
          label="Quantity (kg)"
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(crop.id, e.target.value)}
          inputProps={{ min: 0 }}
          size="small"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}

function App() {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (cropId, value) => {
    if (value === "" || value >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [cropId]: value,
      }));
    }
  };

  return (
    <Container maxWidth="lg" className="mt-8 mb-8">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Jordnara Farm Orders
      </Typography>

      <Grid container spacing={3}>
        {crops.map((crop) => (
          <Grid item xs={12} sm={6} md={4} key={crop.id}>
            <CropCard
              crop={crop}
              quantity={quantities[crop.id] || ""}
              onQuantityChange={handleQuantityChange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
