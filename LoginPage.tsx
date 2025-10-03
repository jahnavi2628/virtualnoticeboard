import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateToSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(email.endsWith('@rgukt.in') || email.endsWith('@rguktong.ac.in'))) {
      setError('Please use a valid RGUKT email (@rgukt.in or @rguktong.ac.in).');
      return;
    }
    
    const user = MOCK_USERS.find(u => u.email === email);
    
    // In a real app, you'd also check the password hash
    if (user) {
      setError('');
      onLogin(user);
    } else {
        // Mock sign-up for any valid rgukt student email
        if(email.includes('student')){
             onLogin(MOCK_USERS[0]);
             return;
        }
      setError('Invalid credentials or access not granted.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-dark-surface rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary dark:text-brand-accent">RGUKT Hub</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Virtual Notice Board & Radio</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text rounded-t-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm bg-transparent dark:bg-gray-700"
                placeholder="RGUKT Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text rounded-b-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm bg-transparent dark:bg-gray-700"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary dark:focus:ring-offset-dark-bg"
            >
              Sign in
            </button>
          </div>
        </form>
         <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <button onClick={onNavigateToSignUp} className="font-medium text-brand-primary hover:text-brand-secondary focus:outline-none">
              Sign up
            </button>
          </p>
      </div>
    </div>
  );
};

export default LoginPage;