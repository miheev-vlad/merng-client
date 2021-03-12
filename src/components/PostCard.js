import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import MyPopup from '../utils/MyPopup';

function PostCard({
  post: { body, title, imageUrl, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header as={Link} to={`/posts/${id}`} style={{ fontSize: 20 }}><i>{title}</i></Card.Header>
      </Card.Content>
        <Image
          as={Link}
          to={`/posts/${id}`}
          wrapped
          ui={false}
          src={imageUrl}
        />
      <Card.Content>
        <Card.Header style={{ color: "grey" }}>{user && user.username === username ? 'Your Post' : username}</Card.Header>
        <Card.Meta>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body.substring(0, 80)}...</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="teal" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="teal" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
      </Card.Content>
    </Card>
  );
}

export default PostCard;