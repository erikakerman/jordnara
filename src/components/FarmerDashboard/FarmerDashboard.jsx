import { Box, Typography, Button } from "@mui/material";
import { Agriculture } from "@mui/icons-material";
import PropTypes from "prop-types";
import { format, addDays } from "date-fns";

function FarmerDashboard({ orders, onAcceptCrop }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getExpectedHarvestDate = (growingPeriodDays) => {
    return formatDate(addDays(new Date(), growingPeriodDays));
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
              Order #{order.id}
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
                  {crop.pricePerKg} kr/kg · Total:{" "}
                  {crop.pricePerKg * crop.quantity} kr
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  Harvest:{" "}
                  {crop.status === "accepted"
                    ? formatDate(crop.harvestDate)
                    : getExpectedHarvestDate(crop.growingPeriodDays)}
                </Typography>
              </Box>
              {crop.status === "accepted" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "primary.main",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Agriculture sx={{ fontSize: "1rem" }} />
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    Odlingslott {crop.plotNumber}
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => onAcceptCrop(order.id, crop.id)}
                  sx={{
                    width: "140px",
                    textTransform: "none",
                    boxShadow: "none",
                    px: 2,
                    py: 1,
                    fontSize: "0.875rem",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      boxShadow: "none",
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
          pricePerKg: PropTypes.number.isRequired,
          growingPeriodDays: PropTypes.number.isRequired,
          plotNumber: PropTypes.number,
          harvestDate: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  onAcceptCrop: PropTypes.func.isRequired,
};

export default FarmerDashboard;
