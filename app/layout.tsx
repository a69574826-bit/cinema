export const metadata = {
  title: 'NETKINO — Онлайн-кинотеатр',
  description: 'Смотрите любимые фильмы и сериалы',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f0f12' }}>
        {children}
      </body>
    </html>
  );
}