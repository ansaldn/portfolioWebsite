import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./MainBody.css";

const MainBody: React.FC = () => {
  const introRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const introElement = introRef.current;

    if (!introElement) return;

    const handleLoad = () => {
      introElement.classList.add("fade-in");
    };

    window.addEventListener("load", handleLoad);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            introElement.classList.add("fade-in");
            introElement.classList.remove("fade-out");
          } else {
            introElement.classList.add("fade-out");
            introElement.classList.remove("fade-in");
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(introElement);

    return () => {
      window.removeEventListener("load", handleLoad);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="MainBodyContainer" id="MainBodyOpening">
        <div>
          <video autoPlay muted loop playsInline id="MainBodyVideo">
            <source
              src="./assets/videos/websiteVideoBackground.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <h1 ref={introRef} className="text-center" id="MainBodyIntro">
            Welcome to my Portfolio. This portfolio is created with the
            following tools
          </h1>
        </div>
      </section>
      <br></br>
      <section>
        <div className="container">
          <div className="row">
            <div className="card Heading col-md-4">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">Some more example text</p>
                <a href="#" className="btn btn-primary">
                  Go Somewhere
                </a>
              </div>
            </div>
            <div className="card Heading col-md-4">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">Some more example text</p>
                <a href="#" className="btn btn-primary">
                  Do Something
                </a>
              </div>
            </div>
            <div className="card Heading col-md-4">
              <img src="./assets/404.png" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">Some more example text</p>
                <a href="#" className="btn btn-primary">
                  Do Something
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainBody;
