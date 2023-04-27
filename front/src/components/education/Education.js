import React, { useState, useEffect } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import * as Api from "../../api";

function Education({ key, education, setEducations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          user={user}
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
