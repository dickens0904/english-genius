import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import UnitOverview from "@/pages/UnitOverview";
import Vocabulary from "@/pages/Vocabulary";
import Listening from "@/pages/Listening";
import Reading from "@/pages/Reading";
import Writing from "@/pages/Writing";
import Exercises from "@/pages/Exercises";
import Library from "@/pages/Library";
import BookView from "@/pages/BookView";
import Dashboard from "@/pages/Dashboard";
import PrintCenter from "@/pages/PrintCenter";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unit/:unitId" element={<UnitOverview />} />
        <Route path="/unit/:unitId/vocabulary" element={<Vocabulary />} />
        <Route path="/unit/:unitId/listening" element={<Listening />} />
        <Route path="/unit/:unitId/reading" element={<Reading />} />
        <Route path="/unit/:unitId/writing" element={<Writing />} />
        <Route path="/unit/:unitId/exercises" element={<Exercises />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:bookId" element={<BookView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/print" element={<PrintCenter />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
