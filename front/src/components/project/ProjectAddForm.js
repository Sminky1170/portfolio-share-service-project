import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`projects`, {
        user_id: portfolioOwnerId,
        title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      });

      const createdProject = res.data;
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("프로젝트 정보 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
                  placeholder="프로젝트 시작일 yyyy-mm-dd"
                  value={start_date}
                  onChange={(e) => setStart_Date(e.target.value)}
                />
              </Col>
              <Col md="6">
                <Form.Control
                  type="date"
                  placeholder="프로젝트 종료일 yyyy-mm-dd"
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

export default ProjectAddForm;
