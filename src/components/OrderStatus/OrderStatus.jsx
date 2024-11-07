import { Box, Typography, Chip, Divider } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { format } from "date-fns";
import PropTypes from "prop-types";

function OrderStatus({ order }) {
  const calculateCropPrice = (crop) => {
    return crop.quantity * crop.pricePerKg;
  };

  const totalPrice = order.crops.reduce((sum, crop) => {
    return sum + calculateCropPrice(crop);
  }, 0);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Status
      </Typography>
      {order.crops.map((crop) => (
        <Box
          key={crop.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>
              {crop.name} - {crop.quantity}kg
            </Typography>
            <Typography color="primary.main" sx={{ fontWeight: 500 }}>
              {calculateCropPrice(crop)} kr
            </Typography>
          </Box>
          {crop.status === "accepted" ? (
            <Chip
              icon={<AccessTime />}
              label={`Harvest: ${format(new Date(crop.harvestDate), "PP")}`}
              color="success"
              size="small"
              sx={{ ml: 2 }}
            />
          ) : (
            <Chip label="Pending" color="warning" size="small" sx={{ ml: 2 }} />
          )}
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Total:</Typography>
        <Typography
          color="primary.main"
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          {totalPrice} kr
        </Typography>
      </Box>
    </Box>
  );
}

OrderStatus.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    crops: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        harvestDate: PropTypes.string,
        pricePerKg: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderStatus;
