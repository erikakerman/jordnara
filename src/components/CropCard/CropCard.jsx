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
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4">
        <Box className="text-center">
          <Box className="flex justify-center mb-2">
            <crop.Icon sx={{ fontSize: 80, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" className="font-medium">
            {crop.name}
          </Typography>
        </Box>

        <Divider />

        <Box className="text-center">
          <Typography variant="h6" color="primary" className="mb-1">
            ${crop.pricePerKg}/kg
          </Typography>
          <Box className="flex items-center justify-center gap-1 text-gray-600">
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
