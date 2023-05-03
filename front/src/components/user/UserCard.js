import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    if (!likedUsers.includes(user.id)) {
      setLikes((prevLikes) => prevLikes + 1);
      setLikedUsers((prevLikedUsers) => [...prevLikedUsers, user.id]);
      setLiked(true);
    } else {
      setLikes((prevLikes) => prevLikes - 1);
      setLikedUsers((prevLikedUsers) =>
        prevLikedUsers.filter((id) => id !== user.id)
      );
      setLiked(false);
    }
  };

  return (
    <Card sx={{ width: "18rem", height: "22rem" }} className="mb-3">
      <CardMedia
        component="img"
        height="140"
        image={user?.image || "http://placekitten.com/200/200"}
        alt="사용자 프로필 사진"
        sx={{
          borderRadius: "50%",
          width: "140px",
          height: "140px",
          margin: "0 auto",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
        <Box sx={{ height: "5rem", overflow: "hidden" }}>
          <Typography variant="body2" color="text.secondary">
            {user?.description}
          </Typography>
        </Box>

        {isEditable && (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setIsEditing(true)}
          >
            편집
          </Button>
        )}

        {isNetwork && (
          <>
            <Button
              variant="text"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              포트폴리오
            </Button>
            <Button
              variant="outlined"
              onClick={handleLikeClick}
              startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            >
              {likes}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default UserCard;
