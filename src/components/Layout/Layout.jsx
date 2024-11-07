import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import farmBackground from "../../assets/farm.jpg";

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
        bgcolor: "grey.50",
      }}
    >
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "45vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${farmBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 2, // Place text above the overlay
            padding: { xs: 4, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              marginBottom: 3,
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Från din lokala odlare, till ditt matbord
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "grey.100",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto",
              fontWeight: 400,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Från söta morötter till friska grönsaker, vi har allt du behöver för
            att skapa en fantastisk måltid.
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
