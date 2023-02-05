import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FooterTheme, GridContainerFooter } from "../styles/footer";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LogoLight from "./LogoLightSVG";
const Footer = () => {
  return (
    <FooterTheme>
      <Container maxWidth="xl">
        <GridContainerFooter container>
          <Grid item sx={{ flex: 1.1, ml: 5 }}>
            <LogoLight/>
          </Grid>
          <Grid item sx={{ flex: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bolder" }}
              gutterBottom
            >
              سامانه آموزش مجازی موسسه فرشته کاریار
            </Typography>
            <Stack direction={"row"} spacing={0.5}>
              <FmdGoodIcon fontSize="small" />
              <Typography variant="caption" gutterBottom>
                تهران، خیابان قائم مقام فراهانی، کوچه یکم، شماره 17، طبقه 2
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5} sx={{ mt: 2 }}>
              <PhoneEnabledIcon fontSize="small" />
              <Typography variant="caption">021-88842693</Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Stack direction={"row"} spacing={0.5}>
              <PublicIcon fontSize="small" />
              <Typography variant="caption">kaaryar.ir</Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <EmailIcon fontSize="small" />
              <Typography variant="caption">info@kaaryar.ir</Typography>
            </Stack>

            <Stack direction={"row"} sx={{ mt: 2 }}>
              <Link
                href="http://instagram.com/karyar.college"
                title="http://instagram.com/karyar.college"
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon color="primary" fontSize="small" />
              </Link>
              <Link
                href="http://www.linkedin.com/company/karyaarinst"
                title="http://www.linkedin.com/company/karyaarinst"
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon color="primary" fontSize="small" />
              </Link>
            </Stack>
          </Grid>
        </GridContainerFooter>
      </Container>
    </FooterTheme>
  );
};

export default Footer;
