import React, { useState, useEffect } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import * as Api from "../../api";

function Education({ portfolioOwnerId, isEditable, isAddable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isAdding ? (
        <EducationEditForm
          user={user}
          setIsEditing={setIsEditing}
          setIsAdding={setIsAdding}
          isEditable={isEditable}
          isAddable={isAddable}
        />
      ) : (
        <EducationCard
          user={user}
          setIsEditing={setIsEditing}
          setIsAdding={setIsAdding}
          isEditable={isEditable}
          isAddable={isAddable}
        />
      )}
    </>
  );
}

export default Education;
