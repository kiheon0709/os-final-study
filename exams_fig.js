/* ===================================================================
   기출 문제용 그림(figure) 생성 함수 모음
   - qfig 계열: 문제에 표시(빈칸/주어진 데이터)
   - afig 계열: 정답 해설에서만 표시(답이 채워진 그림/표)
   - 모두 inline SVG / HTML 문자열 반환
   - exams_data.js 보다 먼저 로드 (함수 참조)
=================================================================== */

var _FGDEFS='<defs><marker id="fgar" markerWidth="10" markerHeight="10" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2563eb"/></marker></defs>';
function _figWrap(label, inner, tone){
  inner=inner.replace(/(<svg[^>]*>)/,'$1'+_FGDEFS);
  var cls='q-fig'+(tone==='ans'?' q-fig-ans':'');
  var ic=(tone==='ans')?ICON.check:ICON.img;
  return '<div class="'+cls+'"><div class="q-fig-cap">'+ic+' '+label+'</div>'+inner+'</div>';
}

/* ========================= 7-state 상태도 (정답용) ========================= */
/* 겹침 제거: 3열(좌 Terminate / 중 메인체인 / 우 suspend) 격자 배치,
   Ready<->Running 양방향은 좌우로 분리, 라벨도 분리 배치 */
function examFig7StateAns(){
  // 좌표
  var s='<svg viewBox="0 0 760 540" class="figsvg" role="img" aria-label="7-state diagram">';
  // boxes
  s+=_box(300,16,160,46,'New');
  s+=_box(300,150,160,46,'Ready');
  s+=_box(300,300,160,46,'Running');
  s+=_box(300,450,160,46,'Blocked');
  s+=_box(560,150,180,46,'Ready-suspend');
  s+=_box(560,450,180,46,'Blocked-suspend');
  s+=_box(40,300,160,46,'Terminate');
  // New -> Ready
  s+=_vline(380,62,150,'admit','long-term',1);
  // Ready <-> Running (두 줄로 분리: 왼쪽 down=dispatch, 오른쪽 up=timeout)
  s+=_vseg(360,196,360,300,1); s+=_lbl(360,250,'dispatch','left');
  s+=_vseg(400,300,400,196,1); s+=_lbl(400,250,'timeout','right');
  // Running -> Blocked / Blocked -> Running (좌 down=I/O wait, 우 up=event)
  s+=_vseg(360,346,360,450,1); s+=_lbl(360,400,'I/O wait','left');
  s+=_vseg(400,450,400,346,1); s+=_lbl(400,400,'I/O done','right');
  // Running -> Terminate
  s+=_hseg(300,323,200,323,1); s+=_lbl(250,313,'exit','mid');
  // Ready <-> Ready-suspend (위 줄 out, 아래 줄 in)
  s+=_hseg(460,166,560,166,1); s+=_lbl(510,156,'suspend','mid');
  s+=_hseg(560,186,460,186,1); s+=_lbl(510,200,'activate','mid');
  // Blocked -> Blocked-suspend
  s+=_hseg(460,473,560,473,1); s+=_lbl(510,463,'suspend','mid');
  // Blocked-suspend -> Ready-suspend (event occurs, 우측 세로)
  s+=_vseg(650,450,650,196,1); s+=_lbl(650,330,'event','right');
  s+='</svg>';
  s+='<div class="fig-note"><b>메모리 할당/회수가 일어나는 6가지</b> (정답): '+
     '① New→Ready(할당) ② Ready→Ready-suspend(회수) ③ Blocked→Blocked-suspend(회수) '+
     '④ Ready-suspend→Ready(할당) ⑤ Blocked-suspend→Ready-suspend(디스크상 전이) ⑥ Running/Ready/Blocked→Terminate(회수).<br>'+
     'long=admit, medium=suspend/activate(swap), short=dispatch.</div>';
  return _figWrap('7-state 프로세스 상태도 + 메모리 변동 (정답)', s, 'ans');
}
/* 스케줄러 위치까지 표기한 버전 (2020 2번 정답용) */
function examFig7StateSchedAns(){
  var base=examFig7StateAns();
  return base.replace('(정답)</div>','(정답)</div>')
    .replace('long=admit, medium=suspend/activate(swap), short=dispatch.',
      '<b>스케줄러 위치</b>: long-term=New→Ready(admit), medium-term=suspend/activate(swap), short-term=Ready→Running(dispatch).');
}

