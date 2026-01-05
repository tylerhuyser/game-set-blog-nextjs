import { icon } from "@fortawesome/fontawesome-svg-core";

export default function OGImage({ pageTitle, iconImages, featuredImage }) {

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