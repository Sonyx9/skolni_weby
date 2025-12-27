/**
 * Helper funkce pro vytváření správných URL s base path
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Pokud cesta začíná /, odstraníme ji a přidáme base
  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`;
  }
  // Pokud už obsahuje base, vrátíme jak je
  if (path.startsWith(base)) {
    return path;
  }
  // Jinak přidáme base
  return `${base}${path}`;
}

