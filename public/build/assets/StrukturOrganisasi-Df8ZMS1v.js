import{c as e,d as t,n,t as r}from"./app-BnR_tNe2.js";import{t as i}from"./users-Dq7Sexwd.js";import{t as a}from"./PublicLayout-CnQaN7km.js";import{t as o}from"./Breadcrumb-DEWpLPSq.js";var s=t(e(),1),c=r(),l=({node:e})=>{let t=e.urutan===`1`,n=e.urutan===`2A`||e.urutan===`2B`,r=t?`inline-flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-200/90 hover:border-slate-400 p-6 w-80 relative z-10 transition-all duration-200`:n?`inline-flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-200/90 hover:border-slate-300 p-5 w-72 relative z-10 transition-all duration-200`:`inline-flex flex-col items-center bg-white rounded-xl shadow-sm border border-slate-200/80 hover:border-slate-300 p-4 w-64 relative z-10 transition-all duration-200`,i=t?`w-28 h-36 mb-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 flex items-center justify-center`:n?`w-24 h-32 mb-3.5 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 flex items-center justify-center`:`w-20 h-28 mb-3 rounded-lg overflow-hidden border border-slate-200 relative bg-slate-100 flex items-center justify-center`;return(0,c.jsxs)(`li`,{children:[(0,c.jsxs)(`div`,{className:r,children:[e.foto&&(0,c.jsx)(`div`,{className:i,children:(0,c.jsx)(`img`,{src:e.foto,alt:e.nama,className:`w-full h-full object-cover object-top`})}),(0,c.jsx)(`h3`,{className:`font-semibold text-slate-900 mb-1 leading-snug ${t?`text-base sm:text-lg`:n?`text-sm sm:text-base`:`text-xs sm:text-sm`}`,children:e.nama}),(0,c.jsx)(`span`,{className:`text-xs font-semibold uppercase tracking-wider text-emerald-700 block w-full text-center ${t?`mt-1 text-xs`:`text-[11px]`}`,children:e.jabatan})]}),e.children&&e.children.length>0&&(0,c.jsx)(`ul`,{children:e.children.map(e=>(0,c.jsx)(l,{node:e},e.id))})]})};function u({organisasi:e,jabatanTree:t,pengaturan:r}){let u=r?.banner_image,d=(0,s.useRef)(null),f=(0,s.useRef)(null),[p,m]=(0,s.useState)(1),[h,g]=(0,s.useState)(`auto`);return(0,s.useLayoutEffect)(()=>{let e=()=>{if(d.current&&f.current){let e=d.current.clientWidth-40,t=f.current.scrollWidth,n=f.current.scrollHeight;if(t>e&&e>0){let r=e/t;m(r),g(`${n*r}px`)}else m(1),g(`auto`)}};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[t]),(0,c.jsxs)(a,{children:[(0,c.jsx)(n,{title:`Struktur Organisasi & Tim | Prodi KPI IAI Persis Bandung`}),(0,c.jsxs)(`section`,{className:`relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden`,children:[u&&(0,c.jsxs)(`div`,{className:`absolute inset-0 z-0`,children:[(0,c.jsx)(`img`,{src:u,alt:`Banner Struktur Organisasi`,className:`w-full h-full object-cover opacity-20`}),(0,c.jsx)(`div`,{className:`absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90`})]}),(0,c.jsx)(`div`,{className:`max-w-6xl mx-auto px-4 sm:px-6 relative z-10`,children:(0,c.jsxs)(`div`,{className:`max-w-4xl text-left`,children:[(0,c.jsxs)(`h1`,{className:`text-3xl sm:text-5xl lg:text-[46px] font-semibold text-white leading-tight tracking-tight mb-4`,children:[`Struktur Organisasi & `,(0,c.jsx)(`span`,{className:`font-serif italic font-normal text-emerald-300`,children:`Tim Pengelola`})]}),r?.deskripsi?(0,c.jsx)(`p`,{className:`text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl`,children:r.deskripsi}):null]})})]}),(0,c.jsx)(o,{items:[{label:`Profil`},{label:`Struktur Organisasi`}]}),(0,c.jsx)(`div`,{className:`bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200 min-h-screen`,children:(0,c.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12`,children:[(0,c.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`span`,{className:`text-xs font-bold uppercase tracking-widest text-emerald-700`,children:`Tata Kelola Institusi`}),(0,c.jsxs)(`h2`,{className:`text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1`,children:[`Bagan Struktur `,(0,c.jsx)(`span`,{className:`font-serif italic font-normal text-slate-700 ml-1.5`,children:`Kepengurusan`})]})]}),(0,c.jsx)(`p`,{className:`text-xs sm:text-sm text-slate-500 max-w-md self-start sm:self-auto`,children:`Susunan pengelola Program Studi KPI Fakultas Dakwah IAI Persis Bandung.`})]}),e&&e.length>0?(0,c.jsx)(`div`,{ref:d,className:`flex flex-col items-center w-full py-8 overflow-x-auto min-h-[450px]`,style:{height:h===`auto`?`auto`:`calc(${h} + 4rem)`},children:(0,c.jsxs)(`div`,{ref:f,style:{transform:`scale(${p})`,transformOrigin:`top center`,transition:`transform 0.3s ease-out`,width:`max-content`},className:`flex flex-col items-center`,children:[(0,c.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`
                                    .organogram ul {
                                        padding-top: 24px;
                                        position: relative;
                                        display: flex;
                                        justify-content: center;
                                    }
                                    .organogram li {
                                        float: left;
                                        text-align: center;
                                        list-style-type: none;
                                        position: relative;
                                        padding: 24px 12px 0 12px;
                                    }
                                    .organogram li::before, .organogram li::after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        right: 50%;
                                        border-top: 2px solid #cbd5e1;
                                        width: 50%;
                                        height: 24px;
                                    }
                                    .organogram li::after {
                                        right: auto;
                                        left: 50%;
                                        border-left: 2px solid #cbd5e1;
                                    }
                                    .organogram li:only-child::after, .organogram li:only-child::before {
                                        display: none;
                                    }
                                    .organogram li:only-child {
                                        padding-top: 0;
                                    }
                                    .organogram li:first-child::before, .organogram li:last-child::after {
                                        border: 0 none;
                                    }
                                    .organogram li:last-child::before {
                                        border-right: 2px solid #cbd5e1;
                                        border-radius: 0 6px 0 0;
                                    }
                                    .organogram li:first-child::after {
                                        border-radius: 6px 0 0 0;
                                    }
                                    .organogram ul ul::before {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        border-left: 2px solid #cbd5e1;
                                        width: 0;
                                        height: 24px;
                                    }
                                `}}),(0,c.jsx)(`div`,{className:`organogram`,children:(0,c.jsx)(`ul`,{children:t&&t.map(e=>(0,c.jsx)(l,{node:e},e.id))})})]})}):(0,c.jsxs)(`div`,{className:`text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto p-8`,children:[(0,c.jsx)(i,{className:`w-12 h-12 text-slate-300 mx-auto mb-3`}),(0,c.jsx)(`h3`,{className:`text-lg font-semibold text-slate-800 mb-1`,children:`Struktur Belum Tersedia`}),(0,c.jsx)(`p`,{className:`text-slate-500 text-sm`,children:`Data struktur organisasi saat ini belum dimasukkan ke dalam sistem.`})]})]})})]})}export{u as default};