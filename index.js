const visit = require("unist-util-visit")
const h = require("hastscript")

function codeTitle(opt) {
  const className = (opt && opt.className) || "rehype-code-title"

  return function (tree) {
    visit(tree, { tagName: "pre" }, visitor)

    function visitor(node, index) {
      if (node.children && node.children.length > 0) {
        const { properties } = node.children[0]
        if (properties.className && properties.className.length > 0) {
          const [lang, filename] = properties.className[0]
            .split(":")
            .map((e) => e.trim())
          properties.className = lang
          if (!filename) return

          const title = h("h1", filename)
          const container = h("div", { class: className }, [title, node])
          tree.children[index] = container
        }
      }
    }
  }
}

module.exports = codeTitle
