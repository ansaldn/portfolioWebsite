import "bootstrap/dist/css/bootstrap.css";

function UnderBody() {
  return (
    <div className="row justify-content-center">
      <div className="card techStack">
        <a href="#">
          <img
            id="techStack"
            src="./src/assets/images/github.png"
            alt="GitHub Logo"
            className="img-fluid"
          />
        </a>
      </div>
      <div className="card techStack">
        <a href="#">
          <img
            id="techStack"
            src="./src/assets/images/JS.png"
            alt="JavaScript Logo"
            className="img-fluid"
          />
        </a>
      </div>
      <div className="card techStack">
        <a href="https://auth0.com" target="_blank" rel="noopener noreferrer">
          <img
            id="techStack"
            src="./src/assets/images/auth0.png"
            alt="Auth0 Logo"
            className="img-fluid"
          />
        </a>
      </div>
    </div>
  );
}

export default UnderBody;
