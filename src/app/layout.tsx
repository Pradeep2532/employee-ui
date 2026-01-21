import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Employee UI",
  description: "Employee Info Management UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
