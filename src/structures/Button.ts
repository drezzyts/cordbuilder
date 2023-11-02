import { ButtonBuilder, ButtonStyle } from "discord.js";
import Parser from "../interpreter/Parser";
import Builder from "./Builder";

export class Button extends Builder {
  public static from(source: string) {
    const button = new Button(source);
    return button.make();
  }

  private constructor(public source: string) {
    const parser = new Parser(source);
    const button = parser.build();

    super(button, 'button');
  }

  private make() {
    const button = new ButtonBuilder();

    super.validate([
      { prop: 'label', required: true, count: 1 },
      { prop: 'style', required: true, count: 1 },
      { prop: 'emoji', required: false, count: 1 },
      { prop: 'disabled', required: false, count: 1 },
      { prop: 'id', required: !this.isLinkButton(), count: this.isLinkButton() ? 0 : 1 },
      { prop: 'url', required: this.isLinkButton(), count: this.isLinkButton() ? 1 : 0 }
    ])

    if (super.has('disabled')) button.setDisabled(this.validateDisabled());
    if (super.has('id')) button.setCustomId(super.get('id'));
    if (super.has('url')) button.setURL(super.get('url'));
    button.setLabel(super.get('label'));
    button.setStyle(this.validateStyle());

    return button;
  }

  private isLinkButton() {
    return super.safeGet('style')?.toLowerCase() == 'link'
  }

  private validateStyle() {
    const value = super.get('style').toLowerCase()

    switch (value) {
      case 'primary': return ButtonStyle.Primary;
      case 'secondary': return ButtonStyle.Secondary;
      case 'success': return ButtonStyle.Success;
      case 'danger': return ButtonStyle.Danger;
      case 'link': return ButtonStyle.Link;
      default: throw new Error('Invalid button style has provided!');
    }
  }

  private validateDisabled() {
    const value = super.get('disabled').toLowerCase();
    if (value !== 'true' && value !== 'false') throw new Error('Invalid button disabled state has provided, expects true or false');

    return Boolean(value);
  }
}