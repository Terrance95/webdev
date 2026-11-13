import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import supabase from "./supabase";

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!supabase) return undefined;

    let isMounted = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      setIsLoading(false);
      setErrorMessage("");
    });

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) throw error;
        setSession(data.session);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        setErrorMessage(`Could not check your sign-in status. ${error.message}`);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
