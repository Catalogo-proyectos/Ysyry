"use client";

import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-radial from-slate-900 to-slate-950">
      <div className="max-w-md w-full p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 rounded-full">
          <span>⚡ Next.js + Tailwind + Zustand + pnpm</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Proyecto Ysyry
        </h1>

        <p className="text-sm text-slate-400">
          Entorno configurado e inicializado correctamente con todas las dependencias solicitadas.
        </p>

        <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Prueba de Zustand Store
          </p>
          <div className="text-5xl font-mono font-bold text-cyan-400">
            {count}
          </div>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={decrement}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition text-white cursor-pointer"
            >
              -1
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800/60 hover:bg-slate-700/60 active:scale-95 transition text-slate-400 hover:text-white cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={increment}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition text-slate-950 font-semibold cursor-pointer"
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
