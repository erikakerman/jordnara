import { Box, Paper, Typography, Divider } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import PropTypes from "prop-types";

function CartSummary({ quantities, crops }) {
  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [cropId, quantity]) => {
      const crop = crops.find((c) => c.id === Number(cropId));
      return total + (crop?.pricePerKg * Number(quantity) || 0);
    }, 0);
  };

  const selectedCrops = Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([cropId, quantity]) => {
      const crop = crops.find((c) => c.id === Number(cropId));
      return { ...crop, quantity: Number(quantity) };
    });

  if (selectedCrops.length === 0) {
    return null;
  }

  return (
    <Paper elevation={3} className="p-4 mt-6">
      <Box className="flex items-center gap-2 mb-4">
        <ShoppingCart color="primary" />
        <Typography variant="h6">Request Summary</Typography>
      </Box>

      {selectedCrops.map((crop) => (
        <Box key={crop.id} className="mb-3">
          <Box className="flex justify-between mb-1">
            <Typography>{crop.name}</Typography>
            <Typography>
              ${(crop.pricePerKg * crop.quantity).toFixed(2)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {crop.quantity}kg - Typical growing period: {crop.growingPeriodDays}{" "}
            days
          </Typography>
          <Typography variant="body2" color="text.secondary" className="italic">
            * Final harvest date will be confirmed by farmer
          </Typography>
          <Divider className="mt-2" />
        </Box>
      ))}

      <Box className="flex justify-between mt-4">
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" color="primary">
          ${calculateTotal().toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
}

CartSummary.propTypes = {
  quantities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  crops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pricePerKg: PropTypes.number.isRequired,
      growingPeriodDays: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartSummary;
