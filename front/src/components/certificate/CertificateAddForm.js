import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  //useState로 학교이름(school) 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 전공(major) 상태를 생성함.
  const [organization, setOrganization] = useState("");
  //useState로  학위(degree)상태를 생성함.
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`certificates`, {
        user_id: portfolioOwnerId,
        name,
        organization,
        date: new Date(date),
      });

      const createdCertificate = res.data;
      setCertificates((prevCertificates) => [
        ...prevCertificates,
        createdCertificate,
      ]);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("자격증 정보 추가에 실패했습니다. 다시 시도해주세요.");
    }

    // "education/유저id" end-point로 get요청
    // const CreateEducation = [
    //   {
    //     school,
    //     major,
    //     degree,
    //   },
    // ];
    // educations를 response -> data로 세팅
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
              placeholder="발행기관"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CertificateAddForm;
