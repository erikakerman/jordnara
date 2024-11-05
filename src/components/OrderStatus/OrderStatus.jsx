import { Box, Typography, Chip } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { format } from "date-fns";
import PropTypes from "prop-types";

function OrderStatus({ order }) {
  if (!order) return null;

  return (
    <Box className="mt-4">
      <Typography variant="h6" className="mb-3">
        Order Status
      </Typography>
      {order.crops.map((crop) => (
        <Box key={crop.id} className="mb-2 p-3 rounded border">
          <Box className="flex justify-between items-center">
            <Typography>
              {crop.name} - {crop.quantity}kg
            </Typography>
            {crop.status === "accepted" ? (
              <Chip
                icon={<AccessTime />}
                label={`Harvest: ${format(new Date(crop.harvestDate), "PP")}`}
                color="success"
                size="small"
              />
            ) : (
              <Chip label="Pending" color="warning" size="small" />
            )}
          </Box>
        </Box>
      ))}
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
      })
    ).isRequired,
  }),
};

export default OrderStatus;
