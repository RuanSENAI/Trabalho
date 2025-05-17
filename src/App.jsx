import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import LoginPage from '@/pages/LoginPage';
    import AlunoLoginPage from '@/pages/AlunoLoginPage';
    import ProfessorLoginPage from '@/pages/ProfessorLoginPage';
    import InstituicaoLoginPage from '@/pages/InstituicaoLoginPage';
    import HomePage from '@/pages/HomePage';
    import { Toaster } from '@/components/ui/toaster';
    import { AuthProvider, useAuth } from '@/contexts/AuthContext';

    function ProtectedRoute({ children }) {
      const { userType, isAuthenticated } = useAuth(); // Assuming isAuthenticated is part of your auth context
      if (!isAuthenticated) { // Check for general authentication status
        return <Navigate to="/login" replace />;
      }
      return children;
    }

    function App() {
      return (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/aluno" element={<AlunoLoginPage />} />
              <Route path="/login/professor" element={<ProfessorLoginPage />} />
              <Route path="/login/instituicao" element={<InstituicaoLoginPage />} />
              <Route 
                path="/*" 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      );
    }

    export default App;