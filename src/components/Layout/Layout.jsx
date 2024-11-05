import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw", // Full viewport width
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          padding: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
            }}
          >
            From Farm to Table, Simplified
          </Typography>

          <Typography variant="h5" component="p" color="text.secondary">
            Connect directly with local farmers and pre-order fresh, seasonal
            produce while supporting sustainable agriculture.
          </Typography>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          padding: 0, // Remove padding here
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
