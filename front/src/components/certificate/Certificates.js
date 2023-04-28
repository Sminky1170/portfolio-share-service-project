import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 educations, isAdding 상태 생성
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "educations/id" GET 요청, response의 data -> educations 세팅
    Api.get(`certificate/${portfolioOwnerId}`).then((res) =>
      setCertificates(res.data)
    );
    // setEducations([
    //   {
    //     school: "1",
    //     name: "elice",
    //     major: "computer",
    //   },
    // ]);
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>

        {certificates.map((certificate) => (
          <Certificate
            education={certificate}
            setEducations={setCertificates}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setCertificates}
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
