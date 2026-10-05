import React,{useState} from "react";
import {Phone, MapPin, Clock3, ShieldCheck, Search, ArrowRight, CheckCircle2, Menu, X, Droplets, Wrench} from "lucide-react";
import {services} from "./data/services.js";

const PHONE="1-800-555-0199"; // Replace with your approved tracking/affiliate number.
function App(){
 const [city,setCity]=useState(""); const [menu,setMenu]=useState(false); const [api,setApi]=useState(null);
 async function lookup(){
   if(!city.trim()) return;
   setApi({loading:true});
   try{
     const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(city+", USA")}`;
     const r=await fetch(url,{headers:{"Accept-Language":"en"}});
     const d=await r.json();
     setApi({loading:false,result:d[0]||null});
   }catch(e){setApi({loading:false,error:true})}
 }
 return <div>
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
   <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
    <a href="#" className="font-black text-xl tracking-tight flex gap-2 items-center"><span className="bg-blue-600 text-white p-2 rounded-xl"><Droplets size={20}/></span>LocalFlow Plumbing</a>
    <nav className="hidden md:flex gap-7 text-sm font-semibold"><a href="#services">Services</a><a href="#how">How It Works</a><a href="#areas">Service Areas</a><a href="#faq">FAQ</a></nav>
    <a href={`tel:${PHONE.replaceAll("-","")}`} className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold"><Phone size={17}/> Call Now</a>
    <button className="md:hidden" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
   </div>
   {menu&&<div className="md:hidden px-5 pb-5 grid gap-3 text-sm font-semibold"><a href="#services">Services</a><a href="#how">How It Works</a><a href="#areas">Service Areas</a><a href="#faq">FAQ</a></div>}
  </header>

  <main>
   <section className="bg-slate-950 text-white">
    <div className="max-w-7xl mx-auto px-5 py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
     <div>
      <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold mb-6"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Local plumbing help</div>
      <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">Plumbing help when you need it.</h1>
      <p className="mt-6 text-lg text-slate-300 max-w-xl">Find local plumbing service for leaks, clogged drains, water heaters and urgent plumbing problems.</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
       <a href={`tel:${PHONE.replaceAll("-","")}`} className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-xl font-extrabold"><Phone size={19}/> Call for Local Help</a>
       <a href="#services" className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/15 px-6 py-4 rounded-xl font-bold">View Services <ArrowRight size={18}/></a>
      </div>
      <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-300"><span className="flex gap-2 items-center"><Clock3 size={17}/> 24/7 request routing</span><span className="flex gap-2 items-center"><ShieldCheck size={17}/> Local service matching</span></div>
     </div>
     <div className="card p-7 text-slate-900">
      <div className="flex items-center gap-3"><div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Search/></div><div><h2 className="font-extrabold text-xl">Find service near you</h2><p className="text-sm text-slate-500">Search a city or ZIP code.</p></div></div>
      <div className="mt-6 flex gap-2"><input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Dallas, TX" className="min-w-0 flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/><button onClick={lookup} className="bg-slate-900 text-white px-5 rounded-xl font-bold">Search</button></div>
      {api?.loading&&<p className="mt-4 text-sm text-slate-500">Checking location…</p>}
      {api?.error&&<p className="mt-4 text-sm text-red-600">Location lookup failed. Please try again.</p>}
      {api?.result&&<div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm"><b>Location found:</b><br/>{api.result.display_name}<div className="mt-3"><a href={`tel:${PHONE.replaceAll("-","")}`} className="inline-flex items-center gap-2 text-blue-700 font-bold"><Phone size={15}/> Call for service</a></div></div>}
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm"><div className="bg-slate-50 rounded-xl p-4"><b>Emergency</b><br/><span className="text-slate-500">Leaks & burst pipes</span></div><div className="bg-slate-50 rounded-xl p-4"><b>Residential</b><br/><span className="text-slate-500">Common repairs</span></div></div>
     </div>
    </div>
   </section>

   <section id="services" className="max-w-7xl mx-auto px-5 py-20">
    <div className="max-w-2xl"><p className="text-blue-600 font-extrabold uppercase text-sm tracking-widest">Plumbing services</p><h2 className="text-4xl font-black mt-2">What can we help with?</h2><p className="mt-4 text-slate-600">Choose the type of plumbing problem and request local service.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">{services.map(s=><div className="card p-6 hover:-translate-y-1 transition" key={s.title}><div className="text-3xl">{s.icon}</div><h3 className="font-extrabold text-lg mt-5">{s.title}</h3><p className="text-slate-600 mt-2 text-sm leading-6">{s.desc}</p><a href={`tel:${PHONE.replaceAll("-","")}`} className="mt-5 inline-flex items-center gap-2 text-blue-700 font-bold text-sm">Get local help <ArrowRight size={15}/></a></div>)}</div>
   </section>

   <section id="how" className="bg-slate-100">
    <div className="max-w-7xl mx-auto px-5 py-20"><div className="text-center max-w-2xl mx-auto"><p className="text-blue-600 font-extrabold uppercase text-sm tracking-widest">Simple process</p><h2 className="text-4xl font-black mt-2">How it works</h2></div>
     <div className="grid md:grid-cols-3 gap-6 mt-12">{[["01","Tell us the problem","Choose a service or call directly."],["02","Confirm your area","Use the city search to identify your local market."],["03","Connect with service","Call the number above to request plumbing help."]].map(x=><div className="bg-white rounded-2xl p-7 border border-slate-200" key={x[0]}><div className="text-blue-600 font-black text-2xl">{x[0]}</div><h3 className="font-extrabold text-xl mt-4">{x[1]}</h3><p className="text-slate-600 mt-2">{x[2]}</p></div>)}</div>
    </div>
   </section>

   <section id="areas" className="max-w-7xl mx-auto px-5 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center"><div><p className="text-blue-600 font-extrabold uppercase text-sm tracking-widest">Local coverage</p><h2 className="text-4xl font-black mt-2">Built for city-level service pages</h2><p className="mt-5 text-slate-600 leading-7">This demo is structured so a single template can later be populated from a verified city database. Each location page can have its own title, service content, FAQs and approved tracking number.</p><div className="mt-7 grid sm:grid-cols-2 gap-3">{["Dallas, TX","Phoenix, AZ","Houston, TX","Las Vegas, NV","Tampa, FL","Atlanta, GA"].map(c=><div className="border border-slate-200 rounded-xl p-4 flex gap-2 items-center font-semibold" key={c}><MapPin size={17} className="text-blue-600"/>{c}</div>)}</div></div><div className="card p-8"><Wrench className="text-blue-600" size={42}/><h3 className="text-2xl font-black mt-5">Programmatic-ready architecture</h3><ul className="mt-5 space-y-4 text-slate-600">{["React component templates","Structured service/location data","API-ready location lookup","SEO-friendly metadata foundation","Affiliate tracking number placeholder"].map(t=><li className="flex gap-3" key={t}><CheckCircle2 className="text-emerald-600 shrink-0" size={20}/>{t}</li>)}</ul></div></div>
   </section>

   <section id="faq" className="bg-slate-950 text-white"><div className="max-w-4xl mx-auto px-5 py-20"><h2 className="text-4xl font-black">Frequently asked questions</h2><div className="mt-8 space-y-4">{[["Do you provide plumbing directly?","This demo is designed as a lead-generation/connection website. Replace the placeholder phone number only after your affiliate or service agreement is approved."],["Can I use this for multiple cities?","Yes. The React structure separates content data from UI, making it suitable for generating verified city/service pages."],["Is the phone number live?","No. The included number is a demo placeholder. Add your approved tracking number from your network before publishing."]].map(([q,a])=><details className="bg-white/5 rounded-xl p-5" key={q}><summary className="font-bold cursor-pointer">{q}</summary><p className="text-slate-300 mt-3 leading-6">{a}</p></details>)}</div></div></section>
  </main>
  <footer className="bg-slate-900 text-slate-400"><div className="max-w-7xl mx-auto px-5 py-8 flex flex-col md:flex-row gap-3 justify-between text-sm"><span>© 2026 LocalFlow Plumbing Demo</span><span>Demo site — replace placeholders with verified business/network details.</span></div></footer>
 </div>
}
export default App;