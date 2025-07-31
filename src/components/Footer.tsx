import { Box, Link } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 4,
      py: 2,
      textAlign: "center",
      fontSize: 14,
      color: "text.secondary",
    }}
  >
    <Link
      href="mailto:becirifikacija@gmail.com"
      color="inherit"
      underline="none"
    >
      becirifikacija@gmail.com
    </Link>
  </Box>
);

export default Footer;
