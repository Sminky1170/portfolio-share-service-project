import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  //useState로 학교이름(school) 상태를 생성함.
  const [school, setSchool] = useState("");
  //useState로 전공(major) 상태를 생성함.
  const [major, setMajor] = useState("");
  //useState로  학위(degree)상태를 생성함.
  const [degree, setDegree] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.post(`educations/${portfolioOwnerId.id}`, {
      school,
      major,
      degree,
    });
    // "education/유저id" end-point로 get요청
    const CreateEducation = res.data;
    // const CreateEducation = [
    //   {
    //     school,
    //     major,
    //     degree,
    //   },
    // ];
    // educations를 response -> data로 세팅
    setEducations((preEducations) => [...preEducations, CreateEducation]);
    // Add 모드가 끝남? addEducation을 false로 세팅
    setIsAdding(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="학교 이름을 입력하세요."
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="?"
              placeholder="전공"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              inline
              type="radio"
              id="degree-attending"
              label="재학 중"
              value="재학 중"
              checked={degree === "재학 중"}
              onChange={(e) => setDegree(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              id="degree-bachelor"
              label="학사 졸업"
              value="학사 졸업"
              checked={degree === "학사 졸업"}
              onChange={(e) => setDegree(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              id="degree-master"
              label="석사 졸업"
              value="석사 졸업"
              checked={degree === "석사 졸업"}
              onChange={(e) => setDegree(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              id="degree-doctor"
              label="박사 졸업"
              value="박사 졸업"
              checked={degree === "박사 졸업"}
              onChange={(e) => setDegree(e.target.value)}
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

export default EducationAddForm;
