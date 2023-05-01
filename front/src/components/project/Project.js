import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api";

function Project({ projectId, project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          projectId={projectId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          project={project}
          setProjects={setProjects}
        />
      ) : (
        <ProjectCard
          projectId={projectId}
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setProjects={setProjects}
        />
      )}
    </>
  );
}

export default Project;