/* ========================= A.hwp 접근 순서 ========================= */
function examFigFileAccessQ(){  // 문제용: 빈칸
  var cells=['directory','( ? )','data blocks','( ? )','( ? )','FCB list'];
  return _figWrap('A.hwp 접근 순서 (문제)', _flow(cells,[ '','','','','','' ]), 'q');
}
function examFigFileAccessAns(){ // 정답용: 채워짐
  var cells=['directory','FCB list','data blocks','super block','data blocks','FCB list'];
  var sub=['이름→inode번호','inode 위치·크기','기존 내용 읽기','빈 블록 할당','5KB 쓰기','메타 갱신'];
  return _figWrap('A.hwp 접근 순서 (정답)', _flow(cells,sub)+
    '<div class="fig-note">빈칸(②④⑤) = <b>FCB list / super block / data blocks</b>. super block은 추가 5KB를 담을 <b>빈 data block 할당</b> 때문에 접근.</div>','ans');
}

/* ========================= 2025 inode 트리 (실제 구조) ========================= */
/* 디렉토리 구조: / (inode ①=2) → usr(3), mnt(9);  usr(3) → src(10), lib(17), mem(25)
   블록들: inode2[..,80]  diskblk#②[ 2→".." , 2→"." , ③→? , ④→? ]  inode⑤[..,⑥]
           diskblk#550[ ⑦→. , 3→.. , ⑧ , ⑨ , ⑩ ] */
function _inodeTreeSvg(v){ // v: 값 객체(빈칸이면 '①'식 라벨)
  var s='<svg viewBox="0 0 760 600" class="figsvg" role="img" aria-label="inode tree">';
  // 트리 상단
  s+=_node(330,16,150,40,'/  inode ('+v.i1+')','root');
  s+=_node(120,96,110,40,'usr (3)','dir');
  s+=_node(560,96,110,40,'mnt (9)','dir');
  s+=_node(40,176,100,36,'src (10)','dir');
  s+=_node(170,176,100,36,'lib (17)','dir');
  s+=_node(300,176,100,36,'mem (25)','dir');
  // edges
  s+=_edge(380,56,175,96); s+=_edge(420,56,610,96);
  s+=_edge(165,136,90,176); s+=_edge(175,136,220,176); s+=_edge(185,136,345,176);
  // 하단 블록 4개 (테이블형)
  s+=_blk(20,250, 'inode 2', ['i_mode','time','....','80']);
  s+=_blk(200,250,'disk block #('+v.b2+')', ['2  ..','2  .', v.e3+'  ?', v.e4+'  ?'], 1);
  s+=_blk(400,250,'inode ('+v.i5+')', ['i_mode','time','....', v.e6]);
  s+=_blk(560,250,'disk block #550', [v.e7+'  .', '3  ..', v.e8+'  src?', v.e9+'  lib?', v.e10+'  mem?'], 1);
  s+='</svg>';
  return s;
}
function examFigInodeTreeQ(){
  var v={i1:'①',b2:'②',i5:'⑤',e3:'③',e4:'④',e6:'⑥',e7:'⑦',e8:'⑧',e9:'⑨',e10:'⑩'};
  return _figWrap('inode/디렉토리 구조 — 빈칸 ①~⑩ (문제)', _inodeTreeSvg(v)+
    '<div class="fig-note">단서: 한 인덱스 블록당 주소 개수 = 2048 / 4 = <b>512</b>. 디렉토리 데이터 블록에는 <b>(inode번호, 이름)</b> 엔트리가 저장되고, 첫 두 칸은 항상 <b>.</b>(자기)·<b>..</b>(부모)이다. 화살표(이름→inode→데이터블록)를 따라 빈칸을 채우시오.</div>','q');
}
function examFigInodeTreeAns(){
  var v={i1:'2',b2:'3',i5:'3',e3:'10',e4:'17',e6:'550',e7:'3',e8:'10',e9:'17',e10:'25'};
  return _figWrap('inode/디렉토리 구조 — 정답', _inodeTreeSvg(v)+
    '<div class="fig-note"><b>정답</b>: ①2(루트 inode는 항상 2) ②3(usr 디렉토리 블록) ③10(src) ④17(lib) ⑤3(usr의 inode) ⑥550(usr가 가리키는 데이터블록) ⑦3(".") ⑧10(src) ⑨17(lib) ⑩25(mem).<br>'+
    '핵심: 디렉토리도 파일 → 그 데이터블록에 (inode번호,이름) 엔트리. 첫 2칸은 .(자기)·..(부모). 이름→inode번호→inode→데이터블록 순으로 추적.</div>','ans');
}

