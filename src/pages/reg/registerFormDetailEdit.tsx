import React, { useEffect, useState } from "react";
import { editAxios, getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { Box, Button, ButtonGroup, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RegisterFormDetailEditComp from "../../components/RegisterFormDetail/RegisterFormDetailEditComp";
import { RegistrationForm } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

const RegisterFormDetailEdit = () => {
  const [student, setStudent] = useState<RegistrationForm | null>(null);
  const [loadingGet, setLoadingGet] = useState(true);
  const [loadingPut, setLoadingPut] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentId = `/reg/form/${id}`;

  const getStudent = async () => {
    setLoadingGet(true);
    try {
      let response = await getData(studentId);
      setStudent(response.data);
      setLoadingGet(false);
    } catch (error) {
      console.log(error);
      setLoadingGet(false);
      navigate("/");
    }
  };
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPut(true);
    try {
      const response = await editAxios(`/reg/form/${id}`, {
        data: student,
      });
      if (response.status === 200) {
        navigate(-1);
      } else {
        console.log(response);
      }
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoadingPut(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleChangeNameFamily = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const persianRegex = /^[\u0600-\u06FF\s]*$/;
    const toastId = "persian-input-error";
    if (!persianRegex.test(value)) {
      if (!toast.isActive(toastId)) {
        toast.error("نام و نام خانوادگی بصورت فارسی تایپ شود", { toastId });
      }
      return;
    }
    setStudent((prev: any) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    getStudent();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  if (loadingGet) {
    return <LoadingProgress />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          marginRight: 5,
        }}
      >
        <ButtonGroup size="small" variant="contained" sx={{ my: 3 }}>
          <Button
            onClick={handleClick}
            type="submit"
            disabled={loadingPut ? true : false}
          >
            ذخیره اطلاعات
          </Button>
          <Button
            endIcon={<ArrowBackIcon />}
            color="secondary"
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </ButtonGroup>
      </Box>
      <Container maxWidth="lg">
        <RegisterFormDetailEditComp
          student={student}
          handleChange={handleChange}
          handleChangeNameFamily={handleChangeNameFamily}
        />
      </Container>
    </>
  );
};

export default RegisterFormDetailEdit;
