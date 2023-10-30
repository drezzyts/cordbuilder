import { Token } from "../interpreter/Lexer";
import { Statement, StatementKind } from "../types/syntax";

export default class PropertyDefinition extends Statement {
  public kind = StatementKind.PropertyDefinition;
  
  public constructor(public keyword: Token, public value: Token) {
    super()
  }
} 