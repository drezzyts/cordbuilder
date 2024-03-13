# 📦 cordbuilder

Cord Builder is a library that provides a Domain Specific Language (DSL) for creating builders for Discord.js. Currently, it supports the creation of buttons.

## 🚀 Installation

To install the library, you can use npm or yarn:

```bash
npm install cordbuilder
```

```bash
yarn add cordbuilder
```

## ℹ️ Usage

### ✅ Button

```javascript
const { CordButton } = require('cordbuilder');

// The `Button.from()` function allows you to create a button from a specific source code:

const button = CordButton.from(`
  @label "foo"
  @style "Primary"
  @id "foo_bar"
`);

// Now you can use the button as desired
```

The source should follow this format:

- **@label?**: `string`
- **@style**: `Primary` | `Secondary` | `Success` | `Danger` | `Link`
- **@id?**: `string`
- **@emoji?**: `string`
- **@disabled?**: `true` | `false`
- **@url?**: `url`

### ✅ Embed

```javascript
const { CordEmbed } = require('cordbuilder');

// The `Embed.from()` function allows you to create a button from a specific source code:

const embed = CordEmbed.from(`
  @title "Hello!"
  @description "Hello, World!"
  @color "#FF0000"
  
  @field [:name: "Hello 1", :value "Hello 1"]
  @field [:name: "Hello 2", :value "Hello 2"]

  @footer [:text "foobar"]
`)

// Now you can use the embed as desired
```

The source should follow this format:

### Author

- **@author** [
  - **:name** `string`,
  - **:url** `url`,
  - **:icon** `url`
- ]

### Fields

- **@field** [
  - **:name** `string`,
  - **:value** `string`,
  - **:inline?** `true`| `false`
- ]

### Footer

- **@footer** [
  - **:text** `string`,
  - **:icon** `url`
- ]

### Others

- **@title**: `string`
- **@thumbnail**: `url`
- **@image**: `url`
- **@color**: `color` | `hex` | `random`
- **@description**: `string`

## 🪐 Contributing

We encourage contributions! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
