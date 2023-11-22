# Cord Builder

Cord Builder is a library that provides a Domain Specific Language (DSL) for creating builders for Discord.js. Currently, it supports the creation of buttons and embeds.

## Installation

To install the library, you can use npm or yarn:

```bash
npm install cordbuilder
```

```bash
yarn add cordbuilder
```

## Usage

### Button

```javascript
const { Button } = require('cordbuilder');

// The `Button.from()` function allows you to create a button from a specific source code:

const button = Button.from(`
  @label foo
  @style primary
  @id foo_bar
`);

// Now you can use the button as desired
```

The source should follow this format:

- **@label**: `any`
- **@style**: `Primary` | `Secondary` | `Success` | `Danger` | `Link`
- **@id**: `any`
- **@emoji**: `any`
- **@disabled**: `true` | `false`
- **@url**: `url`


### Embed 

```javascript
const { Embed } = require('cordbuilder');

// The `Embed.from()` function allows you to create a button from a specific source code:

const embed = Embed.from(`
  @title Hello!
  @description Hello, World!
  @footer:text foobar
  @color #FF0000
`)

// Now you can use the embed as desired
```

The source should follow this format:

#### Author

- **@author:name**: `any`
- **@author:url**: `url`
- **@author:icon**: `url`

### Fields

- **@field:inline?**: `true`| `false`
- **@field:name**: `any`
- **@field:value**: `any`

#### Footer

- **@footer:text**: `any`
- **@footer:icon**: `url`

#### Others

- **@title**: `string`
- **@thumbnail**: `url`
- **@image**: `url`
- **@color**: `color` | `hex` | `random`
- **@description**: `any`

## Contributing

We encourage contributions! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
