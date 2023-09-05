import EditEmailComp from "../../../components/notify/EditEmailComp";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { Container, Typography } from "@mui/material";
import { handleError } from "../../../utils/handleError";
import { Notify } from "../../../model";
import LoadingProgress from "../../../components/LoadingProgress";

const EditEmail = () => {
  const { notifyId } = useParams();

  const navigate = useNavigate();
  const { data, isLoading, error,mutate } = useSWR<Notify>(
    `/communications/emails/get/${notifyId}`,
    {
      onError: (error) => {
        toast.error(handleError(error));
        if (error.response?.status === 401) {
          navigate("/");
        }
      },
    }
  );

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    return (
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <EditEmailComp data={data} notifyId={notifyId} mutate={mutate} />
    </Container>
  );
};

export default EditEmail;
