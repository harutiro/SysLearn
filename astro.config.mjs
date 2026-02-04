// @ts-check

import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
// @ts-ignore
import remarkMermaid from "@southball/remark-mermaid";
import compress from "astro-compress";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import { remarkSandpack } from "remark-sandpack";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link-plus";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightSidebarTopics from "starlight-sidebar-topics";
import AutoImportAstro from "unplugin-auto-import/astro";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    metaTags(),
    compress({
      HTML: false,
      CSS: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    starlight({
      title: "SysLearn",
      description: "シス研として習得してほしいスキルを学ぶ蔵",
      defaultLocale: "ja",
      locales: {
        root: {
          label: "日本語",
          lang: "ja",
        },
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      logo: {
        src: "./src/assets/icons/logo/sym.svg",
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/SystemEngineeringTeam/SysLearn" },
        { icon: "x.com", label: "X", href: "https://x.com/set_official" },
        { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/ait.sysken" },
      ],
      components: {
        Footer: "src/components/starlight/Footer.astro",
        PageTitle: "src/components/starlight/PageTitle.astro",
      },
      customCss: [
        "@fontsource-variable/inter",
        "@fontsource-variable/noto-sans-jp",
        "src/styles/global.css",
        "src/styles/fonts.css",
      ],
      plugins: [
        starlightSidebarTopics([
          {
            label: "ホーム",
            link: "/",
            icon: "rocket",
            items: [
              {
                label: "はじめに",
                link: "/",
              },
              {
                label: "執筆者向け",
                autogenerate: { directory: "for-writers/" },
              },
              {
                label: "環境構築ガイド集",
                autogenerate: { directory: "setups/" },
              },
            ],
          },
          // {
          //   label: "C言語",
          //   link: "/textbook/c-lang/beginner/setup",
          //   icon: "document",
          //   items: [
          //     {
          //       label: "基礎コース",
          //       autogenerate: { directory: "textbook/c-lang/beginner" },
          //     },
          //   ],
          // },
          {
            label: "Git・GitHub",
            link: "/textbook/git/version-control",
            icon: "seti:git",
            items: [
              {
                label: "Git入門",
                autogenerate: { directory: "textbook/git" },
              },
            ],
          },
          {
            label: "Web",
            link: "/textbook/web/for-classes/html-structure-basic",
            icon: "document",
            items: [
              {
                label: "授業ついていくもんコース",
                autogenerate: { directory: "textbook/web/for-classes" },
              },
              {
                label: "ハッカソン出れるもんコース",
                autogenerate: { directory: "textbook/web/for-hackathons" },
              },
            ],
          },
        ]),
        starlightScrollToTop({
          threshold: 500,
          // ref: https://icones.js.org/collection/material-symbols?s=up&variant=Regular&icon=material-symbols:arrow-upward
          svgPath: "M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z",
        }),
      ],
    }),
    react(),
    AutoImportAstro({
      resolvers: [
        IconsResolver({
          prefix: "Icon",
          extension: "jsx",
        }),
      ],
    }),
  ],
  site: "https://learn.sysken.net",
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http" }],
  },
  markdown: {
    remarkPlugins: [
      [remarkMermaid, { themes: ["dark", "neutral"] }],
      [wikiLinkPlugin, { markdownFolder: "src/content/docs" }],
      // @ts-expect-error
      remarkSandpack,
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          content: { type: "text", value: " ↗" },
        },
      ],
    ],
  },
  vite: {
    plugins: [
    // NOTE: インポートなしにアイコンを使用できるようにするための設定
    // ref: https://github.com/unplugin/unplugin-icons/blob/3831eb07d96e94d503df62f45512f3ca3e50cc26/README.md#auto-importing
      AutoImport({
        resolvers: [
          IconsResolver({
            prefix: "Icon",
            extension: "jsx",
          }),
        ],
      }),
      Icons({
        autoInstall: true,
        compiler: "jsx",
        jsx: "react",
      }),
    ],
  },
});
