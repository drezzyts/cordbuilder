import { ExpressionKind } from "./ast";

export interface BuilderPropertiesData {
  prop: string,
  kind: ExpressionKind
}

export interface BuilderSubPropertiesData {
  prop: string,
  props: BuilderPropertiesData[]
}
