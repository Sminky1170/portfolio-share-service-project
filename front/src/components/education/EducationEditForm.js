import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ user, setIsAdding, setIsEditing, setEducation }) {
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState(false);
}

export default EducationEditForm;
