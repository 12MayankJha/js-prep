import { useState, useEffect } from "react";
import { TOPICS } from "../config/topics";

const cache = {};

export function useTopicData(topic) {
  const [data, setData] = useState(cache[topic] || null);
  const [loading, setLoading] = useState(!cache[topic]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // already cached — no need to fetch again
    if (cache[topic]) {
      setData(cache[topic]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetch(TOPICS[topic].file)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((json) => {
        cache[topic] = json;
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load", TOPICS[topic].file, err);
        setError(true);
        setLoading(false);
      });
  }, [topic]);

  return { data, loading, error };
}
