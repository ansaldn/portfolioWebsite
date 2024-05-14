import "bootstrap/dist/css/bootstrap.css";

function MainBody() {
  return (
    <>
      <div className="container">
        <p className="text-center">
          Welcome to my Portfolio. This portfolio is created with the following
          tools
        </p>
        <div className="container">
          <div className="row">
            <div className="card Heading">
              <div className="card-img-top">{/* Card content */}</div>
            </div>
            <div className="card Heading">
              <div className="card-img-top">{/* Card content */}</div>
            </div>
            <div className="card Heading">
              <div className="card-img-top">{/* Card content */}</div>
            </div>
          </div>
        </div>
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
            <a
              href="https://auth0.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id="techStack"
                src="./src/assets/images/auth0.png"
                alt="Auth0 Logo"
                className="img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
