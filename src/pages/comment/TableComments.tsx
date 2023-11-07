import { useState } from "react";
import useSWR from "swr";
import LoadingProgress from "../../components/LoadingProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Comment, DetailStudentStatus } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { Container } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  Box,
  IconButton,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteComment } from "../../hooks/request/useDeleteComment";
import { useGetComments } from "../../hooks/request/useGetComments";
import { counterPagination } from "../../utils/counterPagination";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../../context/AuthProvider";
import TableHeader from "../../components/table/TableHeader";
import { commentsTableHeader } from "../../components/table/helper-header";
import { persianDate } from "../../utils/persianDate";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import SearchAllComments from "./SearchAllComments";
import TableEmpty from "../../components/table/TableEmpty";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { roleConverter } from "../../utils/roleConverter";
import dayjs, { Dayjs } from "dayjs";

const Comments = () => {
  const [chevronDir, setChevronDir] = useState(false);

  // ^searching- i have to create logic if user want delete a comment on search table, i need to code fetching search here that if user delete ane comment mutate search api to see latest content
  const [liftUpSearchState, setLiftUpSearchState] = useState<{
    student: string;
    commenterUser: string;
    commenterRole: DetailStudentStatus | null;
    sessionDateFrom: Date | Dayjs | null;
    sessionDateTo: Date | Dayjs | null;
    moduleName: DetailStudentStatus | null;
  }>({
    student: "",
    commenterUser: "",
    commenterRole: null,
    sessionDateFrom: null,
    sessionDateTo: null,
    moduleName: null,
  });
  const [searchingComments, setSearchingComments] = useState(false);
  const {
    auth: { id, username: usernameAuth },
    adminVisibility,
  } = useAuth();
  const {
    commenterRole,
    commenterUser,
    sessionDateFrom,
    student,
    sessionDateTo,
    moduleName,
  } = liftUpSearchState;

  // Define the base URL
  const BASE_URL = "/total/survey/search";
  // Construct the parameters
  // Construct the parameters conditionally
  const params = new URLSearchParams();

  if (!adminVisibility) {
    params.set("commenterId", String(id));
  }
  if (moduleName) {
    params.set("moduleName", moduleName.value.trim());
  }

  params.set("commenterName", commenterUser);
  params.set("studentName", student);

  if (commenterRole) {
    params.set("commenterRole", String(commenterRole.id));
  }

  if (sessionDateFrom) {
    const dataFrom = dayjs(sessionDateFrom).startOf("day").toISOString();
    params.set("sessionDateFrom", dataFrom);
  }

  if (sessionDateTo) {
    const dateTo = sessionDateTo.toISOString();
    params.set("sessionDateTo", dateTo);
  }

  params.set("pageNum", "1");
  params.set("pageSize", "100");
  params.set("orderAscending", "false");
  params.set("orderBy", "session_date");

  // Construct the full URL
  const SEARCH_URL = `${BASE_URL}?${params.toString()}`;

  const { error: errorSearch, mutate } = useSWR(
    searchingComments ? SEARCH_URL : null,
    {
      onSuccess: (data) => {
        setSearchingComments(false); //after get response disable swr, otherwise typing every character in textField send new req to server
        setSearchResult(data);
      },
      onError: () => setSearchingComments(false),
    }
  );
  if (errorSearch) {
    toast.error(handleError(errorSearch));
  }
  // ^searching

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<Comment[] | null>(null);

  const pageSize = adminVisibility ? 10 : 100;
  const { commentsTable, commentsTableLoading, commentCounter, refreshData } =
    useGetComments(page, pageSize);

  const [idComment, setIdComment] = useState<number>();
  const { removeComment } = useDeleteComment(idComment);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setIdComment(id);
  };

  //the bottleneck of this component was deleting,because after deleting in search table you should see the latest content and that's why i have to setSearchingComments(true) that swr let mutate searched data
  const handleDelete: () => void = async () => {
    setOpen(false);
    await removeComment();
    setSearchingComments(true);
    refreshData();
    mutate();
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (commentsTableLoading) {
    return <LoadingProgress />;
  }

  return (
    <Box component={"article"} sx={{ m: 2, mb: 8 }}>
      <Container maxWidth="xl">
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
        >
          <Typography variant="h4"> فهرست نظرات</Typography>
        </Box>

        <AccordionStyled expanded={chevronDir}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <AccordionSummaryStyled
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => setChevronDir(!chevronDir)}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="button">جستجو</Typography>
            </AccordionSummaryStyled>

            {/* <ExcelExport
                  fileName={"Applicant Info"}
                  searchData={[]}
                  linkAll=""
                  useIn="reg"
                /> */}
          </Box>
          <AccordionDetails>
            <Box
              sx={{
                width: "100%",
                my: 3,
              }}
            >
              <SearchAllComments
                setSearchResult={setSearchResult}
                setLiftUpSearchState={setLiftUpSearchState}
                setSearchingComments={setSearchingComments}
              />
            </Box>
          </AccordionDetails>
        </AccordionStyled>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* //!for empty response of search don't return TableHeader */}
            {searchResult?.length !== 0 && (
              <TableHeader headerItems={commentsTableHeader} />
            )}
            <TableBody>
              {(searchResult ?? commentsTable)?.map((commentItem: Comment) => {
                const {
                  id,
                  module,
                  student,
                  commenter,
                  commenterRole,
                  sessionDate,
                  studentPresent,
                  sessionProblem,
                } = commentItem;
                const { username } = commenter || { username: "" };
                const notAuthorizedUser = username !== usernameAuth;
                return (
                  <StyledTableRow
                    key={id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {/* <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: "10%", verticalAlign: "center" }}
                    >
                      {persianDate(createdAt)}
                    </StyledTableCell> */}
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: "10%", verticalAlign: "center" }}
                    >
                      {persianDate(sessionDate)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        width: "15%",
                        verticalAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Link to={`${id}`}>
                        {student.firstName + " " + student.family}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      {commenter?.firstName + " " + commenter?.family}
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      {roleConverter(commenterRole)}
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      {module?.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      {sessionProblem.length ? sessionProblem : "-"}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      {studentPresent.length
                        ? studentPresent === "بله"
                          ? "حاضر"
                          : "غایب"
                        : "-"}
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{
                        width: "10%",
                        verticalAlign: "center",
                      }}
                    >
                      <ListItem
                        sx={{ pt: 0, justifyContent: "center" }}
                        alignItems="center"
                      >
                        <IconButton>
                          <Link to={`${id}`}>
                            <VisibilityIcon fontSize="small" color="info" />
                          </Link>
                        </IconButton>
                        <IconButton
                          sx={{
                            ...(adminVisibility && {
                              display: "none",
                            }),
                            ...(notAuthorizedUser && {
                              display: "none",
                            }),
                          }}
                          disabled={notAuthorizedUser}
                        >
                          <Link to={`${id}/editing`}>
                            <EditIcon fontSize="small" color="primary" />
                          </Link>
                        </IconButton>
                        <IconButton
                          sx={{
                            ...(adminVisibility && {
                              display: "none",
                            }),
                            ...(notAuthorizedUser && {
                              display: "none",
                            }),
                          }}
                          onClick={() => handleClickOpen(id)}
                          disabled={notAuthorizedUser}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </ListItem>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"حذف  نظر"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    آیا می خواهید این نظر را حذف کنید؟
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDelete} autoFocus>
                    بله
                  </Button>
                  <Button onClick={handleClose}>خیر</Button>
                </DialogActions>
              </Dialog>
            </TableBody>
          </Table>
        </TableContainer>
        {/* //!for empty response of search return TableEmpty */}
        {searchResult?.length === 0 && <TableEmpty />}
      </Container>
      {!searchResult && adminVisibility && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={counterPagination(commentCounter?.count, pageSize)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default Comments;
