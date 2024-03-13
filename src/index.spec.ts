import CordButton from "./structs/Button";
import CordEmbed from "./structs/Embed";

const embed = CordEmbed.from(`
  @title ( "Hello, World!" )
  @description ( "Hello, World! This is a description! " )
  
  @field [:name "field1", :value "field1"]
  @field [:name "field2", :value "field2"]
`);

const button = CordButton.from(`
  @id "hello_btn"
  @style Primary
  @disabled true
  @label "hello"
  @url "https://bunda.com"
`);

console.log(embed, button);
