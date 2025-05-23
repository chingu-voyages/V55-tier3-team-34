import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
         <div>
           <h1 className="text-accent text-6xl font-bold">Chingu showcase Project, more than just code</h1>
         </div>
      </main>
    </div>
  );
}
