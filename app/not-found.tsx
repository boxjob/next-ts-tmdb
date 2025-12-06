import { Suspense } from "react";
import NotFoundClient from "./not-found-client";

export default function NotFoundPage() {
  return (
    <div className="p-10 text-center bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300">
      <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>

      <Suspense fallback={<p>Carregando...</p>}>
        <NotFoundClient />
      </Suspense>
    </div>
  );
}