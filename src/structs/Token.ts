import { TokenKind, TokenProps } from "../types/ast";

export default class Token implements TokenProps {

  public constructor(public kind: TokenKind, public text: string,
     public line: number, public col: number) {}

  public static eof(line: number = -1, col: number = -1) {
    return new Token(TokenKind.Eof, 'EndOfFile', line, col);
  };

  public static getLexemeByKind(kind: TokenKind): string {
    switch (kind) {
      case TokenKind.String: return '"string here"'
      case TokenKind.Identifier: return "identifier"
      case TokenKind.OpenParen: return "("
      case TokenKind.CloseParen: return ")"
      case TokenKind.OpenBracket: return "["
      case TokenKind.CloseBracket: return "]"
      case TokenKind.Comma: return ","
      case TokenKind.At: return "@"
      case TokenKind.Colon: return ":"
      case TokenKind.Skippable: return " "
      case TokenKind.Eof: return "\0"
    }
  }
}