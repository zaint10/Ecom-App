import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { Facebook, Instagram } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Footer() {
  const StyledFooterConrainer = styled.footer`
    padding: 0 0;
  `;

  const StyledSocialIconContainer = styled.div`
    text-align: end;
    & > * {
      margin-right: 8px;
    }
  `;

  return (
    <StyledFooterConrainer>
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" align="start" gutterBottom>
              <strong>Get connected with us on social networks</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledSocialIconContainer>
              <IconButton href="#!">
                <Facebook sx={{ color: "#3b5998" }} />
              </IconButton>
              <IconButton href="#!">
                <Instagram sx={{ color: "#ac2bac" }} />
              </IconButton>
            </StyledSocialIconContainer>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "20px 0" }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <ul>
              <li>
                <Link href="#!" color="inherit">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Media
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Job offers
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Cooperation
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <ul>
              <li>
                <Link href="#!" color="inherit">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Automotive
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <ul>
              <li>
                <Link href="#!" color="inherit">
                  Complaints
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit">
                  FAQ
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Divider style={{ margin: "20px 0" }} />
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          © 2024 Zain. All rights reserved.
        </Typography>
      </Container>
    </StyledFooterConrainer>
  );
}

export default Footer;
