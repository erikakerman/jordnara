import { Grid, Divider } from "@mui/material";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import CustomerView from "./components/CustomerView";
import FarmerDashboard from "./components/FarmerDashboard";
import { crops } from "./data/crops";

function App() {
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);

  const handleSubmitRequest = () => {
    const newOrder = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      crops: Object.entries(quantities)
        .filter(([, quantity]) => quantity > 0)
        .map(([cropId, quantity]) => ({
          ...crops.find((c) => c.id === Number(cropId)),
          quantity: Number(quantity),
          status: "pending",
        })),
    };
    setOrders([...orders, newOrder]);
    setQuantities({});
  };

  const handleAcceptCrop = (orderId, cropId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              crops: order.crops.map((crop) =>
                crop.id === cropId
                  ? {
                      ...crop,
                      status: "accepted",
                      harvestDate: new Date(
                        Date.now() +
                          crop.growingPeriodDays * 24 * 60 * 60 * 1000
                      ).toISOString(),
                    }
                  : crop
              ),
            }
          : order
      )
    );
  };

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CustomerView
            quantities={quantities}
            onQuantitiesChange={setQuantities}
            onSubmitRequest={handleSubmitRequest}
            orders={orders}
          />
        </Grid>

        <Grid item xs={12} md="auto">
          <Divider orientation="vertical" />
        </Grid>

        <Grid item xs={12} md={5}>
          <FarmerDashboard orders={orders} onAcceptCrop={handleAcceptCrop} />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;
