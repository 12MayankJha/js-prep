import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveCategory,
  setSearchQuery,
  setActiveLevel,
} from "../../store/slices/topicSlice";
import { resetProgress } from "../../store/slices/progressSlice";
import { useTopicData } from "../../hooks/useTopicData";
import { TOPICS } from "../../config/topics";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const activeTopic = useSelector((state) => state.topic.activeTopic);
  const activeCategory = useSelector((state) => state.topic.activeCategory);
  const bookmarks = useSelector(
    (state) => state.progress.bookmarks[activeTopic],
  );
  const viewed = useSelector((state) => state.progress.viewed[activeTopic]);
  const { data } = useTopicData(activeTopic);

  const cfg = TOPICS[activeTopic];
  const total = data?.meta?.total || cfg.fallbackTotal;

  function handleCategoryClick(catId) {
    dispatch(setActiveCategory(catId));
    dispatch(setSearchQuery(""));
    dispatch(setActiveLevel("all"));
    onClose();
  }

  function handleResetProgress() {
    if (!confirm(`Reset all ${cfg.label} progress? Bookmarks are kept.`))
      return;
    dispatch(resetProgress(activeTopic));
  }

  function getCatCount(catId) {
    return data?.categories?.[catId]?.questions?.length || 0;
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "sidebar-overlay--visible" : ""}`}
        onClick={onClose}
      />
      <nav className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        {/* Logo */}
        <div className="sidebar__logo">
          <div className="sidebar__logo-title">{cfg.logoTitle}</div>
          <div className="sidebar__logo-sub">
            {total} Questions · {cfg.label}
          </div>
        </div>

        {/* Progress */}
        <div className="sidebar__progress">
          <div className="sidebar__progress-label">
            <span>Progress</span>
            <span>
              {viewed.length} / {total}
            </span>
          </div>
          <div className="sidebar__progress-bar">
            <div
              className="sidebar__progress-fill"
              style={{
                width: `${total ? Math.round((viewed.length / total) * 100) : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="sidebar__search">
          <span className="sidebar__search-icon">🔍</span>
          <input
            className="sidebar__search-input"
            type="text"
            placeholder="Search questions…"
            onChange={(e) =>
              dispatch(setSearchQuery(e.target.value.toLowerCase().trim()))
            }
          />
        </div>

        {/* Categories */}
        <div className="sidebar__nav">
          <div className="sidebar__nav-hdr">Topics</div>
          {cfg.categories.map((cat) => (
            <div
              key={cat.id}
              className={`sidebar__nav-item ${activeCategory === cat.id ? "sidebar__nav-item--active" : ""}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span>{cat.icon}</span>
              <span className="sidebar__nav-item-text">
                {cat.title}
                <br />
                <span className="sidebar__nav-item-count">
                  {getCatCount(cat.id) || "…"} questions
                </span>
              </span>
            </div>
          ))}

          {/* Quick links */}
          <div className="sidebar__nav-hdr sidebar__nav-hdr--spaced">Quick</div>
          <div
            className="sidebar__nav-item"
            onClick={() => {
              dispatch(setActiveCategory("bookmarks"));
              onClose();
            }}
          >
            <span>⭐</span>
            <span>Bookmarked</span>
            <span className="sidebar__nav-count">{bookmarks.length}</span>
          </div>
          <div className="sidebar__nav-item" onClick={handleResetProgress}>
            <span>🔄</span>
            <span>Reset Progress</span>
          </div>
        </div>
      </nav>
    </>
  );
}
