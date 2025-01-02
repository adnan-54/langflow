"use strict";(self.webpackChunklangflow_docs=self.webpackChunklangflow_docs||[]).push([[321],{19470:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var s=n(74848),i=n(28453);const r={title:"Processing",slug:"/components-processing"},d="Processing components in Langflow",l={id:"Components/components-processing",title:"Processing",description:"Processing components process and transform data within a flow.",source:"@site/docs/Components/components-processing.md",sourceDirName:"Components",slug:"/components-processing",permalink:"/components-processing",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Processing",slug:"/components-processing"},sidebar:"docs",previous:{title:"Models",permalink:"/components-models"},next:{title:"Prompts",permalink:"/components-prompts"}},c={},a=[{value:"Use a processing component in a flow",id:"use-a-processing-component-in-a-flow",level:2},{value:"Combine Text",id:"combine-text",level:2},{value:"Inputs",id:"inputs",level:3},{value:"Filter Data",id:"filter-data",level:2},{value:"Inputs",id:"inputs-1",level:3},{value:"Outputs",id:"outputs",level:3},{value:"Parse JSON",id:"parse-json",level:2},{value:"Inputs",id:"inputs-2",level:3},{value:"Outputs",id:"outputs-1",level:3},{value:"Merge Data component",id:"merge-data-component",level:2},{value:"Inputs",id:"inputs-3",level:3},{value:"Outputs",id:"outputs-2",level:3},{value:"Parse Data component",id:"parse-data-component",level:2},{value:"Inputs",id:"inputs-4",level:3},{value:"Outputs",id:"outputs-3",level:3},{value:"Split Text component",id:"split-text-component",level:2},{value:"Inputs",id:"inputs-5",level:3}];function o(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"processing-components-in-langflow",children:"Processing components in Langflow"})}),"\n",(0,s.jsx)(t.p,{children:"Processing components process and transform data within a flow."}),"\n",(0,s.jsx)(t.h2,{id:"use-a-processing-component-in-a-flow",children:"Use a processing component in a flow"}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.strong,{children:"Split Text"})," processing component in this flow splits the incoming ",(0,s.jsx)(t.a,{href:"/guides-data-message",children:"data"})," into chunks to be embedded into the vector store component."]}),"\n",(0,s.jsx)(t.p,{children:"The component offers control over chunk size, overlap, and separator, which affect context and granularity in vector store retrieval results."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{src:n(7685).A+"",width:"2244",height:"1726"})}),"\n",(0,s.jsx)(t.h2,{id:"combine-text",children:"Combine Text"}),"\n",(0,s.jsx)(t.p,{children:"This component concatenates two text sources into a single text chunk using a specified delimiter."}),"\n",(0,s.jsx)(t.h3,{id:"inputs",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"first_text"}),(0,s.jsx)(t.td,{children:"First Text"}),(0,s.jsx)(t.td,{children:"The first text input to concatenate."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"second_text"}),(0,s.jsx)(t.td,{children:"Second Text"}),(0,s.jsx)(t.td,{children:"The second text input to concatenate."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"delimiter"}),(0,s.jsx)(t.td,{children:"Delimiter"}),(0,s.jsx)(t.td,{children:"A string used to separate the two text inputs. Defaults to a space."})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"filter-data",children:"Filter Data"}),"\n",(0,s.jsx)(t.p,{children:"This component filters a Data object based on a list of keys."}),"\n",(0,s.jsx)(t.h3,{id:"inputs-1",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"data"}),(0,s.jsx)(t.td,{children:"Data"}),(0,s.jsx)(t.td,{children:"Data object to filter."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"filter_criteria"}),(0,s.jsx)(t.td,{children:"Filter Criteria"}),(0,s.jsx)(t.td,{children:"List of keys to filter by."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"outputs",children:"Outputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"filtered_data"}),(0,s.jsx)(t.td,{children:"Filtered Data"}),(0,s.jsx)(t.td,{children:"A new Data object containing only the key-value pairs that match the filter criteria."})]})})]}),"\n",(0,s.jsx)(t.h2,{id:"parse-json",children:"Parse JSON"}),"\n",(0,s.jsx)(t.p,{children:"This component converts and extracts JSON fields using JQ queries."}),"\n",(0,s.jsx)(t.h3,{id:"inputs-2",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"input_value"}),(0,s.jsx)(t.td,{children:"Input"}),(0,s.jsx)(t.td,{children:"Data object to filter. Can be a message or data object."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"query"}),(0,s.jsx)(t.td,{children:"JQ Query"}),(0,s.jsx)(t.td,{children:"JQ Query to filter the data. The input is always a JSON list."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"outputs-1",children:"Outputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"filtered_data"}),(0,s.jsx)(t.td,{children:"Filtered Data"}),(0,s.jsx)(t.td,{children:"Filtered data as a list of data objects."})]})})]}),"\n",(0,s.jsx)(t.h2,{id:"merge-data-component",children:"Merge Data component"}),"\n",(0,s.jsx)(t.p,{children:"This component combines multiple data sources into a single unified Data object."}),"\n",(0,s.jsx)(t.p,{children:"The component iterates through the input list of data objects, merging them into a single data object. If the input list is empty, it returns an empty data object. If there's only one input data object, it returns that object unchanged. The merging process uses the addition operator to combine data objects."}),"\n",(0,s.jsx)(t.h3,{id:"inputs-3",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"data"}),(0,s.jsx)(t.td,{children:"Data"}),(0,s.jsx)(t.td,{children:"A list of data objects to be merged"})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"outputs-2",children:"Outputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"merged_data"}),(0,s.jsx)(t.td,{children:"Merged Data"}),(0,s.jsx)(t.td,{children:"A single data object containing the combined information from all input data objects"})]})})]}),"\n",(0,s.jsx)(t.h2,{id:"parse-data-component",children:"Parse Data component"}),"\n",(0,s.jsx)(t.p,{children:"The ParseData component converts data objects into plain text using a specified template.\nThis component transforms structured data into human-readable text formats, allowing for customizable output through the use of templates."}),"\n",(0,s.jsx)(t.h3,{id:"inputs-4",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"data"}),(0,s.jsx)(t.td,{children:"Data"}),(0,s.jsx)(t.td,{children:"The data to convert to text."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"template"}),(0,s.jsx)(t.td,{children:"Template"}),(0,s.jsxs)(t.td,{children:["The template to use for formatting the data. It can contain the keys ",(0,s.jsx)(t.code,{children:"{text}"}),", ",(0,s.jsx)(t.code,{children:"{data}"})," or any other key in the data."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"sep"}),(0,s.jsx)(t.td,{children:"Separator"}),(0,s.jsx)(t.td,{children:"The separator to use between multiple data items."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"outputs-3",children:"Outputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"text"}),(0,s.jsx)(t.td,{children:"Text"}),(0,s.jsx)(t.td,{children:"The resulting formatted text string as a message object."})]})})]}),"\n",(0,s.jsx)(t.h2,{id:"split-text-component",children:"Split Text component"}),"\n",(0,s.jsx)(t.p,{children:"This component splits text into chunks of a specified length."}),"\n",(0,s.jsx)(t.h3,{id:"inputs-5",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Display Name"}),(0,s.jsx)(t.th,{children:"Info"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"texts"}),(0,s.jsx)(t.td,{children:"Texts"}),(0,s.jsx)(t.td,{children:"Texts to split."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"separators"}),(0,s.jsx)(t.td,{children:"Separators"}),(0,s.jsx)(t.td,{children:"Characters to split on. Defaults to a space."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"max_chunk_size"}),(0,s.jsx)(t.td,{children:"Max Chunk Size"}),(0,s.jsx)(t.td,{children:"The maximum length, in characters, of each chunk."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"chunk_overlap"}),(0,s.jsx)(t.td,{children:"Chunk Overlap"}),(0,s.jsx)(t.td,{children:"The amount of character overlap between chunks."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"recursive"}),(0,s.jsx)(t.td,{children:"Recursive"}),(0,s.jsx)(t.td,{children:"Whether to split recursively."})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},7685:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/vector-store-document-ingestion-8f0d7af458bcbd6d6c39280fa47b1590.png"},28453:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>l});var s=n(96540);const i={},r=s.createContext(i);function d(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);