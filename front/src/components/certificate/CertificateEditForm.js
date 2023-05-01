import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({ certificate, setIsEditing, setCertificates }) {
  //useState로 자격증명(name) 상태를 생성함.
  const [name, setName] = useState(certificate.name);
  //useState로 기관(organization) 상태를 생성함.
  const [organization, setOrganization] = useState(certificate.organization);
  //useState로  유효기간(date)상태를 생성함.
  const [issueDate, setIssueDate] = useState(certificate.issue_date);
  const [expirationDate, setExpirationDate] = useState(
    certificate.expiration_date
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`certificates/${certificate.id}`, {
        id: certificate.id,
        name,
        organization,
        issue_date: new Date(issueDate),
        expiration_date: new Date(expirationDate),
      });

      const updateCertificate = res.data;

      setCertificates((prevCertificates) =>
        prevCertificates.map((certificate) =>
          certificate.id === certificate.id ? updateCertificate : certificate
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("자격증정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* 클래스네임, 컨트롤ID? 정해야하나*/}
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="자격증명을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="?"
              placeholder="발급기관"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Row>
              <Col md="6">
                <Form.Control
                  type="date"
                  placeholder="자격증 발급일 yyyy-mm-dd"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </Col>
              <Col md="6">
                <Form.Control
                  type="date"
                  placeholder="자격증 만료일 yyyy-mm-dd"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CertificateEditForm;
