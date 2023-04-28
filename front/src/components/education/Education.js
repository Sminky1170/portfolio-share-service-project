import React, { useState, useEffect } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import * as Api from "../../api";

<<<<<<< HEAD
function Education({  education, setEducations, isEditable }) {
=======
function Education({ education, setEducations, isEditable }) {
>>>>>>> front_dev
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          education={education}
          setEducations={setEducations}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Education;
