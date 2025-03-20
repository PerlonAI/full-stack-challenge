"use client"

interface StatusProps {
 gameStatus: "playing" | "won" | "lost";
 hiddenWord?: string[];
}

export default function Status({ gameStatus, hiddenWord = [] }: StatusProps) {
 if (gameStatus === "playing") {
   return null;
 }
 
 return (
   <div className="mt-4 text-xl font-bold">
     {gameStatus === "won" ? (
       <p className="text-green-600">You won!</p>
     ) : (
       <p className="text-red-600">You lost! The word was "{hiddenWord.join('').toUpperCase()}".</p>
     )}
   </div>
 );
}