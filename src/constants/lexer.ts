import { TokenKind } from "../types/ast";

export const LEXER_SPEC: Array<[RegExp, TokenKind]> = [
  // Skippable
  [/^\s+/, TokenKind.Skippable],
  
  // String
  [/^\".*\"/, TokenKind.String],
   
  // Identifier
  [/^\w+/, TokenKind.Identifier],

  // Operators
  [/^\@/, TokenKind.At],
  [/^\:/, TokenKind.Colon],
 
  // Delimiters
  [/^\(/, TokenKind.OpenParen],
  [/^\)/, TokenKind.CloseParen],
  [/^\[/, TokenKind.OpenBracket],
  [/^\]/, TokenKind.CloseBracket],
  [/^\,/, TokenKind.Comma],
];