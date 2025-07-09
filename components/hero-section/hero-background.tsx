export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
    </>
  );
}
