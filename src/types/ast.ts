export enum TokenKind {
  String = 'String',
  Identifier = 'Identifier',

  OpenParen = "OpenParen",
  CloseParen = "CloseParen",
  OpenBracket = "OpenBracket",
  CloseBracket = "CloseBracket",
  Comma = 'Comma',

  At = "At",
  Colon = "Colon",

  Skippable = 'Skippable',
  Eof = 'Eof',
}

export interface TokenProps {
  kind: TokenKind,
  text: string,
  line: number,
  col: number
}


export enum ExpressionKind {
  Identifier = 'Identifier',
  StringExpression = 'StringExpression',
  ParenthesizedExpression = 'ParenthesizedExpression',
  ArgumentsExpression = 'ArgumentsExpression',
  SubPropertyDeclaration = "SubPropertyDeclaration"
}

export enum StatementKind {
  Program = 'Program',
  PropertyDeclaration = 'PropertyDeclaration',
}