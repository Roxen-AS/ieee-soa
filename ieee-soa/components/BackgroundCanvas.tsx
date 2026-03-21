"use client";
import { useEffect, useRef } from "react";

const GLYPHS = ["∑","λ","∇","Ω","π","∂","⊕","≡","∫","Δ","φ","∞"];
const COLS = 28, ROWS = 16;

export default function BackgroundCanvas() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const mx = useRef(-999), my = useRef(-999), t = useRef(0);
  const raf = useRef<number>(0);
  const ps  = useRef<{x:number;y:number;vx:number;vy:number;r:number;c:string;a:number}[]>([]);
  const gs  = useRef<{x:number;y:number;vx:number;vy:number;ch:string;sz:number;a:number;phase:number}[]>([]);
  const neb = useRef([
    {x:.20,y:.30,r:320,c:"200,255,0", a:.016,vx:.00025,vy:.00015},
    {x:.75,y:.60,r:380,c:"0,212,255", a:.013,vx:-.0002, vy:.00025},
    {x:.50,y:.85,r:260,c:"155,95,255",a:.014,vx:.00018,vy:-.0002},
  ]);

  useEffect(() => {
    const cv = cvRef.current!;
    const ctx = cv.getContext("2d")!;

    const rebuild = (W:number,H:number) => {
      ps.current = Array.from({length:48},(_,i)=>({
        x:Math.random()*W,y:Math.random()*H,
        vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.16,
        r:Math.random()*1.1+.3,
        c:i%4===0?"200,255,0":i%4===1?"0,212,255":i%4===2?"155,95,255":"242,240,255",
        a:Math.random()*.08+.02,
      }));
      gs.current = Array.from({length:18},()=>({
        x:Math.random()*W,y:Math.random()*H,
        vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.1,
        ch:GLYPHS[Math.floor(Math.random()*GLYPHS.length)],
        sz:Math.random()*8+8,a:Math.random()*.05+.015,
        phase:Math.random()*Math.PI*2,
      }));
    };

    const resize = () => {
      cv.width  = window.innerWidth;
      cv.height = Math.max(document.body.scrollHeight,window.innerHeight,800);
      rebuild(cv.width,cv.height);
    };

    const draw = () => {
      t.current += .005;
      const W=cv.width,H=cv.height;
      const cmx=mx.current,cmy=my.current+window.scrollY;
      const light=document.body.classList.contains("light");
      ctx.clearRect(0,0,W,H);

      // nebulae
      neb.current.forEach(n=>{
        n.x+=n.vx;n.y+=n.vy;
        if(n.x<0||n.x>1)n.vx*=-1;if(n.y<0||n.y>1)n.vy*=-1;
        const nx=n.x*W,ny=n.y*H;
        const g=ctx.createRadialGradient(nx,ny,0,nx,ny,n.r);
        const al=light?n.a*.45:n.a;
        g.addColorStop(0,`rgba(${n.c},${al})`);
        g.addColorStop(.5,`rgba(${n.c},${al*.4})`);
        g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(nx-n.r,ny-n.r,n.r*2,n.r*2);
      });

      // cursor aurora
      if(cmx>0){
        const g=ctx.createRadialGradient(cmx,cmy,0,cmx,cmy,260);
        g.addColorStop(0,`rgba(200,255,0,${light?.025:.05})`);
        g.addColorStop(.4,`rgba(0,212,255,${light?.012:.025})`);
        g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(cmx-260,cmy-260,520,520);
      }

      // warped grid
      const cw=W/COLS,ch=H/ROWS;
      for(let r=0;r<=ROWS;r++){
        for(let c=0;c<=COLS;c++){
          const bx=c*cw,by=r*ch;
          const wx=Math.sin(c*.28+t.current)*Math.cos(r*.22+t.current*.6)*8;
          const wy=Math.cos(c*.22+t.current*.8)*Math.sin(r*.28+t.current*.5)*8;
          const dx=bx-cmx,dy=by-cmy;
          const dist=Math.sqrt(dx*dx+dy*dy);
          const push=dist<180?((180-dist)/180)*20:0;
          const ang=Math.atan2(dy,dx);
          const px=bx+Math.cos(ang)*push*.3+wx;
          const py=by+Math.sin(ang)*push*.3+wy;
          const prox=Math.max(0,1-dist/220);
          if(c<COLS){ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo((c+1)*cw+wx,py);ctx.strokeStyle=`rgba(${light?"46,125,0":"200,255,0"},${(.018+prox*.055)*(light?.7:1)})`;ctx.lineWidth=.4;ctx.stroke();}
          if(r<ROWS){ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px,py+ch+wy);ctx.strokeStyle=`rgba(${light?"0,85,170":"0,212,255"},${(.013+prox*.04)*(light?.7:1)})`;ctx.lineWidth=.4;ctx.stroke();}
          const da=.04+prox*.38;
          ctx.beginPath();ctx.arc(px,py,prox>.35?1.8:.6,0,Math.PI*2);
          ctx.fillStyle=prox>.3?`rgba(${light?"46,125,0":"200,255,0"},${da*(light?.7:1)})`:`rgba(${light?"10,14,26":"242,240,255"},${da*.2})`;
          ctx.fill();
        }
      }

      // particles
      ps.current.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.c},${p.a*(light?.45:1)})`;ctx.fill();
      });

      // glyphs
      gs.current.forEach(g2=>{
        g2.x+=g2.vx;g2.y+=g2.vy+Math.sin(t.current*1.2+g2.phase)*.08;
        if(g2.x<0)g2.x=W;if(g2.x>W)g2.x=0;if(g2.y<0)g2.y=H;if(g2.y>H)g2.y=0;
        const pulse=.5+.5*Math.sin(t.current*1.5+g2.phase);
        ctx.font=`${g2.sz}px 'Space Mono',monospace`;
        ctx.fillStyle=`rgba(${light?"46,125,0":"200,255,0"},${g2.a*(light?.5:1)*(0.6+pulse*.4)})`;
        ctx.fillText(g2.ch,g2.x,g2.y);
      });

      raf.current=requestAnimationFrame(draw);
    };

    const onMouse=(e:MouseEvent)=>{mx.current=e.clientX;my.current=e.clientY;};
    const obs=new MutationObserver(()=>{
      const h=Math.max(document.body.scrollHeight,window.innerHeight,800);
      if(cv.height!==h)cv.height=h;
    });

    resize();draw();
    window.addEventListener("mousemove",onMouse);
    window.addEventListener("resize",resize);
    obs.observe(document.body,{subtree:true,childList:true,attributes:true});

    return ()=>{
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove",onMouse);
      window.removeEventListener("resize",resize);
      obs.disconnect();
    };
  },[]);

  return <canvas ref={cvRef} style={{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;
}
