import { Button, Box } from "@mui/material";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import CropGrid from "./components/CropGrid";
import CartSummary from "./components/CartSummary/CartSummary";
import { crops } from "./data/crops";

function App() {
  const [quantities, setQuantities] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  return (
    <Layout>
      {showSummary ? (
        <>
          <CartSummary quantities={quantities} crops={crops} />
          <Box className="flex justify-center gap-4 mt-4">
            <Button variant="outlined" onClick={() => setShowSummary(false)}>
              Back
            </Button>
            <Button variant="contained">Submit Request</Button>
          </Box>
        </>
      ) : (
        <>
          <CropGrid
            quantities={quantities}
            onQuantitiesChange={setQuantities}
          />
          <Box className="flex justify-center mt-6">
            <Button variant="contained" onClick={() => setShowSummary(true)}>
              Review Request
            </Button>
          </Box>
        </>
      )}
    </Layout>
  );
}

export default App;
