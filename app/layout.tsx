import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-archivo",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-instrument-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Escala Digital Ventures | Producto y tecnología",
  description:
    "Automatizamos tu negocio y construimos plataformas propias que crecen contigo.",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FFFFFF",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${archivo.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} bg-background`}
      lang="es"
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
