import { 
   Identifier, ParenthesizedExpression, StringExpression, ArgumentsExpression, SubPropertyDeclaration, BooleanExpression 
} from "../structs/Expressions";

import { PropertyDeclaration, Program } from "../structs/Statements";
import Token from "../structs/Token";
import { TokenKind } from "../types/ast";
import { ArgumentsExpressionProps, Expression } from "../types/expressions";
import { ParserProps } from "../types/frontend";
import Lexer from "./Lexer";

export default class Parser implements ParserProps {
  public cursor: number;
  public tokens: Token[];

  public constructor(public code: string) {
    const lexer = new Lexer(code);

    this.tokens = lexer.lex();
    this.cursor = 0;
  }

  public parse(): Program {
    const statements: PropertyDeclaration[] = [];

    while (this.current.kind !== TokenKind.Eof)
      statements.push(this.parsePropertyDeclaration());

    const program = new Program(statements);

    return program;
  }

  private parsePropertyDeclaration(): PropertyDeclaration {
    const at = this.expect(TokenKind.At);
    const identifier = this.parseIdentifier();
    const expression = this.parseExpression();
    
    return new PropertyDeclaration(identifier, expression, at);
  }

  private parseSubPropertyDeclaration(): SubPropertyDeclaration {
    const colon = this.expect(TokenKind.Colon);
    const identifier = this.parseIdentifier();
    const expression = this.parseExpression();

    return new SubPropertyDeclaration(identifier, expression, colon);
  }

  private parseExpression(): Expression {
    switch (this.current.kind) {
      case TokenKind.String:
        return this.parseStringExpresison();
      case TokenKind.Boolean:
        return this.parseBooleanExpresison();
      case TokenKind.Identifier:
        return this.parseIdentifier();
      case TokenKind.OpenParen:
        return this.parseParenthesizedExpression();
      case TokenKind.OpenBracket:
        return this.parseArgumentsExpression();
      default:
        throw new Error(`parser (l:${this.current.line}, c:${this.current.col}): Invalid token found during parsing: "${this.current.text}"`);
      }
  }

  private parseStringExpresison(): StringExpression {
    const token = this.expect(TokenKind.String);
    const value = token.text;

    return new StringExpression(value);
  }

  private parseBooleanExpresison(): BooleanExpression {
    const token = this.expect(TokenKind.Boolean);
    const value = Boolean(token.text);

    return new BooleanExpression(value);
  }
  
  private parseParenthesizedExpression(): Expression {
    const open = this.expect(TokenKind.OpenParen);
    const expression = this.parseExpression();
    const close = this.expect(TokenKind.CloseParen);
    const parens: [open: Token, close: Token] = [open, close];

    return expression;
  }

  private parseArgumentsExpression(): ArgumentsExpression {
    const open = this.expect(TokenKind.OpenBracket);
    const expressions: SubPropertyDeclaration[] = [];
    
    const firstExpression = this.parseSubPropertyDeclaration();
    expressions.push(firstExpression);

    while (this.current.kind !== TokenKind.CloseBracket && this.current.kind !== TokenKind.Eof) {
      this.expect(TokenKind.Comma);

      const expression = this.parseSubPropertyDeclaration();
      expressions.push(expression);
    }

    const close = this.expect(TokenKind.CloseBracket);
    const brackets: [open: Token, close: Token] = [open, close];

    return new ArgumentsExpression(brackets, expressions);
  }

  private parseIdentifier() {
    const token = this.expect(TokenKind.Identifier);
    const name = token.text;

    return new Identifier(name, token); 
  }

  private get current(): Token {
    return this.tokens[this.cursor];
  }

  private peek(offset: number = 0): Token {
    if (this.cursor + offset > this.tokens.length) return this.tokens[this.tokens.length - 1];
    if (this.cursor + offset < 0) return this.tokens[0];

    return this.tokens[this.cursor + offset];
  }

  private expect(kind: TokenKind): Token {
    if (this.current.kind == TokenKind.Eof) 
      throw new Error(`parser (l:${this.current.line}, c:${this.current.col}): Unexpected end of input expected: "${Token.getLexemeByKind(kind)}" (${kind})`);
    else if (this.current.kind !== kind)
      throw new Error(`parser (l:${this.current.line}, c:${this.current.col}): Unexpected token has found during parsing "${this.current.text}" (${this.current.kind}), expected "${Token.getLexemeByKind(kind)}" (${kind})`)
    else {
      const token = this.current;
      this.cursor++;

      return token;
    }
  }
} 