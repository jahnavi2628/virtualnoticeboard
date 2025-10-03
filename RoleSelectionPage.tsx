import React from 'react';
import { User, Role } from '../types';
import Card from './ui/Card';
import { UserIcon, UserCheckIcon, ShieldIcon, LogOutIcon } from '../constants';

interface RoleSelectionPageProps {
  user: User;
  onSelectRole: (role: Role) => void;
  onLogout: () => void;
}

const RoleCard: React.FC<{ title: string, icon: React.ReactNode, onClick: () => void }> = ({ title, icon, onClick }) => (
    <Card 
        className="text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
        onClick={onClick}
    >
        <div className="mx-auto bg-brand-primary text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">Enter Panel</p>
    </Card>
);

const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ user, onSelectRole, onLogout }) => {
  const canAccessAdmin = user.role === Role.ADMIN || user.role === Role.CENTRAL;
  const canAccessCentral = user.role === Role.CENTRAL;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-dark-bg p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-brand-primary dark:text-brand-accent">Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">Please select a panel to continue</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <RoleCard title="Student" icon={<UserIcon className="w-8 h-8"/>} onClick={() => onSelectRole(Role.STUDENT)} />
        
        {canAccessAdmin && (
            <RoleCard title="Admin" icon={<UserCheckIcon className="w-8 h-8"/>} onClick={() => onSelectRole(Role.ADMIN)} />
        )}

        {canAccessCentral && (
            <RoleCard title="Central Panel" icon={<ShieldIcon className="w-8 h-8"/>} onClick={() => onSelectRole(Role.CENTRAL)} />
        )}
      </div>

      <button 
        onClick={onLogout} 
        className="mt-12 flex items-center justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-dark-bg"
      >
        <LogOutIcon className="w-5 h-5 mr-2" />
        Go Back
      </button>
    </div>
  );
};

export default RoleSelectionPage;