/* ========================= inode 주소지정(direct/indirect) — 개념도(문제용 보조) ========================= */
function examFigInodeAddr(){
  var s='<svg viewBox="0 0 760 300" class="figsvg">'+
  _box(20,20,150,260,'inode (FCB)')+
  '<text x="95" y="50" class="figsub">file attributes</text>'+
  _row(40,66,110,'direct 0')+_row(40,90,110,'direct 1')+
  '<text x="95" y="122" class="figlbl">⋮ (10개)</text>'+
  _row(40,128,110,'direct 9')+
  _row(40,158,110,'single indirect')+_row(40,184,110,'double indirect')+_row(40,210,110,'triple indirect')+
  // single
  _hseg(150,168,250,168,1)+_box(250,150,120,36,'index (slots)')+_hseg(370,168,470,168,1)+_box(470,150,90,36,'data')+
  // double
  _hseg(150,194,250,210,1)+_box(250,196,110,30,'index')+_hseg(360,211,440,211,1)+_box(440,196,90,30,'index')+_hseg(530,211,610,211,1)+_box(610,196,80,30,'data')+
  // triple
  _hseg(150,220,250,256,1)+_box(250,242,90,28,'index')+_hseg(340,256,400,256,1)+_box(400,242,90,28,'index')+_hseg(490,256,545,256,1)+_box(545,242,90,28,'idx→data')+
  '</svg>'+
  '<div class="fig-note">한 인덱스 블록당 주소 = block size ÷ 주소크기. single=인덱스1→데이터, double=인덱스→인덱스→데이터, triple=인덱스×3→데이터.</div>';
  return _figWrap('inode 주소지정 구조 (참고)', s, 'q');
}

