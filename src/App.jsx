import { Grid } from "@mui/material";
import { useState } from "react";
import Layout from "./components/Layout";
import CropCard from "./components/CropCard";
import CartSummary from "./components/CartSummary";
import { crops } from "./data/crops";

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
    <Layout>
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

      <CartSummary quantities={quantities} crops={crops} />
    </Layout>
  );
}

export default App;
