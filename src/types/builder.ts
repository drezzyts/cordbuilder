import { KEYWORDS } from "../constants/keywords";

export type BuilderKeyword = typeof KEYWORDS[number];

export interface BuilderValidator {
  prop: typeof KEYWORDS[number],
  required: boolean,
  count: number,
}

export interface BuilderProperty {
  prop: string,
  value: string
}
