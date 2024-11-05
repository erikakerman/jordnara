import { Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import CropCard from "../CropCard";
import { crops } from "../../data/crops";

function CropGrid({ quantities, onQuantitiesChange }) {
  const handleQuantityChange = (cropId, value) => {
    if (value === "" || value >= 0) {
      const newQuantities = {
        ...quantities,
        [cropId]: value,
      };
      onQuantitiesChange(newQuantities);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          margin: 0,
        }}
      >
        {crops.map((crop) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            key={crop.id}
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Box sx={{ width: "100%", display: "flex" }}>
              <CropCard
                crop={crop}
                quantity={quantities[crop.id] || ""}
                onQuantityChange={handleQuantityChange}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

CropGrid.propTypes = {
  quantities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onQuantitiesChange: PropTypes.func.isRequired,
};

export default CropGrid;
