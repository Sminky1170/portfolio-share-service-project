import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function ProjectEditForm({ projectId, project, setIsEditing, setProjects }) {
  const [title, setTitle] = useState(project.title);
  const [start_date, setStart_Date] = useState(project.start_date);
  const [end_date, setEnd_Date] = useState(project.end_date);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`projects/${projectId}`, {
        id: projectId,
        title,
        start_date,
        end_date,
      });

      const updateProject = res.data;

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updateProject : project
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("프로젝트 수정에 실패했습니다. 다시 시도해주세요.");
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
                  value={start_date}
                  onChange={(e) => setStart_Date(e.target.value)}
                />
              </Col>
              <Col md="6">
                <Form.Control
                  type="date"
                  placeholder="프로젝트 종료일"
                  value={end_date}
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
