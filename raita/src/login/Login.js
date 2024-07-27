import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    console.log(JSON.stringify({ username, password }))

    setError('');

    try {
      const endpoint = isLogin ? 'http://localhost:8085/User/login' : 'http://localhost:8085/User/register';
      const body = isLogin ? { username, password } : { username, email, role, password };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      console.log(JSON.stringify({ username, email, role, password }));


      if (response.ok) {
        setError(isLogin ? '' : 'Registration Successful');
      }

      if (!response.ok) {
        throw new Error(isLogin ? 'Login failed' : 'Registration failed');
      }
      //const data = await response.json();
      //console.log(isLogin ? 'Login successful' : 'Registration successful', data);
    } catch (error) {
      console.error('Error during login:', error);
      setError(isLogin ? 'Login failed. Please check your username and password and try again.' : 'Registration unsuccessful');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>

        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <p className="toggle-form">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
