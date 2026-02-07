---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "node-libgpiod"
  text: "Node bindings for Linux GPIO subsystem"
  tagline: It's all about wires and javascript, baby! 
  actions:
    - theme: brand
      text: Quickstart
      link: /docs/
    - theme: alt
      text: API Overview
      link: /docs/
features:
  - title: Built on top of industry standards
    details: |
      The libgpiod is present on all modern linux distributions and is the
      _de facto_ standard to interface with General Purpose Input Output.
  - title: Node.js ecosystem ubiquity at your service
    details: |
      Anything you might need for your product/experiment/toy available as a
      package on registries such as npm.
  - title: Documented. Tested. Supported.
    details: |
      Whenever a question emerges or a feature is missed, there is a community
      to help you! There is also an extensive test suite which samples how the
      library works, and sample projects available as well.
---

|      |          |              |
| ---  | --- | --- |
| [![npm][shield-npm]][npm] | ![Build status][shield-test] | [![MIT][shield-mit]][mit] |

[shield-npm]: https://img.shields.io/npm/v/node-libgpiod?style=plastic
[npm]: https://www.npmjs.com/package/node-libgpiod
[shield-test]: https://github.com/sombriks/node-libgpiod/actions/workflows/node-test.yml/badge.svg
[shield-mit]: https://img.shields.io/badge/license-MIT-blue
[mit]: https://github.com/sombriks/node-libgpiod/LICENSE
