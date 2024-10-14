import "bootstrap/dist/css/bootstrap.css";

function UnderBody() {
  return (
    <>
      <hr className="dotted"></hr>
      <div className="UnderBody Heading">
        <h2> This website was created with the following TechStack.</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col techStack">
            <a href="#">
              <img
                id="techStack"
                src="/assets/images/github.png"
                alt="GitHub Logo"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="col techStack">
            <a href="#">
              <img
                id="techStack"
                src="/assets/images/JS.png"
                alt="JavaScript Logo"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="col techStack">
            <a
              href="https://auth0.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id="techStack"
                src="/assets/images/auth0.png"
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

export default UnderBody;
