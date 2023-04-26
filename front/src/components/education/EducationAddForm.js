import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ }) {
    //useState로 학교이름(school) 상태를 생성함.
    const [school, setSchool] = useState('')
    //useState로 전공(major) 상태를 생성함.
    const [major, setMajor] = useState('');
     //useState로  학위(degree)상태를 생성함.
    const [degree, setDegree] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // const user_id = ???;
      // "education/create" end-point로 post요청
      await Api.post('education/create', {
        // user_id: ???,
        school,
        major,
        position,
        isPrivate,
      });
      // "educationlist/유저id" end-point로 get요청
      const res = await Api.get('educationlist', user_id);
      // educations를 response -> data로 세팅
      setEducations(res.data);
      // Add 모드가 끝남, addEducation을 false로 세팅
      setAddEducation(false);
    };
  
}