/* ========================= TLB + 2단계 페이징 ========================= */
function examFigTLB25Ans(){
  var s='<svg viewBox="0 0 760 220" class="figsvg">'+
  '<text x="10" y="20" class="figsub">virtual address (24 bit)</text>'+
  _box(20,30,100,38,'p1 (5)')+_box(120,30,150,38,'p2 (8)')+_box(270,30,180,38,'offset (11)')+
  _vseg(80,68,80,108,1)+_vseg(195,68,195,108,1)+
  _box(20,108,250,36,'page number (TLB 입력 13bit)')+
  _hseg(270,126,360,126,1)+_box(360,108,150,36,'TLB tag|frame|valid')+
  _hseg(510,126,600,126,1)+_box(600,108,140,36,'frame = 111')+
  _box(270,170,180,32,'offset 그대로 복사')+ _vseg(360,144,360,170,1)+
  '</svg>'+
  '<div class="fig-note"><b>정답</b>: offset 11(2048=2¹¹), PTE 8byte→2048/8=256=2⁸→p2=8, p1=24−11−8=<b>5</b>. TLB 입력=page number=5+8=<b>13bit</b>. EAT=(0.001+1)×0.85+(0.001+1)×2×0.15. TLB 3요소=page#(tag)/frame#/valid.</div>';
  return _figWrap('TLB + 2단계 페이징 변환 (정답)', s, 'ans');
}
function examFig2LevelPaging23Ans(){
  var s='<svg viewBox="0 0 760 210" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address (32 bit) = 0000010 | 000000000011 | 0…10100</text>'+
  _box(20,30,120,38,'(7) = 2')+_box(140,30,170,38,'(12) = 3')+_box(310,30,200,38,'page offset (13)')+
  _vseg(80,68,80,104,1)+
  _box(20,104,160,38,'outer page table [2]=41')+_hseg(180,123,255,123,1)+
  _box(255,104,150,38,'page table [3]=94')+_hseg(405,123,480,123,1)+
  _box(480,104,120,38,'frame = 94')+
  _box(310,160,200,30,'offset (max 8191)')+_vseg(410,68,410,160,1)+
  '</svg>'+
  '<div class="fig-note"><b>정답</b>: (1)page offset (2)41 (3)outer page (4)94 (5)8191(=2¹³−1, 8KB 페이지 내 마지막 바이트).</div>';
  return _figWrap('2단계 페이징 변환 (정답)', s, 'ans');
}
function examFig2LevelTLB21Ans(){
  var s='<svg viewBox="0 0 760 240" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address</text>'+
  _box(20,28,110,36,'p1 (8)')+_box(130,28,150,36,'p2 (11)')+_box(280,28,180,36,'offset (13)')+
  _box(20,92,160,36,'PTBR = 200')+_hseg(180,110,250,110,1)+
  _box(250,92,180,38,'outer table(f200) [0]=85')+_hseg(430,111,505,111,1)+
  _box(505,92,180,38,'page table(f85) [6]=10')+
  _box(250,162,180,34,'frame number = 10')+_vseg(595,130,360,162,1)+
  _box(250,204,440,30,'TLB: (page#→10), 입력 19bit · hit 시 테이블 생략')+
  '</svg>'+
  '<div class="fig-note"><b>정답</b>: PTBR(200)→outer[0]=85→page table[6]=10→frame 10. TLB hit이면 2단계 테이블 생략. TLB 입력=page number=8+11=<b>19bit</b>.</div>';
  return _figWrap('2단계 페이징 + TLB (정답)', s, 'ans');
}
function examFig2LevelPaging20Ans(){
  var s='<svg viewBox="0 0 760 130" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address (32 bit)</text>'+
  _box(20,30,170,44,'p1 (8 bit)\\nouter index')+_box(190,30,210,44,'p2 (11 bit)\\npage table index')+_box(400,30,270,44,'page offset (13 bit)')+
  '</svg>'+
  '<div class="fig-note"><b>정답</b>: page size 8KB=2¹³→offset 13. PTE 4byte→한 페이지 8KB/4=2¹¹→p2=11. p1=32−13−11=<b>8</b>.</div>';
  return _figWrap('2단계 페이징 비트 구성 (정답)', s, 'ans');
}
function examFigTLB19Ans(){
  var s='<svg viewBox="0 0 760 130" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical address (32 bit)</text>'+
  _box(20,30,150,44,'p1 (6 bit)')+_box(170,30,210,44,'p2 (12 bit)')+_box(380,30,290,44,'page offset (14 bit)')+
  '</svg>'+
  '<div class="fig-note"><b>정답</b>: 16KB=2¹⁴→offset 14. PTE 4byte→16KB/4=2¹²→p2=12. p1=32−14−12=<b>6</b>. EAT=(0.05+1)×0.9+(0.05+3)×0.1=<b>1.25μs</b>.</div>';
  return _figWrap('TLB 2단계 페이징 (정답)', s, 'ans');
}
function examFigPageTrans20yAns(){
  var s='<svg viewBox="0 0 760 200" class="figsvg">'+
  '<text x="10" y="20" class="figsub">logical = 0010 0110 0001 0110 (16bit)</text>'+
  _box(20,30,120,36,'page# 00100')+_box(140,30,260,36,'offset 110 0001 0110')+
  _vseg(80,66,80,100,1)+
  _box(20,100,170,84,'page table\\n0→4 1→15 2→6\\n3→27 4→3★ 5→14 6→10')+
  _hseg(190,120,300,120,1)+_box(300,100,130,36,'frame 00011')+
  _box(140,150,260,30,'offset 그대로')+_vseg(270,66,270,150,1)+
  _box(450,100,260,36,'physical = 00011 110 0001 0110')+_hseg(430,118,450,118,1)+
  '</svg>'+
  '<div class="fig-note"><b>정답</b>: page#=00100=4 → table[4]=3=00011. offset 유지, page#만 frame#으로 교체.</div>';
  return _figWrap('페이징 주소변환 (정답)', s, 'ans');
}

