import { Route, Router } from "@solidjs/router";
import { Home } from "./pages/home";
import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </>
  );
}

export default App;
