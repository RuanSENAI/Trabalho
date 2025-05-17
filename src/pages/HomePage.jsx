import React from 'react';
    import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
    import { Home, Compass, PlusSquare, Bell, User, Building } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    import FeedPage from '@/pages/FeedPage';
    import ExplorePage from '@/pages/ExplorePage';
    import PostPage from '@/pages/PostPage';
    import NotificationsPage from '@/pages/NotificationsPage';
    import ProfilePage from '@/pages/ProfilePage';
    import InstitutionPage from '@/pages/InstitutionPage';
    import { useAuth } from '@/contexts/AuthContext';
    import { Button } from '@/components/ui/button';

    const navItems = [
      { path: '/feed', label: 'Feed', icon: Home },
      { path: '/explore', label: 'Explorar', icon: Compass },
      { path: '/post', label: 'Postar', icon: PlusSquare },
      { path: '/notifications', label: 'Notificações', icon: Bell },
      { path: '/profile', label: 'Perfil', icon: User },
    ];

    const institutionNavItem = { path: '/institution', label: 'Instituição', icon: Building };

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 },
    };

    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.4,
    };

    const HomePage = () => {
      const { userType, logout } = useAuth();
      const location = useLocation();

      const currentNavItems = userType === 'instituicao' ? [...navItems, institutionNavItem] : navItems;

      return (
        <div className="flex flex-col min-h-screen bg-white">
          <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
            <div className="text-2xl font-bold text-green-600">EasyAcademics</div>
            <Button onClick={logout} variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">Sair</Button>
          </header>

          <main className="flex-grow container mx-auto p-4 overflow-y-auto pb-20 md:pb-4"> {/* Added padding-bottom for mobile nav */}
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/feed" element={<MotionWrapper><FeedPage /></MotionWrapper>} />
                <Route path="/explore" element={<MotionWrapper><ExplorePage /></MotionWrapper>} />
                <Route path="/post" element={<MotionWrapper><PostPage /></MotionWrapper>} />
                <Route path="/notifications" element={<MotionWrapper><NotificationsPage /></MotionWrapper>} />
                <Route path="/profile" element={<MotionWrapper><ProfilePage /></MotionWrapper>} />
                {userType === 'instituicao' && (
                  <Route path="/institution" element={<MotionWrapper><InstitutionPage /></MotionWrapper>} />
                )}
                <Route path="*" element={<Navigate to="/feed" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          {/* Mobile Bottom Navigation - Always Visible */}
          <nav 
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 shadow-top-md md:hidden z-40"
          >
            {currentNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                    isActive ? 'text-green-600 bg-green-100' : 'text-gray-500 hover:text-green-500 hover:bg-green-50'
                  }`
                }
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Desktop Footer Navigation */}
          <footer className="hidden md:flex sticky bottom-0 bg-white border-t border-gray-200 justify-around items-center p-3 shadow-top-md z-40">
            {currentNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                    isActive ? 'text-green-600 bg-green-100' : 'text-gray-500 hover:text-green-500 hover:bg-green-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </footer>
        </div>
      );
    };

    const MotionWrapper = ({ children }) => (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    );

    export default HomePage;