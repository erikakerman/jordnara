import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const crops = [
  {
    id: 1,
    name: "Carrot",
    pricePerKg: 50,
    growingPeriodDays: 70,
  },
  {
    id: 2,
    name: "Potato",
    pricePerKg: 40,
    growingPeriodDays: 90,
  },
  {
    id: 3,
    name: "Corn",
    pricePerKg: 45,
    growingPeriodDays: 80,
  },
];

const App = () => {
  const [selectedCrop, setSelectedCrop] = useState("");

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" component="h1" className="mb-4">
        Jordnara Farm Orders
      </Typography>

      <Paper elevation={2} className="p-4 mb-4">
        <Typography variant="h6" className="mb-4">
          Select Your Crop
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Crop</InputLabel>
          <Select value={selectedCrop} label="Crop" onChange={handleCropChange}>
            {crops.map((crop) => (
              <MenuItem key={crop.id} value={crop.id}>
                {crop.name} - ${crop.pricePerKg}/kg
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper elevation={2} className="p-4">
        <Typography variant="h6" className="mb-2">
          Available Crops
        </Typography>
        <List>
          {crops.map((crop) => (
            <ListItem key={crop.id}>
              <Typography>
                {crop.name} - ${crop.pricePerKg}/kg (Grows in{" "}
                {crop.growingPeriodDays} days)
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default App;
