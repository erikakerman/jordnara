import { Grid } from "@mui/material";
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
    <Grid container spacing={3}>
      {crops.map((crop) => (
        <Grid item xs={12} sm={6} md={4} key={crop.id}>
          <CropCard
            crop={crop}
            quantity={quantities[crop.id] || ""}
            onQuantityChange={handleQuantityChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}

CropGrid.propTypes = {
  quantities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onQuantitiesChange: PropTypes.func.isRequired,
};

export default CropGrid;
