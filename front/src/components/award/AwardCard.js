import { useState, useEffect } from "react";
import { Card, Row, Form, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function AwardCard({ awardId, award, isEditable, setIsEditing, setAwards }) {
  useEffect(() => {
    console.log(award);
  }, [award]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`awards/${awardId}`);
      // 삭제 성공한 경우, Awards 상태 업데이트
      setAwards((prevAwards) => prevAwards.filter((e) => e.id !== awardId));
    } catch (error) {
      console.error(error);
      alert("수상이력 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          {`수상명 : ${award.title}`}
          <br />
          {`주관명 : ${award.organization}`}
          <br />
          {`수상일 : ${formatDate(award.date)}`}
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

export default AwardCard;
