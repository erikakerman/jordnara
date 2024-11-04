import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { Spa, CalendarMonth } from "@mui/icons-material";
import { useState } from "react";

const App = () => {
  const [quantity, setQuantity] = useState("");

  const handleQuantityChange = (value) => {
    if (value === "" || value >= 0) {
      setQuantity(value);
    }
  };

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
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Jordnara Farm Orders
      </Typography>

      <Card className="max-w-sm mx-auto">
        <CardContent className="flex flex-col gap-4">
          {/* Icon and Title Section */}
          <Box className="text-center">
            <Box className="flex justify-center mb-2">
              <Spa sx={{ fontSize: 80, color: "primary.main" }} />
            </Box>
            <Typography variant="h5" className="font-medium">
              Carrot
            </Typography>
          </Box>

          <Divider />

          {/* Price and Harvest Info Section */}
          <Box className="text-center">
            <Typography variant="h6" color="primary" className="mb-1">
              $50/kg
            </Typography>
            <Box className="flex items-center justify-center gap-1 text-gray-600">
              <CalendarMonth fontSize="small" />
              <Typography variant="body1">
                Ready by {calculateHarvestDate(70)}
              </Typography>
            </Box>
          </Box>

          {/* Quantity Input Section */}
          <TextField
            label="Quantity (kg)"
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            inputProps={{ min: 0 }}
            size="small"
            fullWidth
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
