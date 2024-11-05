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
    <>
      <CropGrid
        quantities={quantities}
        onQuantitiesChange={onQuantitiesChange}
      />

      <Box className="flex justify-center mt-6">
        <Button
          variant="contained"
          onClick={onSubmitRequest}
          disabled={Object.values(quantities).every((q) => !q)}
        >
          Submit Request
        </Button>
      </Box>

      {orders.length > 0 && (
        <Box className="mt-8">
          <Typography variant="h6" className="mb-4">
            Your Orders
          </Typography>
          {orders.map((order) => (
            <OrderStatus key={order.id} order={order} />
          ))}
        </Box>
      )}
    </>
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
