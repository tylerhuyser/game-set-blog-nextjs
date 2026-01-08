// app/icon.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Default size for favicon
export const sizes = [
  { width: 16, height: 16 },
  { width: 32, height: 32 },
  { width: 48, height: 48 },
  { width: 64, height: 64 },
];

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        {/* Tennis Ball Container */}
        <span
          style={{
            display: "flex",
            width: "90%",
            height: "90%",
            borderRadius: "50%",
        }}>
      
          {/* Tennis Ball Base (Yellow)*/}
          <span style={{
            position: "absolute",
            left: 0,
            top: 0,

            width: "100%",
            height: "100%",

            backgroundColor: "#d7f704",
            border: "50px solid black",
            borderRadius: "50%",
          }}></span>

          {/* Top Seam */}
          <span style={{
            position: "absolute",
            left: "-60%",
            top: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            borderRight: "100px solid black",
            borderRadius: "50%",
          }}></span>
      
          {/* Bottom Seam */}
          <span style={{
            position: "absolute",
            right: "-60%",
            top: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            borderLeft: "100px solid black",
            borderRadius: "50%",
          }}></span>
                  
        </span>   
      </div>
    )
  );
}
