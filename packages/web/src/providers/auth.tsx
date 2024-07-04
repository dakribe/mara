import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  useContext,
} from "solid-js";

type User = {
  id: string;
  username: string;
};

type Session = {
  user: User;
};

type AuthContextType = {
  session: Accessor<Session | null>;
  isAuthenticated: Accessor<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  getUser: () => Promise<Session | null>;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: { children: JSX.Element }) {
  const [session, setSession] = createSignal<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  async function login(username: string, password: string) {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async function getUser(): Promise<Session | null> {
    try {
      const res = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (res.ok) {
        const userData: Session = await res.json();
        setSession(userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        setSession(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setSession(null);
      setIsAuthenticated(false);
    }
    return null;
  }

  const checkAuth = async () => {
    await getUser();
  };

  createEffect(() => {
    checkAuth();
  });

  const value: AuthContextType = {
    session,
    isAuthenticated,
    login,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
