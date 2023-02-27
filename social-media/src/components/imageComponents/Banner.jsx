import imagePlaceholder from "../../images/image-placeholder.png";

function Banner({ src, cssClass = "profile-banner" }) {
  return <img className={cssClass} src={!src ? imagePlaceholder : src} />;
}

export default Banner;
