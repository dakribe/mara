import { Route, Router } from "@solidjs/router";
import { Home } from "./pages/home";
import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { AuthProvider } from "./providers/auth";
import { ProtectedRoute } from "./pages/protected";
import { Event } from "./pages/event";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/map" component={Event} />
        <Route path="/dashboard" component={ProtectedRoute}>
          <Route path="/" component={Dashboard} />
        </Route>
      </Router>
    </AuthProvider>
  );
}

export default App;
