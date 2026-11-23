import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { CitizenReportPage } from './pages/CitizenReportPage';
import { GovernmentDashboard } from './pages/GovernmentDashboard';
import { UniversityDashboard } from './pages/UniversityDashboard';
import { IndustryDashboard } from './pages/IndustryDashboard';
import { ChallengesExplorePage } from './pages/ChallengesExplorePage';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/citizen" element={<CitizenDashboard />} />
              <Route path="/citizen/report" element={<CitizenReportPage />} />
              <Route path="/government" element={<GovernmentDashboard />} />
              <Route path="/university" element={<UniversityDashboard />} />
              <Route path="/industry" element={<IndustryDashboard />} />
              <Route path="/challenges" element={<ChallengesExplorePage />} />
              <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
