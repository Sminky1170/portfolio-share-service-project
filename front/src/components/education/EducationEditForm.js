import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ education, setIsEditing, setEducations }) {
  //useState로 학교이름(school) 상태를 생성함.
  const [school, setSchool] = useState(education.school);
  //useState로 전공(major) 상태를 생성함.
  const [major, setMajor] = useState(education.major);
  //useState로  학위(degree)상태를 생성함.
  const [degree, setDegree] = useState(education.degree);

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
        school,
        major,
        degree,
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

export default EducationEditForm;
