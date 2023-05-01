import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({
  certificateId,
  certificate,
  setCertificates,
  isEditable,
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          certificateId={certificateId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          certificate={certificate}
          setCertificates={setCertificates}
        />
      ) : (
        <CertificateCard
          certificateId={certificateId}
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificates={setCertificates}
        />
      )}
    </>
  );
}

export default Certificate;
