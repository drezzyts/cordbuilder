import { ExpressionKind } from "../types/ast";
import {
  ArgumentsExpressionProps,
  BooleanExpressionProps,
  Expression,
  IdentifierProps,
  ParenthesizedExpressionProps,
  StringExpressionProps,
  SubPropertyDeclarationProps
} from "../types/expressions";

import Token from "./Token";


export class StringExpression implements StringExpressionProps {
  public kind: ExpressionKind.StringExpression;
  
  public constructor(public value: string) {
    this.kind = ExpressionKind.StringExpression;
  }
}

export class BooleanExpression implements BooleanExpressionProps {
  public kind: ExpressionKind.BooleanExpression;
  
  public constructor(public value: boolean) {
    this.kind = ExpressionKind.BooleanExpression;
  }
}

export class ParenthesizedExpression implements ParenthesizedExpressionProps {
  public kind: ExpressionKind.ParenthesizedExpression;

  public constructor(public parens: [open: Token, close: Token], public expression: Expression) {
    this.kind = ExpressionKind.ParenthesizedExpression;
  }
}

export class Identifier implements IdentifierProps {
  public kind: ExpressionKind.Identifier;

  public constructor(public name: string, public token: Token) {
    this.kind = ExpressionKind.Identifier;
  }
}

export class ArgumentsExpression implements ArgumentsExpressionProps {
  public kind: ExpressionKind.ArgumentsExpression;

  public constructor(public brackets: [open: Token, close: Token], public args: SubPropertyDeclaration[]) {
    this.kind = ExpressionKind.ArgumentsExpression;
  }
}

export class SubPropertyDeclaration implements SubPropertyDeclarationProps {
  public kind: ExpressionKind.SubPropertyDeclaration;

  public constructor(public identifier: Identifier, public expression: Expression, public colon: Token) {
    this.kind = ExpressionKind.SubPropertyDeclaration;
  } 
} 