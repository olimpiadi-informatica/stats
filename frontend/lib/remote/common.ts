import fs from "fs";
import path from "path";

export type Error = {
  error: string;
};

export type Contestant = {
  id: string;
  first_name: string | null;
  last_name: string;
};

export type NumMedals = {
  gold: number;
  silver: number;
  bronze: number;
};

export type International = {
  code: string;
  name: string;
  link: string | null;
  color: string;
};

export type Medal = "gold" | "silver" | "bronze" | null;

export const DATA_DIR = process.env.DATA_DIR || "../data";

export async function loadJSON<T>(filePath: string): Promise<T> {
  const fullPath = path.join(DATA_DIR, filePath);
  const data = await fs.promises.readFile(fullPath);
  return JSON.parse(data.toString()) as T;
}
