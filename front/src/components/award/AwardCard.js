import { useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

function AwardCard({ award, isEditable, setIsEditing }) {
  useEffect(() => {
    console.log(award);
  }, [award]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          {award.school}
          <br />
          {award.major}
          {`(${award.degree})`}
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

export default AwardCard;
