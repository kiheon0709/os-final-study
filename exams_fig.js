/* ===================================================================
   기출 문제용 그림(figure) 생성 함수 모음
   - 복원 불가/추정 그림은 [추론] 또는 (재구성) 표기
   - 모두 inline SVG / HTML 문자열 반환 → viewExam 의 .q-fig 에 삽입
   - exams_data.js 보다 먼저 로드되어야 함 (함수 참조)
   - 색: 사이트 블루 팔레트(var(--blue) 등) 사용
=================================================================== */

/* 공통 헬퍼 — 모든 figsvg 에 화살표 마커 defs 주입 */
var _FGDEFS='<defs><marker id="fgar" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#2563eb"/></marker></defs>';
function _figWrap(label, inner){
  inner=inner.replace(/(<svg[^>]*>)/,'$1'+_FGDEFS);
  return '<div class="q-fig"><div class="q-fig-cap">'+ICON.img+' '+label+'</div>'+inner+'</div>';
}

/* ---- 7-state 프로세스 상태도 ---- */
function examFig7State(){
  const s =
  '<svg viewBox="0 0 720 320" class="figsvg" role="img" aria-label="7-state process diagram">'+
  _box(300,10,120,38,'New')+
  _box(300,90,120,38,'Ready')+
  _box(300,170,120,38,'Running')+
  _box(300,250,120,38,'Blocked')+
  _box(540,90,150,38,'Ready-suspend')+
  _box(540,250,150,38,'Blocked-suspend')+
  _box(110,170,120,38,'Terminate')+
  // arrows
  _arr(360,48,360,90,'admit (long-term)')+
  _arr(360,128,360,170,'dispatch (short)')+
  _arr(345,170,345,128,'')+ // running->ready (timeout) left
  _arr(380,208,380,250,'I/O wait')+
  _arr(415,250,415,208,'')+ // blocked->ready event
  _arr(300,189,230,189,'exit')+
  // suspend swaps
  _arr(420,109,540,109,'suspend(swap-out)')+
  _arr(540,128,420,128,'activate(swap-in)')+
  _arr(420,269,540,269,'suspend(swap-out)')+
  _arr(560,250,560,128,'event occurs')+
  '<text x="350" y="150" class="figlbl">timeout</text>'+
  '</svg>'+
  '<div class="fig-note">기본 5상태(New·Ready·Running·Blocked·Terminate)+Suspend 2개. <b>메모리 변동</b>: New→Ready(할당), suspend(회수), activate(할당), →Terminate(회수). long=admit, medium=swap, short=dispatch.</div>';
  return _figWrap('7-state 프로세스 상태도 (재구성)', s);
}

/* ---- 파일 접근 순서 (A.hwp) ---- */
function examFigFileAccess(){
  const cells=['directory','FCB list','data blocks','super block','data blocks','FCB list'];
  const sub=['이름→inode번호','inode 위치·크기','기존 내용 읽기','빈 블록 할당','5KB 쓰기','메타 갱신'];
  let x=8, inner='<svg viewBox="0 0 720 110" class="figsvg">';
  cells.forEach((c,i)=>{
    inner+=_box(x,18,108,40,c)+'<text x="'+(x+54)+'" y="74" class="figsub">'+sub[i]+'</text>';
    if(i<cells.length-1) inner+=_arrh(x+108,38,x+118,38);
    x+=118;
  });
  inner+='</svg>';
  inner+='<div class="fig-note">빈칸(②④⑤) = <b>FCB list / super block / data blocks</b>. super block은 추가 5KB를 담을 <b>빈 data block 할당</b> 때문에 접근.</div>';
  return _figWrap('A.hwp 파일 접근 순서 (재구성)', inner);
}

/* ---- inode 트리 (2025 5번) ---- */
function examFigInodeTree(){
  const s=
  '<svg viewBox="0 0 720 360" class="figsvg">'+
  _box(300,10,130,40,'inode ( ① )')+
  _arr(330,50,150,90,'')+ _arr(365,50,365,90,'')+ _arr(400,50,560,90,'')+
  _box(90,90,120,36,'( 3 )')+
  _box(305,90,120,36,'( ⑩ )')+
  _box(500,90,120,36,'( 9 )')+
  _arr(150,126,120,170,'')+ _arr(150,126,260,170,'')+
  _box(60,170,110,34,'inode 2')+
  _box(220,170,110,34,'( 17 )')+
  _box(380,170,110,34,'( 25 )')+
  _box(40,230,150,80,'disk block #( ⑤ )\\n80 | ... | 550')+
  _box(220,230,150,80,'inode ( ⑥ )\\nL.time | direct→')+
  _box(420,230,160,80,'disk block #550\\n3 | 10 | 12 | ...')+
  '</svg>'+
  '<div class="fig-note">손글씨 단서: <b>한 인덱스 블록당 주소 = 2048/4 = 512개</b> (8/2048 메모). 화살표를 따라가며 ①·⑤·⑥·⑩ 등 빈 10칸의 블록/inode 번호를 채우는 문제. <span style="color:var(--amber)">원본 화질 한계로 일부 값은 직접 추적 필요.</span></div>';
  return _figWrap('inode → data block 트리 (원본 기반 재구성)', s);
}

