import "./globals.css";

export const metadata = {
  title: "Aura Resume | Premium ATS-Friendly Resume Builder",
  description: "Build an ATS-optimized, high-scoring developer resume in real time. Get instant feedback, completeness tracking, and pixel-perfect A4 downloads.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-violet-500/30">
        {children}
      </body>
    </html>
  );
}
