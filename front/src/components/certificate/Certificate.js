import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";
import * as Api from "../../api";

function Certificate({ certificate, setCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          certificate={certificate}
          setCertificates={setCertificates}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Certificate;
