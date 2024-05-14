import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button className="btn btn-primary" onClick={() => logout()}>
        Sign Out
      </button>
    )
  );
};
export default LogoutButton;
