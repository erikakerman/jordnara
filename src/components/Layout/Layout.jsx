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
        width: "100vw",
        overflowX: "hidden",
        bgcolor: "grey.50", // Light gray background for the entire app
      }}
    >
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "45vh", // Increased height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #f5f9ff 0%, #ffffff 100%)", // Subtle gradient
          padding: { xs: 4, md: 8 }, // Responsive padding
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #f0f0f0 2%, transparent 0%)",
            backgroundSize: "50px 50px",
            opacity: 0.4,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
            position: "relative", // To appear above the pattern
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              marginBottom: 3,
              background: "linear-gradient(45deg, #1976d2, #2196f3)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            From Farm to Table, Simplified
          </Typography>

          <Typography
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto",
              fontWeight: 400,
            }}
          >
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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: { xs: 2, sm: 4 },
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
