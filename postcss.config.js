// 常用配置
module.exports = {
  extends: "stylelint-config-standard",
  // 各rules的具体作用见上面链接
  rules: {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
      "ignore": ["stylelint-commands", "between-comments"],
    } ],
    "declaration-colon-space-after": "always",
    "max-empty-lines": 2,
    "rule-nested-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"],
    } ],
    // 允许的单位
    "unit-whitelist": ["em", "rem", "%", "s", "ms", "px"]
  }
};