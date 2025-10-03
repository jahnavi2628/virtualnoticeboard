import React, { useState } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (!(email.endsWith('@rgukt.in') || email.endsWith('@rguktong.ac.in'))) {
      setError('Please use a valid RGUKT email (@rgukt.in or @rguktong.ac.in).');
      return;
    }
    setError('');

    if (isLogin) {
      // Login Logic
      let user: User | undefined;
      
      if(email === 'o220202@rguktong.ac.in') {
        user = MOCK_USERS.find(u => u.role === Role.CENTRAL);
      } else if (email === 'admin@rgukt.in') {
        user = MOCK_USERS.find(u => u.role === Role.ADMIN);
      } else {
        // Mock login for any student
        user = { id: `student_${Date.now()}`, name: 'Student User', email, role: Role.STUDENT };
      }
      
      if (user) {
        onAuthSuccess(user);
      } else {
        setError('Invalid credentials or access not granted.');
      }

    } else {
      // Sign-up Logic
      const newUser: User = {
        id: `student_${Date.now()}`,
        name: name,
        email: email,
        role: Role.STUDENT,
      };
      // Admin/Central panel signup is not allowed, must be granted.
      onAuthSuccess(newUser);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-dark-surface rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary dark:text-brand-accent">RGUKT Hub</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{isLogin ? 'Sign in to your account' : 'Create a new student account'}</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <input id="name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text rounded-t-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm bg-transparent dark:bg-gray-700"
                  placeholder="Full Name"
                />
              </div>
            )}
            <div>
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm bg-transparent dark:bg-gray-700 ${isLogin ? 'rounded-t-md' : ''}`}
                placeholder="RGUKT Email address"
              />
            </div>
            <div>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text rounded-b-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm bg-transparent dark:bg-gray-700"
                placeholder="Password"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary dark:focus:ring-offset-dark-bg">
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
         <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={toggleForm} className="font-medium text-brand-primary hover:text-brand-secondary focus:outline-none">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
      </div>
    </div>
  );
};

export default AuthPage;
