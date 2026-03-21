"use client";
import { useEffect, useRef, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let raf: number;
    const rsz = () => { cv.width=cv.offsetWidth||400; cv.height=cv.offsetHeight||300; };
    rsz();
    const ps = Array.from({length:60},(_,i)=>({
      x:Math.random()*cv.width,y:Math.random()*cv.height,
      vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.4,
      r:Math.random()*1.2+.3,
      c:i%3===0?"200,255,0":i%3===1?"0,212,255":"155,95,255",
      a:Math.random()*.15+.04,
    }));
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height);
      ps.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=cv.width;if(p.x>cv.width)p.x=0;
        if(p.y<0)p.y=cv.height;if(p.y>cv.height)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.c},${p.a})`;ctx.fill();
      });
      for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){
        const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ctx.beginPath();ctx.moveTo(ps[i].x,ps[i].y);ctx.lineTo(ps[j].x,ps[j].y);ctx.strokeStyle=`rgba(200,255,0,${.08*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>cancelAnimationFrame(raf);
  },[]);

  useEffect(()=>{
    let v=0;
    const id=setInterval(()=>{v=Math.min(100,v+Math.floor(Math.random()*7+2));setPct(v);if(v>=100)clearInterval(id);},80);
    return ()=>clearInterval(id);
  },[]);

  useEffect(()=>{
    const id=setTimeout(()=>{setExit(true);setTimeout(onDone,700);},3400);
    return ()=>clearTimeout(id);
  },[onDone]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",opacity:exit?0:1,transform:exit?"scale(1.02)":"scale(1)",transition:"opacity 0.7s ease,transform 0.7s ease"}}>
      <canvas ref={cvRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.6,pointerEvents:"none"}}/>
      <div style={{background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px)",position:"absolute",inset:0,pointerEvents:"none",zIndex:1,opacity:.5}}/>
      <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
        {/* 3D sphere */}
        <div style={{position:"relative",width:130,height:130,marginBottom:32,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,rgba(200,255,0,.14) 0%,rgba(0,212,255,.07) 40%,rgba(4,6,11,.92) 100%)",boxShadow:"inset -18px -18px 36px rgba(200,255,0,.07),inset 8px 8px 28px rgba(0,212,255,.05),0 0 60px rgba(200,255,0,.1),0 0 120px rgba(0,212,255,.05)"}}>
          <style>{`@keyframes merSpin{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}@keyframes latSpin{from{transform:rotateX(70deg) rotateZ(0deg)}to{transform:rotateX(70deg) rotateZ(360deg)}}`}</style>
          <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid rgba(200,255,0,.18)",animation:"merSpin 6s linear infinite"}}/>
          <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid rgba(0,212,255,.13)",animation:"merSpin 9s linear infinite reverse",transform:"rotateY(60deg)"}}/>
          <div style={{position:"absolute",left:"50%",top:"50%",width:130,height:44,marginLeft:-65,marginTop:-22,borderRadius:"50%",border:"1px solid rgba(200,255,0,.22)",animation:"latSpin 3s linear infinite"}}/>
          <div style={{position:"absolute",left:"50%",top:"50%",width:104,height:36,marginLeft:-52,marginTop:-18,borderRadius:"50%",border:"1px solid rgba(0,212,255,.18)",animation:"latSpin 4.5s linear infinite reverse"}}/>
          <div style={{position:"absolute",left:"50%",top:"50%",width:76,height:26,marginLeft:-38,marginTop:-13,borderRadius:"50%",border:"1px solid rgba(155,95,255,.16)",animation:"latSpin 6s linear infinite"}}/>
          <div style={{position:"absolute",width:7,height:7,borderRadius:"50%",background:"var(--a1)",boxShadow:"0 0 12px var(--a1)",top:0,left:"50%",marginLeft:-3.5,transformOrigin:"3.5px 65px",animation:"latSpin 3s linear infinite"}}/>
          <div style={{position:"absolute",width:5,height:5,borderRadius:"50%",background:"var(--a3)",boxShadow:"0 0 8px var(--a3)",top:12,left:"50%",marginLeft:-2.5,transformOrigin:"2.5px 53px",animation:"merSpin 4.5s linear infinite"}}/>
          <div style={{position:"absolute",inset:"30%",borderRadius:"50%",background:"rgba(200,255,0,.06)",border:"1px solid rgba(200,255,0,.12)"}}/>
        </div>
        <div style={{fontFamily:"Space Mono,monospace",fontSize:12,color:"var(--a1)",letterSpacing:4,textTransform:"uppercase",marginBottom:20}}>Loading...</div>
        <div style={{width:200,height:1,background:"var(--ln)",position:"relative",marginBottom:10}}>
          <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,var(--a1),var(--a3),var(--a4))",transition:"width .12s linear"}}/>
        </div>
        <div style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink3)",letterSpacing:2}}>{pct}%</div>
      </div>
    </div>
  );
}
