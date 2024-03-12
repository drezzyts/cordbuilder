import CordEmbed from "./structs/Embed";

const embed = CordEmbed.from(`
  @title ( "Hello, World!" )
  @description ( "Hello, World! This is a description! " )
  
  @field [
    :name ( "Field 1" ),
    :value ( "Field 1" )
  ]

  @field [
    :name ( "Field 2" ),
    :value ( "Field 2" )
  ]

  @field [
    :name ( "Field 3" ),
    :value ( "Field 3" )
  ]
`);

console.log(embed);