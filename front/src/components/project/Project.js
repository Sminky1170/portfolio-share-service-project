import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api";

function Project({ project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          project={project}
          setProjects={setProjects}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
