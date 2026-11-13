import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../lib/useAuth";
import supabase from "../lib/supabase";

function Auth() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session, isLoading, errorMessage: sessionError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.from;

  function continueToApp() {
    navigate(destination?.pathname || "/matches", {
      replace: true,
      state: destination?.state,
    });
  }

  useEffect(() => {
    if (isLoading || !session) return;
    navigate(destination?.pathname || "/matches", {
      replace: true,
      state: destination?.state,
    });
  }, [isLoading, session, destination, navigate]);

  if (isLoading) {
    return <main className="page-shell"><p role="status">Checking your sign-in status...</p></main>;
  }

  if (session) {
    return <main className="page-shell"><p role="status">Taking you to your bookings...</p></main>;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (!supabase) throw new Error("Supabase is not configured for this app.");

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.session) {
          continueToApp();
        } else {
          setMessage("Check your email to confirm your account, then sign in.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        continueToApp();
      }
    } catch (error) {
      setErrorMessage(error.message || "Sign-in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleMode() {
    setMode((currentMode) => currentMode === "signin" ? "signup" : "signin");
    setMessage("");
    setErrorMessage("");
  }

  return (
    <main className="page-shell auth-page">
      <section className="auth-card">
        <p className="eyebrow">{mode === "signin" ? "WELCOME BACK" : "JOIN THE CROWD"}</p>
        <h1>{mode === "signin" ? "Sign in to Matchday" : "Create your account"}</h1>
        <p className="auth-description">
          Your bookings are private to your account.
        </p>

        {!supabase && (
          <p className="message error" role="alert">
            Supabase is not configured. Add the project URL and publishable key, then restart the app.
          </p>
        )}
        {sessionError && <p className="message error" role="alert">{sessionError}</p>}

        <form className="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            minLength="8"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button className="submit-button" disabled={isSubmitting || !supabase}>
            {isSubmitting
              ? "Please wait..."
              : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        {message && <p className="message notice" role="status">{message}</p>}
        {errorMessage && <p className="message error" role="alert">{errorMessage}</p>}

        <p className="auth-switch">
          {mode === "signin" ? "New to Matchday?" : "Already have an account?"}{" "}
          <button type="button" className="text-button" onClick={toggleMode}>
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <Link className="auth-back-link" to="/matches">Back to matches</Link>
      </section>
    </main>
  );
}

export default Auth;
