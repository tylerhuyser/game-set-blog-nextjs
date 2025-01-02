export default function OGImage({ pageTitle }) {

  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev
    ? 'http://localhost:3000'
    : 'https://gamesetblog.com';

  return (
    <div className='opengraph-image-container' style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      width: "100%",
      height: "100%",
    }}>

      <div className="og-icon-container" style={{
        width: "30%",
        height: "100%",

        backgroundColor: "rgba(243, 156, 18, 1)",
        backgroundImage: `url('${baseUrl}/assets/Icons-Background-White-Transparent-1000X875.png'), linear-gradient(rgba(243, 156, 18, 1), rgba(243, 156, 18, 1))`,
        backgroundSize: "750vw 750vh",
        backgroundPosition: "-50vw -50vh",
        backgroundRepeat: "repeat",
        backgroundPosition: "center center"
      }} />

      <div className="og-content-container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "70%",
        height: "100%",
        padding: "25px",
        backgroundColor: "rgba(255,255,255,1)",


        backgroundImage: `url('${baseUrl}/assets/Icons-Background-Blue-Transparent-1000X875.png')`,
        backgroundSize: "750vw 750vh",
        backgroundPosition: "-50vw -50vh",
        backgroundRepeat: "repeat",
        backgroundPosition: "center center"
    }}>

    <div className="og-content-container" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "60%",
      width: "100%",
      backgroundColor: "rgba(255,255,255,1)",
    }}>      
        
      <p className="og-title" id="site-title" style={{
        fontFamily: "helvetica",
        fontSize: "90px",
        color: "#F39C12",
        }}>Game. Set. Blog.</p>
          
      <p className="og-title" id="page-title" style={{
        fontSize: "80px",
        color: "#F39C12",
        borderTop: "10px solid orange",
        paddingTop: "50px"
      }}>{pageTitle}</p>
          
      <svg id="icon-logo" xmlns="http://www.w3.org/2000/svg" role="img" width="96" height="51" viewBox="0 0 96 51" style={{
      }}>
            
        <g transform="translate(3.000000, 3.000000)">
            <polygon
              id="Shape"
              stroke="#F39C12"
              fill="transparent"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0 0 45 0 45 10 45 0 90 0 90 22.5 87 22.5 90 22.5 90 45 45 45 45 35 45 45 0 45 0 22.5 3 22.5 0 22.5 0 0 10 0 10 45 80 45 80 0"
            />
        </g>

      </svg>  

      </div>    
          
    </div>
      
  </div>
  )
}