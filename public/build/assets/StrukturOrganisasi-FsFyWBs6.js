import{c as e,d as t,n,t as r}from"./app-ChKPcmZo.js";import{t as i}from"./PublicLayout-BUhBXvH7.js";import{t as a}from"./Breadcrumb-DZfsl4px.js";var o=t(e(),1),s=r(),c=({node:e})=>{let t=e.urutan===`1`,n=e.urutan===`2A`||e.urutan===`2B`,r=t?`inline-flex flex-col items-center bg-white rounded-xl shadow-lg border-2 border-emerald-500 p-6 w-80 relative z-10 transform transition-transform hover:-translate-y-1 hover:shadow-xl`:n?`inline-flex flex-col items-center bg-white rounded-xl shadow-md border border-slate-200 p-5 w-72 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-300`:`inline-flex flex-col items-center bg-white rounded-lg shadow-sm border border-slate-100 p-4 w-64 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-200`,i=t?`w-32 h-40 mb-4 rounded-md overflow-hidden border-4 border-emerald-100 shadow-sm relative bg-slate-200 flex items-center justify-center`:n?`w-28 h-36 mb-4 rounded-md overflow-hidden border-2 border-emerald-50 shadow-sm relative bg-slate-200 flex items-center justify-center`:`w-24 h-32 mb-3 rounded-md overflow-hidden border border-slate-100 relative bg-slate-200 flex items-center justify-center`,a=t?`text-sm font-medium text-slate-500 mt-1 block w-full text-center leading-snug`:`text-xs font-medium text-slate-500 mt-1 w-full text-center leading-snug`;return(0,s.jsxs)(`li`,{children:[(0,s.jsxs)(`div`,{className:r,children:[e.foto&&(0,s.jsx)(`div`,{className:i,children:(0,s.jsx)(`img`,{src:e.foto,alt:e.nama,className:`w-full h-full object-cover`})}),(0,s.jsx)(`h3`,{className:`font-bold text-slate-700 mb-1 leading-tight ${t?`text-md text-slate-800`:n?`text-sm`:`text-xs`}`,children:e.nama}),(0,s.jsx)(`p`,{className:a,children:e.jabatan})]}),e.children&&e.children.length>0&&(0,s.jsx)(`ul`,{children:e.children.map(e=>(0,s.jsx)(c,{node:e},e.id))})]})};function l({organisasi:e,jabatanTree:t,pengaturan:r}){let l=r?.banner_image||`/images/default-banner.jpg`,u=(0,o.useRef)(null),d=(0,o.useRef)(null),[f,p]=(0,o.useState)(1),[m,h]=(0,o.useState)(`auto`);return(0,o.useLayoutEffect)(()=>{let e=()=>{if(u.current&&d.current){let e=u.current.clientWidth-40,t=d.current.scrollWidth,n=d.current.scrollHeight;if(t>e&&e>0){let r=e/t;p(r),h(`${n*r}px`)}else p(1),h(`auto`)}};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[t]),(0,s.jsxs)(i,{children:[(0,s.jsx)(n,{title:`Struktur Organisasi & Tim | Prodi KPI IAI Persis Bandung`}),(0,s.jsxs)(`div`,{className:`relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end`,children:[(0,s.jsxs)(`div`,{className:`absolute inset-0`,children:[(0,s.jsx)(`img`,{src:l,alt:`Struktur Organisasi LPM Banner`,className:`w-full h-full object-cover opacity-60`}),(0,s.jsx)(`div`,{className:`absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent`})]}),(0,s.jsxs)(`div`,{className:`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12`,children:[(0,s.jsx)(`h1`,{className:`text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md`,children:`Struktur Organisasi & Tim Mutu`}),(0,s.jsx)(`div`,{className:`w-20 h-1.5 bg-amber-500 rounded-sm mb-4`}),r?.deskripsi&&(0,s.jsx)(`p`,{className:`text-white/90 max-w-2xl text-lg leading-relaxed drop-shadow-md`,children:r.deskripsi})]})]}),(0,s.jsx)(a,{items:[{label:`Profil LPM`},{label:`Struktur Organisasi & Tim`}]}),(0,s.jsx)(`div`,{className:`py-20 bg-slate-50 relative overflow-hidden min-h-screen`,children:(0,s.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`,children:[(0,s.jsxs)(`div`,{className:`text-center mb-16`,children:[(0,s.jsx)(`h2`,{className:`text-3xl font-extrabold text-emerald-950 mb-4`,children:`Struktur Organisasi & Tim Auditor Mutu`}),(0,s.jsx)(`p`,{className:`text-slate-600 max-w-2xl mx-auto`,children:`Susunan pengelola Program Studi Komunikasi dan Penyiaran Islam (KPI) IAI Persis Bandung dan Gugus Kendali Mutu yang berkomitmen mengawal standar mutu institusi.`})]}),e&&e.length>0?(0,s.jsx)(`div`,{ref:u,className:`flex flex-col items-center w-full pb-10 overflow-hidden`,style:{height:m===`auto`?`auto`:`calc(${m} + 2.5rem)`},children:(0,s.jsxs)(`div`,{ref:d,style:{transform:`scale(${f})`,transformOrigin:`top center`,transition:`transform 0.3s ease-out`,width:`max-content`},className:`flex flex-col items-center`,children:[(0,s.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`
                                    .organogram ul {
                                        padding-top: 20px;
                                        position: relative;
                                        display: flex;
                                        justify-content: center;
                                    }
                                    .organogram li {
                                        float: left;
                                        text-align: center;
                                        list-style-type: none;
                                        position: relative;
                                        padding: 20px 10px 0 10px;
                                    }
                                    .organogram li::before, .organogram li::after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        right: 50%;
                                        border-top: 2px solid #34d399; /* emerald-400 */
                                        width: 50%;
                                        height: 20px;
                                    }
                                    .organogram li::after {
                                        right: auto;
                                        left: 50%;
                                        border-left: 2px solid #34d399;
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
                                        border-right: 2px solid #34d399;
                                        border-radius: 0 5px 0 0;
                                    }
                                    .organogram li:first-child::after {
                                        border-radius: 5px 0 0 0;
                                    }
                                    .organogram ul ul::before {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        border-left: 2px solid #34d399;
                                        width: 0;
                                        height: 20px;
                                    }
                                `}}),(0,s.jsx)(`div`,{className:`organogram`,children:(0,s.jsx)(`ul`,{children:t.map(e=>(0,s.jsx)(c,{node:e},e.id))})})]})}):(0,s.jsxs)(`div`,{className:`text-center py-20 bg-white rounded-xl border border-dashed border-slate-300`,children:[(0,s.jsx)(Users,{className:`w-16 h-16 text-slate-300 mx-auto mb-4`}),(0,s.jsx)(`h3`,{className:`text-xl font-bold text-slate-700 mb-2`,children:`Struktur Belum Tersedia`}),(0,s.jsx)(`p`,{className:`text-slate-500`,children:`Data struktur organisasi saat ini belum dimasukkan ke dalam sistem.`})]})]})})]})}export{l as default};