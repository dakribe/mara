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

type AuthContextType = {
  user: Accessor<User | null>;
  isAuthenticated: Accessor<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  getUser: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createSignal<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  async function login(username: string, password: string) {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.log("Login Error", error);
    }
    return false;
  }

  async function getUser(): Promise<User | null> {
    try {
      const res = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (res.ok) {
        const userData: User = await res.json();
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Get User Error", error);
      setUser(null);
      setIsAuthenticated(false);
    }
    return null;
  }

  const checkAuth = async () => {
    await getUser();
  };

  // Check authentication status when the component mounts
  createEffect(() => {
    checkAuth();
    console.log("Running auth check");
  });

  const value: AuthContextType = {
    user,
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
