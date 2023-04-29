import { useState, useEffect } from "react";
import { Card, Row, Form, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({
  educationId,
  education,
  isEditable,
  setIsEditing,
  setEducations,
}) {
  useEffect(() => {
    console.log(education);
  }, [education]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`educations/${educationId}`);
      // 삭제 성공한 경우, educations 상태 업데이트
      setEducations((prevEducations) =>
        prevEducations.filter((e) => e.id !== educationId)
      );
    } catch (error) {
      console.error(error);
      alert("학력정보 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <div>
          {education.school}
          <br />
          {education.major}
          {`(${education.degree})`}
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

export default EducationCard;
