const SESSION_KEY = 'longevity_session_token';
const PASSWORD_KEY = 'longevity_remember_token';

export function checkAuth(): boolean {
  const sessionToken = sessionStorage.getItem(SESSION_KEY);
  const rememberToken = localStorage.getItem(PASSWORD_KEY);
  
  return !!(sessionToken || rememberToken);
}

export function login(password: string, remember: boolean): boolean {
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('VITE_ADMIN_PASSWORD not configured');
    return false;
  }
  
  if (password === adminPassword) {
    const token = btoa(`admin:${password}`);
    
    if (remember) {
      localStorage.setItem(PASSWORD_KEY, token);
    }
    sessionStorage.setItem(SESSION_KEY, token);
    
    return true;
  }
  
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}
