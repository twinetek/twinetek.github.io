# Tools

Small web tools published with GitHub Pages. Each tool lives in its own folder and runs entirely in the browser, with no server, build step, or account.

The root `index.html` is a documentation site for all of them. It has a searchable index of tools, a docs page for each one, and a sidebar for moving between them.

Live site: https://twinetek.github.io/

## Tools

| Tool | Folder | What it does |
| --- | --- | --- |
| Trip Split | `ExpenseSplitter/` | Splits shared trip expenses and works out the fewest payments to settle up. Data stays in your browser. |

Each tool's full documentation is on the site, for example https://twinetek.github.io/#/trip-split.

## Repository layout

```
/
├── index.html            Docs site: tool index, docs pages, search
├── README.md             This file
└── ExpenseSplitter/
    └── index.html        Trip Split (HTML, CSS, and JavaScript in one file)
```

## Adding a tool

1. Create a folder at the root, for example `MyTool/`, and put the tool's `index.html` inside it.
2. Open the root `index.html` and find the `TOOLS` list near the top of the script.
3. Copy the existing entry and change its fields:
   - `slug`: short name for the docs address, lowercase with dashes (`my-tool`).
   - `name`: display name.
   - `folder`: the folder name, matching capital letters exactly, ending with a slash (`MyTool/`).
   - `category`: groups tools in the sidebar.
   - `status`: shown as a badge, such as `Stable` or `Beta`.
   - `updated`: free text, such as `October 2026`.
   - `tags`: become filter buttons on the home page.
   - `summary`: one sentence for the card and the top of the docs page.
   - `sections`: the docs page content.
4. Add a row for it to the table above.
5. Commit and push. GitHub Pages republishes within a minute or two.

Section content is a list of blocks:

```js
{ id: "getting-started", title: "Getting started", blocks: [
  { p: "A paragraph." },
  { ul: ["A bullet", "Another bullet"] },
  { ol: ["Step one", "Step two"] },
  { note: "A highlighted callout." }
] }
```

Resume-style items use an `entry` block:

```js
{ entry: { title: "Job title", org: "Organization", dates: "2020 to present",
           location: "City, State", ul: ["What you did", "What you achieved"] } }
```

Text inside blocks supports `**bold**`, `` `code` ``, and `[link text](url)`. Anything else that looks like HTML is shown as plain text.

## About pages

The `PAGES` list, just below `TOOLS`, holds pages that aren't tools, such as an About me or resume page. They appear under **About** in the sidebar, and that heading only shows once the list has a page in it. A commented example in the file shows a page with Experience, Skills, and Contact sections. Links in page text can use `mailto:` for an email address.

## Site settings

The `SITE` object at the top of the root `index.html` sets the title, the description on the home page, and the branch name used for "View source" links.

`repoUrl` is set to https://github.com/twinetek/twinetek.github.io, which the "View source" and footer links use.

## Running locally

Serve the folder so links behave the way they do on GitHub Pages:

```
python3 -m http.server
```

Then visit `http://localhost:8000/`. Opening `index.html` directly from disk also works for the docs, but the tool links will open a folder listing instead of the tool.
