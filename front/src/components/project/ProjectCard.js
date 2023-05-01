import { useState, useEffect } from "react";
import { Card, Row, Form, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import formatDate from "../../util/formatDate";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  useEffect(() => {
    console.log(project);
  }, [project]);

  const handleSubmit = async (p) => {
    p.preventDefault();

    try {
      await Api.delete(`projects/${project.id}`);
      // 삭제 성공한 경우, projects 상태 업데이트
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== project.id)
      );
    } catch (error) {
      console.error(error);
      alert("프로젝트정보 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          프로젝트명 : {project.title}
          <br />
          <Row>
            <Col md="6">{`시작일 : ${formatDate(project.start_date)}`}</Col>
            <Col md="6">{`종료일 : ${formatDate(project.end_date)}`}</Col>
          </Row>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col></Col>
            {isEditable && (
              <Col>
                <div className="d-flex justify-content-end mr-2">
                  <Button
                    variant="primary"
                    type="button"
                    className="me-3"
                    onClick={() => setIsEditing(true)}
                  >
                    edit
                  </Button>
                  <Button variant="primary" type="submit" className="me-3">
                    Delete
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
