import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ award, setIsEditing, setAwards }) {
  //useState로 수상명(title) 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 수상기관(organization) 상태를 생성함.
  const [organization, setOrganization] = useState("");
  //useState로  수상일자(date)상태를 생성함.
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateAward = [
      {
        title,
        organization,
        date: new Date(date),
      },
    ];
    // 해당 유저 정보로 user을 세팅함.
    setAwards(updateAward);

    // isEditing을 false로 세팅함.--->??
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* 클래스네임, 컨트롤ID? 정해야하나*/}
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="수상명"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="주최기관"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              placeholder="수상일자"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AwardEditForm;
