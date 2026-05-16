import { useSelector, useDispatch } from "react-redux";
import { setActiveLevel } from "../../store/slices/topicSlice";
import { useTopicData } from "../../hooks/useTopicData";
import { TOPICS } from "../../config/topics";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./QuestionList.css";

export default function QuestionList({ onMenuClick }) {
  const activeTopic = useSelector((state) => state.topic.activeTopic);
  const activeCategory = useSelector((state) => state.topic.activeCategory);
  const activeLevel = useSelector((state) => state.topic.activeLevel);
  const searchQuery = useSelector((state) => state.topic.searchQuery);
  const bookmarks = useSelector(
    (state) => state.progress.bookmarks[activeTopic],
  );
  const viewed = useSelector((state) => state.progress.viewed[activeTopic]);

  const { data, loading, error } = useTopicData(activeTopic);
  const cfg = TOPICS[activeTopic];
  const total = data?.meta?.total || cfg.fallbackTotal;
  const catCfg = cfg.categories.find((c) => c.id === activeCategory);

  // Get questions for current view
  function getQuestions() {
    if (!data) return [];

    // Bookmarks view
    if (activeCategory === "bookmarks") {
      return Object.values(data.categories)
        .flatMap((c) => c.questions)
        .filter((q) => bookmarks.includes(`${activeTopic}-${q.n}`));
    }

    return data.categories[activeCategory]?.questions || [];
  }

  // Apply level + search filters
  const questions = getQuestions().filter((q) => {
    const levelOk = activeLevel === "all" || q.level === activeLevel;
    const searchOk =
      !searchQuery ||
      q.q.toLowerCase().includes(searchQuery) ||
      (q.a || "").toLowerCase().includes(searchQuery);
    return levelOk && searchOk;
  });

  return (
    <div className="qlist">
      {/* Topbar */}
      <div className="qlist__topbar">
        <button className="qlist__hamburger" onClick={onMenuClick}>
          ☰
        </button>
        <div className="qlist__pills">
          {["all", "basic", "intermediate", "advanced"].map((level) => (
            <LevelPill key={level} level={level} activeLevel={activeLevel} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="qlist__content">
        {/* Intro card */}
        {activeCategory !== "bookmarks" && catCfg && (
          <div className="qlist__intro">
            <h1>
              {catCfg.icon} {catCfg.title}
            </h1>
            <p>{catCfg.desc}</p>
            <div className="qlist__stats">
              <StatChip n={questions.length || "…"} label="in section" />
              <StatChip n={viewed.length} label="studied" />
              <StatChip n={bookmarks.length} label="bookmarked" />
              <StatChip n={total} label="total" />
            </div>
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="qlist__banner">
            <div className="qlist__spinner" />
            Loading {cfg.label} questions…
          </div>
        )}

        {error && (
          <div className="qlist__banner qlist__banner--error">
            ⚠ Could not load <strong>{cfg.file}</strong>. Make sure it's in your{" "}
            <code>public/</code> folder.
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <div className="qlist__empty">
            <div className="qlist__empty-icon">🔍</div>
            <p>No questions match your filter.</p>
          </div>
        )}

        {!loading && !error && questions.length > 0 && (
          <div className="qlist__cards">
            {questions.map((q) => (
              <QuestionCard
                key={q.n}
                question={q}
                topic={activeTopic}
                uid={`${activeTopic}-${q.n}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LevelPill({ level, activeLevel }) {
  const dispatch = useDispatch();
  const label =
    level === "all" ? "All" : level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <button
      className={`qlist__pill qlist__pill--${level} ${activeLevel === level ? "qlist__pill--active" : ""}`}
      onClick={() => dispatch(setActiveLevel(level))}
    >
      {label}
    </button>
  );
}

function StatChip({ n, label }) {
  return (
    <div className="qlist__stat">
      <span className="qlist__stat-n">{n}</span>
      <span className="qlist__stat-l">{label}</span>
    </div>
  );
}
