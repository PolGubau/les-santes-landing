import { ImageResponse } from "next/og"
import { APP_CITY, APP_DATES, APP_NAME, APP_SUBTITLE, APP_YEAR, SITE_URL } from "@/lib/constants"

export const runtime = "edge"
export const alt = `${APP_NAME} - ${APP_SUBTITLE}`
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
        }}
      >
        {/* Top: badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              backgroundColor: "#8a1a10",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "999px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Festa Major {APP_YEAR} · {APP_CITY}
          </div>
        </div>

        {/* Middle: main title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "96px", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
            {APP_NAME}
          </div>
          <div style={{ fontSize: "32px", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            {APP_SUBTITLE}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(138,26,16,0.25)",
                border: "1px solid rgba(138,26,16,0.5)",
                color: "#e87060",
                fontSize: "18px",
                fontWeight: 500,
                padding: "8px 20px",
                borderRadius: "12px",
              }}
            >
              {APP_DATES}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.4)",
                fontSize: "18px",
                padding: "8px 20px",
                borderRadius: "12px",
              }}
            >
              App gratuïta · iOS &amp; Android
            </div>
          </div>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>
            {SITE_URL.replace("https://", "")}
          </div>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#8a1a10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "24px",
              fontWeight: 800,
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
