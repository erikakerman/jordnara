import {
  Card,
  CardContent,
  Box,
  TextField,
  Divider,
  Typography,
  CardMedia,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";
import PropTypes from "prop-types";

function CropCard({ crop, quantity = "", onQuantityChange }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "75%" }}>
        <CardMedia
          component="img"
          image={crop.image}
          alt={crop.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            bgcolor: "background.paper",
            p: 1,
          }}
        />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 3,
          gap: 2,
          "&:last-child": {
            paddingBottom: 3,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {crop.name}
          </Typography>
        </Box>

        <Divider sx={{ opacity: 0.6 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            {crop.pricePerKg}
            <Typography
              component="span"
              sx={{
                fontSize: "0.9rem",
                color: "text.secondary",
              }}
            >
              kr/kg
            </Typography>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "text.secondary",
              bgcolor: "grey.50",
              borderRadius: 1,
              padding: "4px 8px",
              mt: 1,
            }}
          >
            <Schedule
              fontSize="small"
              color="primary"
              sx={{ fontSize: "1rem" }}
            />
            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
              {crop.growingPeriodDays}
            </Typography>
          </Box>
        </Box>

        <TextField
          label="kg"
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(crop.id, e.target.value)}
          inputProps={{
            min: 0,
            sx: {
              textAlign: "center",
              padding: "8px 12px",
            },
          }}
          size="small"
          fullWidth
          sx={{
            mt: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
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
    image: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onQuantityChange: PropTypes.func.isRequired,
};

export default CropCard;
