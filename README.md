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
import { unified } from "unified"
import remark from "remark-parse"
import remark2rehype from "remark-rehype"
import stringify from "rehype-stringify"
import codeTitle from "./index.js"
import * as vfile from "to-vfile"

function compile(file, opt) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(codeTitle, opt)
    .use(stringify)
    .processSync(vfile.readSync("./__example__/" + file))
    .toString()
}

const got = compile("1.md")
console.log(got)
```

**Yields:**

```html
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
```
