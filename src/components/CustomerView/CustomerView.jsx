import { Box, Button, Typography, Container } from "@mui/material";
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
    <Container maxWidth="xl">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            textAlign: { xs: "center", md: "left" },
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: { xs: "50%", md: 0 },
              transform: { xs: "translateX(-50%)", md: "none" },
              width: 60,
              height: 3,
              bgcolor: "primary.main",
              borderRadius: 1,
            },
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
            mt: 4,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={onSubmitRequest}
            disabled={Object.values(quantities).every((q) => !q)}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Submit Request
          </Button>
        </Box>

        {orders.length > 0 && (
          <Box
            sx={{
              mt: 6,
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 4,
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Your Orders
            </Typography>
            {orders.map((order) => (
              <OrderStatus key={order.id} order={order} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
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
