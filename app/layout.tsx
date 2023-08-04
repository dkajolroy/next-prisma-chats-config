import MainProvider from "@/components/provider/mainProvider";
import ReduxProvider from "@/components/provider/reduxProvider";
import { Ubuntu } from "next/font/google";
import SessionProvider from "../components/provider/sessionProvider";
import "./globals.css";

const inter = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Whatsapp",
  description: "World most chat application platform. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <>
            <ReduxProvider>
              <MainProvider>
                <>{children}</>
              </MainProvider>
            </ReduxProvider>
          </>
        </SessionProvider>
      </body>
    </html>
  );
}
