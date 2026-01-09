import React from "react"

export default function OGTennisCourt({
  orientation,
  iconImages,
  showIcons
}) {

  const isVertical = orientation === "vertical";

    const courtLines = isVertical ? 
    [
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
    ] : [
      {
        className: "alley",
        id: "top-alley",
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "12.5%",
          borderBottom: "solid white 0.125rem",
        }
      },
      {
        className: "alley",
        id: "bottom-alley",
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "12.5%",
          borderTop: "solid white 0.125rem",
        }
      },
      {
        className: "baseline-box",
        id: "left-baseline",
        style: {
          position: "absolute",
          left: 0,
          top: "12.5%",
          width: "23%",
          height: "75%",
          borderRight: "solid white 0.125rem",
        }
      },
      {
        className: "baseline-box",
        id: "right-baseline",
        style: {
          position: "absolute",
          right: 0,
          top: "12.5%",
          width: "23%",
          height: "75%",
          borderLeft: "solid white 0.125rem",
        }
      },
      {
        className: "service-line",
        id: "center-service-line",
        style: {
          position: "absolute",
          left: "23%",
          top: "50%",
          width: "54%",
          height: "0.25rem",
          backgroundColor: "white",
          transform: "translateY(-50%)",
        }
      },
      {
        className: "service-line",
        id: "vertical-service-line",
        style: {
          position: "absolute",
          left: "50%",
          top: "12.5%",
          width: "0.125rem",
          height: "75%",
          backgroundColor: "white",
          transform: "translateX(-50%)",
        }
      },
      {
        className: "singles-sideline",
        id: "left-singles-sideline",
        style: {
          position: "absolute",
          left: "23%",
          top: "12.5%",
          width: "0.125rem",
          height: "75%",
          backgroundColor: "white",
        }
      },
      {
        className: "singles-sideline",
        id: "right-singles-sideline",
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
    <div className="tennis-court" style={{
      display: "flex",
      alignItems: "center",
      position: "relative",
      width: "100%",
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
        />
      ))}
      
      {/* Icon images */}
      {!isVertical && showIcons && iconImages?.length > 0 &&(
        <div className="icon-images-container" style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "100%",
          height: "100%",
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
      )}
    </div>
  )
}