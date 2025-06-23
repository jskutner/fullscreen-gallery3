import { getEkoAnalyticsSnippet } from '@ekolabs/eko-gallery-react';

export const metadata = {
  title: 'Eko Embed Gallery',
  description: 'Embed Eko Gallery in a website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          id="eko-analytics-snippet"
          dangerouslySetInnerHTML={{
            __html: getEkoAnalyticsSnippet(process.env.NODE_ENV === 'production'),
          }}
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
