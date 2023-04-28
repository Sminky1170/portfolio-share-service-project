import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";

function Award({ Award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          Award={Award}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          Award={Award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Award;
