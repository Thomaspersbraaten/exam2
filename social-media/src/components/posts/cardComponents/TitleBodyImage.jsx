import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import TagsComponent from "./TagsComponent";
import imagePlaceholder from "../../../images/image-placeholder.png";

function TitleBodyImage({ post }) {
  const { id } = useParams();
  return (
    <>
      {id ? (
        <div>
          <Card.Body className="card-top">
            <h2 className="title">{post.title}</h2>
            <Card.Text>{post.body}</Card.Text>
            <ul className="tags-container">
              {post.tags &&
                post.tags.map((tag, index) => (
                  <li className="tag" key={tag + index}>
                    <TagsComponent post={post} tag={tag} />
                  </li>
                ))}
            </ul>
          </Card.Body>
          <Card.Img src={!post.media ? imagePlaceholder : post.media} />
        </div>
      ) : (
        <Link to={`/posts/${post.id}`} className="link-to-post">
          <Card.Body className="card-top">
            <h2 className="title">{post.title}</h2>
            <Card.Text>{post.body}</Card.Text>
            <ul className="tags-container">
              {post.tags &&
                post.tags.map((tag, index) => (
                  <li className="tag" key={tag + index}>
                    <TagsComponent post={post} tag={tag} />
                  </li>
                ))}
            </ul>
          </Card.Body>
          <Card.Img src={!post.media ? imagePlaceholder : post.media} />
        </Link>
      )}
    </>
  );
}

export default TitleBodyImage;
