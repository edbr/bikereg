import { ImageResponse } from "next/og";

export const alt = "FrameProof: bicycle ownership registry by Eduardo Belluti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#071019", color: "#ffffff", padding: "72px" }}>
      <div style={{ display: "flex", color: "#2dd4bf", fontSize: 26 }}>BICYCLE OWNERSHIP · WEB3 · PRODUCT DESIGN</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 100, fontWeight: 700 }}>FrameProof</div>
        <div style={{ display: "flex", fontSize: 36 }}>Register bikes. Transfer ownership. Verify records.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>Built by Eduardo Belluti</span><span>bicireg.edbelluti.com</span>
      </div>
    </div>, size,
  );
}
