import { Alert, Slide, Snackbar } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { postData } from "../../../api/axios";

import AddOrEditGroupComp from "../addOrEditGroupComp";

const AddGroupComp = () => {
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{
    val: string;
    type: "success" | "error";
  }>({ val: "", type: "error" });
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [name, setName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function TransitionLeft(props: any) {
    return <Slide {...props} direction="left" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [startDate, name, groupCode].every(
        (value) => value !== "" && value !== null
      )
    ) {
      try {
        let reqOptions = {
          url: "/modules/categories/new",
          data: {
            startDate,
            endDate,
            name,
            groupCode,
            description,
          },
        };
        let response = await postData(reqOptions);
        console.log(response);
        if (response.status === 200) {
          setStartDate(null);
          setEndDate(null);
          setName("");
          setGroupCode("");
          setDescription("");
          navigate("/admin/groups");
        } else {
          console.log(response);
          setAlertMsg({ type: "error", val: response.data.detail });
          setOpen(true);
        }
      } catch (error: any) {
        console.log(error);
        setAlertMsg({ type: "error", val: error.response.data.detail });
        setOpen(true);
      }
    } else {
      setAlertMsg({ type: "error", val: "فیلد های شماره گروه و نام گروه و تاریخ شروع باید پر شوند" });
      setOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AddOrEditGroupComp
          compType="add"
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          name={name}
          setName={setName}
          groupCode={groupCode}
          setGroupCode={setGroupCode}
          description={description}
          setDescription={setDescription}
        />
      </form>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        TransitionComponent={TransitionLeft}
      >
        <Alert severity={alertMsg.type}>{alertMsg.val}</Alert>
      </Snackbar>
    </>
  );
};

export default AddGroupComp;
