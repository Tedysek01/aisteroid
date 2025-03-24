export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Admin stránka nenalezena</h1>
        <p className="mb-8">Diagnostická informace: Tato stránka je zobrazena, když router nemůže najít stránku v admin složce.</p>
        <a href="/" className="text-blue-500 hover:underline">Zpět na domovskou stránku</a>
      </div>
    </div>
  );
} 