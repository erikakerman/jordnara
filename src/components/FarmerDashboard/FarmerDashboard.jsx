import { Box, Typography, Button } from "@mui/material";
import { Schedule } from "@mui/icons-material";
import PropTypes from "prop-types";
import { format } from "date-fns";

function FarmerDashboard({ orders, onAcceptCrop }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Odlare
      </Typography>

      {orders.map((order) => (
        <Box
          key={order.id}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 2,
            bgcolor: "grey.50",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Order #{order.id.split("-").pop()}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {format(new Date(order.submittedAt), "MMM d, yyyy, h:mm:ss a")}
            </Typography>
          </Box>

          {order.crops.map((crop) => (
            <Box
              key={crop.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
                p: 2,
                borderRadius: 1,
                bgcolor: "background.paper",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 500 }}>
                  {crop.name} - {crop.quantity}kg
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  Growing period: {crop.growingPeriodDays} days
                </Typography>
              </Box>
              {crop.status === "accepted" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "success.main",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Schedule sx={{ fontSize: "1rem" }} />
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    Harvest: {formatDate(crop.harvestDate)}
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => onAcceptCrop(order.id, crop.id)}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  Accept Crop
                </Button>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

FarmerDashboard.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      submittedAt: PropTypes.string.isRequired,
      crops: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          status: PropTypes.string.isRequired,
          growingPeriodDays: PropTypes.number.isRequired,
          harvestDate: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  onAcceptCrop: PropTypes.func.isRequired,
};

export default FarmerDashboard;
