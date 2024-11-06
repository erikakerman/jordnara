import { Box, Divider } from "@mui/material";
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.default",
          py: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1600px",
            display: "flex",
            gap: 4,
            px: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
            }}
          >
            <CustomerView
              quantities={quantities}
              onQuantitiesChange={setQuantities}
              onSubmitRequest={handleSubmitRequest}
              orders={orders}
            />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              width: "2px",
              bgcolor: "divider",
              boxShadow: "1px 0 8px rgba(0,0,0,0.1)",
              my: 4, // Add vertical margin
              opacity: 0.7,
            }}
          />

          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
            }}
          >
            <FarmerDashboard orders={orders} onAcceptCrop={handleAcceptCrop} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default App;
