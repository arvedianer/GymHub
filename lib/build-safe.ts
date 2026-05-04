/**
 * Build-safe database query wrapper.
 * Falls back to default values when DB is unreachable during build time.
 * This prevents Vercel builds from crashing when DATABASE_URL is missing
 * or the database is temporarily unavailable.
 */
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    console.warn("[build-safe] DB query failed, using fallback:", error);
    return fallback;
  }
}
