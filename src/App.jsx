import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TopicBar from "./components/TopicBar/TopicBar";
import Sidebar from "./components/Sidebar/Sidebar";
import QuestionList from "./components/QuestionList/QuestionList";
import "./App.css";

export default function App() {
  const activeTopic = useSelector((state) => state.topic.activeTopic);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("react-mode", activeTopic === "react");
  }, [activeTopic]);

  return (
    <div className="app">
      <TopicBar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main">
        <QuestionList onMenuClick={() => setSidebarOpen(true)} />
      </main>
    </div>
  );
}
