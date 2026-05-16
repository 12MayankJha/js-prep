import { useDispatch, useSelector } from "react-redux";
import {
  toggleBookmark,
  toggleViewed,
  toggleOpened,
} from "../../store/slices/progressSlice";
import Answer from "../Answer/Answer";
import "./QuestionCard.css";

export default function QuestionCard({ question, topic, uid }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.progress.bookmarks[topic]);
  const viewed = useSelector((state) => state.progress.viewed[topic]);
  const opened = useSelector((state) => state.progress.opened[topic]);

  const isOpen = opened.includes(uid);
  const isBookmarked = bookmarks.includes(uid);
  const isDone = viewed.includes(uid);
  const level = question.level || "basic";

  function handleToggleOpen() {
    dispatch(toggleOpened({ topic, uid }));
  }

  function handleToggleBookmark(e) {
    e.stopPropagation();
    dispatch(toggleBookmark({ topic, uid }));
  }

  function handleToggleDone(e) {
    e.stopPropagation();
    dispatch(toggleViewed({ topic, uid }));
  }

  return (
    <div
      className={`qcard ${isOpen ? "qcard--open" : ""} ${isDone ? "qcard--done" : ""}`}
    >
      {/* Header */}
      <div className="qcard__hdr" onClick={handleToggleOpen}>
        <span className="qcard__num">
          {String(question.n).padStart(3, "0")}
        </span>
        <span className="qcard__title">{question.q}</span>
        <div className="qcard__meta">
          <span className={`qcard__badge qcard__badge--${level}`}>{level}</span>
          <button
            className={`qcard__bm ${isBookmarked ? "qcard__bm--on" : ""}`}
            onClick={handleToggleBookmark}
            title={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            ★
          </button>
          <button
            className={`qcard__done ${isDone ? "qcard__done--on" : ""}`}
            onClick={handleToggleDone}
            title={isDone ? "Mark incomplete" : "Mark complete"}
          >
            ✓
          </button>
          <span className="qcard__chevron">▼</span>
        </div>
      </div>

      {/* Answer */}
      {isOpen && (
        <div className="qcard__body">
          <Answer raw={question.a} uid={uid} />
        </div>
      )}
    </div>
  );
}
