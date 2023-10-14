import "../styles/main.scss";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Advice Generator",
  description: "Project By Kisakye Moses",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
