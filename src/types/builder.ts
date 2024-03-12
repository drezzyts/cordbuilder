import { ExpressionKind } from "./ast";

export interface BuilderPropertiesData {
  name: string,
  kind: ExpressionKind,
  required?: boolean
}

export interface BuilderSubPropertiesData {
  name: string,
  props: BuilderPropertiesData[]
}
