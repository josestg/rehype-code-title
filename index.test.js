const unified = require("unified")
const remark = require("remark-parse")
const remark2rehype = require("remark-rehype")
const stringify = require("rehype-stringify")
const codeTitle = require("./index")
const assert = require("assert")
const vfile = require("to-vfile")

function compile(file, opt) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(codeTitle, opt)
    .use(stringify)
    .processSync(vfile.readSync("./__example__/" + file))
    .toString()
}

describe("Rehype-code-title", () => {
  it("No Title", () => {
    const got = compile("1.md")
    assert.ok(got.match(/<h1>/) === null)
  })

  it("No Title: Custom class name", () => {
    const got = compile("1.md", { className: "my-code" })
    assert.ok(
      got.match(/<h1>/) === null && got.match('class="my-code"') === null
    )
  })

  it("Has title", () => {
    const got = compile("2.md")
    assert.ok(got.match("<h1>pages/_app.tsx</h1>") !== null)
  })

  it("Has title: Custom class name", () => {
    const got = compile("2.md", { className: "my-code" })
    assert.ok(
      got.match("<h1>pages/_app.tsx</h1>") !== null &&
        got.match('class="my-code"') !== null
    )
  })
})
