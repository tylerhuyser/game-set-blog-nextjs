export default function OGImage({ pageTitle, baseUrl }) {

  return (
    <div className='opengraph-image-container' style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",

      width: "100%",
      height: "100%",
      padding: "50px",

      backgroundColor: "rgba(255,255,255,1)",
      backgroundImage: `url('${baseUrl}/assets/Icons-Background-Orange-Transparent-1000X875.png')`,
      backgroundSize: "750vw 750vh",
      backgroundPosition: "-50vw -50vh",
      backgroundRepeat: "repeat",
      backgroundPosition: "center center"
    }}>

      <div className="og-content-container" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
        height: "100%",
        width: "100%",
        padding: "75px",
        
        backgroundColor: "rgba(243, 156, 18, 1)",
        backgroundImage: `url('${baseUrl}/assets/Icons-Background-White-Transparent-1000X875.png'), linear-gradient(rgba(243, 156, 18, 0.5), rgba(243, 156, 18, 0.5))`,
        backgroundSize: "750vw 750vh",
        backgroundPosition: "-50vw -50vh",
        backgroundRepeat: "repeat",
        backgroundPosition: "center center"
      }}>      
          
        <div className="og-logo-container" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          
          height: "100%",
          width: "20%",

          // scale: "2",
        }}>
              
          <svg id="icon-logo" xmlns="http://www.w3.org/2000/svg" role="img" width="96" height="51" viewBox="0 0 96 51" style={{
            backgroundColor: "rgba(243, 156, 18, 1)",
            transform: "scale(3) rotate(90deg)",
          }}>
                
            <g transform="translate(3.000000, 3.000000)">
                <polygon
                  id="Shape"
                  stroke="white"
                  fill="transparent"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0 0 45 0 45 10 45 0 90 0 90 22.5 87 22.5 90 22.5 90 45 45 45 45 35 45 45 0 45 0 22.5 3 22.5 0 22.5 0 0 10 0 10 45 80 45 80 0"
                />
            </g>

          </svg>         

        </div>    

        <div className="og-titles-container" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100%",
            width: "75%",
          }}>
                
            <p className="og-title" id="site-title" style={{
                backgroundColor: "rgba(243, 156, 18, 1)",
                fontFamily: "bogart-semibold",
                fontWeight: "900",
                fontSize: "90px",
                color: "white",
                }}>Game. Set. Blog.</p>
                  
              <p className="og-title" id="page-title" style={{
            backgroundColor: "rgba(243, 156, 18, 1)",
                marginTop: "-5px",
                paddingTop: "25px",
                borderTop: "10px solid white",
                
                fontFamily: "helvetica",
                fontSize: "40px",
                color: "white",
              }}>{pageTitle}</p>

        </div>
            
      </div>
      
  </div>
  )
}