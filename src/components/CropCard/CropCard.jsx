import {
  Card,
  CardContent,
  Box,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";
import PropTypes from "prop-types";

function CropCard({ crop, quantity = "", onQuantityChange }) {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <crop.Icon sx={{ fontSize: 80, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {crop.name}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            ${crop.pricePerKg}/kg
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "text.secondary",
            }}
          >
            <Schedule fontSize="small" />
            <Typography variant="body1">
              Growing period: {crop.growingPeriodDays} days
            </Typography>
          </Box>
        </Box>

        <TextField
          label="Quantity (kg)"
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(crop.id, e.target.value)}
          inputProps={{ min: 0 }}
          size="small"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}

CropCard.propTypes = {
  crop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pricePerKg: PropTypes.number.isRequired,
    growingPeriodDays: PropTypes.number.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onQuantityChange: PropTypes.func.isRequired,
};

export default CropCard;
