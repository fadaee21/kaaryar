import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import TableHeader from "../../components/table/TableHeader";
import { groupsTableHeader } from "../../components/table/helper-header";
import TableBodyGroups from "../../components/group/table/TableBodyGroups";
import { ShortGroup } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const GROUP_ALL =
    "/modules/categories/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=updated_at";

  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR<ShortGroup[]>(
    GROUP_ALL
  );

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    console.log(error);
    return <Typography sx={{ mx: "auto" }}>Error Loading Page</Typography>;
  }
  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست گروه‌ها</Typography>
            <Button
              variant="outlined"
              sx={{ px: 4 }}
              onClick={() => navigate("add-group")}
            >
              افزودن گروه جدید
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={groupsTableHeader} />
              <TableBody>
                {data?.map((groupAll) => (
                  <TableBodyGroups key={groupAll.id} groupAll={groupAll} />
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

export default Groups;
