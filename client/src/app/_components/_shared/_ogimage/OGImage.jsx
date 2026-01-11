export default function OGImage({ featuredImage }) {

  const TENNISBALLJSX = (index) => (
    // Tennis Ball Container
    <span
      className="tennis-ball-period-container"
      id={`tennis-ball-period-${index}`}
      style={{
        display: "flex",
        position: "relative", 
        top: "-15px",
    
        width: "0.4em",
        height: "0.4em",
        borderRadius: "50%",
        marginRight: "25px",
        marginLeft: "10px",
        marginBottom: 0,
    }}>
  
      {/* Tennis Ball Base (Yellow)*/}
      <span style={{
        position: "absolute",
        left: 0,
        top: 0,

        width: "0.4em",
        height: "0.4em",

        backgroundColor: "black",
        border: "2px solid black",
        borderRadius: "50%",
      }}></span>

      {/* Top Seam */}
      <span style={{
        position: "absolute",
        left: "-62%",
        top: 0,
        width: "0.4em",
        height: "0.4em",
        background: "transparent",
        borderRight: "2px solid #d7f704",
        borderRadius: "50%",
      }}></span>
  
      {/* Bottom Seam */}
      <span style={{
        position: "absolute",
        right: "-62%",
        top: 0,
        width: "0.4em",
        height: "0.4em",
        background: "transparent",
        borderLeft: "2px solid #d7f704",
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

      fontFamily: "Oswald",
      color: "black"
    }}>

      <div className="og-content-container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        
        height: "100%",
        width: "100%",
        paddingLeft: "8rem",
      }}>           

        <div className="featured-image-container" style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}>

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
        display: "flex",

        position: "absolute",
        bottom: 0,
        left: 0,
        height: "8rem",

        transform: "rotate(-90deg) translateY(100%)",
        transformOrigin: "bottom left",
        }}>
        
        <div className="og-title-container" style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
            
          position: "relative",
          padding: "0 2rem",

          backgroundColor: "#d7f704",
          border: "solid black 0.25rem",
          }}>
          
          <p className="og-title" id="site-title" style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            flexWrap: "nowrap",
            
            margin: "0px",
                
            fontSize: "4rem",
            fontWeight: "700",
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