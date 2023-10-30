import { KEYWORDS } from "../constants/keywords";

export enum TokenKind {
  Keyword,
  String,
  EndOfFile,
  NewLine
}

export class Token {
  public constructor(public kind: TokenKind, public lexeme: string, public line: number, public position: number) {}

  public print() : void {
    console.log(`[${TokenKind[this.kind]}] - "${this.lexeme}", pos: ${this.position} | line: ${this.line}`)
  }
}

export class Lexer {
  private line = 1;
  private column = 1;
  private cursor = 0;

  public constructor(public source: string) {}
  
  public lex() : Token[] {
    const tokens: Token[] = [];

    while (!this.isEof()) {
      if(this.current.trim() == '') this.next();
      else if(this.current == "@" && this.peek(-1) !== '\\') tokens.push(this.readKeyword());
      else tokens.push(this.readString());
    }

    tokens.push(this.eof())

    return tokens;
  }

  private eof(): Token {
    return new Token(TokenKind.EndOfFile, '\0', this.line, this.column);
  }

  private readKeyword() : Token {
    this.next();

    let lexeme = "";
    
    while(!this.isEof() && this.current !== " " && this.current !== "\n") {
      
      lexeme += this.current;
      this.next();
    }

    if(KEYWORDS.includes(lexeme)) return new Token(TokenKind.Keyword, lexeme, this.line, this.column);
    else throw new Error(`Invalid keyword has been provided: ${lexeme}`)
  }

  private readString() : Token {
    let lexeme = "";
    
    while(!this.isEof()) {
      if (this.current == "@" && this.peek(-1) !== '\\') break;

      lexeme += this.current;
      this.next();
    }

    return new Token(TokenKind.String, lexeme.trim().replace(/\\@/g, '@'), this.line, this.column);
  }

  private isEof() : boolean {
    return this.cursor == this.source.length;  
  }

  private peek(offset: number) {
    return this.source[this.cursor + offset];
  }

  private get current() : string {
    return this.source[this.cursor];
  }

  private next() : void {
    this.cursor++;
    this.column++;

    if(this.current == "\n") {
      this.column = 1;
      this.line++;
    }
  }
}