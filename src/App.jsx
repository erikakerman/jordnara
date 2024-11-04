import { Container, Typography, List, ListItem, Paper } from "@mui/material";

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
  return (
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" component="h1" className="mb-4">
        Jordnara Farm Orders
      </Typography>
      <Typography variant="body1" className="mb-4">
        Order fresh crops directly from our local farmers
      </Typography>

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
