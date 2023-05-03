import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

function UserCard({
  portfolioOwnerId,
  user,
  setIsEditing,
  isEditable,
  isNetwork,
}) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [liked, setLiked] = useState(
    user?.likeUsers?.includes(userState.user?.id)
  );
  const [likesCount, setLikesCount] = useState(user?.likeCount);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!liked) {
        res = await Api.put(`users/${user.id}/like`, {
          pressLikeUserId: userState.user.id,
        });
        // setLikes((prevLikes) => prevLikes + 1);
        setLiked(true);
        setLikesCount(res.data.likeCount);
      } else {
        res = await Api.put(`users/${user.id}/dislike`, {
          pressLikeUserId: userState.user.id,
        });
        // setLikes((prevLikes) => prevLikes - 1);
        setLiked(false);
        setLikesCount(res.data.likeCount);
      }
    } catch (error) {
      console.log(error);
      alert("좋아요 버튼 누르기에 실패했습니다. 다시 시도해주세요.");
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
          <Button variant="text" onClick={() => navigate(`/users/${user.id}`)}>
            포트폴리오
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={handleLikeClick}
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        >
          {likesCount}
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserCard;
