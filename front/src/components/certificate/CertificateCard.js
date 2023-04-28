import { useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  useEffect(() => {
    console.log(certificate);
  }, [certificate]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          {certificate.name}
          <br />
          {certificate.organization}
          {`(${certificate.date})`}
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

export default CertificateCard;
