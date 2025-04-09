import { InputBoxes } from "@/components/InputBoxes";
import { checkUserInputAction } from "./action";

const ROWS= 6;
const COLS= 5;

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={checkUserInputAction}>
      <InputBoxes rows={ROWS} cols={COLS} />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          submit!
          </button>
        </form>
    </main>
  )
}
