import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <Container maxWidth="lg" className="mt-8 mb-8">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Jordnara Farm Orders
      </Typography>
      {children}
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
