import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { format } from "date-fns";
import PropTypes from "prop-types";

function FarmerDashboard({ orders, onAcceptCrop }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          marginBottom: 3,
          color: "text.primary",
          padding: "24px 24px 0 24px",
        }}
      >
        Farmer View
      </Typography>

      {orders.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            mt: 8,
            color: "text.secondary",
          }}
        >
          No orders to review yet
        </Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 4, width: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order #{order.id.slice(-4)}
              </Typography>
              <Typography sx={{ mb: 2 }} color="text.secondary">
                {format(new Date(order.submittedAt), "PPpp")}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {order.crops.map((crop) => (
                <Box
                  key={crop.id}
                  sx={{
                    mb: 3,
                    p: 3,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">
                        {crop.name} - {crop.quantity}kg
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Growing period: {crop.growingPeriodDays} days
                      </Typography>
                    </Box>

                    {crop.status === "pending" ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => onAcceptCrop(order.id, crop.id)}
                      >
                        Accept Crop
                      </Button>
                    ) : (
                      <Chip
                        icon={<AccessTime />}
                        label={`Harvest: ${format(
                          new Date(crop.harvestDate),
                          "PP"
                        )}`}
                        color="success"
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))
      )}
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
          growingPeriodDays: PropTypes.number.isRequired,
          status: PropTypes.string.isRequired,
          harvestDate: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  onAcceptCrop: PropTypes.func.isRequired,
};

export default FarmerDashboard;
