import { useState } from "react";
import useSWR from "swr";
import LoadingProgress from "../../components/LoadingProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Comment } from "../../model";
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
import style from "../../styles/search/searchChevron.module.css";
import { useDeleteComment } from "../../hooks/request/useDeleteComment";
import { useGetComments } from "../../hooks/request/useGetComments";
import { counterPagination } from "../../utils/counterPagination";
import { useNavigate } from "react-router-dom";
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

const Comments = () => {
  const [chevronDir, setChevronDir] = useState(false);

  // ^searching- i have to create logic if user want delete a comment on search table, i need to code fetching search here that if user delete ane comment mutate search api to see latest content
  const [liftUpSearchState, setLiftUpSearchState] = useState<{
    student: string;
    commenterUser: string;
  }>({ student: "", commenterUser: "" });
  const [searchingComments, setSearchingComments] = useState(false);
  const {
    auth: { id },
    adminVisibility,
  } = useAuth();
  const SEARCH_URL = `/total/survey/search?commenterId=${
    !adminVisibility ? id : "" //while you are not admin send your id as commenter by default otherwise you can search for commenter
  }&commenterName=${liftUpSearchState?.commenterUser}&studentName=${
    liftUpSearchState?.student
  }&pageNum=1&pageSize=100&orderAscending=false&orderBy=session_date`;

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

  const navigate = useNavigate();
  const pageSize = adminVisibility ? 10 : 100;
  const { commentsTable, commentsTableLoading, commentCounter, refreshData } =
    useGetComments(page, pageSize);
  const handleClickOpenEdit = (id: any) => {
    navigate(`${id}/editing`);
  };
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

        <AccordionStyled>
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
            >
              <Typography variant="button">جستجو</Typography>
              <ExpandMoreIcon
                className={chevronDir ? style.rotate180 : style.rotate0}
              />
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
                } = commentItem;
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
                      {persianDate(createTime)}
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
                      onClick={() => navigate(`${id}`)}
                    >
                      <Typography variant="body1">
                        {student.firstName + " " + student.family}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        {commenter?.firstName + " " + commenter?.family}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        {roleConverter(commenterRole)}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">{module?.name}</Typography>
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
                        <IconButton onClick={() => navigate(`${id}`)}>
                          <VisibilityIcon fontSize="small" color="info" />
                        </IconButton>
                        <IconButton
                          sx={{
                            ...(adminVisibility && {
                              display: "none",
                            }),
                          }}
                          onClick={() => handleClickOpenEdit(`${id}`)}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          sx={{
                            ...(adminVisibility && {
                              display: "none",
                            }),
                          }}
                          onClick={() => handleClickOpen(id)}
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
