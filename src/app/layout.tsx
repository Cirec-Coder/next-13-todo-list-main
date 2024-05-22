import "./globals.css"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata = {
  title: "Todo App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-slate-800 text-slate-100 container mx-auto p-4 min-h-screen max-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
