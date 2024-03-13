import { ExpressionKind } from "../types/ast";
import { BuilderPropertiesData } from "../types/builder";

export const BUTTON_PROPERTIES: BuilderPropertiesData[] = [
  { name: 'id', kind: ExpressionKind.StringExpression },
  { name: 'label', kind: ExpressionKind.StringExpression },
  { name: 'emoji', kind: ExpressionKind.StringExpression },
  { name: 'style', kind: ExpressionKind.Identifier, required: true },
  { name: 'url', kind: ExpressionKind.StringExpression },
  { name: 'disabled', kind: ExpressionKind.BooleanExpression } 
];