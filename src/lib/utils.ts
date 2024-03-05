import type { dataType } from "./types";
import { Buffer } from "node:buffer";

function toCode({ html, css, js }: { html: string; css: string; js: string }) {
  return `${css}\n${html}\n${js}`;
}

export function getData(item: dataType) {
  const { created, id, url } = item;
  const { pathname } = new URL(url);
  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split("%7C");
  const html = Buffer.from(rawHtml, "base64").toString("utf8");
  const css = Buffer.from(rawCss, "base64").toString("utf8");
  const js = Buffer.from(rawJs, "base64").toString("utf8");

  const data = {
    created,
    id,
    code: toCode({ html, css, js }),
  };

  return data;
}
