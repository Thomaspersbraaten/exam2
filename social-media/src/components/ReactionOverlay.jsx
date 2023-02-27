import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "./constants/baseUrl";
import { TrackReactionContext } from "./context/ReactionContext";
import { AuthContext } from "./context/AuthContext";
import { getOptions } from "./getOptions";
import FloatingError from "./feedback/FloatingError";

function ReactionOverlay({ setShow, show, target, post, reactions, setReactions }) {
  const [auth, setAuth] = useContext(AuthContext);
  const [trackReaction, setTrackReaction] = useContext(TrackReactionContext);
  const [canReact, setCanReact] = useState(true);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  // this component also Tracks if the user have reacted to a post or not and saves it to localstorage
  // This is just for demonstrating purposes since the API does not support tracking of reactions.
  async function reactToPost(symbol) {
    setShow(false);

    const reactUrl = BASE_URL + `posts/${post.id}/react/` + symbol + "?_author=true";
    const options = getOptions(auth, "PUT");

    try {
      const response = await fetch(reactUrl, options);
      const json = await response.json();
      if (response.status === 200) {
        if (json.postId) {
          setTrackReaction([...trackReaction, post]);

          const symbolIndex = reactions.findIndex((react) => react.symbol === symbol);

          if (symbolIndex !== -1) {
            const existingReaction = reactions[symbolIndex];

            const updatedReactions = [
              ...reactions.slice(0, symbolIndex),
              {
                ...existingReaction,
                count: existingReaction.count + 1,
              },
              ...reactions.slice(symbolIndex + 1),
            ];

            setReactions(updatedReactions);
          } else {
            setReactions([...reactions, json]);
          }
        }
      } else if (response.status === 429) {
        setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        setShowError(true);
      } else {
        setError("An error occured, Please try again.");
        setShowError(true);
      }
    } catch (error) {
      setError("An error occured, Please try again.");
      setShowError(true);
    }
  }

  useEffect(() => {
    const checkedItem = trackReaction.some((reaction) => reaction.id === post.id);
    if (checkedItem === true) {
      setCanReact(false);
    } else {
      setCanReact(true);
    }
  }, [setTrackReaction]);

  return (
    <>
      {showError && <FloatingError error={error} setShowError={setShowError} />}

      <Overlay show={show} placement="top" target={target.current} className="react-tooltip">
        {canReact ? (
          (props) => (
            <Tooltip {...props}>
              <ListGroup>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("😄");
                  }}
                >
                  😄
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("🙂");
                  }}
                >
                  🙂
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("👍");
                  }}
                >
                  👍
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("🤝");
                  }}
                >
                  🤝
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("👎");
                  }}
                >
                  👎
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("🙁");
                  }}
                >
                  🙁
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    reactToPost("😭");
                  }}
                >
                  😭
                </ListGroup.Item>
              </ListGroup>
            </Tooltip>
          )
        ) : (
          <Tooltip>
            <ListGroup>You have already reacted</ListGroup>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default ReactionOverlay;
