import { ImageResponse } from "next/og"
import { APP_CITY, APP_DATES, APP_NAME, APP_SUBTITLE, APP_YEAR, SITE_URL } from "@/lib/constants"

export const runtime = "edge"
export const alt = `${APP_NAME} ${APP_YEAR} · App de la Festa Major de Mataró`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1a1412",
          padding: "64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle at top right, rgba(138,26,16,0.35), transparent 65%)",
          }}
        />

        {/* Top: eyebrow badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "rgba(138,26,16,0.9)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              padding: "6px 18px",
              borderRadius: "999px",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Festa Major {APP_YEAR} · {APP_CITY}
          </div>
        </div>

        {/* Middle: headline + sub + CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "100px", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-3px" }}>
            {APP_NAME}
          </div>
          <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.5)", fontWeight: 400, marginTop: "4px" }}>
            {APP_SUBTITLE}
          </div>

          {/* CTA + dates row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "16px" }}>
            {/* Primary CTA */}
            <div
              style={{
                backgroundColor: "#8a1a10",
                color: "#fff",
                fontSize: "20px",
                fontWeight: 700,
                padding: "12px 28px",
                borderRadius: "14px",
              }}
            >
              Descarrega gratis
            </div>
            {/* Dates pill */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "18px",
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: "14px",
              }}
            >
              {APP_DATES}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
                fontSize: "18px",
                padding: "12px 24px",
                borderRadius: "14px",
              }}
            >
              iOS · Android
            </div>
          </div>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "16px", letterSpacing: "0.02em" }}>
            {SITE_URL.replace("https://", "")}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              backgroundColor: "#8a1a10",
              color: "#fff",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            LS
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
