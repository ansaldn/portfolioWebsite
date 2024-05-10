function MainBody() {
  return (
    <>
      <div className="container">
        <p className="text-center">
          Welcome to my Portfolio. This portfolio is created with the following
          tools
        </p>
        <div className="row justify-content-center">
          <div className="col-xs-6 col-md-4">
            <a href="#">
              <img
                src="./src/assets/images/github.png"
                alt="GitHub Logo"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="col-xs-6 col-md-4">
            <a href="#">
              <img
                src="./src/assets/images/JS.png"
                alt="JavaScript Logo"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="col-xs-6 col-md-4">
            <a href="#">
              <img
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
