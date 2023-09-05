import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  // Typography,
} from "@mui/material";
import useSWR from "swr";
import TableHeader from "../../../components/table/TableHeader";
import TableBodyNotify from "../../../components/notify/TableBodyNotify";
import { smsHeader } from "../../../components/table/helper-header";
import { Notify } from "../../../model";
import LoadingProgress from "../../../components/LoadingProgress";
import { Navigate } from "react-router-dom";
import { handleError } from "../../../utils/handleError";
import { toast } from "react-toastify";
const SMS_URL = "communications/sms/all";
const SMSTable = () => {
  const { data: sms, isLoading, error } = useSWR<Notify[]>(SMS_URL);
  if (isLoading) return <LoadingProgress/>;
  if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }
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
              <TableHeader headerItems={smsHeader} />
              <TableBody>
                {sms?.map((i) => (
                  <TableBodyNotify key={i.templateId} notifyData={i} typeComp="sms"/>
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

export default SMSTable;
