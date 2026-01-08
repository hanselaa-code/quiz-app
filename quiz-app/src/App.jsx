import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import WelcomeScreen from './components/quiz/WelcomeScreen';
import CategorySelector from './components/quiz/CategorySelector';
import QuizGame from './components/quiz/QuizGame';
import ResultScreen from './components/quiz/ResultScreen';

// Temporary placeholders until components are built
const Placeholder = ({ title }) => (
  <div className="container animate-fade-in">
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>Under Construction</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* User Quiz Routes */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/categories" element={<CategorySelector />} />
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/results" element={<ResultScreen />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
