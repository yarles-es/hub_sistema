import "./data-tables-css.css";
import "./globals.css";
import LayoutManager from "./LayoutManager";
import "./satoshi.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning={true}
        className="flex flex-col overflow-hidden"
      >
        <LayoutManager>{children}</LayoutManager>
      </body>
    </html>
  );
}
