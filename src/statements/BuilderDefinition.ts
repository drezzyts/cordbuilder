import { Statement, StatementKind } from "../types/syntax";
import PropertyDefinition from "./PropertyDefinition";

export default class BuilderDefinition extends Statement {
  public kind = StatementKind.BuilderDefinition;

  public constructor(public body: PropertyDefinition[]) {
    super();
  }
}