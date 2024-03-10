import Token from "../structs/Token"

export interface ParserProps {
  cursor: number,
  tokens: Token[],
  code: string,
}

export interface LexerProps {
  cursor: number,
  code: string,
  line: number,
  col: number,
  failed: boolean
}