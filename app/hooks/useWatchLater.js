import { useContext } from "react";
import { WatchLaterContext } from "../contexts/userContext";

export default function useWatchLater() {
  const { watchLater, setWatchLater } = useContext(WatchLaterContext);

  return { watchLater, setWatchLater };
}
