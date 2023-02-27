import React, { useState, useRef } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdAddReaction } from "react-icons/md";
import ReactionOverlay from "../../ReactionOverlay";

export default function ReactButton({ post }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [reactions, setReactions] = useState(post.reactions);

  const renderTooltip = (props) => {
    if (reactions === [] || reactions.length === 0) {
      return (
        <Tooltip id="button-tooltip" className="hover-overlay" {...props}>
          No one has reacted
        </Tooltip>
      );
    } else {
      return (
        <Tooltip id="button-tooltip" className="hover-overlay" {...props}>
          <p>Reactions</p>
          {reactions.map((reaction, index) => (
            <div key={reaction.symbol + index}>{reaction.symbol + ` x${reaction.count}`}</div>
          ))}
        </Tooltip>
      );
    }
  };
  const TotalValue = () => {
    return reactions.reduce((acc, obj) => acc + obj.count, 0);
  };
  return (
    <>
      <OverlayTrigger placement="left" delay={{ show: 550, hide: 300 }} overlay={renderTooltip}>
        <div ref={target} onClick={() => setShow(!show)} className="reactions">
          <MdAddReaction className="reactions__icon" />
          {post && <p>{TotalValue()} Reactions</p>}
        </div>
      </OverlayTrigger>
      <ReactionOverlay setShow={setShow} show={show} target={target} post={post} reactions={reactions} setReactions={setReactions} />
    </>
  );
}
