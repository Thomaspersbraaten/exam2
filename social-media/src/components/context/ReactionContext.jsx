import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// Since the API doesnt track who has reacted to posts, this stores the post in localstorage to be matched when reacting.
export const TrackReactionContext = createContext([null, () => {}]);
export const TrackReactionProvider = (props) => {
  const [trackReaction, setTrackReaction] = useLocalStorage("reactions", null);
  return <TrackReactionContext.Provider value={[trackReaction, setTrackReaction]}>{props.children}</TrackReactionContext.Provider>;
};
