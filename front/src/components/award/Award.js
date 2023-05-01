import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";

function Award({ awardId, award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          awardId={awardId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          award={award}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          awardId={awardId}
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setAwards={setAwards}
        />
      )}
    </>
  );
}

export default Award;
