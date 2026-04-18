import{j as e,L as f}from"./index-dikzeXGh.js";function u({label:a,icon:r,path:o,className:l,onClick:t,type:i="button",disabled:d}){const n=`
    group relative isolate flex items-center justify-center gap-2 w-fit px-6 py-3
    font-semibold
    rounded-full border border-brand
    bg-brand
    overflow-hidden
    transition-colors duration-300
    hover:text-brand
    hover:border-text-primary
    before:absolute before:inset-y-0 before:left-[-100%]
    before:w-full before:aspect-square
    before:rounded-full before:bg-dark-bg
    before:transition-all before:duration-700
    hover:before:left-0 hover:before:scale-150
    before:-z-10
    disabled:opacity-50 disabled:cursor-not-allowed
    ${l}
  `,s=e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"relative z-10",children:a}),e.jsx("span",{className:`\r
          relative z-10\r
          flex items-center justify-center \r
          rounded-full\r
          group-hover:rotate-45\r
          transition-all duration-300 ease-linear\r
          group-hover:rotate-0\r
          group-hover:bg-(--the-white)\r
        `,children:r&&e.jsx(r,{className:"size-5"})})]});return o?e.jsx(f,{to:o,className:n,onClick:t,children:s}):e.jsx("button",{type:i,onClick:t,disabled:d,className:n,children:s})}export{u as default};
