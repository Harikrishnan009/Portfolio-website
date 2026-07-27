"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DataScene({ runKey, running }: { runKey:number; running:boolean }) {
  const host=useRef<HTMLDivElement>(null);
  const state=useRef<{scene:THREE.Scene;camera:THREE.PerspectiveCamera;renderer:THREE.WebGLRenderer;particles:THREE.Points;frame:number;mouse:THREE.Vector2;nodes:THREE.Mesh[]} | null>(null);
  useEffect(()=>{
    if(!host.current) return;
    const el=host.current, scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(42,el.clientWidth/el.clientHeight,.1,100);camera.position.set(0,1.2,8.2);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(el.clientWidth,el.clientHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;el.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff,1.25));const light=new THREE.PointLight(0xd8b876,8,18);light.position.set(1,3,5);scene.add(light);
    const group=new THREE.Group();group.rotation.x=-.12;scene.add(group);
    const positions=[[-3.5,-.7,0],[-1.8,.9,-.45],[0,-.55,.2],[1.9,1,-.35],[3.55,-.45,0]];
    const nodes:THREE.Mesh[]=[];
    positions.forEach((p,i)=>{const geo=i===2?new THREE.OctahedronGeometry(.35,1):new THREE.IcosahedronGeometry(.28,1);const mat=new THREE.MeshStandardMaterial({color:i===2?0xd8b876:0x8d8d8d,metalness:.7,roughness:.22,transparent:true,opacity:.88});const m=new THREE.Mesh(geo,mat);m.position.set(p[0],p[1],p[2]);group.add(m);nodes.push(m);const ring=new THREE.Mesh(new THREE.TorusGeometry(.43,.012,8,48),new THREE.MeshBasicMaterial({color:0xd8b876,transparent:true,opacity:.24}));ring.position.copy(m.position);ring.rotation.x=Math.PI/2;group.add(ring)});
    const curve=new THREE.CatmullRomCurve3(positions.map(p=>new THREE.Vector3(p[0],p[1],p[2])));const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,100,.012,5,false),new THREE.MeshBasicMaterial({color:0x8d8d8d,transparent:true,opacity:.32}));group.add(tube);
    const count=180, arr=new Float32Array(count*3);for(let i=0;i<count;i++){const t=Math.random();const v=curve.getPoint(t);arr[i*3]=v.x+(Math.random()-.5)*.15;arr[i*3+1]=v.y+(Math.random()-.5)*.15;arr[i*3+2]=v.z+(Math.random()-.5)*.18}const pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(arr,3));const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0xd8b876,size:.045,transparent:true,opacity:.72,sizeAttenuation:true}));group.add(particles);
    const mouse=new THREE.Vector2();const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1))};el.addEventListener("pointermove",move);
    const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};const ro=new ResizeObserver(resize);ro.observe(el);
    let frame=0;const clock=new THREE.Clock();const animate=()=>{frame=requestAnimationFrame(animate);const t=clock.getElapsedTime();group.rotation.y+=(mouse.x*.09-group.rotation.y)*.025;group.rotation.x+=(-.12+mouse.y*.045-group.rotation.x)*.025;nodes.forEach((n,i)=>{n.rotation.x=t*(.18+i*.025);n.rotation.y=t*(.24+i*.02);n.position.y=positions[i][1]+Math.sin(t*1.1+i)*.035});particles.rotation.z=t*.018;renderer.render(scene,camera)};animate();state.current={scene,camera,renderer,particles,frame,mouse,nodes};
    return()=>{cancelAnimationFrame(frame);ro.disconnect();el.removeEventListener("pointermove",move);renderer.dispose();pg.dispose();el.removeChild(renderer.domElement);state.current=null};
  },[]);
  useEffect(()=>{const s=state.current;if(!s)return;const mat=s.particles.material as THREE.PointsMaterial;mat.size=running?.075:.045;mat.opacity=running?.98:.72;s.nodes.forEach((n,i)=>{const m=n.material as THREE.MeshStandardMaterial;m.emissive.setHex(running&&i<=3?0x5b431c:0x000000);m.emissiveIntensity=running?.55:0})},[runKey,running]);
  return <div ref={host} className="webgl-data-scene" aria-hidden="true"/>;
}