/* ========================= 표 (문제용=주어진 데이터 / 정답용=채워짐) ========================= */
function examFigIOTableAns(){
  var rows=[
    ['항목','Programmed I/O','Interrupt-driven','DMA'],
    ['I/O 개시 후 context switch','X','O','O'],
    ['I/O 완료 후 interrupt','X','O','O'],
    ['완료로 인한 context switch','X','O','O'],
    ['Busy waiting 이용','O','X','X'],
    ['데이터 저장을 CPU가 담당','O','O','X'],
    ['Device driver 필요','O','O','O'],
    ['최적 사례','②빠른','③느린','①다량'],
  ];
  return _figWrap('I/O 방식 비교표 (정답)', _table(rows,true), 'ans');
}
function examFigGrouping23Q(){
  var s='<svg viewBox="0 0 760 190" class="figsvg">'+
  _box(20,18,720,34,'Super block:  107  109  ...  112')+_vseg(60,52,60,86,1)+
  _box(20,86,720,40,'Data block #107:  210  208  205  200  195  190  150  116  113   →(다음그룹)')+_vseg(680,126,680,150,1)+
  _box(20,150,720,30,'Data block #210:  312 307 305 300 299 298 297 290 215 214 213 …')+
  '</svg>'+
  '<div class="fig-note">grouping: 인덱스 블록의 마지막 칸이 <b>다음 그룹 인덱스 블록</b>을 가리킴. 빈 블록 3개를 할당한 뒤 모습을 그리시오.</div>';
  return _figWrap('Grouping 빈 블록 관리 (문제)', s, 'q');
}
function examFigGrouping23Ans(){
  return _figWrap('Grouping — 3개 할당 후 (정답)',
    '<div class="fig-note"><b>정답 핵심</b>: ① 새 super block 리스트에서 제일 끝 <b>112가 제거</b>됨 ② 데이터 블록 <b>107이 할당되어 사라짐</b> ③ <b>210번이 super block 다음(새 그룹 인덱스)으로 승격</b>됨. (인덱스 블록을 다 쓰면 그 마지막 포인터가 가리키던 블록이 새 인덱스 블록이 됨)</div>','ans');
}
function examFigAllocTableAns(){
  var rows=[
    ['항목','Contiguous','Indexed'],
    ['file size 증가','어려움','쉬움'],
    ['External fragmentation','발생(Yes)','없음(No)'],
    ['안정성','좋음','상대적'],
    ['필요 data block 공간','소','다(인덱스블록)'],
    ['순차 access 속도','빠름','상대적'],
  ];
  return _figWrap('Contiguous vs Indexed (정답)', _table(rows,true), 'ans');
}
function examFigPageReplaceQ(){
  var rows=[
    ['Page','Load time','최근 access','Ref bit','Modified'],
    ['0','110','260','1','0'],['1','210','240','0','0'],['2','126','230','0','0'],['3','165','264','1','1'],
  ];
  return _figWrap('페이지 프레임 정보표 (문제)', _table(rows,false), 'q');
}
function examFigPageReplaceAns(){
  return _figWrap('페이지 교체 결과 (정답)',
    '<div class="fig-note"><b>정답</b>: (1) LRU = 최근 access 최소(230) → <b>Page 2</b>. (2) Second chance(0번부터) = ref 0 첫 만남 → <b>Page 1</b>. (3) Enhanced((ref,mod) (0,0) 우선, 0번부터) → <b>Page 1</b>.</div>','ans');
}
function examFigSched19Q(){
  var rows=[
    ['Process','P1','P2','P3','P4','P5'],
    ['Arrival','0','3','4','4','5'],['Service','2','6','3','2','6'],['Priority','5','3','1','2','4'],
  ];
  return _figWrap('프로세스 도착/서비스/우선순위 (문제)', _table(rows,false), 'q');
}

