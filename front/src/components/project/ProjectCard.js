import { useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          {project.title}
          <br />
          {project.start_date}
          <br />
          {project.end_date}
        </div>
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
              </div>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
