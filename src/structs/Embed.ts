import { EMBED_PROPERTIES, EMBED_SUB_PROPERTIES } from "../constants/embed";
import Parser from "../frontend/Parser";
import { ExpressionKind } from "../types/ast";
import CordBuilder from "./Builder";
import { ArgumentsExpression, ParenthesizedExpression } from "./Expressions";
import { Program } from "./Statements";

export default class CordEmbed extends CordBuilder {
  public static from(code: string) {
    const parser = new Parser(code);
    const program = parser.parse();
  
    return new CordEmbed(code, parser, program);  
  }

  private constructor(public code: string, private parser: Parser, program: Program) {
    super(EMBED_PROPERTIES, program, EMBED_SUB_PROPERTIES);
    super.validateProperties();
    super.validateSubProperties();
  }
}