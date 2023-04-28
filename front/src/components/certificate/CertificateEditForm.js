import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({ education, setIsEditing, setEducations }) {
  //useState로 학교이름(school) 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 전공(major) 상태를 생성함.
  const [organization, setOrganization] = useState("");
  //useState로  학위(degree)상태를 생성함.
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // "users/유저id" 엔드포인트로 PUT 요청함.-------users는 어디서 생겼?
    // const res = await Api.put(`educations/${education.id}`, {
    //   //사람이름...?
    //   school,
    //   major,
    //   degree,
    // });
    // // educationlist를 get요청 해야하는지?
    // const updateEducation = res.data;
    const updateEducation = [
      {
        name,
        organization,
        date: new Date(date),
      },
    ];
    // 해당 유저 정보로 user을 세팅함.
    setEducations(updateEducation);

    // isEditing을 false로 세팅함.--->??
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* 클래스네임, 컨트롤ID? 정해야하나*/}
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="수상 이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="?"
              placeholder="주최기관"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="date"
              placeholder="수상일자"
              value={date}
              checked={date === "재학 중"}
              onChange={(e) => setDate(e.target.value)}
            />
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