/* ===== 저수준 SVG 헬퍼 ===== */
function _box(x,y,w,h,txt){
  var lines=String(txt).split('\\n');
  var t='', cy=y+h/2-(lines.length-1)*8+5;
  for(var i=0;i<lines.length;i++) t+='<text x="'+(x+w/2)+'" y="'+(cy+i*15)+'" class="figboxtxt">'+lines[i]+'</text>';
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" class="figbox"/>'+t;
}
function _node(x,y,w,h,txt,kind){
  var fill=kind==='root'?'#e7eefc':(kind==='dir'?'#fff7e6':'#fff');
  var st=kind==='root'?'#1e3a8a':(kind==='dir'?'#d97706':'#2563eb');
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+fill+'" stroke="'+st+'" stroke-width="1.4"/>'+
         '<text x="'+(x+w/2)+'" y="'+(y+h/2+4)+'" class="figboxtxt">'+txt+'</text>';
}
function _edge(x1,y1,x2,y2){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="figarr" marker-end="url(#fgar)"/>'; }
/* 표형 블록(세로 칸 나열) */
function _blk(x,y,title,rows,dir){
  var w=170, rh=24, hy=y, s='';
  s+='<text x="'+(x+w/2)+'" y="'+(y-6)+'" class="figsub" style="font-weight:700">'+title+'</text>';
  for(var i=0;i<rows.length;i++){
    s+='<rect x="'+x+'" y="'+(hy+i*rh)+'" width="'+w+'" height="'+rh+'" fill="'+(dir? '#f4f8ff':'#fff')+'" stroke="#9db8e0" stroke-width="1"/>'+
       '<text x="'+(x+8)+'" y="'+(hy+i*rh+rh/2+4)+'" class="figcell">'+rows[i]+'</text>';
  }
  return s;
}
function _row(x,y,w,txt){ return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="20" fill="#fff" stroke="#9db8e0" stroke-width="1"/><text x="'+(x+w/2)+'" y="'+(y+13)+'" class="figcell" style="text-anchor:middle">'+txt+'</text>'; }
/* 직선 세그먼트(화살표) */
function _vseg(x1,y1,x2,y2){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="figarr" marker-end="url(#fgar)"/>'; }
function _hseg(x1,y1,x2,y2){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="figarr" marker-end="url(#fgar)"/>'; }
function _vline(x,y1,y2,a,b){ var mid=(y1+y2)/2; return _vseg(x,y1,x,y2)+_lbl(x,mid,a+' ('+b+')','rightc'); }
/* 라벨 (배경 박스 포함, 겹침 방지) */
function _lbl(x,y,txt,pos){
  var anchor='middle', dx=0;
  if(pos==='left'){ anchor='end'; dx=-8; }
  else if(pos==='right'||pos==='rightc'){ anchor='start'; dx=8; }
  var w=txt.length*6.2+8;
  var bx = anchor==='end'? x+dx-w : (anchor==='start'? x+dx : x-w/2);
  return '<rect x="'+bx+'" y="'+(y-9)+'" width="'+w+'" height="16" rx="3" fill="#eef4ff" opacity="0.95"/>'+
         '<text x="'+(x+dx)+'" y="'+(y+3)+'" class="figlbl" style="text-anchor:'+anchor+'">'+txt+'</text>';
}
/* 가로 플로우(순서도) */
function _flow(cells,sub){
  var x=8, inner='<svg viewBox="0 0 760 '+(sub.some(function(s){return s})? '110':'80')+'" class="figsvg">';
  for(var i=0;i<cells.length;i++){
    inner+=_box(x,16,112,42,cells[i]);
    if(sub[i]) inner+='<text x="'+(x+56)+'" y="78" class="figsub">'+sub[i]+'</text>';
    if(i<cells.length-1) inner+=_hseg(x+112,37,x+124,37);
    x+=124;
  }
  inner+='</svg>';
  return inner;
}
function _table(rows,colorAns){
  var h='<table class="fig-table">';
  for(var ri=0;ri<rows.length;ri++){
    h+='<tr>';
    for(var ci=0;ci<rows[ri].length;ci++){
      var c=rows[ri][ci];
      if(ri===0||ci===0) h+='<th>'+c+'</th>';
      else{
        var ans=colorAns&&(c==='O'||c==='X'||/[①②③]/.test(c)||['어려움','쉬움','발생(Yes)','없음(No)','빠름','상대적','소','다(인덱스블록)','좋음'].indexOf(c)>=0);
        h+='<td'+(ans?' class="fig-ans"':'')+'>'+c+'</td>';
      }
    }
    h+='</tr>';
  }
  return h+'</table>';
}