/* ---- inode 주소지정 구조 (direct/single/double/triple) ---- */
function examFigInodeAddr(){
  const s=
  '<svg viewBox="0 0 720 300" class="figsvg">'+
  _box(20,20,150,260,'inode (FCB)')+
  '<text x="30" y="55" class="figsub">file attributes</text>'+
  _box(40,70,110,18,'direct 0')+ _box(40,92,110,18,'direct 1')+
  '<text x="95" y="120" class="figlbl">⋮ (10개)</text>'+
  _box(40,126,110,18,'direct 9')+
  _box(40,156,110,20,'single indirect')+
  _box(40,182,110,20,'double indirect')+
  _box(40,208,110,20,'triple indirect')+
  // single
  _arrh(150,166,250,166)+ _box(250,150,120,34,'index block\\n(512 slots)')+ _arrh(370,167,470,167)+_box(470,150,90,34,'data')+
  // double
  _arrh(150,192,250,210)+ _box(250,196,120,30,'index')+_arrh(370,211,440,211)+_box(440,196,90,30,'index')+_arrh(530,211,600,211)+_box(600,196,90,30,'data')+
  // triple
  _arrh(150,218,250,255)+ _box(250,240,90,28,'index')+_arrh(340,254,400,254)+_box(400,240,90,28,'index')+_arrh(490,254,540,254)+_box(540,240,80,28,'index→data')+
  '</svg>'+
  '<div class="fig-note">한 인덱스 블록당 주소 개수 = <b>block size ÷ 주소크기</b>. single=인덱스1→데이터, double=인덱스→인덱스→데이터, triple=인덱스×3→데이터. 단계마다 ×(슬롯 수).</div>';
  return _figWrap('inode 주소지정 구조 (direct/indirect)', s);
}

/* ---- TLB + 2단계 페이징 (2025 6번, 24bit) ---- */
function examFigTLB25(){
  const s=
  '<svg viewBox="0 0 720 240" class="figsvg">'+
  '<text x="10" y="22" class="figsub">virtual address (24 bit)</text>'+
  _box(20,30,90,34,'p1 (5)')+_box(110,30,140,34,'p2 (8)')+_box(250,30,180,34,'page offset (11)')+
  _arr(75,64,75,110,'')+_arr(180,64,180,110,'')+
  _box(20,110,230,34,'page number → TLB 입력 13 bit')+
  _arrh(250,127,360,127)+
  _box(360,110,150,34,'TLB (tag|frame|valid)')+
  _arrh(510,127,600,127)+
  _box(600,110,100,34,'frame=111')+
  _box(250,178,180,34,'offset 그대로 복사')+
  _arr(340,144,340,178,'')+
  _box(600,178,100,34,'value 550')+
  '</svg>'+
  '<div class="fig-note">page size 2048=2¹¹→<b>offset 11</b>. PTE 8byte → 한 페이지에 2048/8=256=2⁸ → <b>p2=8</b>. p1=24−11−8=<b>5</b>. TLB 입력 = page number = 5+8 = <b>13bit</b>.</div>';
  return _figWrap('TLB + 2단계 페이징 주소변환 (24bit, 재구성)', s);
}

/* ---- 2단계 페이징 (2023 4번) ---- */
function examFig2LevelPaging23(){
  const s=
  '<svg viewBox="0 0 720 220" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address (32 bit)</text>'+
  _box(20,28,120,34,'(7) =2')+_box(140,28,160,34,'(12) =3')+_box(300,28,200,34,'page offset (13)')+
  _arr(80,62,80,100,'')+
  _box(20,100,150,36,'outer page table\\n[2] = 41')+
  _arrh(170,118,250,118)+
  _box(250,100,150,36,'page table\\n[3] = 94')+
  _arrh(400,118,480,118)+
  _box(480,100,120,36,'frame = 94')+
  _box(300,165,200,32,'offset (max 8191)')+
  _arr(400,62,400,165,'')+
  '</svg>'+
  '<div class="fig-note">offset 13bit → page size 8KB. 페이지 내 최대 offset = 2¹³−1 = <b>8191</b>. (1)offset (2)41 (3)outer page (4)94 (5)8191.</div>';
  return _figWrap('2단계 페이징 변환 (2023, 재구성)', s);
}

