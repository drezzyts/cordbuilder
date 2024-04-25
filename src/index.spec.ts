import CordButton from "./structs/Button";
import CordEmbed from "./structs/Embed";

const embed = CordEmbed.from(`
  @title ( "Hello, World!" )
  @description ( "Hello, World! This is a description! " )
  @thumbnail "https://cdn.discordapp.com/attachments/937697815503720500/1232988723306696795/a188eacaea4a7ce87060a12c94285921.png?ex=662b75bb&is=662a243b&hm=8ef46021123fa3e0b9f37d814feb84372aaf4d08e8eb5f57ebe46bdfa6ebe857&"
  @field [:name "field1", :value "field1"]
  @field [:name "field2", :value "field2"]
`);

console.log(embed);
