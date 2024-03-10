import { 
  ProgramProps, 
  PropertyDeclarationProps 
} from "../types/statements";

import { Expression } from "../types/expressions";
import { StatementKind } from "../types/ast";
import Token from "./Token";
import { Identifier } from "./Expressions";

export class Program implements ProgramProps {
  public kind: StatementKind.Program;

  public constructor(public statements: PropertyDeclaration[]) {
    this.kind = StatementKind.Program;
  }
}

export class PropertyDeclaration implements PropertyDeclarationProps {
  public kind: StatementKind.PropertyDeclaration;

  public constructor(public identifier: Identifier, public expression: Expression, public at: Token) {
    this.kind = StatementKind.PropertyDeclaration;
  }
}