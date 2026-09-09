'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionOverlay } from '@/components/sections/section-overlay';
import { contentAccounts } from './content-data';


function PaperCorner() {
  return (
    <span className="content-paper-corner" aria-hidden="true">
      <svg 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 48L48 48L48 0C48 26.5097 26.5097 48 0 48Z" 
          fill="rgba(230,220,205,0.35)" 
        />

        <path 
          d="M3 45C3 26.2223 18.2223 11 37 11" 
          stroke="rgba(210,200,185,0.3)" 
          strokeWidth="1" 
          fill="none" 
        />

      </svg>
    </span>
  );
}



function StatItem({
  value,
  label
}:{
  value:string;
  label:string;
}){

  return (
    <div className="content-stat">

      <span className="content-stat-value">
        {value}
      </span>

      <span className="content-stat-label">
        {label}
      </span>

    </div>
  )

}





function ViralPostCard({
 post
}:{
 post:(typeof contentAccounts)[number]['posts'][number]
}){


return (

<a
className="viral-post-card"
href={post.url}
target="_blank"
rel="noopener noreferrer"
aria-label={post.title}
>


<div className="viral-post-image-wrap">


<img

src={post.cover}

alt={post.title}

loading="lazy"

onError={(e)=>{

(e.target as HTMLImageElement)
.style.opacity="0"

}}

/>


</div>


</a>

)


}


function ViralPostScroller({
  posts,
  profileUrl,
}: {
  posts: (typeof contentAccounts)[number]['posts'];
  profileUrl: string;
}) {
  return (
    <>
      <div className="content-viral-grid">
        {posts.slice(0, 2).map((post, index) => (
          <ViralPostCard
            key={index}
            post={post}
          />
        ))}
      </div>

      <a
        className="content-view-more"
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        查看更多 →
      </a>
    </>
  );
}







export function ContentBoard({
open,
onClose
}:{
open:boolean;
onClose:()=>void;
}){


const cardsRef = useRef<HTMLDivElement>(null);



useEffect(()=>{


if(!open || !cardsRef.current)
return;



const cards =
cardsRef.current.querySelectorAll('.flip-card');



cards.forEach((card,i)=>{


(card as HTMLElement).style.opacity="0";

(card as HTMLElement).style.transform=
"translateY(16px)";


(card as HTMLElement).style.transition=
"opacity 420ms ease, transform 420ms ease";



setTimeout(()=>{


(card as HTMLElement).style.opacity="1";

(card as HTMLElement).style.transform=
"translateY(0)";


},120+i*100)



})



},[open])





return (

<SectionOverlay 
open={open}
onClose={onClose}
label="个人自媒体"
>



<div className="content-board">





<header className="content-header">


<div className="content-header-left">


<h1 className="content-title-block">

<span className="content-title-en">CONTENT CREATOR</span>

<span className="content-hand-underline"/>

<span className="content-title-cn">个人自媒体</span>

</h1>


</div>




<p className="content-quote">


<span>
“
</span>


从品牌内容到自己的账号，
我一直在用真实发布验证内容判断。


<span>
”
</span>


</p>



</header>







<div 
className="content-cards"
ref={cardsRef}
>



{

contentAccounts.map((account)=>(


<article

key={account.id}

className="
content-account-card 
flip-card
"

aria-label={account.name}

>



<div className="flip-card-inner">







{/* 正面 */}

<div className="flip-card-front">


<span
  className="content-card-number-corner"
>
  {account.number}
</span>


<PaperCorner/>




<p className="content-card-label">


<span className="content-card-en">

{account.labelEn}

</span>


</p>







<a

className="content-avatar-wrap"

href={account.profileUrl}

target="_blank"

rel="noopener noreferrer"

>


<img

src={account.avatar}

alt={account.name}

loading="lazy"

/>


</a>







<h2>


{account.name}



<span

className="content-card-title-underline"

style={{
backgroundColor:account.accentColor
}}

/>



</h2>







<p className="content-card-desc">


{

account.description.map((line,i)=>(

<span key={i}>

{line}

</span>


))

}



</p>







<div className="content-stats-row">


<StatItem

value={account.followers}

label="粉丝"

/>


<StatItem

value={account.engagement}

label="累计互动"

/>


</div>


<div className="content-card-tags" aria-label={`${account.name}内容标签`}>
{
account.tags.map((tag)=>(
<span
key={tag}
className="content-card-tag"
style={{
borderColor:account.accentColor,
color:account.accentColor
}}
>
{tag}
</span>
))
}
</div>





</div>













{/* 背面 */}


<div className="flip-card-back">





<p className="flip-back-number">


<span className="flip-back-num">{account.number}</span>


<span className="flip-back-slash">/</span>


<span className="flip-back-label">代表爆文</span>


<span className="flip-back-arrow" aria-hidden="true">→</span>

</p><ViralPostScroller posts={account.posts} profileUrl={account.profileUrl}/>

</div>







</div>



</article>



))


}



</div>






</div>



</SectionOverlay>


)


}
