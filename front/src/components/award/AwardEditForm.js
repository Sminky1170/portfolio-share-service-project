import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ award, setIsEditing, setAwards }) {
  //useState로 수상명(title) 상태를 생성함.
  const [title, setTitle] = useState(award.title);
  //useState로 수상기관(organization) 상태를 생성함.
  const [organization, setOrganization] = useState(award.organization);
  //useState로  수상일자(date)상태를 생성함.
  const [date, setDate] = useState(award.date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // "users/유저id" 엔드포인트로 PUT 요청함.-------users는 어디서 생겼?
    try {
      const res = await Api.put(`awards/${award.id}`, {
        id: award.id,
        title,
        organization,
        date: new Date(date),
      });

      const updateAward = res.data;

      setAwards((prevAwards) =>
        prevAwards.map((e) => (e.id === award.id ? updateAward : e))
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("수상이력 수정에 실패했습니다. 다시 시도해주세요.");
    }

    // const updateAward = [
    //   {
    //     school,
    //     major,
    //     degree,
    //   },
    // ];
    // // 해당 유저 정보로 user을 세팅함.
    // setAwards(updateAward);

    // // isEditing을 false로 세팅함.--->??
    // setIsEditing(false);
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
              value={organization}
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
