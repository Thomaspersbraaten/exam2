import { useEffect, useState } from "react";
import imagePlaceholder from "../../images/image-placeholder.png";

function ImageChecker({ imageUrl }) {
  const [src, setSrc] = useState(null);
  const [imageClass, setImageClass] = useState("");
  const [imageInfo, setImageInfo] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(imageUrl);
        if (response.type === "cors" && response.ok) {
          setSrc(imageUrl);
          setImageClass("valid-image");
          setImageInfo("✔️");
        } else {
          setSrc(imagePlaceholder);
          setImageClass("invalid-image");
          if (imageUrl.length > 0) {
            setImageInfo("❌ Image link is not valid");
          } else {
            setImageInfo("");
          }
        }
      } catch (error) {
        setSrc(imagePlaceholder);
        setImageClass("invalid-image");
        if (imageUrl.length > 0) {
          setImageInfo("❌ Image link is not valid");
        } else {
          setImageInfo("");
        }
      }
    }
    fetchImage();
  }, [imageUrl]);

  return (
    <div className="form-image-container">
      <img src={src} className="form-image" />
      <p className={imageClass}>{imageInfo}</p>
    </div>
  );
}

export default ImageChecker;
