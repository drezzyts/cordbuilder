import { ExpressionKind } from "../types/ast";
import { BuilderPropertiesData, BuilderSubPropertiesData } from "../types/builder";
import { ArgumentsExpression, ParenthesizedExpression } from "./Expressions";
import { Program } from "./Statements";

export default class CordBuilder {
  public constructor(private propertiesData: BuilderPropertiesData[], private program: Program,
    private subPropertiesData?: BuilderSubPropertiesData[]
  ) {}

  public validateProperties() {
    this.program.statements.forEach(prop => {
      const token = prop.identifier.token;
      const data = this.propertiesData.find(p => p.prop == prop.identifier.name);

      if (!data) 
        throw new Error(`embed (l:${token.line}, c:${token.col}): Invalid embed property has found -> ${prop.identifier.name}`);
    
      const expression = prop.expression.kind == ExpressionKind.ParenthesizedExpression ? 
        (prop.expression as ParenthesizedExpression).expression : prop.expression;
      const isValidKind = expression.kind == data.kind;
      
      if (!isValidKind)
        throw new Error(`embed (l: ${token.line}, c:${token.col}): Invalid embed property value has found: ${expression.kind}, expected -> ${data.kind}`);
    });
  }

  public validateSubProperties() {
    this.program.statements
      .filter(prop => prop.expression.kind == ExpressionKind.ArgumentsExpression)
      .forEach(prop => {
        (prop.expression as ArgumentsExpression).args.forEach(argument => {
          const token = argument.identifier.token;
          const data = this.subPropertiesData!.find(p => p.prop == prop.identifier.name)?.props
            .find(p => p.prop == argument.identifier.name);

          if (!data)
            throw new Error(`embed (l: ${token.line}, c:${token.col}): Invalid embed (${prop.identifier.name}) sub-property has found -> ${argument.identifier.name}`);
      
          const expression = argument.expression.kind == ExpressionKind.ParenthesizedExpression ?
            (argument.expression as ParenthesizedExpression).expression : argument.expression;
          const isValidKind = expression.kind == data.kind;

          if (!isValidKind)
            throw new Error(`embed (l: ${token.line}, c:${token.col}): Invalid embed (${prop.identifier.name}) sub-property (${argument.identifier.name}) value has found: ${expression.kind}, expected -> ${data.kind}`);
        });
      })
  }
}