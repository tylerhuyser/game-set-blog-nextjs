import OGTennisCourt from "../../_tennisCourt/OGTennisCourt"

export default function OGImageHome({ iconImages }) {

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
      padding: "4rem 8rem",

      backgroundColor: "#66905c",

      fontFamily: "Oswald",
      color: "white",
    }}>

      <div className="og-content-container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        
        height: "100%",
        width: "100%",
      }}>           
        
        <div className="og-title-container" style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",  
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
     
        <div className="tennis-court-container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "80%",
        }}>
          <OGTennisCourt
            orientation="horizontal"
            iconImages={iconImages}
            showIcons={true}
          />
        </div>

      </div>
      
    </div>
  )
}