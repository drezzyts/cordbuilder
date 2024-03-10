import { Identifier } from "../structs/Expressions";
import { PropertyDeclaration } from "../structs/Statements";
import Token from "../structs/Token";
import { StatementKind } from "./ast";
import { Expression } from "./expressions";

export abstract class Statement {
  declare kind: StatementKind;
}

export interface ProgramProps extends Statement {
  kind: StatementKind.Program,
  statements: PropertyDeclaration[]
} 

export interface PropertyDeclarationProps extends Statement {
  kind: StatementKind.PropertyDeclaration,
  identifier: Identifier,
  expression: Expression,
  at: Token
}

