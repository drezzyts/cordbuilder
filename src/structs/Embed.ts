import { ColorResolvable, EmbedBuilder } from "discord.js";
import {
  EMBED_PROPERTIES,
  EMBED_SUB_PROPERTIES,
} from "../constants/embed";
import Parser from "../frontend/Parser";
import CordBuilder from "./Builder";
import { Program, PropertyDeclaration } from "./Statements";
import {
  ArgumentsExpression,
  BooleanExpression,
  StringExpression,
} from "./Expressions";

export default class CordEmbed extends CordBuilder {
  public static from(code: string) {
    const parser = new Parser(code);
    const program = parser.parse();

    const builder = new CordEmbed(code, program);
    const embed = builder.build(program);

    return embed;
  }

  private constructor(
    public code: string,
    program: Program
  ) {
    super(EMBED_PROPERTIES, program, "embed", EMBED_SUB_PROPERTIES);
    super.validateProperties();
    super.validateSubProperties();

    this.build(program);
  }

  public build(program: Program) {
    const embed = new EmbedBuilder();
    const properties = program.statements;

    // With sub-properties
    const author = properties.find((p) => p.identifier.name == "author");
    const footer = properties.find((p) => p.identifier.name == "footer");
    const fields = properties.filter((p) => p.identifier.name == "field");

    if (author) this.buildAuthor(embed, author);
    if (footer) this.buildFooter(embed, footer);
    if (fields.length > 0) this.buildFields(embed, fields);

    // Without sub-properties

    const title = properties.find((p) => p.identifier.name == "title");
    const description = properties.find(
      (p) => p.identifier.name == "description"
    );
    const image = properties.find((p) => p.identifier.name == "image");
    const timestamp = properties.find((p) => p.identifier.name == "timestamp");
    const thumb = properties.find((p) => p.identifier.name == "thumb");
    const url = properties.find((p) => p.identifier.name == "url");
    const color = properties.find((p) => p.identifier.name == "color");

    if (title) this.buildTitle(embed, title);
    if (description) this.buildDescription(embed, description);
    if (image) this.buildImage(embed, image);
    if (timestamp) this.buildTimestamp(embed, timestamp);
    if (thumb) this.buildThumb(embed, thumb);
    if (url) this.buildUrl(embed, url);
    if (color) this.buildColor(embed, color);

    return embed;
  }

  private buildTitle(embed: EmbedBuilder, title: PropertyDeclaration) {
    const { value } = title.expression as StringExpression;
    embed.setTitle(value.slice(1, -1));
  }

  private buildDescription(
    embed: EmbedBuilder,
    description: PropertyDeclaration
  ) {
    const { value } = description.expression as StringExpression;
    embed.setDescription(value.slice(1, -1));
  }

  private buildImage(embed: EmbedBuilder, image: PropertyDeclaration) {
    const { value } = image.expression as StringExpression;
    embed.setImage(value.slice(1, -1));
  }

  private buildTimestamp(embed: EmbedBuilder, timestamp: PropertyDeclaration) {
    const { value } = timestamp.expression as BooleanExpression;
    if (value) embed.setTimestamp();
  }

  private buildThumb(embed: EmbedBuilder, thumb: PropertyDeclaration) {
    const { value } = thumb.expression as StringExpression;
    embed.setThumbnail(value.slice(1, -1));
  }

  private buildUrl(embed: EmbedBuilder, url: PropertyDeclaration) {
    const { value } = url.expression as StringExpression;
    embed.setURL(value.slice(1, -1));
  }

  private buildColor(embed: EmbedBuilder, color: PropertyDeclaration) {
    const { value } = color.expression as StringExpression;
    embed.setColor(value.slice(1, -1) as ColorResolvable);
  }

  private buildAuthor(embed: EmbedBuilder, author: PropertyDeclaration) {
    const { args } = author.expression as ArgumentsExpression;

    const nameProp = args.find((a) => a.identifier.name == "name")
      ?.expression as StringExpression;
    const iconProp = args.find((a) => a.identifier.name == "icon")
      ?.expression as StringExpression;
    const urlProp = args.find((a) => a.identifier.name == "url")
      ?.expression as StringExpression;

    const name = nameProp.value.slice(1, -1);
    const iconURL = iconProp?.value.slice(1, -1);
    const url = urlProp?.value.slice(1, -1);

    embed.setAuthor({ name, iconURL, url });
  }

  private buildFields(embed: EmbedBuilder, fields: PropertyDeclaration[]) {
    const expressions = fields.map(
      (field) => field.expression as ArgumentsExpression
    );
    const buildedFields = Array.from({ length: expressions.length }, (_, i) => {
      const { args } = expressions[i];

      const nameProp = args.find((a) => a.identifier.name == "name")
        ?.expression as StringExpression;
      const valueProp = args.find((a) => a.identifier.name == "value")
        ?.expression as StringExpression;
      const inlineProp = args.find((a) => a.identifier.name == "inline")
        ?.expression as BooleanExpression;

      const name = nameProp.value.slice(1, -1);
      const value = valueProp.value.slice(1, -1);
      const inline = inlineProp?.value ?? false;

      return { name, value, inline };
    });

    embed.addFields(buildedFields);
  }

  private buildFooter(embed: EmbedBuilder, author: PropertyDeclaration) {
    const { args } = author.expression as ArgumentsExpression;

    const textProp = args.find((a) => a.identifier.name == "text")
      ?.expression as StringExpression;
    const iconProp = args.find((a) => a.identifier.name == "icon")
      ?.expression as StringExpression;

    const text = textProp.value.slice(1, -1);
    const iconURL = iconProp?.value.slice(1, -1);

    embed.setFooter({ text, iconURL });
  }
}
