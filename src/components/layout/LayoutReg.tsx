import { ContentBox } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
import { Divider, useMediaQuery } from "@mui/material";
interface Props {
  children: any;
  title?: string;
  NotRender?: boolean;
  colorActive?: boolean | null;
}
const LayoutReg: React.FC<Props> = ({
  children,
  title = "",
  NotRender = false,
  colorActive = false,
}) => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  if (NotRender) return children;
  return (
    <ContentBox colorActive={colorActive}>
      <DetailTypography variant="h6" sx={{ minWidth: "20%" }}>
        {title}
      </DetailTypography>
      <Divider
        variant="middle"
        flexItem
        orientation={matches ? "vertical" : "horizontal"}
      />
      {children}
    </ContentBox>
  );
};

export default LayoutReg;
