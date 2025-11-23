export const DATABASE_URL: string =
  process.env.DATABASE_URL ??
  'postgresql://postgres:postgres@localhost:5432/press0';

export const BASE_URL: string = process.env.BASE_URL ?? 'http://localhost:3000';
