import React, { useState } from "react";
import AddOrEditGroupComp from "../addOrEditGroupComp";
import { editAxios } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
interface Props {
  startDateGet: any;
  endDateGet: any;
  nameGet: string;
  groupCodeGet: string;
  descriptionGet: string;
  id: number;
}
const EditGroupComp = ({
  startDateGet,
  endDateGet,
  nameGet,
  groupCodeGet,
  descriptionGet,
  id,
}: Props) => {
  const GROUP_EDIT = `/modules/categories/${id}`;
  const [startDate, setStartDate] = useState<any>(startDateGet || null);
  const [endDate, setEndDate] = useState<any>(endDateGet || null);
  const [name, setName] = useState(nameGet || "");
  const [groupCode, setGroupCode] = useState(groupCodeGet || "");
  const [description, setDescription] = useState(descriptionGet || "");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await editAxios(GROUP_EDIT, {
        data: { startDate, endDate, name, groupCode, description },
      });

      if (response.status === 200) {
        navigate("/admin/groups");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(startDate, endDate, name, groupCode, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddOrEditGroupComp
        compType="edit"
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
  );
};

export default EditGroupComp;
