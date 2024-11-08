import { Box } from "@mui/material";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import CustomerView from "./components/CustomerView";
import FarmerDashboard from "./components/FarmerDashboard";
import { crops } from "./data/crops";

function App() {
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);

  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmitRequest = () => {
    const newOrder = {
      id: generateOrderId(),
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
    const plotNumber = Math.floor(Math.random() * 20) + 1;

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
                      plotNumber: plotNumber,
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
          py: 4,
          px: { xs: 2, sm: 4 },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: "800px",
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <CustomerView
            quantities={quantities}
            onQuantitiesChange={setQuantities}
            onSubmitRequest={handleSubmitRequest}
            orders={orders}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            maxWidth: "800px",
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <FarmerDashboard orders={orders} onAcceptCrop={handleAcceptCrop} />
        </Box>
      </Box>
    </Layout>
  );
}

export default App;
