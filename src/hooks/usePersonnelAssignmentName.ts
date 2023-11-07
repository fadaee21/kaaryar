import { PersonnelAssignment } from "../model";

const usePersonnelAssignmentName = () => {
  const personnelAssignmentName = (
    role: "ta" | "mentor",
    personnelAssignment: PersonnelAssignment[] | undefined
  ): string => {
    if (personnelAssignment) {
      const assignedPersonnel = personnelAssignment.find( // assume there is only one mentor and ta i use find, otherwise change it to filter and more changes
        (i) => i.personnelRole === role
      );
      return assignedPersonnel
        ? `${assignedPersonnel.personnel.firstName} ${assignedPersonnel.personnel.family}`
        : "-";
    }
    return "-";
  };
  return personnelAssignmentName;
};

export default usePersonnelAssignmentName;
