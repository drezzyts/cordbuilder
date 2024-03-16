import { ExpressionKind } from "../types/ast";
import {
  BuilderPropertiesData,
  BuilderSubPropertiesData,
} from "../types/builder";

export const EMBED_PROPERTIES: BuilderPropertiesData[] = [
  { name: "title", kind: ExpressionKind.StringExpression },
  { name: "description", kind: ExpressionKind.StringExpression },
  { name: "image", kind: ExpressionKind.StringExpression },
  { name: "timestamp", kind: ExpressionKind.BooleanExpression },
  { name: "thumbnail", kind: ExpressionKind.StringExpression },
  { name: "url", kind: ExpressionKind.StringExpression },
  { name: "color", kind: ExpressionKind.StringExpression },
  { name: "field", kind: ExpressionKind.ArgumentsExpression },
  { name: "author", kind: ExpressionKind.StringExpression },
  { name: "footer", kind: ExpressionKind.ArgumentsExpression },
];

export const EMBED_SUB_PROPERTIES: BuilderSubPropertiesData[] = [
  {
    name: "field",
    props: [
      { name: "name", kind: ExpressionKind.StringExpression, required: true },
      { name: "value", kind: ExpressionKind.StringExpression, required: true },
      { name: "inline", kind: ExpressionKind.BooleanExpression },
    ],
  },
  {
    name: "footer",
    props: [
      { name: "text", kind: ExpressionKind.StringExpression, required: true },
      { name: "icon", kind: ExpressionKind.StringExpression },
    ],
  },
  {
    name: "author",
    props: [
      { name: "name", kind: ExpressionKind.StringExpression, required: true },
      { name: "icon", kind: ExpressionKind.StringExpression },
      { name: "url", kind: ExpressionKind.StringExpression },
    ],
  },
];
