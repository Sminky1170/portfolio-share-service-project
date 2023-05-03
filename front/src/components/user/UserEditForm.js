import React, { useState, useRef } from "react";
import * as Api from "../../api";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function UserEditForm({ user, setIsEditing, setUser }) {
  const [previewImage, setPreviewImage] = useState(
    user.image || "http://placekitten.com/200/200"
  );
  const inputFileRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);

      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await Api.put(`users/${user.id}/upload_image`, formData);
        uploadedImageUrl = res.data.url;
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    const updatedUserInfo = {
      name,
      email,
      description,
    };

    if (uploadedImageUrl) {
      updatedUserInfo.image = uploadedImageUrl;
    }

    try {
      const res = await Api.put(`users/${user.id}`, updatedUserInfo);
      setUser(res.data);
      setIsEditing(false);
    } catch (error) {
      alert("사용자 정보 업데이트에 실패했습니다.");
    }
  };

  return (
    <Card>
      <CardContent>
        <Container maxWidth="sm">
          <Box
            display="flex"
            justifyContent="center"
            mb={4}
            sx={{ "& .MuiAvatar-root": { width: "10rem", height: "10rem" } }}
          >
            <Avatar src={previewImage} />
          </Box>
          <Box display="flex" justifyContent="center">
            <input
              accept="image/*"
              hidden
              id="icon-button-file"
              type="file"
              ref={inputFileRef}
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Input
                    id="userEditName"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Typography>Name</Typography>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Input
                    id="userEditEmail"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Typography>Email</Typography>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="userEditDescription"
                  label="정보, 인사말"
                  multiline
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    확인
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </CardContent>
    </Card>
  );
}

export default UserEditForm;
