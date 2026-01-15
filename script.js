// ---------- dark / light ----------
const html=document.documentElement;
const toggle=()=>{html.dataset.theme=html.dataset.theme==="dark"?"light":"dark";localStorage.setItem("theme",html.dataset.theme);};
const initTheme=()=>{const s=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");html.dataset.theme=s;};
initTheme();
window.addEventListener("keydown",e=>e.key==="t"&&toggle());

// ---------- year ----------
document.getElementById("year").textContent=new Date().getFullYear();

// ---------- smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{e.preventDefault();document.querySelector(a.getAttribute("href")).scrollIntoView({behavior:"smooth"});});
});

// ---------- three.js mesh ----------
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
  mesh.rotation.x=t*0.2;mesh.rotation.y=t*0.1;
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
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

// ---------- role rotation ----------
const roles=[
  {emoji:"📊",title:"Data Engineer"},
  {emoji:"🤖",title:"AI Engineer"},
  {emoji:"💻",title:"Software Engineer"},
  {emoji:"☁️",title:"Cloud Tinkerer"}
];
let roleIndex=0;
const emojiEl=document.getElementById('role-emoji');
const textEl=document.getElementById('role-text');
function switchRole(){
  roleIndex=(roleIndex+1)%roles.length;
  emojiEl.textContent=roles[roleIndex].emoji;
  textEl.textContent=roles[roleIndex].title;
  textEl.style.animation='none';void textEl.offsetWidth;
  textEl.style.animation='fadeIn .6s ease';
}
setInterval(switchRole,3000);

// ---------- image cross-fade ----------
const imgs=document.querySelectorAll('.hero-images img');
let imgIndex=0;
function nextImage(){
  imgs[imgIndex].classList.remove('active');
  imgIndex=(imgIndex+1)%imgs.length;
  imgs[imgIndex].classList.add('active');
}
setInterval(nextImage,5000);
