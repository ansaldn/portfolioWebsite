import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className="btn btn-outline-primary" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  );
};
export default LoginButton;
