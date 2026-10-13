const members = [
 {id:1,name:"Jordan Lee",initials:"JL",color:"green",role:"Brand & web designer",category:"Design",rating:4.9,reviews:18,swaps:12,verified:true,bio:"I help small ideas turn into thoughtful, polished brands and websites.",skills:["Web design","Brand identity","Figma"],wants:"Product photography or SEO help",offer:"Website or brand identity design"},
 {id:2,name:"Maya Patel",initials:"MP",color:"peach",role:"Photographer & visual storyteller",category:"Design",rating:5.0,reviews:14,swaps:9,verified:true,bio:"Portraits, product photos, and visual stories with a warm, natural feel.",skills:["Photography","Photo editing","Lightroom"],wants:"Portfolio website or copywriting",offer:"Product photos or a portrait session"},
 {id:3,name:"Alex Rivera",initials:"AR",color:"lilac",role:"Full-stack developer",category:"Tech",rating:4.8,reviews:22,swaps:16,verified:true,bio:"I build fast, accessible websites and help people bring useful ideas online.",skills:["JavaScript","Web apps","Automation"],wants:"Logo design or language tutoring",offer:"Website development or code review"},
 {id:4,name:"Sam Williams",initials:"SW",color:"blue",role:"Writer & editor",category:"Writing",rating:4.9,reviews:11,swaps:8,verified:true,bio:"Clear writing for websites, newsletters, and projects that need a story.",skills:["Copywriting","Editing","SEO"],wants:"Brand design or spreadsheet help",offer:"Website copy or editing"},
 {id:5,name:"Avery Chen",initials:"AC",color:"yellow",role:"Tutor & learning coach",category:"Learning",rating:5.0,reviews:17,swaps:13,verified:true,bio:"Patient, practical help with math, study systems, and learning new skills.",skills:["Math tutoring","Study skills","Mandarin"],wants:"Graphic design or video editing",offer:"Tutoring or study planning"},
 {id:6,name:"Taylor Brooks",initials:"TB",color:"rose",role:"Small business strategist",category:"Business",rating:4.7,reviews:9,swaps:6,verified:false,bio:"Helping independent creators organize their offer and find their next customer.",skills:["Marketing","Business plans","Social media"],wants:"Website improvements or photography",offer:"Marketing review or launch plan"},
 {id:7,name:"Morgan Ellis",initials:"ME",color:"green",role:"Video editor & creator",category:"Design",rating:4.9,reviews:20,swaps:15,verified:true,bio:"Short-form edits, pacing, captions, and storytelling for creator content.",skills:["Video editing","Shorts","Motion graphics"],wants:"Thumbnail design or copywriting",offer:"Short-form video editing"},
 {id:8,name:"Riley James",initials:"RJ",color:"blue",role:"Data & spreadsheet specialist",category:"Tech",rating:4.8,reviews:12,swaps:7,verified:false,bio:"I turn messy spreadsheets into simple dashboards and useful reports.",skills:["Excel","Dashboards","Data cleanup"],wants:"Website design or presentation help",offer:"Spreadsheet automation"},
 {id:9,name:"Casey Nguyen",initials:"CN",color:"lilac",role:"Career & portfolio mentor",category:"Business",rating:5.0,reviews:8,swaps:5,verified:true,bio:"Friendly feedback on portfolios, resumes, and presenting your work clearly.",skills:["Portfolio reviews","Resumes","Interview prep"],wants:"Photo editing or web design",offer:"Portfolio feedback or resume review"}
];
let selectedCategory = "All";
let searchTerm = "";
let showAll = false;
const saved = new Set();
const grid = document.getElementById("memberGrid");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const swapDialog = document.getElementById("swapDialog");
const infoDialog = document.getElementById("infoDialog");
const toast = document.getElementById("toast");
let toastTimer;
function safeText(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function filteredMembers(){
 let list = members.filter(m=>{
  const matchesCategory = selectedCategory==="All" || m.category===selectedCategory || m.skills.some(s=>s.toLowerCase().includes(selectedCategory.toLowerCase()));
  const haystack = [m.name,m.role,m.bio,m.category,m.wants,m.offer,...m.skills].join(" ").toLowerCase();
  return matchesCategory && haystack.includes(searchTerm.toLowerCase());
 });
 if(sortSelect.value==="rating") list.sort((a,b)=>b.rating-a.rating || b.reviews-a.reviews);
 if(sortSelect.value==="swaps") list.sort((a,b)=>b.swaps-a.swaps);
 if(!showAll) list=list.slice(0,6);
 return list;
}
function renderMembers(){
 const list=filteredMembers();
 grid.innerHTML=list.map(m=>`<article class="member-card">
  <div class="card-top"><div class="member-avatar ${m.color}">${safeText(m.initials)}</div><button class="save-btn ${saved.has(m.id)?"saved":""}" data-save="${m.id}" aria-label="${saved.has(m.id)?"Unsave":"Save"} ${safeText(m.name)}" title="${saved.has(m.id)?"Saved":"Save profile"}">${saved.has(m.id)?"♥":"♡"}</button></div>
  <div class="member-name-row"><h3>${safeText(m.name)}</h3>${m.verified?'<span class="verified-mark" title="Sample profile badge">✓</span>':""}</div><div class="member-role">${safeText(m.role)}</div>
  <p class="member-bio">${safeText(m.bio)}</p><div class="skill-label">SKILLS TO SHARE</div><div class="skill-tags">${m.skills.map(s=>`<span class="skill-tag">${safeText(s)}</span>`).join("")}</div>
  <div class="wants-line"><span>↗</span><div><b>Looking for:</b> ${safeText(m.wants)}</div></div>
  <div class="card-bottom"><div class="rating-wrap"><span class="rating-star">★</span> ${m.rating.toFixed(1)} <small>(${m.reviews})</small></div><span class="swap-count">${m.swaps} sample swaps</span></div>
  <div class="card-actions"><button class="btn btn-soft" data-profile="${m.id}">View profile</button><button class="btn btn-dark" data-propose="${m.id}">Propose a swap ↗</button></div>
 </article>`).join("");
 count.textContent=`${list.length} ${list.length===1?"member":"members"}`;
 empty.classList.toggle("hidden",list.length!==0);
 grid.classList.toggle("hidden",list.length===0);
 document.getElementById("loadMoreBtn").classList.toggle("hidden",showAll || (list.length<6 && !searchTerm && selectedCategory==="All"));
}
function showToast(message){
 toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>toast.classList.remove("show"),2500);
}
function openInfo(title){
 document.getElementById("infoTitle").textContent=title;
 infoDialog.showModal();
}
function openProposal(memberId){
 const member=members.find(m=>m.id===memberId);if(!member)return;
 document.getElementById("modalTitle").textContent=`Swap with ${member.name.split(" ")[0]}`;
 document.getElementById("modalDescription").textContent=`They can offer ${member.offer.toLowerCase()}. Share what you can bring to the table.`;
 document.getElementById("swapForm").dataset.memberId=String(memberId);
 document.getElementById("swapForm").classList.remove("hidden");
 document.getElementById("proposalSuccess").classList.add("hidden");
 document.getElementById("swapForm").reset();
 swapDialog.showModal();
}
document.getElementById("categoryFilters").addEventListener("click",e=>{
 const btn=e.target.closest("[data-category]");if(!btn)return;
 selectedCategory=btn.dataset.category;showAll=false;
 document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b===btn));
 renderMembers();
});
searchInput.addEventListener("input",()=>{searchTerm=searchInput.value.trim();showAll=true;renderMembers();});
sortSelect.addEventListener("change",renderMembers);
document.getElementById("resetFilters").addEventListener("click",resetFilters);
document.getElementById("emptyReset").addEventListener("click",resetFilters);
function resetFilters(){selectedCategory="All";searchTerm="";showAll=false;searchInput.value="";sortSelect.value="recommended";document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));renderMembers();}
document.getElementById("loadMoreBtn").addEventListener("click",()=>{showAll=true;renderMembers();showToast("Showing all sample members.");});
grid.addEventListener("click",e=>{
 const save=e.target.closest("[data-save]");
 const propose=e.target.closest("[data-propose]");
 const profile=e.target.closest("[data-profile]");
 if(save){const id=Number(save.dataset.save);if(saved.has(id)){saved.delete(id);showToast("Profile removed from saved list.");}else{saved.add(id);showToast("Profile saved for this session.");}renderMembers();return;}
 if(propose){openProposal(Number(propose.dataset.propose));return;}
 if(profile){const m=members.find(x=>x.id===Number(profile.dataset.profile));if(m)openInfo(`${m.name} · Profile preview`);}
});
document.getElementById("swapForm").addEventListener("submit",e=>{
 e.preventDefault();const form=e.currentTarget;const data=new FormData(form);const member=members.find(m=>m.id===Number(form.dataset.memberId));
 document.getElementById("successSummary").textContent=`Your draft for ${member?member.name:"this member"} is ready. You offered ${data.get("offer")} in exchange for ${data.get("want")}.`;
 form.classList.add("hidden");document.getElementById("proposalSuccess").classList.remove("hidden");
});
document.getElementById("closeSuccess").addEventListener("click",()=>swapDialog.close());
document.getElementById("joinBtn").addEventListener("click",()=>openInfo("Create your SkillSwap profile"));
document.getElementById("ctaJoinBtn").addEventListener("click",()=>openInfo("Join the SkillSwap community"));
document.getElementById("signInBtn").addEventListener("click",()=>openInfo("Sign in to SkillSwap"));
document.getElementById("closeInfo").addEventListener("click",()=>infoDialog.close());
document.getElementById("howBtn").addEventListener("click",()=>document.getElementById("how-it-works").scrollIntoView({behavior:"smooth"}));
document.getElementById("mobileMenu").addEventListener("click",()=>document.querySelector(".main-nav").classList.toggle("open"));
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".main-nav").classList.remove("open")));
document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});}));
renderMembers();