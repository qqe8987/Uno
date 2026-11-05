const C='uno-v3',A=['./','index.html','icon.svg','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(A.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
if(new URL(r.url).origin!==location.origin)return;
const net=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x});
const nav=r.mode==='navigate',t=nav?Promise.race([net,new Promise((_,j)=>setTimeout(j,4000))]):net;
e.respondWith(t.catch(()=>caches.match(r).then(m=>m||(nav?caches.match('index.html').then(n=>n||net):Response.error()))))});
