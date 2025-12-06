'use client';

import { useSearchParams } from "next/navigation";

export default function NotFoundClient() {
  const params = useSearchParams();
  const q = params.get("q");

  return (
    <p className="text-gray-500">
      {q
        ? `Nenhum resultado encontrado para "${q}".`
        : "Verifique a URL e tente novamente."}
    </p>
  );
}