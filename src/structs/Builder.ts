import { ExpressionKind } from "../types/ast";
import { BuilderPropertiesData, BuilderSubPropertiesData } from "../types/builder";
import { ArgumentsExpression, ParenthesizedExpression } from "./Expressions";
import { Program } from "./Statements";

export default class CordBuilder {
  public constructor(private propertiesData: BuilderPropertiesData[], public program: Program,
    private name: string, private subPropertiesData?: BuilderSubPropertiesData[]
  ) {}

  public validateProperties() {
    this.program.statements.forEach(prop => {
      const token = prop.identifier.token;
      const data = this.propertiesData.find(p => p.name == prop.identifier.name);

      if (!data) 
        throw new Error(`${this.name} (l:${token.line}, c:${token.col}): Invalid ${this.name} property has found -> ${prop.identifier.name}`);
    
      const expression = prop.expression.kind == ExpressionKind.ParenthesizedExpression ? 
        (prop.expression as ParenthesizedExpression).expression : prop.expression;
      const isValidKind = expression.kind == data.kind;
      
      if (!isValidKind)
        throw new TypeError(`${this.name} (l: ${token.line}, c:${token.col}): Invalid ${this.name} property (${prop.identifier.name}) value has found: ${expression.kind}, expected -> ${data.kind}`);
    });

    this.propertiesData
      .filter(prop => prop.required)
      .forEach(property => {
        const builderDefinedProperties = this.program.statements.map(p => p.identifier.name);
        const hasCurrentRequiredProp = builderDefinedProperties.find(definedProp => definedProp == property.name);

        if (!hasCurrentRequiredProp) 
          throw new Error(`${this.name}: Missing ${this.name} required property (${property.name}).`);
      });
  }

  public validateSubProperties() {
    this.program.statements
      .filter(prop => prop.expression.kind == ExpressionKind.ArgumentsExpression)
      .forEach(prop => {
        const _arguments = (prop.expression as ArgumentsExpression).args;
        _arguments.forEach(argument => {
          const token = argument.identifier.token;
          const data = this.subPropertiesData!.find(p => p.name == prop.identifier.name)?.props
            .find(p => p.name == argument.identifier.name);

          if (!data)
            throw new Error(`${this.name} (l: ${token.line}, c:${token.col}): Invalid ${this.name} (${prop.identifier.name}) sub-property has found -> ${argument.identifier.name}`);
      
          const expression = argument.expression.kind == ExpressionKind.ParenthesizedExpression ?
            (argument.expression as ParenthesizedExpression).expression : argument.expression;
          const isValidKind = expression.kind == data.kind;

          if (!isValidKind)
            throw new TypeError(`${this.name} (l: ${token.line}, c:${token.col}): Invalid ${this.name} (${prop.identifier.name}) sub-property (${argument.identifier.name}) value has found: ${expression.kind}, expected -> ${data.kind}`);
        });

        const propertyData = this.subPropertiesData!.find(property => property.name == prop.identifier.name);
        propertyData?.props
          .filter(subProperty => subProperty.required)
          .forEach(subProperty => {
          const currentBuilderPropertySubProps = _arguments.map(p => p.identifier.name);
          const hasCurrentRequiredSubProp = currentBuilderPropertySubProps
            .find(definedSubProp => definedSubProp == subProperty.name);

          if (!hasCurrentRequiredSubProp)
            throw new Error(`${this.name}: Missing ${this.name} (${propertyData.name}) required sub-property (${subProperty.name}).`);
        })
      });
  }
}