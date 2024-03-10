import { Identifier } from "../structs/Expressions";
import Token from "../structs/Token";
import { ExpressionKind } from "./ast";

export abstract class Expression {
  declare kind: ExpressionKind;
}

export interface StringExpressionProps extends Expression {
  kind: ExpressionKind.StringExpression,
  value: string
};

export interface ParenthesizedExpressionProps extends Expression {
  kind: ExpressionKind.ParenthesizedExpression,
  parens: [open: Token, close: Token],
  expression: Expression
}

export interface IdentifierProps extends Expression {
  kind: ExpressionKind.Identifier,
  token: Token,
  name: string
}

export interface ArgumentsExpressionProps extends Expression {
  kind: ExpressionKind.ArgumentsExpression,
  brackets: [open: Token, close: Token],
  args: Expression[]
}

export interface SubPropertyDeclarationProps extends Expression {
  kind: ExpressionKind.SubPropertyDeclaration,
  identifier: Identifier,
  expression: Expression,
  colon: Token
}