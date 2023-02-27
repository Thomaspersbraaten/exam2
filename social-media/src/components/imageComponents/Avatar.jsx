import avatarPlaceholder from "../../images/avatar-placeholder.png";

function Avatar({ src, cssClass = "author-img" }) {
  return <img className={cssClass} src={!src ? avatarPlaceholder : src} />;
}

export default Avatar;
