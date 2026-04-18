import{j as r}from"./index-8fHcTbpv.js";function p({label:e,icon:n,path:a,className:t,download:i,external:o}){return r.jsxs("a",{href:a,...i&&{download:!0},...o&&{target:"_blank",rel:"noopener noreferrer"},className:` inline-block
        group w-fit relative overflow-hidden
        rounded-full border px-8 py-3
        tracking-wide
        font-semibold
        text-text-primary border-text-primary bg-dark-bg
        hover:border-brand
        ${t}
      `,children:[r.jsxs("span",{className:`\r
          absolute inset-0\r
          flex items-center text-text-primary justify-center gap-2\r
          transition-opacity duration-100 ease-linear\r
          group-hover:opacity-0\r
        `,children:[e,n&&r.jsx(n,{className:"size-5"})]}),r.jsx("span",{"aria-hidden":!0,className:`\r
          relative block whitespace-nowrap\r
          opacity-0\r
          group-hover:opacity-100\r
          [--spacing:0em]\r
          [--start:-9em]\r
          [--end:9em]\r
          animate-[marquee_2s_linear_infinite]\r
          [animation-play-state:paused]\r
          group-hover:[animation-play-state:running]\r
          group-hover:text-brand\r
        `,children:e})]})}export{p as default};
