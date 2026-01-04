import { icon } from "@fortawesome/fontawesome-svg-core";

export default function OGImage({ pageTitle, baseUrl, iconImages, featuredImage }) {

  const TENNISBALLJSX = (index) => (
    // Tennis Ball Container
    <span
      className="tennis-ball-period-container"
      id={`tennis-ball-period-${index}`}
      style={{
        display: "flex",
        position: "relative", 
        top: "-12px",
    
        width: "0.4em",
        height: "0.4em",
        borderRadius: "50%",
    
        marginRight: "20px",
        marginLeft: "5px",
        marginBottom: 0,
        overflow: "hidden", // Clip the borders
    }}>
  
      {/* Tennis Ball Base (Yellow)*/}
      <span style={{
        position: "absolute",
        left: 0,
        top: 0,

        width: "0.4em",
        height: "0.4em",

        background: "#d7f704",
        border: "2px solid white",
        borderRadius: "50%",

      }}></span>
              
      {/* Left Stripe */}
      <span style={{
        position: "absolute",
        left: "-65%",
        top: 0,
        width: "0.4em",
        height: "0.4em",
        background: "transparent",
        border: "2px solid white",
        borderRadius: "50%",
      }}></span>
  
      {/* Right Stripe */}
      <span style={{
        position: "absolute",
        right: "-65%", // Matches your original CSS
        top: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
        border: "2px solid white",
        borderRadius: "50%",
      }}></span>
    </span>
  )

  const TENNISCOURTJSX = () => {
    const courtLines = [
      {
        className: "alley",
        id: "left-alley",
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: "12.5%",
          height: "100%",
          borderRight: "solid white 0.125rem",
        }
      },
      {
        className: "alley",
        id: "right-alley",
        style: {
          position: "absolute",
          right: 0,
          top: 0,
          width: "12.5%",
          height: "100%",
          borderLeft: "solid white 0.125rem",
        }
      },
      {
        className: "baseline-box",
        id: "top-baseline",
        style: {
          position: "absolute",
          left: "12.5%",
          top: 0,
          width: "75%",
          height: "23%",
          borderBottom: "solid white 0.125rem",
        }
      },
      {
        className: "baseline-box",
        id: "bottom-baseline",
        style: {
          position: "absolute",
          left: "12.5%",
          bottom: 0,
          width: "75%",
          height: "23%",
          borderTop: "solid white 0.125rem",
        }
      },
      {
        className: "service-line",
        id: "center-service-line",
        style: {
          position: "absolute",
          left: "50%",
          top: "23%",
          width: "0.25rem",
          height: "54%",
          backgroundColor: "white",
          transform: "translateX(-50%)",
        }
      },
      {
        className: "service-line",
        id: "horizontal-service-line",
        style: {
          position: "absolute",
          left: "12.5%",
          top: "50%",
          width: "75%",
          height: "0.125rem",
          backgroundColor: "white",
          transform: "translateY(-50%)",
        }
      },
      {
        className: "singles-sideline",
        id: "top-singles-sideline",
        style: {
          position: "absolute",
          left: "12.5%",
          top: "23%",
          width: "75%",
          height: "0.125rem",
          backgroundColor: "white",
        }
      },
      {
        className: "singles-sideline",
        id: "bottom-singles-sideline",
        style: {
          position: "absolute",
          left: "12.5%",
          bottom: "23%",
          width: "75%",
          height: "0.125rem",
          backgroundColor: "white",
        }
      },
      {
        className: "overlay",
        id: "tennis-court-overlay",
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(64, 95, 77, 0.8)",
        }
      }
    ];
  
    return (
      <div className="tennis-court-container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        height: "100%",

      }}>
        <div className="tennis-court" style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "80%",
          height: "100%",
          backgroundColor: "#415e4d",
          border: "solid white 0.25rem",
        }}>
          {courtLines.map((line, index) => (
            <div
              key={index}
              className={line.className}
              id={line.id}
              style={line.style}
            >
            </div>
          ))}
            {iconImage && (
            <img 
              src={iconImage} 
              alt="Tennis player illustration"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "-20px",
                left: 0,
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </div>
    );
  }

  const HORIZONTALTENNISCOURTJSX = () => {
    const courtLines = [
      {
        className: "alley",
        id: "top-alley", // Was left-alley
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "12.5%", // Was width
          borderBottom: "solid white 0.125rem", // Was borderRight
        }
      },
      {
        className: "alley",
        id: "bottom-alley", // Was right-alley
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "12.5%", // Was width
          borderTop: "solid white 0.125rem", // Was borderLeft
        }
      },
      {
        className: "baseline-box",
        id: "left-baseline", // Was top-baseline
        style: {
          position: "absolute",
          left: 0,
          top: "12.5%", // Was left
          width: "23%", // Was height
          height: "75%", // Was width
          borderRight: "solid white 0.125rem", // Was borderBottom
        }
      },
      {
        className: "baseline-box",
        id: "right-baseline", // Was bottom-baseline
        style: {
          position: "absolute",
          right: 0,
          top: "12.5%",
          width: "23%",
          height: "75%",
          borderLeft: "solid white 0.125rem", // Was borderTop
        }
      },
      {
        className: "service-line",
        id: "center-service-line", // Now horizontal net
        style: {
          position: "absolute",
          left: "23%",
          top: "50%",
          width: "54%", // Was height
          height: "0.25rem", // Was width
          backgroundColor: "white",
          transform: "translateY(-50%)", // Was translateX
        }
      },
      {
        className: "service-line",
        id: "vertical-service-line", // Was horizontal
        style: {
          position: "absolute",
          left: "50%",
          top: "12.5%",
          width: "0.125rem", // Was height
          height: "75%", // Was width
          backgroundColor: "white",
          transform: "translateX(-50%)", // Was translateY
        }
      },
      {
        className: "singles-sideline",
        id: "left-singles-sideline", // Was top
        style: {
          position: "absolute",
          left: "23%",
          top: "12.5%",
          width: "0.125rem", // Was height
          height: "75%", // Was width
          backgroundColor: "white",
        }
      },
      {
        className: "singles-sideline",
        id: "right-singles-sideline", // Was bottom
        style: {
          position: "absolute",
          right: "23%",
          top: "12.5%",
          width: "0.125rem",
          height: "75%",
          backgroundColor: "white",
        }
      },
      {
        className: "overlay",
        id: "tennis-court-overlay",
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(64, 95, 77, 0.8)",
        }
      }
    ];
  
    return (
      <div className="tennis-court-container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        height: "100%",

      }}>
        <div className="tennis-court" style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "80%",
          height: "100%",
          backgroundColor: "#415e4d",
          border: "solid white 0.25rem",
        }}>
          {courtLines.map((line, index) => (
            <div
              key={index}
              className={line.className}
              id={line.id}
              style={line.style}
            >
            </div>
          ))}
            {/* {iconImage && (
            <img 
              src={iconImage} 
              alt="Tennis player illustration"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "-20px",
                left: 0,
                objectFit: "cover",
              }}
            />
          )} */}
        </div>
      </div>
    );
  }

  const ICONIMAGEJSX = () => {
    if (!iconImages || iconImages.length === 0) {
      console.log('No icon images - returning null')
      return null
    }

    return (
      <div className="icons-container" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",

        width: "60%",
        height: "8rem", 
      }}>
        {iconImages.map((icon, index) => (
          <div 
            key={index}
            className="icon-image-wrapper" 
            style={{
              display: "flex",
              width: "25%",
              height: "100%",
              transform: "scale(1.2)",
            }}
          >
            <img 
              src={icon} 
              alt={`Tennis player ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }} 
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='opengraph-image-container' style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      width: "100%",
      height: "100%",

      backgroundColor: "#66905c",

      fontFamily: "Oswald",
      color: "white",
    }}>

      {/* <div className="og-title-container" style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "4rem",
          paddingBottom: "1rem",
          backgroundColor: "#66905c",
        }}>
        
        <p className="og-title" id="site-title" style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              flexWrap: "wrap",
              
              margin: "0px",
                  
              fontWeight: "700",
              fontSize: "3rem",

              borderBottom: "solid white 0.25rem",
            }}>
          
              <span style={{marginBottom: 0,}}>GAME</span>
              {TENNISBALLJSX(1)}
              <span style={{marginBottom: 0,}}>SET</span>
              {TENNISBALLJSX(2)}
              <span style={{marginBottom: 0,}}>BLOG</span>
              {TENNISBALLJSX(3)}
        </p>

        {ICONIMAGEJSX()}

      </div>  */}

      <div className="og-content-container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        
        height: "100%",
        width: "100%",
        padding: "2rem",
        paddingTop: "2rem",
      }}>           

        <div className="featured-image-container" style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}>
          <div className="featured-image-shadow" style={{
            position: "absolute",
            top: "0.375rem",
            left: "-0.375rem",
            width: "100%",
            height: "100%",
            backgroundColor: "#415e4d",
            border: "solid #415e4d 0.25rem",
          }}></div>

          {/* Main image wrapper */}
          <div className="featured-image-wrapper" style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            border: "solid black 0.25rem",
          }}>
            {featuredImage && (
              <img 
                src={featuredImage} 
                alt="Featured"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }} 
              />
            )}
          </div>
        </div>
     
      </div>

      <div style={{
        position: "absolute",
        display: "flex",
        top: "4rem",
        left: "4rem",
        }}>
        
        <div style={{
          display: "flex",
          position: "absolute",
          top: "0.375rem",
          left: "-0.375rem",
          padding: "2rem",
          paddingBottom: "2rem",
          backgroundColor: "#d7f704", // Neon yellow
          border: "solid #d7f704 0.25rem",
          borderRadius: "0.5rem",
        }}>
            <p style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                margin: "0px",
                fontWeight: "700",
                fontSize: "3rem",
                borderBottom: "solid transparent 0.25rem",
                opacity: 0,
              }}>
                <span>GAME</span>
                {TENNISBALLJSX(1)}
                <span>SET</span>
                {TENNISBALLJSX(2)}
                <span>BLOG</span>
                {TENNISBALLJSX(3)}
              </p>
        </div>
        
        <div className="og-title-container" style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            
            position: "relative",


            padding: "2rem",
            paddingBottom: "2rem",
            backgroundColor: "black",
            border: "solid white 0.25rem",
            borderRadius: "0.5rem",
          }}>
          
          <p className="og-title" id="site-title" style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                flexWrap: "wrap",
                
                margin: "0px",
                    
                fontWeight: "700",
                fontSize: "3rem",

                borderBottom: "solid white 0.25rem",
              }}>
            
                <span style={{marginBottom: 0,}}>GAME</span>
                {TENNISBALLJSX(1)}
                <span style={{marginBottom: 0,}}>SET</span>
                {TENNISBALLJSX(2)}
                <span style={{marginBottom: 0,}}>BLOG</span>
                {TENNISBALLJSX(3)}
          </p>

        </div> 
      
      </div>
    </div>
  )
}