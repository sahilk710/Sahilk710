// Dark / light auto + manual toggle
const html=document.documentElement;
const toggle=()=>{html.dataset.theme=html.dataset.theme==="dark"?"light":"dark";localStorage.setItem("theme",html.dataset.theme);};
const initTheme=()=>{const s=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");html.dataset.theme=s;};
initTheme();
window.addEventListener("keydown",e=>e.key==="t"&&toggle()); // press T to toggle

// Year in footer
document.getElementById("year").textContent=new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{e.preventDefault();document.querySelector(a.getAttribute("href")).scrollIntoView({behavior:"smooth"});});
});

// 3-D animated mesh background (Three.js)
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("hero-canvas"),alpha:true});
renderer.setSize(innerWidth,innerHeight);
const geo=new THREE.PlaneGeometry(20,20,15,15);
const mat=new THREE.MeshBasicMaterial({color:0x6366f1,wireframe:true,opacity:0.25,transparent:true});
const mesh=new THREE.Mesh(geo,mat);
scene.add(mesh);
camera.position.z=6;
let t=0;
function animate(){
  t+=0.01;
  mesh.rotation.x=t*0.2;
  mesh.rotation.y=t*0.1;
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i),y=pos.getY(i);
    pos.setZ(i,Math.sin(x*0.8+t)*0.2);
  }
  pos.needsUpdate=true;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();
addEventListener("resize",()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

// Typewriter effect for tagline (optional)
const tag=document.querySelector(".tagline");
const txt=tag.textContent;
tag.textContent="";
let i=0;
const type=()=>{
  if(i<txt.length){tag.textContent+=txt.charAt(i);i++;setTimeout(type,45);}
};
setTimeout(type,600);

// Scroll-triggered fade-in (Intersection Observer)
const obs=new IntersectionObserver((els)=>els.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in");}),{threshold:0.2});
document.querySelectorAll(".card,.project-card").forEach(el=>obs.observe(el));
