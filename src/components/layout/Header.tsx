export default function Header() {
  return (
    <header className="flex justify-between p-4 border-b">
      <div className="font-bold">FitLaps</div>
      <nav>
        <a href="/" className="mr-4">Home</a>
      </nav>
    </header>
  );
}