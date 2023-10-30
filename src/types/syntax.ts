export enum StatementKind {
  BuilderDefinition,
  PropertyDefinition
} 

export abstract class Statement {
  declare kind: StatementKind;
}

