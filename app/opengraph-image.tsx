import { ImageResponse } from "next/og"
import { APP_NAME, APP_YEAR, SITE_URL } from "@/lib/constants"

export const runtime = "edge"
export const alt = `${APP_NAME} ${APP_YEAR} · App de la Festa Major de Mataró`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const res = await fetch(new URL(`${SITE_URL}/thumbnail.png`))
  const data = await res.arrayBuffer()
  const src = `data:image/png;base64,${Buffer.from(data).toString("base64")}`

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <img src={src} alt="" role="presentation" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    ),
    { ...size },
  )
}
