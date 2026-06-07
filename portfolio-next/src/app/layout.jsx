import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata = {
  title: "Ubaid Portfolio",
  description: "Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVJkEZSMUjwQvfdpQODm+nnrTn9dbFH2dA9jnmX6K8Ovf++D4rCZay210fAbUWRW73SMBzFUaug=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
