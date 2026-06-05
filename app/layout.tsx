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
      <body>
        {children}
      </body>
    </html>
  );
}