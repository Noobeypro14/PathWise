import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Discovery from './components/Discovery';
import Quiz from './components/Quiz';
import Compare from './components/Compare';
import Learn from './components/Learn';
import ResumeBuilder from './components/ResumeBuilder';
import { NavigationPage, UserProfile, Career, QuizResult } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [suggestedCareers, setSuggestedCareers] = useState<Career[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handlePageChange = (page: NavigationPage) => {
    setCurrentPage(page);
  };

  const handleProfileComplete = (profile: UserProfile, careers: Career[]) => {
    setUserProfile(profile);
    setSuggestedCareers(careers);
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handlePageChange} />;
      case 'discover':
        return <Discovery onProfileComplete={handleProfileComplete} />;
      case 'quiz':
        return <Quiz onQuizComplete={handleQuizComplete} />;
      case 'compare':
        return <Compare />;
      case 'resume':
        return <ResumeBuilder />;
      case 'learn':
        return <Learn />;
      default:
        return <Home onNavigate={handlePageChange} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navigation 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
        />
        <main>
          {renderCurrentPage()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;