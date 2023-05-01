import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 certificates, isAdding 상태 생성
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`certificates/${portfolioOwnerId}`)
      .then((res) => setCertificates(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>

        {certificates.map((certificate) => (
          <Certificate
            certificateId={certificate.id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
