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
import { emailHeader } from "../../../components/table/helper-header";
import { Notify } from "../../../model";
import LoadingProgress from "../../../components/LoadingProgress";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/handleError";
const EMAIL_URL = "communications/emails/all";

const Email = () => {
  const { data: emails, isLoading, error } = useSWR<Notify[]>(EMAIL_URL);

  if (isLoading) return <LoadingProgress />;
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
            {/* <Typography variant="h4"> فهرست ایمیل‌ها</Typography> */}
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
              <TableHeader headerItems={emailHeader} />
              <TableBody>
                {emails?.map((emails) => (
                  <TableBodyNotify
                    key={emails.templateId}
                    notifyData={emails}
                    typeComp="email"
                  />
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
