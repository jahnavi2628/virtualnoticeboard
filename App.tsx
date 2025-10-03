import React, { useState, useEffect } from 'react';
import { User, Role } from './types';
import StudentPanel from './components/StudentPanel';
import AdminPanel from './components/AdminPanel';
import CentralPanel from './components/CentralPanel';
import AuthPage from './components/AuthPage';
import RoleSelectionPage from './components/RoleSelectionPage';
import { LogOutIcon, SunIcon, MoonIcon } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    // If student, auto-select role. Others must choose.
    if(authenticatedUser.role === Role.STUDENT) {
        setSelectedRole(Role.STUDENT);
    }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    if (!user) {
      return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    if (!selectedRole) {
      return <RoleSelectionPage user={user} onSelectRole={handleRoleSelect} onLogout={handleLogout} />;
    }

    let panelComponent: React.ReactNode;
    switch (selectedRole) {
      case Role.STUDENT:
        panelComponent = <StudentPanel user={user} />;
        break;
      case Role.ADMIN:
        panelComponent = <AdminPanel user={user} />;
        break;
      case Role.CENTRAL:
        panelComponent = <CentralPanel user={user} />;
        break;
      default:
        return <p>Invalid role selected.</p>;
    }

    return (
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-dark-bg transition-colors text-gray-900 dark:text-dark-text">
        <header className="bg-white dark:bg-dark-surface shadow-md sticky top-0 z-10 flex-shrink-0">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-brand-primary dark:text-brand-accent">RGUKT Hub - {selectedRole}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                  {isDarkMode ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
                </button>
                <span className="hidden sm:block">Hello, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent">
                  <LogOutIcon className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow overflow-hidden">
            {panelComponent}
        </main>
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default App;
