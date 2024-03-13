import { ButtonBuilder, ButtonStyle } from "discord.js";
import { BUTTON_PROPERTIES } from "../constants/button";
import Parser from "../frontend/Parser";
import CordBuilder from "./Builder";
import { Program, PropertyDeclaration } from "./Statements";
import { BooleanExpression, Identifier, StringExpression } from "./Expressions";

export default class CordButton extends CordBuilder {
  public static from(code: string) {
    const parser = new Parser(code);
    const program = parser.parse();

    const builder = new CordButton(code, program);
    const embed = builder.build(program);

    return embed;
  }
  
  private constructor(
    public code: string,
    program: Program
  ) {
    super(BUTTON_PROPERTIES, program, 'button');
    super.validateProperties();
  }

  public build(program: Program) {
    const button = new ButtonBuilder();
    const properties = program.statements;

    // Without sub-properties
    const id = properties.find((p) => p.identifier.name == "id");
    const label = properties.find((p) => p.identifier.name == "label");
    const emoji = properties.find((p) => p.identifier.name == "emoji");
    const style = properties.find((p) => p.identifier.name == "style");
    const url = properties.find((p) => p.identifier.name == "url");
    const disabled = properties.find((p) => p.identifier.name == "disabled");

    if (id) this.buildId(button, id);
    if (label) this.buildLabel(button, label);
    if (emoji) this.buildEmoji(button, emoji);
    if (style) this.buildStyle(button, style);
    if (url) this.buildUrl(button, url);
    if (disabled) this.buildDisabled(button, disabled);

    if (!id && !url) throw new Error('button: Buttons must have a id or an url');
    if(!emoji && !label) throw new Error('button: Buttons must have a label and/or an emoji');
    
    if (id && url) throw new Error('button: Buttons can\'t have a id and an url'); 

    return button;
  } 

  private buildId(button: ButtonBuilder, id: PropertyDeclaration) {
    const { value } = id.expression as StringExpression;
    button.setCustomId(value.slice(1, -1));
  }

  private buildLabel(button: ButtonBuilder, label: PropertyDeclaration) {
    const { value } = label.expression as StringExpression;
    button.setLabel(value.slice(1, -1));
  }

  private buildEmoji(button: ButtonBuilder, emoji: PropertyDeclaration) {
    const { value } = emoji.expression as StringExpression;
    button.setEmoji(value.slice(1, -1));
  }

  private buildStyle(button: ButtonBuilder, style: PropertyDeclaration) {
    const { name } = style.expression as Identifier;
    const findStyle = Object.entries(ButtonStyle)
      .find(([n, s]) => n == name);

    const styles = Object.keys(ButtonStyle)
      .filter(s => s.length > 1)
      .join(' | ');

    if (!findStyle?.[0])
      throw new Error(`button: Invalid button (style) has provided: ${name}, expects -> (${styles})`);
    
    button.setStyle(findStyle[1] as ButtonStyle);
  }

  private buildUrl(button: ButtonBuilder, url: PropertyDeclaration) {
    const { value } = url.expression as StringExpression;
    button.setURL(value.slice(1, -1));
  }

  private buildDisabled(button: ButtonBuilder, disabled: PropertyDeclaration) {
    const { value } = disabled.expression as BooleanExpression;
    button.setDisabled(value);
  }
}