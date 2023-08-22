import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import TableHeader from "../../../components/table/TableHeader";
import TableBodyNotify from "../../../components/notify/TableBodyNotify";
import { notifyHeader } from "../../../components/table/helper-header";
import { Notify } from "../../../model";
const SMS_URL = "communications/sms/all";
const Email = () => {
  const { data: sms, isLoading, error } = useSWR<Notify[]>(SMS_URL);

  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            {/* <Typography variant="h4"> فهرست پیامک‌ها</Typography> */}
            {/* <Button
            variant="outlined"
            sx={{ px: 4 }}
            onClick={() => navigate("add-group")}
          >
            افزودن گروه جدید
          </Button> */}
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={notifyHeader} />
              <TableBody>
                {sms?.map((i) => (
                  <TableBodyNotify key={i.templateId} notifyData={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //!for empty response of search return TableEmpty */}
          {/* {searchingStudentRegister?.length === 0 && <TableEmpty />} */}
        </Container>
      </Box>
    </Box>
  );
};

export default Email;
