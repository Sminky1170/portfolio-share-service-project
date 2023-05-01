import { useEffect } from "react";
import { Card, Row, Form, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function CertificateCard({
  certificateId,
  certificate,
  isEditable,
  setIsEditing,
  setCertificates,
}) {
  useEffect(() => {
    console.log(certificate);
  }, [certificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`certificates/${certificateId}`);
      // 삭제 성공한 경우, certificates 상태 업데이트
      setCertificates((prevCertificates) =>
        prevCertificates.filter((e) => e.id !== certificateId)
      );
    } catch (error) {
      console.error(error);
      alert("자격증정보 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          {`자격증명 : ${certificate.name}`}
          <br />
          {`기관명 : ${certificate.organization}`}
          <br />
          {`발급일 : ${formatDate(certificate.issue_date)}`}
          <br />
          {`만료일 : ${formatDate(certificate.expiration_date)}`}
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

export default CertificateCard;
