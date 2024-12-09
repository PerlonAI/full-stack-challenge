import Wordle from "./components/Worlde";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/word", {
    cache: "no-store",
  });

  const { word } = await response.json();

  return (
    <main className="flex flex-col gap-8 justify-center items-center min-h-screen py-8">
      <p className="text-4xl font-semibold">WORDLE</p>

      <Wordle generatedWord={word} />
    </main>
  );
}
