import { useState } from "react";
import { Button, Box } from "@mui/material";
import { addDays } from "date-fns";
import PropTypes from "prop-types";
import CropGrid from "../CropGrid";
import CartSummary from "../CartSummary/CartSummary";
import FarmerDashboard from "../FarmerDashboard";
import OrderStatus from "../OrderStatus";
import { crops } from "../../data/crops";

function OrderManager({ view, onViewChange }) {
  const [quantities, setQuantities] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleSubmitOrder = () => {
    const selectedCrops = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([cropId, quantity]) => {
        const crop = crops.find((c) => c.id === Number(cropId));
        return {
          ...crop,
          quantity: Number(quantity),
          status: "pending",
        };
      });

    const newOrder = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      crops: selectedCrops,
    };

    setOrders([...orders, newOrder]);
    setCurrentOrder(newOrder);
    setQuantities({});
    setShowSummary(false);
  };

  const handleAcceptCrop = (orderId, cropId) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            crops: order.crops.map((crop) => {
              if (crop.id === cropId) {
                return {
                  ...crop,
                  status: "accepted",
                  harvestDate: addDays(
                    new Date(),
                    crop.growingPeriodDays
                  ).toISOString(),
                };
              }
              return crop;
            }),
          };
        }
        return order;
      })
    );
  };

  if (view === "farmer") {
    return (
      <FarmerDashboard
        orders={orders}
        onAcceptCrop={handleAcceptCrop}
        onBack={() => onViewChange("order")}
      />
    );
  }

  return (
    <>
      {showSummary ? (
        <>
          <CartSummary quantities={quantities} crops={crops} />
          <Box className="flex justify-center gap-4 mt-4">
            <Button variant="outlined" onClick={() => setShowSummary(false)}>
              Back
            </Button>
            <Button variant="contained" onClick={handleSubmitOrder}>
              Submit Request
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box className="flex justify-end mb-4">
            <Button variant="outlined" onClick={() => onViewChange("farmer")}>
              Switch to Farmer View
            </Button>
          </Box>

          <CropGrid
            quantities={quantities}
            onQuantitiesChange={setQuantities}
          />

          <Box className="flex justify-center mt-6">
            <Button
              variant="contained"
              onClick={() => setShowSummary(true)}
              disabled={Object.values(quantities).every((q) => !q)}
            >
              Review Request
            </Button>
          </Box>

          {currentOrder && <OrderStatus order={currentOrder} />}
        </>
      )}
    </>
  );
}

OrderManager.propTypes = {
  view: PropTypes.oneOf(["order", "farmer"]).isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default OrderManager;
