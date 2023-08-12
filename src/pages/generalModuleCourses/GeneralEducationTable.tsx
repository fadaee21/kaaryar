import { Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import LanguageTable from "./language/LanguageTable";
import WorkshopTable from "./workshops/WorkshopTable";
import InterpersonalTable from "./interpersonal/InterpersonalTable";
import VocationalTable from "./vocational/VocationalTable";
import { useSearchParams } from "react-router-dom";

const GeneralEducationTable = () => {
  const [value, setValue] = useState(0);
  const [tab, setTab] = useSearchParams(undefined);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setTab({ tab: newValue.toString() });
  };

  let numberValue;

  const tabVal = tab.get("tab");

  if (tabVal !== null) {
    numberValue = Number(tabVal);
  } else {
    numberValue = 0;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="lg">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h5">فهرست دوره‌های عمومی</Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={numberValue || value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="کارگاه‌های جانبی" {...a11yProps(0)} />
              <Tab label="دوره‌های زبان انگلیسی" {...a11yProps(1)} />
              <Tab label="مهارت‌های حرفه‌ای" {...a11yProps(2)} />
              <Tab label="مهارت‌های ارتباطی" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={numberValue || value} index={0}>
            <WorkshopTable />
          </TabPanel>

          <TabPanel value={numberValue || value} index={1}>
            <LanguageTable />
          </TabPanel>
          <TabPanel value={numberValue || value} index={2}>
            <VocationalTable />
          </TabPanel>
          <TabPanel value={numberValue || value} index={3}>
            <InterpersonalTable />
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
};

export default GeneralEducationTable;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
