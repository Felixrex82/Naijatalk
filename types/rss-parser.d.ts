// Type declaration for rss-parser
// Installed via: npm install rss-parser
declare module 'rss-parser' {
  interface Item {
    title?: string
    link?: string
    pubDate?: string
    isoDate?: string
    content?: string
    contentSnippet?: string
    summary?: string
    guid?: string
    [key: string]: any
  }
  interface Output<T> {
    title?: string
    link?: string
    feedUrl?: string
    items: (Item & T)[]
  }
  interface ParserOptions {
    timeout?: number
    headers?: Record<string, string>
    customFields?: {
      feed?: string[]
      item?: (string | [string, string])[]
    }
  }
  class Parser<T = {}> {
    constructor(options?: ParserOptions)
    parseURL(url: string): Promise<Output<T>>
    parseString(xml: string): Promise<Output<T>>
  }
  export = Parser
}
