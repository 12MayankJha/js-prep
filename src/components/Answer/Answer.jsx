import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "./Answer.css";

export default function Answer({ raw }) {
  if (!raw)
    return <p className="ans__empty">No answer available for this question.</p>;

  const html = parseAnswer(raw);

  return <div className="ans" dangerouslySetInnerHTML={{ __html: html }} />;
}

function parseAnswer(raw) {
  let html = raw;

  // Convert <pre><code>...</code></pre> into styled code blocks
  html = html.replace(
    /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
    (_, code) => {
      const id = "cb-" + Math.random().toString(36).substr(2, 8);
      const lang =
        (raw.match(/class="language-(\w+)"/) || [])[1] || "javascript";
      const highlighted = hljs.highlight(code.trim(), {
        language: lang,
        ignoreIllegals: true,
      }).value;
      return `
        <div class="ans__code-block">
          <div class="ans__code-hdr">
            <span class="ans__code-lang">${lang}</span>
            <button class="ans__copy-btn" onclick="
              navigator.clipboard.writeText(this.closest('.ans__code-block').querySelector('pre').innerText)
                .then(() => {
                  this.textContent = 'Copied!'
                  this.classList.add('ans__copy-btn--done')
                  setTimeout(() => {
                    this.textContent = 'Copy'
                    this.classList.remove('ans__copy-btn--done')
                  }, 2000)
                })
            ">Copy</button>
          </div>
          <pre id="${id}">${highlighted}</pre>
        </div>`;
    },
  );

  // Inline code
  html = html.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/g,
    (_, c) => `<span class="ans__icode">${c}</span>`,
  );

  // Images
  html = html.replace(/<img([^>]*?)>/g, (_, attrs) => {
    if (!attrs.includes("class=")) attrs += ' class="ans__img"';
    return `<img${attrs}>`;
  });

  return html;
}
