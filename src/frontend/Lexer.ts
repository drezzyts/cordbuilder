import { LEXER_SPEC } from "../constants/lexer";
import { LexerProps } from "../types/frontend";
import { TokenKind } from "../types/ast";

import Token from "../structs/Token";

export default class Lexer implements LexerProps {
  public cursor: number;
  public failed: boolean;
  public line: number;
  public col: number;
  public code: string;

  public constructor(code: string) {
    this.failed = false;
    this.cursor = 0;
    this.line = 1;
    this.col = 0;
    this.code = code.trim();
  };

  public lex(): Token[] {
    const tokens: Token[] = [];

    while (this.hasMoreTokens()) {
      const token = this.getNextToken();
      tokens.push(token);
    }

    tokens.push(Token.eof(this.line, this.col + 1));

    return tokens;
  }

  private getNextToken(): Token {
    const currentCode = this.code.slice(this.cursor);
    let token;

    for (const [regex, kind] of LEXER_SPEC) {
      const lexeme = regex.exec(currentCode)?.[0];

      if (lexeme) {
        this.cursor += lexeme.length;
        this.col += lexeme.length;

        if (kind == TokenKind.Skippable) {
          if (lexeme !== ' ') this.breakLine();
          return this.getNextToken();
        }

        token = new Token(kind, lexeme, this.line, this.col);
        break;
      }
    }

    if(!token) {
      this.failed = true;
      throw new Error(`lexer (l:${this.line}, c:${this.col}): Invalid token found during lexing -> ${currentCode[0]}`);
    }

    return token;
  }

  private breakLine(): void {
    this.line++;
    this.col = 0;
  }

  private hasMoreTokens(): boolean {
    return this.cursor != this.code.length;
  }
}