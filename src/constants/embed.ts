import { ExpressionKind } from "../types/ast";
import { BuilderPropertiesData, BuilderSubPropertiesData } from "../types/builder";

export const EMBED_PROPERTIES: BuilderPropertiesData[] = [
  { prop: 'title', kind: ExpressionKind.StringExpression },
  { prop: 'description', kind: ExpressionKind.StringExpression },
  { prop: 'field', kind: ExpressionKind.ArgumentsExpression },
  { prop: 'image', kind: ExpressionKind.StringExpression },
  { prop: 'timestamp', kind: ExpressionKind.Identifier },
  { prop: 'thumb', kind: ExpressionKind.StringExpression },
  { prop: 'footer', kind: ExpressionKind.ArgumentsExpression },
  { prop: 'author', kind: ExpressionKind.StringExpression },
  { prop: 'url', kind: ExpressionKind.StringExpression },
  { prop: 'color', kind: ExpressionKind.StringExpression }
];

export const EMBED_SUB_PROPERTIES: BuilderSubPropertiesData[] = [
  { prop: 'field', props: [
      { prop: 'name', kind: ExpressionKind.StringExpression }, 
      { prop: 'value', kind: ExpressionKind.StringExpression },
      { prop: 'inline', kind: ExpressionKind.Identifier }
    ]
  },
  { prop: 'footer', props: [
      { prop: 'text', kind: ExpressionKind.StringExpression }, 
      { prop: 'icon', kind: ExpressionKind.StringExpression }
    ] 
  },
  { prop: 'author', props: [
      { prop: 'name', kind: ExpressionKind.StringExpression }, 
      { prop: 'icon', kind: ExpressionKind.StringExpression }, 
      { prop: 'url', kind: ExpressionKind.StringExpression }
    ] 
  }
]