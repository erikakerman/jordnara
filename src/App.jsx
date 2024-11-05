import { Button, Box } from "@mui/material";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import CropGrid from "./components/CropGrid";
import FarmerDashboard from "./components/FarmerDashboard";
import OrderStatus from "./components/OrderStatus";
import { crops } from "./data/crops";

function App() {
  const [quantities, setQuantities] = useState({});
  const [view, setView] = useState("order");
  const [currentOrder, setCurrentOrder] = useState(null);
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
    setCurrentOrder(newOrder);
    setQuantities({});
  };

  if (view === "farmer") {
    return (
      <Layout>
        <FarmerDashboard
          orders={orders}
          onAcceptCrop={(orderId, cropId) => {
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
          }}
          onBack={() => setView("order")}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className="flex justify-end mb-4">
        <Button variant="outlined" onClick={() => setView("farmer")}>
          Switch to Farmer View
        </Button>
      </Box>

      <CropGrid quantities={quantities} onQuantitiesChange={setQuantities} />

      <Box className="flex justify-center mt-6">
        <Button
          variant="contained"
          onClick={handleSubmitRequest}
          disabled={Object.values(quantities).every((q) => !q)}
        >
          Submit Request
        </Button>
      </Box>

      {currentOrder && <OrderStatus order={currentOrder} />}
    </Layout>
  );
}

export default App;
