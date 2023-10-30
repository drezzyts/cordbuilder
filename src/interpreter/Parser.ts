import BuilderDefinition from "../statements/BuilderDefinition";
import PropertyDefinition from "../statements/PropertyDefinition";
import { Lexer, Token, TokenKind } from "./Lexer";

export default class Parser {
  private cursor = 0;
  public tokens: Token[];

  public constructor(public source: string) {
    this.tokens = new Lexer(source).lex(); 
  }
  
  public build() : BuilderDefinition {
    const properties: PropertyDefinition[] = [];
    
    while (this.hasMoreTokens() && this.current.kind !== TokenKind.EndOfFile) {
      const property = this.propertyDefinition();
      properties.push(property);
    }

    return new BuilderDefinition(properties);
  }

  public propertyDefinition() : PropertyDefinition {
    const keyword = this.expect(TokenKind.Keyword);
    const value = this.expect(TokenKind.String);

    return new PropertyDefinition(keyword, value);
  }

  private expect(kind: TokenKind) : Token {
    if(this.current.kind !== kind) throw new Error(`Expected ${TokenKind[kind]}, but received: ${TokenKind[this.current.kind]}`);

    return this.next();
  }

  private next() : Token {
    const previous = this.tokens[this.cursor];
    this.cursor++;

    return previous;
  }

  private get current() : Token {
    return this.tokens[this.cursor];
  }

  private hasMoreTokens() : boolean {
    return this.tokens.length !== this.cursor;
  }
}