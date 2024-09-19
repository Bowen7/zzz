import { readFile } from 'node:fs/promises'

const injectScript = `
    <script type="module">
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>
`
export class MainHtml {
  static html = ''
  static async fetch() {
    if (this.html === '') {
      if (import.meta.env.PROD) {
        this.html = await readFile('dist/static/index.html', 'utf8')
      } else {
        const html = await readFile('index.html', 'utf8')
        this.html = html.replace('    <div id="root"></div>', `    <div id="root"></div>${injectScript}`)
      }
    }
    return this.html
  }
}
