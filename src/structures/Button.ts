import { ButtonBuilder, ButtonStyle } from "discord.js";
import { BUTTON_STYLES } from "../constants/discord";
import Parser from "../interpreter/Parser";
import BuilderDefinition from "../statements/BuilderDefinition";

export class Button {
  public static from(source: string) : ButtonBuilder {
    const parser = new Parser(source);
    const button = parser.build();

    return Button.validateProperties(button);
  }

  public static edit(btn: ButtonBuilder, source: string) : void {
    const parser = new Parser(source);
    const button = parser.build();

    const props = button.body.map(x => x.keyword.lexeme);
    if(props.includes('style')) btn.setStyle(Button.validateStyle(button))
  
    const style = btn.data.style as ButtonStyle;
    if(props.includes('label')) btn.setLabel(Button.validateLabel(button));
    if(props.includes('emoji')) btn.setEmoji(Button.validateEmoji(button));
    if(props.includes('url')) btn.setURL(Button.validateLink(button, style));
    if(props.includes('id')) btn.setCustomId(Button.validateCustomId(button));
    if(props.includes('disabled')) btn.setDisabled(Button.validateDisabled(button));
  }

  private static validateProperties(button: BuilderDefinition) : ButtonBuilder {
    const btn = new ButtonBuilder();
    const style = Button.validateStyle(button);

    btn.setLabel(Button.validateLabel(button));
    btn.setStyle(style);
    btn.setCustomId(Button.validateCustomId(button));
    
    const props = button.body.map(x => x.keyword.lexeme);
    if(props.includes('emoji')) btn.setEmoji(Button.validateEmoji(button));
    if(props.includes('url')) btn.setURL(Button.validateLink(button, style));
    if(props.includes('disabled')) btn.setDisabled(Button.validateDisabled(button));

    return btn;
  }

  private static validateStyle(button: BuilderDefinition) {
    const value = Button.validateValue(button, 'style');

    if (!BUTTON_STYLES.includes(value.toLowerCase())) throw new Error(`You must define a valid style label! ${value} is not a button style!`);

    switch (value.toLowerCase()) {
      case "secondary": return ButtonStyle.Secondary;
      case "success": return ButtonStyle.Success;
      case "danger": return ButtonStyle.Danger;
      case "link": return ButtonStyle.Link; 
      default: return ButtonStyle.Primary;
    } 
  }
  
  private static validateLabel(button: BuilderDefinition) : string {
    return Button.validateValue(button, 'label');
  }

  private static validateLink(button: BuilderDefinition, style: ButtonStyle) {
    if (style !== ButtonStyle.Link) throw new Error(`You can only set button url in buttons when the button style is "Link"!`);
    return Button.validateValue(button, 'url');
  }

  private static validateCustomId(button: BuilderDefinition) {
    return Button.validateValue(button, 'id');
  }

  private static validateEmoji(button: BuilderDefinition) {
    return Button.validateValue(button, 'emoji');
  }

  private static validateDisabled(button: BuilderDefinition) {
    const value = Button.validateValue(button, 'disabled');
    
    if (value !== 'true' && value !== 'false') {
      throw new Error(`The disabled property can only be assigned as 'true' or 'false'`);
    }

    return Boolean(value);
  }

  private static validateValue(button: BuilderDefinition, prop: string) {
    const props = button.body.filter(p => p.keyword.lexeme == prop);
    if (props.length > 1) throw new Error(`Expected only one ${prop}, but received ${props.length} ${prop}s!`);
    if (props.length == 0) throw new Error(`You must define a button ${prop}!`);
    
    const value = props[0].value.lexeme;
    if (value.trim() == "") throw new Error(`You must define a valid button ${prop}, this cannot be empty!`);

    return value;
  }
}