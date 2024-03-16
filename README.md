# 📦 cordbuilder

Cord Builder is a library that provides a Domain Specific Language (DSL) for creating builders for Discord.js. Currently, it supports the creation of buttons.

> Note:  For syntax highlighting and code snippets, you can use the CordBuilder extension. It's available on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=drezzyts.cordbuilder)

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

<img src="https://i.postimg.cc/Pr9zFr2Q/button.png"/>

The source should follow this format:

- **@label?**: `string`
- **@style**: `Primary` | `Secondary` | `Success` | `Danger` | `Link`
- **@id?**: `string`
- **@emoji?**: `string`
- **@disabled?**: `true` | `false`
- **@url?**: `url`

### ✅ Embed

<img src="https://i.postimg.cc/XY5cMSPS/embed.png"/>
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
