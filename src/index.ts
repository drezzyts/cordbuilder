import CordEmbed from "./structs/Embed";

const embed = CordEmbed.from(`
  @title ( "Hello, World!" )
  @description ( "Hello, World! This is a description! " )

  @field [
    :name ( "Hello World!" ),
    :value ( "This is the hello world field value " )
  ]
`);