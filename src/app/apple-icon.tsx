import { ImageResponse } from "next/og";

// Apple touch icon (shown when the site is added to an iOS home screen).
// Matches the brand in src/app/icon.svg: ink background, bone "OT", signal dot.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0d0d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 104, fontStyle: "italic", color: "#f0f0f0" }}>
          OT
        </div>
        <div
          style={{
            position: "absolute",
            top: 38,
            right: 38,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#6cb6ff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
