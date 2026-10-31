import { cacheLife } from "next/cache";

/** Ano corrente, em cache (compatível com cacheComponents). */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