/* ---- 2단계 페이징 + TLB (2021 4번) ---- */
function examFig2LevelTLB21(){
  const s=
  '<svg viewBox="0 0 720 250" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address</text>'+
  _box(20,28,110,34,'p1 (8)')+_box(130,28,150,34,'p2 (11)')+_box(280,28,180,34,'offset (13)')+
  _box(20,90,160,34,'PTBR = 200')+
  _arrh(180,107,250,107)+
  _box(250,90,170,36,'outer page table\\n(frame 200) [0]=85')+
  _arrh(420,108,500,108)+
  _box(500,90,170,36,'page table\\n(frame 85) [6]=10')+
  _box(250,165,170,34,'frame number = 10')+
  _arr(585,126,335,165,'')+
  _box(250,205,420,30,'TLB: (page#→10), 입력 19bit · hit 시 테이블 생략')+
  '</svg>'+
  '<div class="fig-note">PTBR(200)→outer[0]=85→page table[6]=10 → frame 10. TLB hit이면 2단계 테이블 건너뜀. TLB 입력 = page number = 8+11 = <b>19bit</b>.</div>';
  return _figWrap('2단계 페이징 + TLB (2021, 재구성)', s);
}

/* ---- 2단계 페이징 비트 구성 (2020 6번) ---- */
function examFig2LevelPaging20(){
  const s=
  '<svg viewBox="0 0 720 130" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address (32 bit)</text>'+
  _box(20,30,150,40,'p1 (8 bit)\\nouter index')+
  _box(170,30,200,40,'p2 (11 bit)\\npage table index')+
  _box(370,30,260,40,'page offset (13 bit)')+
  '</svg>'+
  '<div class="fig-note">page size 8KB=2¹³ → offset 13. PTE 4byte → 한 페이지 8KB/4=2¹¹ → p2=11. p1 = 32−13−11 = <b>8</b>.</div>';
  return _figWrap('2단계 페이징 비트 구성 (2020)', s);
}

/* ---- TLB (2019 4번, 16KB page) ---- */
function examFigTLB19(){
  const s=
  '<svg viewBox="0 0 720 130" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address (32 bit)</text>'+
  _box(20,30,140,40,'p1 (6 bit)')+
  _box(160,30,200,40,'p2 (12 bit)')+
  _box(360,30,270,40,'page offset (14 bit)')+
  '</svg>'+
  '<div class="fig-note">page size 16KB=2¹⁴ → offset 14. PTE 4byte → 한 페이지 16KB/4=2¹² → p2=12. p1=32−14−12=<b>6</b>. EAT=(0.05+1)×0.9+(0.05+3)×0.1=<b>1.25μs</b>.</div>';
  return _figWrap('TLB 2단계 페이징 (2019, 재구성)', s);
}

/* ---- 페이지 변환 (2020연계 6번, 16bit) ---- */
function examFigPageTrans20y(){
  const s=
  '<svg viewBox="0 0 720 200" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical = 0010 0110 0001 0110 (16bit)</text>'+
  _box(20,30,110,34,'page# 00100')+_box(130,30,260,34,'offset 110 0001 0110')+
  _arr(75,64,75,100,'')+
  _box(20,100,160,90,'page table\\n0→4  1→15  2→6\\n3→27  4→3 ★  5→14  6→10')+
  _arrh(180,120,300,120)+
  _box(300,100,120,34,'frame 00011')+
  _box(130,150,260,30,'offset 그대로')+
  _arr(260,64,260,150,'')+
  _box(440,100,250,34,'physical = 00011 110 0001 0110')+
  _arr(420,117,440,117,'')+
  '</svg>'+
  '<div class="fig-note">page size 2048=2¹¹→offset 11, page# 5bit. page#=00100=4 → table[4]=3=00011. <b>offset은 유지, page#만 frame#으로 교체</b>.</div>';
  return _figWrap('페이징 주소변환 (2020연계, 재구성)', s);
}

/* ---- I/O 비교표 (2020 4번) ---- */
function examFigIOTable(){
  const rows=[
    ['항목','Programmed I/O','Interrupt-driven','DMA'],
    ['I/O 개시 후 context switch','X','O','O'],
    ['I/O 완료 후 interrupt','X','O','O'],
    ['완료로 인한 context switch','X','O','O'],
    ['Busy waiting 이용','O','X','X'],
    ['데이터 저장을 CPU가 담당','O','O','X'],
    ['Device driver 필요','O','O','O'],
    ['최적 사례','②빠른','③느린','①다량'],
  ];
  return _figWrap('I/O 방식 비교표 (정답 포함)', _table(rows,true));
}

