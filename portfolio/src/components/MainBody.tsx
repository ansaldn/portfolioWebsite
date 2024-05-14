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
              <img src="..." className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title"> Card Title</h5>
                <p className="card-text"> Some more example text</p>
                <a href="#" className="btn btn-primary">
                  Go Somewhere
                </a>
              </div>
            </div>
            <div className="card Heading">
              <img src="..." className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title"> Card Title</h5>
                <p className="card-text"> Some more example text</p>
                <a href="#" className="btn btn-primary">
                  Do Something
                </a>
              </div>
            </div>
            <div className="card Heading">
              <img src="..." className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title"> Card Title</h5>
                <p className="card-text"> Some more example text</p>
                <a href="#" className="btn btn-primary">
                  Do Something
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
