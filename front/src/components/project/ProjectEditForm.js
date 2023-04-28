import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function ProjectEditForm({ project, setIsEditing, setProjects }) {
  const [title, setTitle] = useState(project.title);
  const [startdate, setStart_Date] = useState(project.startdate);
  const [enddate, setEnd_Date] = useState(project.enddate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // "users/유저id" 엔드포인트로 PUT 요청함.-------users는 어디서 생겼?
    // const res = await Api.put(`projects/${project.id}`, {
    //   //사람이름...?
    //   school,
    //   major,
    //   degree,
    // });
    // // projectlist를 get요청 해야하는지?
    // const updateProject = res.data;
    const updateProject = [
      {
        title,
        startdate,
        enddate,
      },
    ];
    // 해당 유저 정보로 user을 세팅함.
    setProjects(updateProject);

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
              placeholder="프로젝트 명을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Row>
            <Col md="6">
            <Form.Control
              type="date"
              placeholder="프로젝트 시작일"
              value={startdate}
              onChange={(e) => setStart_Date(e.target.value)}
            />
            </Col>
            <Col md="6">
            <Form.Control
              type="date"
              placeholder="프로젝트 종료일"
              value={enddate}
              onChange={(e) => setEnd_Date(e.target.value)}
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

export default ProjectEditForm;
