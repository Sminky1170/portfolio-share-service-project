import { Card, Row, Button, Col } from "react-bootstrap";

function EducationCard({ user, setIsAdding, isAddable, isEditable }) {
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "90%" }}>
      <Card.Body>
        <Row className="EducationTitle">
          <Card.Title>학력</Card.Title>
        </Row>

        <Row>
          <Col></Col>
          {isEditable && <Col></Col>}
        </Row>

        {isAddable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAdding(true)}
                  style={{ display: "block", margin: "0 auto" }}
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default EducationCard;
