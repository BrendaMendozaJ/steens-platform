import './globals.css'

export const metadata = {
  title: 'STEENS - Red Social STEM para Chicas Peruanas',
  description: 'Plataforma segura para empoderar a las chicas peruanas en STEM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}