import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({ portfolioOwnerId, isEditable }) {
  //useState로 Awards, isAdding 상태 생성
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "Awards/id" GET 요청, response의 data -> Awards 세팅
    Api.get(`Awards/${portfolioOwnerId}`).then((res) =>
      setAwards(res.data)
    );
    // setAwards([
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
        <Card.Title>수상이력</Card.Title>

        {awards.map((award) => (
          <Award
            Award={award}
            setAwards={setAwards}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
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

export default Awards;
