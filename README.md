# Rehype Code Title

[![Build Status](https://travis-ci.com/josestg/rehype-code-title.svg?token=1ZtvVXXQrZXVL8domfez&branch=master)](https://travis-ci.com/josestg/rehype-code-title)
![release](https://badgen.net/github/release/josestg/rehype-code-title)
![npm](https://badgen.net/npm/v/rehype-code-title)

[Rehype](https://github.com/rehypejs/rehype) plugin to add code title.

## Install

```shell
npm i rehype-code-title

or

yarn add rehype-code-title
```

## Use

**markdown:**

````md
```tsx:pages/_app.tsx
export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}
```
````

**rehype-code-title:**

```js
const unified = require("unified")
const remark = require("remark-parse")
const remark2rehype = require("remark-rehype")
const stringify = require("rehype-stringify")
const vfile = require("to-vfile")

const codeTitle = require("rehype-code-title")

function compile(file, opt) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(codeTitle, opt)
    .use(stringify)
    .processSync(vfile.readSync("./**example**/" + file))
    .toString()
}
```

**Yields:**

```html
<div class="my-code">
  <h1>pages/_app.tsx</h1>
  <pre><code class="language-tsx">export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      &#x3C;ThemeProvider theme={theme}>
        &#x3C;ColorModeProvider value="light">
          &#x3C;CSSReset />
          &#x3C;Component {...pageProps} />
        &#x3C;/ColorModeProvider>
      &#x3C;/ThemeProvider>
    )
  }
}
</code></pre>
</div>
```
