import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function Educations({ portfolioOwnerId, isEditable }) {
  //useState로 educations, isAdding 상태 생성
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "educations/id" GET 요청, response의 data -> educations 세팅
    Api.get(`educations/${portfolioOwnerId}`)
      .then((res) => setEducations(res.data))
      .catch((err) => {
        console.log(err);
      });
    // setEducations([
    //   {
    //     school: "1",
    //     name: "elice",
    //     major: "computer",
    //   },
    // ]);
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>

        {educations.map((education) => (
          <Education
            education={education}
            setEducations={setEducations}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setEducations}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default Educations;
