import { useSelector, useDispatch } from "react-redux";
import { setActiveTopic } from "../../store/slices/topicSlice";
import { useTopicData } from "../../hooks/useTopicData";
import "./TopicBar.css";

function TopicButton({ id, label, icon, activeTopic }) {
  const dispatch = useDispatch();
  const { data } = useTopicData(id);
  const isActive = activeTopic === id;
  const total = data?.meta?.total;

  return (
    <button
      className={`topic-btn topic-btn--${id} ${isActive ? "topic-btn--active" : ""}`}
      onClick={() => dispatch(setActiveTopic(id))}
    >
      <span className="topic-btn__icon">{icon}</span>
      <span className="topic-btn__label">{label}</span>
      {total && <span className="topic-btn__count">{total} Qs</span>}
    </button>
  );
}

export default function TopicBar() {
  const activeTopic = useSelector((state) => state.topic.activeTopic);

  return (
    <header className="topic-bar">
      <div className="topic-bar__inner">
        <div className="topic-bar__switcher">
          <TopicButton
            id="js"
            label="JavaScript"
            icon="JS"
            activeTopic={activeTopic}
          />
          <TopicButton
            id="react"
            label="React"
            icon="⚛"
            activeTopic={activeTopic}
          />
        </div>
      </div>
    </header>
  );
}
