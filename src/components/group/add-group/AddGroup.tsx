import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { postData } from "../../../api/axios";

import AddOrEditGroupComp from "../addOrEditGroupComp";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/handleError";

const AddGroupComp = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [name, setName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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

        if (response.status === 200) {
          toast.success("گروه جدید ایجاد شد");
          setStartDate(null);
          setEndDate(null);
          setName("");
          setGroupCode("");
          setDescription("");
          navigate("/admin/groups");
        } else {
          console.log(response);
          toast.error(response.data.detail || "گروه جدید ایجاد نشد");
        }
      } catch (error: any) {
        toast.error(handleError(error));
      }
    } else {
      toast.error("فیلد های شماره گروه و نام گروه و تاریخ شروع باید پر شوند");
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
    </>
  );
};

export default AddGroupComp;
