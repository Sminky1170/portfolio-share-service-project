import React, { useState, useEffect } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import * as Api from "../../api";

function Education({ educationId, education, setEducations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          educationId={educationId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          education={education}
          setEducations={setEducations}
        />
      ) : (
        <EducationCard
          educationId={educationId}
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
        />
      )}
    </>
  );
}

export default Education;
