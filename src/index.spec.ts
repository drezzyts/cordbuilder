import CordButton from "./structs/Button";
import CordEmbed from "./structs/Embed";

const embed = CordEmbed.from(`
  @title ( "Hello, World!" )
  @description ( "Hello, World! This is a description! " )
  
  @field [:name "field1", :value "field1"]
  @field [:name "field2", :value "field2"]
`);

console.log(embed);
