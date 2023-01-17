import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

export const AccordionStyled = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 0,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export const AccordionSummaryStyled = styled(MuiAccordionSummary)(
  ({ theme }) => ({
    "& .MuiAccordionSummary-content": {
      justifyContent: "space-between",      
      marginLeft: theme.spacing(1),
    },
  })
);
