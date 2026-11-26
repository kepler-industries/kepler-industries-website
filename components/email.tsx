export const CONTACT_EMAIL = "hello@kepler-industries.com";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Lien mailto que l'« Email Address Obfuscation » de Cloudflare laisse tel
 * quel. Sinon Cloudflare remplace l'adresse du HTML par « [email protected] »
 * et un lien /cdn-cgi/l/email-protection, décodés par un script : les robots
 * et les navigateurs sans JavaScript ne voient que le texte de remplacement.
 * Les commentaires `email_off` sont l'exception prévue par Cloudflare ; React
 * ne sait écrire un commentaire HTML que par innerHTML.
 */
export function Email({
  address = CONTACT_EMAIL,
  className,
}: {
  address?: string;
  className?: string;
}) {
  const a = escapeHtml(address);
  const cls = className ? ` class="${escapeHtml(className)}"` : "";
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off--><a href="mailto:${a}"${cls}>${a}</a><!--/email_off-->`,
      }}
    />
  );
}