/* ---- Grouping (2023 2번) ---- */
function examFigGrouping23(){
  const s=
  '<svg viewBox="0 0 720 190" class="figsvg">'+
  _box(20,20,680,34,'Super block:  107  109  ...  112')+
  _arr(60,54,60,86,'')+
  _box(20,86,680,40,'Data block #107:  210  208  205  200  195  190  150  116  113   →(다음그룹) ...')+
  _arr(640,126,640,150,'')+
  _box(20,150,680,30,'Data block #210:  312 307 305 300 299 298 297 290 215 214 213 ...')+
  '</svg>'+
  '<div class="fig-note">grouping: 인덱스 블록의 마지막 칸이 <b>다음 그룹 인덱스 블록</b>을 가리킴. 3개 할당 후 → <b>112 제거, 107 할당돼 사라짐, 210이 super block 다음으로 승격</b>.</div>';
  return _figWrap('Grouping 빈 블록 관리 (2023)', s);
}

/* ---- 할당 비교표 (2020연계 3번) ---- */
function examFigAllocTable(){
  const rows=[
    ['항목','Contiguous','Indexed'],
    ['file size 증가','어려움','쉬움'],
    ['External fragmentation','발생(Yes)','없음(No)'],
    ['안정성','좋음','상대적'],
    ['필요 data block 공간','소','다(인덱스블록)'],
    ['순차 access 속도','빠름','상대적'],
  ];
  return _figWrap('Contiguous vs Indexed 비교 (정답 포함)', _table(rows,true));
}

/* ---- 페이지 교체 표 (2019 6번) ---- */
function examFigPageReplace(){
  const rows=[
    ['Page','Load time','최근 access','Ref bit','Modified'],
    ['0','110','260','1','0'],
    ['1','210','240','0','0'],
    ['2','126','230','0','0'],
    ['3','165','264','1','1'],
  ];
  return _figWrap('페이지 프레임 정보표', _table(rows,false)+
    '<div class="fig-note">LRU=최근access 최소(P2). Second chance(0번부터)=ref 0 첫 만남(P1). Enhanced=(ref,mod) (0,0) 우선·0번부터(P1).</div>');
}

/* ---- 스케줄링 입력표 (2019 8번) ---- */
function examFigSched19(){
  const rows=[
    ['Process','P1','P2','P3','P4','P5'],
    ['Arrival','0','3','4','4','5'],
    ['Service','2','6','3','2','6'],
    ['Priority','5','3','1','2','4'],
  ];
  return _figWrap('프로세스 도착/서비스/우선순위', _table(rows,false)+
    '<div class="fig-note">turnaround=완료−도착, waiting=turnaround−service. ①RR(TQ=2) ②Priority(preemptive, 숫자 작을수록 높음).</div>');
}

/* ===== 저수준 SVG 헬퍼 ===== */
function _box(x,y,w,h,txt){
  const lines=String(txt).split('\\n');
  let t='';
  const cy=y+h/2 - (lines.length-1)*7 + 4;
  lines.forEach((ln,i)=>{ t+='<text x="'+(x+w/2)+'" y="'+(cy+i*14)+'" class="figboxtxt">'+ln+'</text>'; });
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" class="figbox"/>'+t;
}
function _arr(x1,y1,x2,y2,lbl){
  let s='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="figarr" marker-end="url(#fgar)"/>';
  if(lbl) s+='<text x="'+((x1+x2)/2)+'" y="'+((y1+y2)/2-3)+'" class="figlbl">'+lbl+'</text>';
  return s;
}
function _arrh(x1,y1,x2,y2){ return _arr(x1,y1,x2,y2,''); }
function _table(rows,colorAns){
  let h='<table class="fig-table">';
  rows.forEach((r,ri)=>{
    h+='<tr>';
    r.forEach((c,ci)=>{
      if(ri===0||ci===0) h+='<th>'+c+'</th>';
      else{
        const ans=colorAns&&(c==='O'||c==='X'||/[①②③]/.test(c)||['어려움','쉬움','발생(Yes)','없음(No)','빠름','상대적','소','다(인덱스블록)','좋음'].includes(c));
        h+='<td'+(ans?' class="fig-ans"':'')+'>'+c+'</td>';
      }
    });
    h+='</tr>';
  });
  h+='</table>';
  return h;
}
