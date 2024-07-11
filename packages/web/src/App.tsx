import { Route, Router } from "@solidjs/router";
import { Home } from "./pages/home";
import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { AuthProvider } from "./providers/auth";
import { ProtectedRoute } from "./pages/protected";
import { globalStyle } from "@macaron-css/core";
import { theme } from "./ui/theme";

globalStyle("*", {
  margin: "0",
  padding: "0",
});

globalStyle("body", {
  background: theme.background,
  height: "100%",
});

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={ProtectedRoute}>
          <Route path="/" component={Dashboard} />
        </Route>
      </Router>
    </AuthProvider>
  );
}

export default App;
