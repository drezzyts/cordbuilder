import { EmbedBuilder } from "discord.js";
import Parser from "../interpreter/Parser";
import Builder from "./Builder";
import BuilderDefinition from "../statements/BuilderDefinition";

export class Embed extends Builder {
  public builder: BuilderDefinition;

  public static from(source: string) {
    const embed = new Embed(source);
    return embed.make();
  }

  private constructor(public source: string) {
    const parser = new Parser(source);
    const embed = parser.build();
    
    super(embed, 'embed');
    
    this.builder = embed;
  }

  private make() {
    const embed = new EmbedBuilder();

    super.validate([
      // Embed
      { prop: 'author:name', required: this.hasAuthor(), count: 1 },
      { prop: 'author:icon', required: false, count: 1 },
      { prop: 'author:url', required: false, count: 1 },
      
      // Field
      { prop: 'field:name', required: this.hasField(), count: this.fieldCount() },
      { prop: 'field:value', required: this.hasField(), count: this.fieldCount() },
      { prop: 'field:inline', required: false, count: this.fieldCount() },

      // Footer
      { prop: 'footer:text', required: this.hasFooter(), count: 1 },
      { prop: 'footer:icon', required: false, count: 1 },
      
      // Others
      { prop: 'title', required: false, count: 1 },
      { prop: 'thumbnail', required: false, count: 1 },
      { prop: 'description', required: false, count: 1 },
      { prop: 'image', required: false, count: 1 },
      { prop: 'color', required: false, count: 1 }
    ])

    if (super.has('title')) embed.setTitle(super.get('title'));
    if (super.has('thumbnail')) embed.setThumbnail(super.get('thumbnail'));
    if (super.has('description')) embed.setDescription(super.get('description'));
    if (super.has('image')) embed.setImage(super.get('image'));
    if (super.has('color')) embed.setColor(super.get('color') as `#${string}`);

    if(this.hasAuthor()) this.validateAuthor(embed);
    if(this.hasFooter()) this.validateFooter(embed);
    if(this.hasField()) this.validateFields(embed);

    return embed;
  }
  
  private hasAuthor() {
    return super.has('author:icon') || super.has('author:url') || super.has('author:name');
  }

  private validateAuthor(embed: EmbedBuilder) {
    const author = {
      name: super.get('author:name'),
      url: super.safeGet('author:url'),
      iconURL: super.safeGet('author:icon')
    }

    embed.setAuthor(author);
  }

  private hasFooter() {
    return super.has('footer:icon') || super.has('footer:text');
  }

  private validateFooter(embed: EmbedBuilder) {
    const footer = {
      text: super.get('footer:text'),
      iconURL: super.get('footer:icon')
    };

    embed.setFooter(footer);
  }

  private hasField() {
    return super.has('field:name') || super.has('field:value') || super.has('field:inline')
  }

  private fieldCount() {
    if (!this.hasField()) return 0;
    return this.def.body.filter(x => x.keyword.lexeme == 'field:name').length;
  }

  private validateFields(embed: EmbedBuilder) {
    const props = this.builder.body.map(x => [x.keyword.lexeme, x.value.lexeme])
      .filter(([keyword, _]) => keyword.startsWith('field:'));
    
    const fields = [];

    let currentField = this.makeField();

    for (const [key, value] of props) {
      if (key == 'field:name') {
        currentField.name = value;
      } else if (key == 'field:value') {
        currentField.value = value;
      } else if (key == 'field:inline') {
        if (value !== 'true' && value !== 'false') {
          throw new Error('Unexpected embed field:inline state has provided, expects true or false');
        }

        currentField.inline = Boolean(value);
      }

      if (currentField.name !== '' && currentField.value !== '') {
        fields.push(currentField);
        currentField = this.makeField();
      }
    }

    embed.addFields(fields);
  }

  private makeField() {
    return { name: '', value: '', inline: false };
  }
}