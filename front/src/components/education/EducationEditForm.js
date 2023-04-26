//handleSubmit에서 Api 요청하는거 잘 모르겠어서, userEditForm 복붙해서 내용만 바꿨습니다..

import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ education, setEdit, setEducations }) {
    //useState로 학교이름(school) 상태를 생성함.
    const [school, setSchool] = useState(education.school);
    //useState로 전공(major) 상태를 생성함.
    const [major, setMajor] = useState(education.major);
     //useState로  학위(degree)상태를 생성함.
    const [degree, setDegree] = useState(education.degree);
    const [description, setDescription] = useState(user.description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // "users/유저id" 엔드포인트로 PUT 요청함.-------users는 어디서 생겼?
        const res = await Api.put(`educations/${education.id}`, {
            //사람이름...?
            school,
            major,
            degree,
            description,
        });
        // educationlist를 get요청 해야하는지?
        const updatedUser = res.data;
        // 해당 유저 정보로 user을 세팅함.
        setEducations(updatedUser);
    
        // isEditing을 false로 세팅함.--->??
        setIsEditing(false);
        };

      return(
        <Card className="mb-2">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          {/* 클래스네임, 컨트롤ID? */}
            <Form.Group> 
              <Form.Control
                type="text"
                placeholder="학교 이름을 입력하세요."
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Control
                type="?" 
                placeholder= "전공"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group controlId="userEditDescription">
              <Form.Control
                type="text"
                placeholder="정보, 인사말"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default EducationEditForm;