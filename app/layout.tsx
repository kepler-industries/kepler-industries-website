import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BASE_URL } from "@/i18n/routing";

// Origine des URL absolues (image de partage…) pour la page 404 racine aussi.
export const metadata: Metadata = { metadataBase: new URL(BASE_URL) };

// Mise en page racine « transparente » : <html> et <body> sont rendus par
// app/[locale]/layout.tsx (qui connaît la langue). Elle n'existe que pour
// permettre la page 404 racine (app/not-found.tsx), qui a son propre <html>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
