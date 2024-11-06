import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CropGrid from "../CropGrid";
import OrderStatus from "../OrderStatus";

function CustomerView({
  quantities,
  onQuantitiesChange,
  onSubmitRequest,
  orders,
}) {
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
        Customer View
      </Typography>

      <Box sx={{ width: "100%" }}>
        <CropGrid
          quantities={quantities}
          onQuantitiesChange={onQuantitiesChange}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={onSubmitRequest}
          disabled={Object.values(quantities).every((q) => !q)}
        >
          Submit Request
        </Button>
      </Box>

      {orders.length > 0 && (
        <Box sx={{ mt: 8, width: "100%" }}>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Your Orders
          </Typography>
          {orders.map((order) => (
            <OrderStatus key={order.id} order={order} />
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
          harvestDate: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default CustomerView;
