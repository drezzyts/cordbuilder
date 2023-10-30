export enum StatementKind {
  BuilderDefinition,
  PropertyDefinition
} 

export abstract class Statement {
  public kind: StatementKind;
}

