import React from "react";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import Avatar from "../imageComponents/Avatar";

function ProfileCard({ profile, referance }) {
  return (
    <Card ref={referance} className="profiles-card">
      <Link to={`../profiles/${profile.name}`}>
        <div className="user-container">
          <Avatar src={profile.avatar} />
          <h2>{profile.name}</h2>
        </div>
      </Link>

      <div className="count-container">
        <p> {profile._count.posts} Posts</p>
        <p> {profile._count.followers} Followers</p>
        <p> {profile._count.following} Following</p>
      </div>
    </Card>
  );
}

export default ProfileCard;
