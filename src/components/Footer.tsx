import React from "react";
import { Grid, Link, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";

import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FooterTheme, GridContainerFooter } from "../styles/footer";

const Footer = () => {
 
  return (
    <FooterTheme>
      <Container maxWidth="xl">
        <GridContainerFooter container>
          <Grid item sx={{ mb: { xs: 5 } }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bolder" }}
              gutterBottom
            >
              سامانه آموزش مجازی موسسه فرشته کاریار
            </Typography>
            <Typography variant="body1">
              تهران، خیابان قائم مقام فراهانی، کوچه یکم، شماره 17، طبقه 2
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction={"row"} spacing={0.5}>
              <PublicIcon fontSize="small" />
              <Typography variant="subtitle2">kaaryar.ir</Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <EmailIcon fontSize="small" />
              <Typography variant="subtitle2">info@kaaryar.ir</Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <PhoneIphoneIcon fontSize="small" />
              <Typography variant="subtitle2">021-88842693</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ mt: 2 }}>
              <Link
                href="http://instagram.com/karyar.college"
                title="http://instagram.com/karyar.college"
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon color="primary" fontSize="large" />
              </Link>
              <Link
                href="http://www.linkedin.com/company/karyaarinst"
                title="http://www.linkedin.com/company/karyaarinst"
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon color="primary" fontSize="large" />
              </Link>
            </Stack>
          </Grid>
        </GridContainerFooter>
      </Container>
    </FooterTheme>
  );
};

export default Footer;
