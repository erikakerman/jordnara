import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Schedule } from "@mui/icons-material";
import CropGrid from "../CropGrid/CropGrid";
import { format } from "date-fns";

function CustomerView({
  quantities,
  onQuantitiesChange,
  onSubmitRequest,
  orders,
}) {
  const hasOrders = orders.length > 0;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const calculateOrderTotal = (crops) => {
    return crops.reduce(
      (sum, crop) => sum + crop.quantity * crop.pricePerKg,
      0
    );
  };

  const statusBoxStyle = {
    minWidth: "180px", // Fixed width for both harvest and pending status
    display: "inline-flex",
    justifyContent: "center",
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Köpare
      </Typography>

      {!hasOrders ? (
        <>
          <CropGrid
            quantities={quantities}
            onQuantitiesChange={onQuantitiesChange}
          />
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <button
              onClick={onSubmitRequest}
              disabled={Object.values(quantities).every((q) => !q)}
              style={{
                padding: "12px 32px",
                fontSize: "1.1rem",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Skicka önskan
            </button>
          </Box>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
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
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  Total: {calculateOrderTotal(order.crops)} kr
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
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      Growing period: {crop.growingPeriodDays} days
                    </Typography>
                  </Box>
                  {crop.status === "accepted" ? (
                    <Box
                      sx={{
                        ...statusBoxStyle,
                        bgcolor: "success.main",
                        color: "white",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        gap: 1,
                      }}
                    >
                      <Schedule sx={{ fontSize: "1rem" }} />
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        Harvest: {formatDate(crop.harvestDate)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        ...statusBoxStyle,
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        bgcolor: "warning.light",
                        color: "warning.dark",
                        fontSize: "0.875rem",
                      }}
                    >
                      Pending
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

CustomerView.propTypes = {
  quantities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onQuantitiesChange: PropTypes.func.isRequired,
  onSubmitRequest: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      crops: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          status: PropTypes.string.isRequired,
          pricePerKg: PropTypes.number.isRequired,
          harvestDate: PropTypes.string,
          growingPeriodDays: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default CustomerView;
