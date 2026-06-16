/* ===================================================================
   기출시험(족보) 데이터 — 최훈 교수 운영체제 기말
   복원 우선순위: 2025(최신·직접판독) > 2023/2021/2020(답안텍스트) > 2018/2019/2020연계
   각 item: {n, pts, tags, q, fig(선택,SVG/HTML), a, expl, crit}
   fig 는 viewExam 에서 문제 본문 아래 .q-fig 박스로 그대로 렌더(HTML/SVG 허용).
   복원 불가/추정 부분은 본문에 [추론] 표기.
=================================================================== */
window.EXAMS_DATA = [

/* ============================ 2025 (최신·신뢰도 최상) ============================ */
{id:"e2025", year:"2025", title:"2025학년도 1학기 운영체제및실습 기말고사", meta:"2025.6.18 · 55분 · single CPU 대상", tag:"exam",
 note:"가장 최근 족보(직접 판독 복원). 손글씨 정답을 함께 반영함. 이미지 품질이 낮아 일부 보기 문장은 의미를 살려 복원([추론] 표기).", items:[

  {n:"1", pts:"30점 (각 3점)", tags:["종합","OX"],
   q:"종합 OX — single CPU 대상. 각 보기가 맞으면 O, 틀리면 X.",
   oxIntro:"아래 각 문항이 맞으면 O, 의미상 틀리면 X를 고르고, 틀린 것은 '왜' 틀렸는지 설명할 수 있어야 합니다. (single CPU 컴퓨터 대상)",
   ox:[
    {n:"①", ans:"O", stmt:"폴링(polling)은 입출력이 신속히 끝나는 장치에 적용하는 것이, 입출력이 오래 걸리는 장치보다 interrupt-driven I/O 방식보다 효율적이다.",
     expl:"빠른 I/O는 곧 끝나므로 interrupt의 **context switch 비용**이 오히려 손해 → 그 시간만큼은 **polling이 유리**. (느린 I/O는 반대로 interrupt 유리)"},
    {n:"②", ans:"O", stmt:"Device file과 그 device를 다루는 device driver를 운영체제가 분리해 두어 어떤 장치이든 일관된 방법으로 device driver를 통해 다룬다.",
     expl:"device file(추상 인터페이스)과 device driver(실제 하드웨어 조작 코드)를 **분리**해, 응용은 어떤 장치든 **똑같은 방식(open/read/write)**으로 다룸. 옳은 보기."},
    {n:"③", ans:"X", stmt:"Disk scheduling 알고리즘 중 SSTF는 deadlock이 일어날 수 있는 단점이 있어서, 이보다는 Look 알고리즘이 일반적으로 이용된다.",
     expl:"SSTF의 단점은 deadlock이 아니라 **starvation(기아)** — 가까운 요청만 처리해 먼 요청이 계속 밀림. 그래서 SCAN/LOOK이 일반적. (**deadlock → starvation** 으로 바꿔야 맞음)"},
    {n:"④", ans:"X", stmt:"RAID2는 3 bit Hamming 코드를 사용한다.",
     expl:"RAID2는 '3 bit'로 고정된 게 아니라 데이터 비트 수에 맞춰 **여러 비트의 Hamming code**(에러 정정 코드)를 사용함. 숫자 '3 bit'가 함정. [추론]"},
    {n:"⑤", ans:"O", stmt:"Seek time 측면에서, contiguous / chained(linked) / indexed allocation 중 contiguous allocation이 상대적으로 유리하다.",
     expl:"**연속 할당(contiguous)**은 블록이 디스크에 붙어 있어 **순차 접근 시 seek(헤드 이동)이 거의 없음** → seek time 유리. (단편화 단점은 별개)"},
    {n:"⑥", ans:"X", stmt:"페이지 교체(page replacement)는 실행되는 즉시 그 전에 page fault가 일어났음을 의미한다. (page fault → 반드시 replacement)",
     expl:"page fault가 나도 **빈 프레임이 있으면** 그냥 적재 → replacement 안 함. replacement는 **메모리가 꽉 찼을 때만**. 즉 page fault ⊃ replacement (fault라고 항상 replacement 아님)."},
    {n:"⑦", ans:"O", stmt:"To read or write, the disk head must be positioned at the desired track first (seek time), and then wait for the desired sector to come under the head (rotational delay).",
     expl:"디스크 접근 순서: **① seek(원하는 트랙으로 헤드 이동) → ② rotational delay(원하는 섹터가 헤드 밑으로 올 때까지 회전 대기)**. 순서·용어 모두 맞음."},
    {n:"⑧", ans:"X", stmt:"32bit 주소, 4KB 페이지, PTE 하나가 4byte일 때 control bits를 위해 12비트가 남는다.",
     expl:"4KB=2¹²→offset 12, page number 20비트 → frame number도 20비트. PTE 4byte=32비트 중 frame# 20비트 빼면 **남는 control bits = 12비트**가 아니라 계산상 맞지 않음(프레임 수·구성에 따라 다름). 숫자 '12비트' 단정이 함정. [추론]"},
    {n:"⑨", ans:"X", stmt:"Short-term scheduler의 성능 지표 중 waiting time은 프로세스가 wait(block) 상태에서 기다린 시간이다.",
     expl:"waiting time은 block 상태가 아니라 **ready queue에서 CPU를 기다린 시간**의 합. (block은 I/O 대기라 별개). **wait(block) → ready queue** 로 바꿔야 맞음."},
    {n:"⑩", ans:"X", stmt:"Enhanced second chance algorithm은 reference bit 외에 modified bit를 추가로 사용함으로써 second chance보다 page fault 발생 횟수를 줄일 수 있다.",
     expl:"modified bit 추가의 목적은 page fault **횟수** 감소가 아니라, 쫓겨날 때 **disk write(쓰기) 횟수**를 줄이는 것(수정 안 된 페이지 우선 victim → write 생략). **page fault → disk write** 로 바꿔야 맞음."},
   ],
   a:"① O — 빠른 I/O는 interrupt의 context switch 비용이 더 커서 polling이 유리.\n② O — device file / device driver 분리로 일관된 인터페이스 제공.\n③ X — SSTF의 단점은 deadlock이 아니라 starvation(기아). 그래서 Look/SCAN이 일반적.\n④ X — RAID2는 3 bit가 아니라 여러 비트의 Hamming code 사용. [추론]\n⑤ O — contiguous allocation은 순차 접근에서 seek가 거의 없어 유리.\n⑥ X — replacement는 빈 프레임이 없을 때만. page fault가 나도 빈 프레임 있으면 replacement 없이 적재.\n⑦ O — seek(트랙 이동) → rotational delay(섹터 대기) 순서·용어 맞음.\n⑧ X — control bits가 12비트로 딱 떨어지지 않음(구성 따라 다름). [추론]\n⑨ X — waiting time은 block이 아니라 ready queue에서 기다린 시간.\n⑩ X — modified bit는 page fault 횟수가 아니라 disk write 횟수를 줄임.",
   expl:"단골 함정 4종: ③ SSTF=starvation(≠deadlock) / ⑥ replacement는 빈 프레임 없을 때만 / ⑨ waiting=ready 대기(≠block) / ⑩ modify bit=write 절감(≠fault 감소). ②⑤⑦은 옳은 보기(O).",
   crit:"각 3점. **정답(O/X)을 맞히고** + 틀린 보기는 **'무엇이 왜 틀렸는지'를 올바른 용어로** 써야 만점.\n**필수 키워드** — ③ starvation, ⑥ 빈 프레임 없을 때만, ⑨ ready queue, ⑩ disk write 절감. 맞은 보기(②⑤⑦)를 X로 고르면 감점."},

  {n:"2", pts:"10점", tags:["스케줄링","Round Robin","빈칸"],
   q:"Round robin 방식으로 어떤 프로세스가 스케줄링되어 실행 단위시간을 의미하는 time slice 동안 실행 기회를 가진다. Time slice가 0.1초일 때 커널이 아래 방법에 따라 시간이 소진되는지를 알아낸다. 아래 빈 칸 ①~⑤를 채우시오.\n- 시스템이 ( ① ) 시간 간격으로 ( ② )를 발생시킴\n- CPU는 인스트럭션 실행 후 ( ② ) 발생 여부를 확인함\n- ( ② )가 발생하는 경우 ( ③ ) 함수를 거쳐 ( ④ ) 함수를 실행함\n- ( ④ ) 함수에서 카운터를 1 증가시키고 카운터 값이 ( ⑤ )인지 조사함\n- ( ⑤ )이 아닐 경우 인터럽트 처리 종료함\n- 카운터 값이 ( ⑤ )이면 time slice가 경과된 것으로 판단함",
   a:"① 일정한(고정된) — 타이머 인터럽트 주기 (예: 1/100초 등)\n② (timer) interrupt — 타이머 인터럽트\n③ interrupt handler — 인터럽트 핸들러\n④ timer ISR(타이머 인터럽트 처리 루틴)\n⑤ 100 — time slice(0.1초) ÷ 타이머 주기. (0.1초 / 0.001초 = 100)",
   expl:"손글씨 정답에 '100'이 명확. time slice를 타이머 주기로 나눈 카운트가 되면 한 슬라이스 경과. ⑤=100 핵심.",
   crit:"⑤=100과 그 의미(타이머 카운트로 time slice 경과 판단)가 핵심."},

  {n:"3", pts:"6점", tags:["프로세스","상태도","서술"],
   q:"강의 중에 다룬 7개의 상태로 이루어진 상태도(기본 5개 상태에 2개의 상태가 추가된 것)를 배운 바 있다. 이 상태도에서 메모리 할당 또는 회수가 반드시 일어나는 상태 변화 6가지를 쓰시오. (\"~ 상태에서 ~ 상태로 갈 때\" 형식으로 쓰시오.)",
   afig: examFig7StateAns,
   a:"메모리 할당/회수가 일어나는 상태 변화 (suspend=swap-out=메모리 회수, activate=swap-in=메모리 할당, 생성/종료 포함):\n1. New → Ready (생성, 메모리 할당)\n2. Ready → Ready-suspend (swap-out, 메모리 회수)\n3. Blocked → Blocked-suspend (swap-out, 메모리 회수)\n4. Ready-suspend → Ready (swap-in, 메모리 할당)\n5. Blocked-suspend → Ready-suspend (메모리상 변화 없음 — 주의: 디스크상 상태 변화)\n6. Running/Ready/Blocked → Terminate (종료, 메모리 회수)\n※ 손글씨: new / ready / running / block / terminate / suspended 키워드 확인됨.",
   expl:"7상태 = 기본5(New, Ready, Running, Blocked, Terminate) + Suspend 2개(Ready-suspend, Blocked-suspend). 메모리는 suspend(회수)·activate(할당)·생성·종료 시 변동.",
   crit:"'~상태에서 ~상태로' 형식 + 메모리 할당/회수가 실제 일어나는 전이만 골라야 함."},

  {n:"4", pts:"10점", tags:["파일관리","구조","서술"],
   q:"워드프로세서에서 프로그램을 통해 파일시스템에 저장된 어느 파일 A.hwp를 열고 기존 내용보다 5KB바이트 정도 내용을 추가·저장한 후 종료하였다.\n(1) A.hwp 작업에 이용된 파일시스템 구성 요소(boot block, super block, directory, FCB list, data blocks)를 골라서 이용되는 순서대로 나열한 아래 빈 칸 3개를 채우시오.\n\n   ( directory ) → ( ? ) → ( data blocks ) → ( ? ) → ( ? ) → ( FCB list )\n\n(2) 위 문제에서 ? 칸에 해당하는 구성 요소를 왜(무엇하려고) 접근하는지 간단히 설명하시오.",
   qfig: examFigFileAccessQ, afig: examFigFileAccessAns,
   a:"(1) directory → ( FCB list ) → data blocks → ( super block ) → ( data blocks ) → FCB list\n\n(2)\n- 첫 FCB list: directory에서 찾은 inode 번호로 A.hwp의 FCB(inode)를 읽어 데이터 블록 위치·파일 크기를 파악하기 위해.\n- super block: 추가된 5KB를 저장할 빈 data block을 새로 할당받기 위해(빈 블록 관리 정보가 super block에 있음).\n- 두 번째 data blocks: 새로 할당받은 빈 블록에 추가 내용(5KB)을 실제로 write 하기 위해.\n- 마지막 FCB list: 늘어난 파일 크기와 새 data block 주소를 FCB(inode)에 갱신·저장하기 위해.",
   expl:"directory(이름→inode번호) → FCB(inode 위치/크기) → data block(기존 내용) → super block(빈 블록 할당) → data block(추가내용 쓰기) → FCB(메타 갱신). 2019·2025 반복 출제.",
   crit:"순서와 각 단계 접근 이유(특히 super block=빈 블록 할당)가 핵심."},

  {n:"5", pts:"10점", tags:["파일관리","inode","그림"],
   q:"다음 그림의 빈 10개에 들어갈 내용을 번호 순서대로 답지에 쓰시오. (UNIX inode의 direct/indirect 구조와 data block 연결을 따라가 빈칸의 inode 번호·블록 번호·디스크 블록 값을 채우는 문제)",
   qfig: examFigInodeTreeQ, afig: examFigInodeTreeAns,
   a:"손글씨 메모: 8/2048, 2번(?)=X 표시 확인.\n[직접 판독 한계로 일부는 그림 흐름 기준 추론]\n- inode 트리를 따라 direct/single indirect로 내려가며 각 노드의 inode/블록 번호를 채움.\n- 한 인덱스 블록당 주소 개수 = 블록크기 / 주소크기 = 2048 / 4 = 512개 라는 점이 핵심 단서(손글씨 8/2048).\n- disk block #N의 슬롯을 따라가 최종 데이터 블록(예: 550번)에 도달.\n※ 정확한 10개 값은 원본 그림 화질 한계로 완전 복원 불가 — 그림의 화살표 연결을 직접 따라가며 채우는 연습 문제로 활용.",
   expl:"inode → direct block은 inode에 직접, 초과분은 single/double indirect 인덱스 블록(슬롯 512개)을 거쳐 data block에 도달. 트리 화살표를 따라가는 것이 풀이의 핵심.",
   crit:"트리 구조에서 각 화살표가 가리키는 블록 번호를 정확히 추적해야 함."},

  {n:"6", pts:"34점", tags:["가상메모리","계산","TLB"],
   q:"주소의 길이가 24 bit인 어느 컴퓨터 시스템이 TLB(Translation Lookaside Buffer)를 가지고 있다. Demand paging 방식을 사용하는데 page size가 2,048 byte이고 페이지 테이블 엔트리 하나는 8 byte이다.\n\n(1) Virtual address 0000010 0101 0000 0000 0001 에 대해 주소의 구성(각 주소 구성요소의 이름·구성요소 별 bit 길이)을 보이시오. 또 그런 길이가 얼마인지도 설명·표시하시오.\n\n(2) 위 주소에 해당하는 user context의 프레임의 번호가 (binary) 111이고, 그 주소에 저장된 값이 550이다. 위 주소의 binary number를 표현한 것을 그림으로 그리시오. (outer page table·page table·TLB·물리주소 변환 과정과 비트 길이를 표시)\n\n(3) TLB lookup 시간은 0.001 microsec이고 메모리 access 시간은 1 microsec이며, TLB hit ratio가 0.85일 때 메모리 1번지의 effective access time을 수식으로 보이시오.\n\n(4) TLB 내용 중 위 주소 액세스를 한 후 이거나 알아지는 엔트리의 내용(TLB entry 정보)을 그림으로 보이시오. 이때 TLB 엔트리 하나를 구성하는 정보 세 가지 이름을 쓰고, user context가 일어난 후 알 수 있는 두 가지 정보의 값을 함께 표현하시오.\n\n(5) 위 (2)번 그림에서 logical address로부터 TLB로 연결되는 부분을 화살표로 그림으로 보이고 입력 bit 수도 표시하시오.",
   afig: examFigTLB25Ans,
   a:"(1) page size 2048 = 2¹¹ → page offset = 11비트.\n   PTE 8byte → 한 페이지(2048B)에 들어가는 엔트리 수 = 2048/8 = 256 = 2⁸ → inner page table index(p2) = 8비트.\n   남은 = 24 − 11 − 8 = 5비트 = outer page table index(p1).\n   구성: [ p1 5비트 | p2 8비트 | page offset 11비트 ]\n\n(2) frame number = 111(binary), offset 11비트는 logical address에서 그대로 복사.\n   physical address = frame(111…) ‖ offset. 저장된 값 = 550.\n\n(3) effective access time\n   = (0.001 + 1) × 0.85  +  (0.001 + 1) × 0.5 × 0.15\n   (TLB miss(0.15) 시 2단계 페이지 테이블+데이터 접근이 추가됨 — 답안지 수식 형태)\n   ※ 손글씨 답안지 표기: (0.001+1)×0.85 + (0.001+1)×0.5×0.15\n\n(4) TLB 엔트리 3가지: page number(tag) / frame number / valid(control) bit.\n   이번 액세스 후 알게 되는 값: page number(상위 p1+p2) = 입력값, frame number = 111.\n\n(5) logical address의 page number 부분(p1+p2 = 5+8 = 13비트)이 TLB 입력으로 들어감 → 입력 bit = 13비트.",
   expl:"PTE가 8byte라 한 페이지에 2048/8=256개 → p2=8비트가 이 문제의 핵심 포인트. offset=11(2048=2¹¹), p1=24−11−8=5. TLB 입력은 page number 13비트.",
   crit:"(1) 비트 분할(5/8/11)과 근거, (3) EAT 수식, (4) TLB 3요소(tag·frame·valid)가 배점 큼."},
]},

/* ============================ 2023 ============================ */
{id:"e2023", year:"2023", title:"2023학년도 운영체제및실습 기말고사", meta:"2023.6.14 · 45분", tag:"exam", items:[

  {n:"1", pts:"30점 (각 2점)", tags:["종합","OX"],
   q:"종합 OX — 맞으면 O, 틀리면 X. (①~⑮)",
   oxIntro:"아래 각 문항이 맞으면 O, 틀리면 X를 고르고, 틀린 것은 '왜' 틀렸는지 설명할 수 있어야 합니다.",
   ox:[
    {n:"①", ans:"O", stmt:"폴링(polling)으로 I/O 상태를 확인하는 것이 I/O가 빨리 끝나는 경우 interrupt-driven I/O보다 효율적이다. interrupt-driven I/O는 context switch가 필요하고, 빠른 I/O는 그 context switch가 진행되는 동안 끝나버릴 수 있기 때문이다.", expl:"맞다. **빠른 I/O**에서는 interrupt 방식의 **context switch 오버헤드**가 I/O 완료 시간보다 더 클 수 있어, **CPU가 직접 반복 확인하는 polling**이 오히려 효율적이다. (느린 I/O는 반대로 interrupt가 유리 — busy waiting 낭비가 크므로)"},
    {n:"②", ans:"O", stmt:"open() 시스템 콜이 호출되면 커널은 파일의 존재 여부와, 존재할 경우 그 파일의 FCB 식별자(=file system FCB list에서의 인덱스)를 알아낸다. 그 인덱스 자리의 FCB를 읽어 커널 메모리에 복사한다.", expl:"맞다. **open()**은 디스크의 **FCB(=inode)**를 찾아 그 **복사본을 커널 메모리로** 올린다. 이후 read/write는 이 메모리 복사본을 쓰고 **close 시 변경분을 디스크로 백업**한다."},
    {n:"③", ans:"X", stmt:"Kernel I/O subsystem의 Spooling 기능은 출력 장치로 보낼 출력 내용을 메인 메모리에 저장하는 기능이다.", expl:"틀리다. **Spooling**은 출력 내용을 **메인 메모리가 아니라 디스크(보조기억장치)**의 spool 영역에 모아두었다가 장치가 준비되면 내보낸다. '메인 메모리'를 **'디스크'**로 바꿔야 맞다. (cf. 버퍼링/캐싱은 메모리)"},
    {n:"④", ans:"X", stmt:"Interrupt를 처리하는 중에 새로운 Interrupt가 발생하면 진행 중인 인터럽트 처리를 끝마친 후 Interrupt Descriptor Table을 조회한다.", expl:"틀리다. 더 높은 우선순위 인터럽트는 진행 중 처리를 **끝마치기 전에 중첩(nested)으로 선점**해 처리할 수 있다. '끝마친 후'가 아니라 **'도중에라도 IDT 조회·중첩 처리'**가 맞다."},
    {n:"⑤", ans:"O", stmt:"Disk scheduling 중 SCAN과 LOOK 중 매 요청을 더 효율적으로 처리하는 것은 LOOK이다. 또한 SSTF는 elevator(SCAN)와 비슷하나 SSTF는 starvation이 일어날 수 있다.", expl:"맞다. **LOOK**은 마지막 요청까지만 가고 끝까지 가지 않아 SCAN보다 불필요한 이동이 적다. **SSTF**는 가까운 요청만 처리해 먼 요청에 **starvation(기아)**이 생길 수 있다."},
    {n:"⑥", ans:"O", stmt:"Disk cache is the main memory area managed by the kernel. When a process requests to read a block, the kernel orders to read the disk only if the block does not exist in the disk cache.", expl:"맞다. **disk cache**는 커널이 관리하는 **메인 메모리 영역**으로, 요청 블록이 **캐시에 있으면 디스크를 안 읽고**, 없을 때(miss)만 디스크 I/O를 한다."},
    {n:"⑦", ans:"X", stmt:"Compile time / load time / execution time binding 중 실행 시간이 가장 짧은 것은 compile time binding이며, 이 방식에서는 process가 다른 메모리 번지로 relocation 될 수 없다. load/execution time binding은 relocation 가능하다.", expl:"틀리다. **compile time binding이 relocation 불가**한 것은 맞으나, **'실행 시간이 가장 짧다'는 단정**이 오류로 채점됨. 핵심은 compile time = 절대주소 고정 → **재배치·compaction 불가**, load/execution time = 재배치 가능."},
    {n:"⑧", ans:"O", stmt:"Demand paging에서는 internal fragmentation이 발생할 수 있으나 external fragmentation은 발생하지 않는다.", expl:"맞다. **paging**은 고정 크기 프레임이라 마지막 페이지에서 **internal fragmentation**만 생기고, 어디든 적재 가능해 **external fragmentation은 없다.**"},
    {n:"⑨", ans:"O", stmt:"Short-term scheduler의 성능 지표 중 waiting time은 프로세스가 ready 상태에서 기다린 시간의 합이다.", expl:"맞다. **waiting time**은 **ready queue에서 CPU를 기다린 시간의 총합**이다. (block 대기·실행 시간은 제외) — 2025·2023 단골."},
    {n:"⑩", ans:"O", stmt:"Enhanced Second Chance Algorithm은 LRU를 흉내낸 page replacement 방법인데, Second Chance(clock)보다 page fault rate를 줄이는 개선된 방법이다.", expl:"맞다. **reference bit + modify bit**까지 함께 보아 ((use,modify) 4클래스) 쓰기 비용 큰 dirty page를 보존 → clock보다 개선. (단, modify bit의 직접 목적은 disk write 절감이라는 점도 같이 기억)"},
    {n:"⑪", ans:"O", stmt:"부모(parent)와 자식(child) 프로세스가 동시에 종료 가능한 상태일 때, 자식이 먼저 끝나는 것이 메모리 측면에서 더 좋다. 부모가 자식보다 먼저 끝나면 자식은 고아(orphan)가 되어 부모가 init 프로세스로 바뀐다.", expl:"맞다. 부모가 먼저 끝나면 자식은 **orphan**이 되어 **init에 입양**된다. 자식이 먼저 끝나면 부모가 wait()로 즉시 회수해 자원 누적을 줄일 수 있다."},
    {n:"⑫", ans:"X", stmt:"Round robin에서 time quantum이 짧을수록 mean response time이 줄어 interactive 프로세스에 좋을 뿐 아니라 throughput도 증가한다.", expl:"틀리다. quantum이 짧으면 **response time은 좋아지지만**, **context switch 급증**으로 오버헤드가 커져 **throughput은 오히려 감소**한다. 'throughput도 증가'를 **'throughput은 감소'**로 바꿔야 맞다."},
    {n:"⑬", ans:"O", stmt:"global scope 가변할당(variable allocation)은 시스템 효율과 프로세스의 프레임 활용 측면에서 둘 다 좋은 방법이며, 빈 프레임이 없으면 다른 프로세스의 페이지를 victim으로 고른다.", expl:"맞다. **global replacement**는 전체 프레임 풀에서 victim을 골라 활용도가 높고, 빈 프레임이 없으면 **다른 프로세스의 페이지도 victim**으로 삼을 수 있다."},
    {n:"⑭", ans:"O", stmt:"페이지 폴트가 발생했던 프로세스가 나중에 다시 실행되면, page fault가 발생한 당시 명령(instruction)을 다시 실행한다.", expl:"맞다. page fault가 나면 페이지를 적재한 뒤 **fault를 일으킨 그 명령을 처음부터 재실행(restart)**한다. 그래서 사용자는 중단을 못 느낀다."},
    {n:"⑮", ans:"X", stmt:"Dynamic memory allocation에서 best fit이 first fit보다 메모리 활용성이 좋고 할당 시간도 적게 걸린다.", expl:"틀리다. **best fit**은 free list **전체를 탐색**하므로 **first fit보다 할당 시간이 더 길다.** '할당 시간도 적게 걸린다'를 **'더 오래 걸린다'**로 바꿔야 맞다."}
   ],
   a:"① O — 빠른 I/O는 polling이 context switch 오버헤드 없어 유리\n② O — open()은 디스크 FCB를 커널 메모리로 복사\n③ X — spooling은 메인 메모리가 아니라 디스크에 저장\n④ X — 우선순위 높은 인터럽트는 처리 도중 중첩 선점\n⑤ O — LOOK이 더 효율적, SSTF는 starvation 가능\n⑥ O — disk cache hit면 디스크 안 읽음\n⑦ X — compile time binding=relocation 불가, '실행시간 최단' 단정은 오류\n⑧ O — paging은 internal만, external 없음\n⑨ O — waiting time은 ready 대기 시간 합\n⑩ O — Enhanced Second Chance는 modify bit까지 고려해 개선\n⑪ O — 부모 먼저 종료 시 자식 orphan→init 입양\n⑫ X — quantum 짧으면 context switch↑로 throughput 감소\n⑬ O — global variable allocation은 다른 프로세스 페이지도 victim\n⑭ O — fault 일으킨 명령 재실행\n⑮ X — best fit은 전체 탐색이라 할당 시간 더 김",
   expl:"단골 함정: ③ spooling=디스크(≠메인 메모리) / ④ 인터럽트 중첩(끝난 후✕→도중 선점) / ⑫ RR quantum↓ → throughput↓ / ⑮ best fit이 first fit보다 느림. ⑦은 'compile time=relocation 불가'는 맞으나 '실행시간 최단' 단정 때문에 X.",
   crit:"각 2점. **정답(O/X)을 맞히고** + 틀린 보기는 '왜 틀렸는지'를 올바른 용어로 써야 만점.\n**필수 키워드** — ③ spooling=디스크 저장 / ④ 처리 도중 nested 선점 / ⑦ compile time=relocation·compaction 불가 / ⑫ quantum↓→context switch↑→throughput↓ / ⑮ best fit=전체 탐색→느림"},

  {n:"2", pts:"10점", tags:["파일관리","Grouping","그림"],
   q:"Grouping으로 파일시스템의 빈 데이터 블록들을 관리하는 운영체제가 있다. 아래와 같은 상황에서 빈 데이터 블록 3개를 할당하고 난 후의 모습을 그림으로 그리시오.",
   qfig: examFigGrouping23Q, afig: examFigGrouping23Ans,
   a:"핵심: super block 리스트의 끝쪽부터 할당. super block의 마지막 포인터가 가리키는 그룹 인덱스 블록(#107)을 파일에 내주기 전에, 107 안에 들어있던 다음 그룹 리스트(맨 끝 210 등)를 super block으로 끌어올려야 함.\n\n채점 핵심(답안):\n- 새 super block 리스트에서 제일 끝의 112가 없어지고,\n- 데이터 블록 107이 (할당되어) 없어지며,\n- 210번 블록이 super block 다음(새 그룹 인덱스)으로 오는 것.",
   expl:"grouping = 첫 블록(그룹 인덱스)에 빈 블록 주소 n개 + 마지막 칸은 다음 그룹 인덱스 블록 포인터. 인덱스 블록을 다 쓰면 그 마지막 포인터가 가리키던 블록이 새 인덱스 블록이 됨.",
   crit:"112 제거 + 107 제거 + 210이 super block 다음으로 승격되는 점이 핵심."},

  {n:"3", pts:"30점 (각 2점)", tags:["프로세스","빈칸","page fault"],
   q:"프로세스가 실행 중 자신의 데이터를 참조했는데 그 데이터가 현재 메모리에 없는 상태이다. 아래 문장의 빈 칸 ①~⑮에 들어갈 용어를 쓰시오.\n(1) CPU는 페이지 테이블 entry 내 ( ① ) bit를 보고 해당 페이지가 메모리에 없음을 인식한다.\n(2) CPU는 소프트웨어 인터럽트라고도 불리는 ( ② )를 발생시킨다.\n(3) CPU는 mode change를 하면서 권한 수준 값을 user에서 ( ③ )으로 변경한다.\n(4) 커널로 진입한 후 ( ④ )라는 함수를 실행한다.\n(5) 이 함수는 ( ⑤ ) 데이터를 읽어 이 인터럽트 종류에 해당하는 처리함수(ISR) 주소를 알아내 실행한다.\n(6) ⑤번은 보조기억장치를 취급하는 소프트웨어인 ( ⑥ )에게 일을 시킨다.\n(7) 위 소프트웨어에게 명령하는 방법은 입출력 장치를 ( ⑦ )로 취급하여 접근하는 식이다.\n(8) 장치에게 입력을 명령한 후 커널은 프로세스1의 상태를 ( ⑧ ) 상태로 변경한다.\n(9) 커널 함수인 ( ⑨ )를 실행해 다음 실행할 프로세스로 프로세스2가 정해졌다.\n(10) 커널은 프로세스2의 상태를 ( ⑩ ) 상태로 변경 후 context switch 한다.\n(11) 장치가 입력을 끝내면 커널은 ( ⑪ )를 발생시킨다.\n(12) 프로세스 ( ⑫ )번 작업을 (3)~(5) 과정을 거쳐 처리한다.\n(13) 끝나면 커널은 프로세스1을 ( ⑬ ) 상태로 변경한다. → ( ⑭ )\n(14) 커널은 ( ⑮ )를 실행하여 누가 프로세서를 차지할지 결정한다.",
   a:"① present (또는 valid) bit\n② trap (= page fault, 소프트웨어 인터럽트)\n③ kernel (supervisor / 커널 모드)\n④ interrupt handler\n⑤ IVT (또는 IDT, interrupt vector / interrupt descriptor table)\n⑥ device driver (disk device driver)\n⑦ 파일(file)\n⑧ block (wait, sleep) 상태\n⑨ process scheduler (short-term scheduler)\n⑩ running (실행) 상태\n⑪ interrupt\n⑫ 2 (번)\n⑬ ready (준비) 상태\n⑭ process scheduler (short-term scheduler)\n⑮ ③ (선택지 번호)",
   crit:"답안키: ①present/valid ②trap(page fault) ③kernel stack/kernel ④interrupt handler ⑤IVT/IDT ⑥device driver ⑦파일 ⑧block ⑨process scheduler ⑩running ⑪interrupt ⑫2 ⑬ready ⑭process scheduler ⑮③ (하나당 2점).",
   expl:"page fault 처리 전체 흐름: present bit→trap→커널모드→interrupt handler→IVT→device driver→파일취급→block→scheduler→running→interrupt→ready 재개. 흐름 통째 암기가 정답률을 좌우."},

  {n:"4", pts:"15점 (각 3점)", tags:["가상메모리","계산","2단계페이징"],
   q:"32 bit address 체계에서 아래 logical address를 physical address로 변환하는 과정에서 (1)~(5) 빈칸에 들어갈 용어 또는 숫자를 쓰시오.\nlogical(virtual) address = 0000010 | 000000000011 | 0000000000010100  (7비트 | 12비트 | 13비트)\nouter page table[2] = 41,  page table[3] = 94 (예시 값)",
   afig: examFig2LevelPaging23Ans,
   a:"**주소 구성**: [ outer index 7비트 | inner index 12비트 | offset 13비트 ] (합 32).\n- offset 13비트 → 페이지 크기 = 2¹³ = 8KB\n- outer index = 0000010(2진) = **2** → outer page table[2]\n- inner index = 000000000011(2진) = **3** → page table[3]\n\n**(1) page offset** (하위 13비트, 페이지 내 위치)\n**(2) 41** — outer page table[2]가 가리키는 page table의 위치/프레임\n**(3) outer page (table)** (= page directory, root)\n**(4) 94** — page table[3]에서 읽은 실제 frame number\n**(5) 8191** (= 2¹³−1 = 8192−1, 8KB 페이지 내 마지막 바이트 offset)",
   expl:"2단계: outer index(2)→outer[2]=41로 inner table 찾기→inner index(3)→pt[3]=94=frame. offset 13비트→8KB(2¹³), 페이지 내 최대 offset=2¹³−1=8191. 함정: (5)를 8192로 쓰면 오답.",
   crit:"(1) page offset (2) 41 (3) outer page(table)/page directory (4) 94 (5) **8191(=2¹³−1)** — 각 3점.\n**필수** — offset 13비트→8KB 근거, (5)는 8192가 아니라 **8191**(offset은 0부터)."},

  {n:"5", pts:"15점", tags:["가상메모리","계산","EAT"],
   q:"페이지 크기 4KB, 32bit address, demand paging, TLB 사용. TLB hit rate 0.75, TLB search time 5 nsec, 메모리 access time 1,000 nsec일 때, logical address의 데이터를 read 하는 데 걸리는 평균 시간(effective access time)을 ns 단위 수식으로 보이시오.",
   a:"**계산 과정** (32bit, page 4KB=2¹²→offset 12, page# 20비트 → 2단계 페이징):\n- **TLB hit(0.75)**: TLB 검색 + 데이터 1회 = (5 + 1000) ns\n- **TLB miss(0.25)**: TLB + outer table 1 + inner table 1 + 데이터 1 = 메모리 3회 = (5 + 3000) ns\n\n**EAT = (5+1000)×0.75 + (5+3000)×0.25**\n = 1005×0.75 + 3005×0.25 = 753.75 + 751.25 = **1505 ns**",
   expl:"TLB hit: 5+1000(데이터 1회). miss: 2단계 테이블 2회+데이터 1회=3000ns. 함정: miss를 (5+2000)으로 쓰면 페이지 테이블을 1회만 센 것.",
   crit:"miss 시 메모리 **3회(=3000ns, outer+inner+data)** 반영 → 최종 **1505 ns**. (5+2000)으로 쓰면(테이블 1회만) 부분점수.\n**필수** — 2단계라 miss=테이블 2회+데이터 1회=3회."},
]},

/* ============================ 2021 (답안키 기반 재구성) ============================ */
{id:"e2021", year:"2021", title:"2021학년도 운영체제 기말고사", meta:"문제지 미보존 · 답안키 기반 재구성", tag:"exam",
 note:"문제지가 남아있지 않아 채점기준(답안키)으로 문제를 역복원함. 보기 문장은 의미를 살려 재구성([추론]).", items:[

  {n:"1", pts:"20점", tags:["종합","OX"],
   q:"종합 OX — 옳은 것 4개, 틀린 것 6개. 맞으면 O, 틀리면 X.",
   oxIntro:"(1)~(10) 중 옳은 것 4개·틀린 것 6개입니다. 각 보기의 정오를 판단하고, 틀린 것은 번호와 이유(올바른 내용)를 쓰시오. (일부 보기는 답안키 기반 복원)",
   ox:[
    {n:"(1)", ans:"X", stmt:"time slice가 짧을수록 degree of multiprogramming이 증가한다.", expl:"time slice는 **degree of multiprogramming(동시에 메모리에 적재된 프로세스 수)과 무관**하다. 짧아지면 **context switch 급증**으로 **throughput 감소**(response time만 짧아짐). 'multiprogramming 증가'가 틀린 부분."},
    {n:"(2)", ans:"X", stmt:"프로세스가 new 상태가 되면 스케줄러가 실행된다.", expl:"new가 아니라 **ready 상태**가 되어 ready queue에 올라갔을 때 **(short-term)스케줄러**가 실행된다. new는 아직 admit(메모리 적재) 전. 'new'를 **'ready'**로 바꿔야 맞다."},
    {n:"(3)", ans:"O", stmt:"context switch가 일어나면 현재 실행 중이던 프로세스의 상태(레지스터·PC 등)를 PCB에 저장한다. [복원]", expl:"맞다. context switch는 현재 프로세스 문맥을 **PCB에 save**하고 다음 프로세스 문맥을 **restore**한다. 이 시간은 순수 overhead."},
    {n:"(4)", ans:"X", stmt:"입출력 완료를 기다리는 프로세스는 ready 상태로 대기한다.", expl:"I/O 완료를 기다리는 프로세스는 CPU를 줘도 진행 못 하므로 **block(blocked) 상태**로 대기한다. ready는 'CPU만 주면 바로 실행'. 'ready'를 **'block'**으로 바꿔야 맞다."},
    {n:"(5)", ans:"O", stmt:"ready 상태의 프로세스는 CPU만 할당되면 즉시 실행될 수 있는 상태이다. [복원]", expl:"맞다. ready는 메모리 적재·자원 준비가 끝나 **CPU만 비면 곧바로 running**으로 가는 상태. block과의 핵심 차이."},
    {n:"(6)", ans:"O", stmt:"단일 코어 기준 running 상태의 프로세스는 한 순간에 하나만 존재할 수 있다. [복원]", expl:"맞다. single core에서 running은 **한 순간 1개뿐**. ready·block에는 여러 프로세스가 동시에 있을 수 있다."},
    {n:"(7)", ans:"X", stmt:"Spooling이 output을 저장하는 곳은 main memory이다.", expl:"Spooling은 느린 장치로 보낼 데이터를 **디스크(spool 파일)**에 모아두었다 순서대로 내보낸다. 'main memory'를 **'디스크(파일)'**로 바꿔야 맞다. (버퍼링/캐싱은 메모리)"},
    {n:"(8)", ans:"X", stmt:"turnaround time은 프로세스의 순수 실행시간만을 의미한다.", expl:"turnaround time = **제출(도착)~완료까지 전체 경과시간**으로, 실행시간 + **ready 대기 + block 대기**까지 포함. '순수 실행시간만'이 틀린 부분."},
    {n:"(9)", ans:"O", stmt:"throughput은 단위 시간당 완료된(처리된) 프로세스의 개수를 의미한다. [복원]", expl:"맞다. throughput(처리율) = **단위 시간당 완료 작업 수**. context switch 오버헤드가 커지면 throughput이 떨어진다 — (1)번 함정과 연결."},
    {n:"(10)", ans:"X", stmt:"시스템 콜 호출 시 참조하는 표는 interrupt vector table이다.", expl:"시스템 콜은 콜 번호로 **system call table(sys_call_table)**을 인덱싱해 커널 함수를 찾는다. interrupt vector table은 인터럽트별 ISR 주소표라 역할이 다르다. 'interrupt vector table'을 **'system call table'**로 바꿔야 맞다."}
   ],
   a:"틀린 것 6개 = (1)(2)(4)(7)(8)(10) / 옳은 것 = (3)(5)(6)(9).\n(1) X — multiprogramming이 아니라 throughput과 관련(짧으면 context switch↑→throughput↓)\n(2) X — new가 아니라 ready 상태에서 스케줄러 실행\n(4) X — ready가 아니라 block 상태로 대기\n(7) X — main memory가 아니라 디스크(파일)에 저장\n(8) X — 실행시간만이 아니라 ready/block 대기까지 포함(제출~완료 전체)\n(10) X — interrupt vector table이 아니라 system call table",
   expl:"단골 함정: ready vs block(I/O 대기는 block) / turnaround=대기 포함 / Spooling=디스크 / system call table≠interrupt vector table / time slice는 throughput·응답성 관련(multiprogramming 아님).",
   crit:"맞은 보기 각 2점(총 20점). 틀린 것은 **번호 + 올바른 내용(이유)**까지 써야 만점.\n**필수 키워드** — (1) throughput / (2) ready / (4) block / (7) 디스크(파일) / (8) 대기시간 포함 / (10) system call table"},

  {n:"2", pts:"10점", tags:["입출력","순서배열","인터럽트"],
   q:"프로세스가 시스템 콜/인터럽트로 커널에 진입해 처리되고 다시 사용자 프로세스로 복귀하기까지의 과정을, 아래 ①~⑩을 올바른 순서로 배열하시오. [추론 복원]\n① trap처리 급한 부분  ② trap처리 급하지 않은 부분  ③ D1처리 급한 부분  ④ D1처리 급하지 않은 부분  ⑤ D2처리 급한 부분  ⑥ D2처리 급하지 않은 부분  ⑦ Interrupt handler  ⑧ 스케줄러  ⑨ 시스템 체크  ⑩ 컨텍스트 스위치",
   a:"⑦ → ① → ③ → ⑤ → ⑨ → ② → ④ → ⑥ → ⑧ → ⑩\n(또는 ⑦ ① ③ ⑤ ② ④ ⑥ ⑨ ⑧ ⑩ — ②④⑥은 ⑨에서 할 일의 일부라 ⑨와 순서 교환 가능)\n⑧→⑩(스케줄러→컨텍스트 스위치)은 반드시 이 순서로 연이어져야 함.",
   crit:"순서 맞으면 0~10점. ⑦①③⑤⑨②④⑥⑧⑩이 기준. ⑧⑩ 연속·순서 필수.",
   expl:"인터럽트 핸들러가 먼저, 급한 처리(①③⑤) 먼저 → 시스템 체크 → 급하지 않은 처리 → 스케줄러 → 컨텍스트 스위치."},

  {n:"3", pts:"15점", tags:["파일+메모리","서술"],
   q:"(1) 파일의 디스크 블록 할당 방식인 Contiguous allocation과, 빈 공간 관리 기법인 counting 방식의 유사점과 차이점을 설명하시오.\n(2) Thrashing 발생 시 처리 방법과 memory compaction이 공통적으로 필요로 하는 메모리 관리 기술은 무엇이며, 이를 가능하게 하는 주소 결정(binding) 방법의 이름은 무엇인가?",
   a:"(1) **유사점**: Contiguous allocation과 counting 모두 영역을 **'시작 블록 번호 + 연속된 블록 개수'** 형태로 표현(연속 블록 묶음을 가리킴).\n   **차이점**: Contiguous allocation은 **파일이 점유한 데이터 영역(used)**을, counting은 **비어 있는 free 블록 영역**을 관리(용도가 used vs free로 반대).\n(2) 공통 필요 기술: **relocation(재배치)**. 가능하게 하는 주소 결정: **execution time binding(실행 시간 바인딩)**.",
   crit:"(1) 8점 — 유사점(시작주소+개수 표현) 4점, 차이점(used vs free) 4점. (2) 7점 — **relocation**과 **execution time binding** 두 용어 모두 있어야 만점.\n**필수 키워드** — 시작블록+블록수, used vs free, relocation, execution time binding.",
   expl:"relocation(실행 중 프로세스를 다른 물리주소로 이동)은 execution time binding에서만 가능(MMU가 실행 시점에 주소 변환). thrashing 처리(suspend/swap)와 compaction은 둘 다 프로세스를 옮겨야 하므로 relocation 필수. 함정: compile/load time binding으론 relocation 불가."},

  {n:"4", pts:"25점", tags:["가상메모리","계산","TLB","그림"],
   q:"2단계 페이지 테이블 + TLB를 이용한 주소 변환에 대해,\n(1) Logical address를 page number와 page offset으로 나누고 각 필드의 이름과 비트 길이를 쓰시오.\n(2) outer page table·page table·TLB를 거쳐 logical → physical address로 변환되는 전체 절차를, 이름·비트 길이·각 단계 주소 값과 함께 그림으로 완성하시오. [추론 보강]",
   afig: examFig2LevelTLB21Ans,
   a:"(1) logical address = **page number + page offset**.\n - page number = **p1(상위 8비트)=outer index** + **p2(하위 11비트)=page table index** → 합 19비트.\n - **page offset = 13비트** (페이지 크기 2¹³=8KB).\n(2) 변환 절차:\n ① **PTBR=200**이 outer page table 프레임을 가리킴\n ② outer table(프레임200, 엔트리 0~255=2⁸)에서 p1=0 → **outer[0]=85**\n ③ 85가 page table 프레임 → page table(프레임85, 엔트리 0~2047=2¹¹)에서 p2=6 → **pt[6]=10**\n ④ **frame=10**, physical = frame(10) ‖ offset(13비트)\n - **TLB hit** 시: page number(19비트)로 TLB 조회해 2단계 테이블 생략하고 바로 frame 10.",
   crit:"(1) page number 19비트(p1 8+p2 11), offset 13비트, 필드 이름. (2) outer=프레임 **200**, outer 엔트리 **0~255**, page table 엔트리 **0~2047**, outer[0]=**85**, pt[6]=**10**, TLB 입력=page number **19비트**, 최종 frame **10**.\n**필수** — PTBR 200, outer[0]=85, pt[6]=10, frame 10, TLB 입력 19비트.",
   expl:"TLB hit이면 2단계 테이블 접근(메모리 2회)을 생략하고 한 번에 frame 획득. 함정: ① offset 비트수 착각 ② TLB 입력은 page number 전체(19비트)지 p2만이 아님 ③ p1(outer)과 p2(page table) 인덱스 뒤바꿈."},

  {n:"5", pts:"15점 (각 5점)", tags:["가상메모리","계산","page fault"],
   q:"TLB + 2단계 페이지 테이블 + demand paging 시스템에서, 다음 세 페이지에 대한 access time을 식으로 나타내시오. (e=TLB 탐색 단위, pf=page fault 처리, page fault 시 디스크 비용 10,000)\n- 페이지 0: TLB miss이나 메모리에 적재된 경우\n- 페이지 1: TLB hit인 경우\n- 페이지 2: TLB miss이며 page fault 발생",
   a:"각 경우 access time (e=TLB 탐색):\n- **페이지 0 = e + 2 + 1 = e + 3** → TLB miss이나 메모리 적재됨: 페이지 테이블 2회 + 데이터 1회\n- **페이지 1 = e + 1** → TLB hit: 테이블 없이 데이터 1회만\n- **페이지 2 = e + 2 + pf + 10,000 + 1** → TLB miss + page fault: 테이블 2회 + page fault 처리(pf) + 디스크(10,000) + 데이터 1회",
   crit:"페이지당 5점.\n**필수** — 페이지0=테이블 2회+데이터 1회 / 페이지1=TLB hit→데이터 1회만 / 페이지2=테이블 2회+pf+10,000(디스크)+데이터 1회.",
   expl:"TLB hit→메모리 1회(데이터). miss→2단계 테이블 2회+데이터 1회. page fault→디스크(10,000)·pf 추가. 함정: 페이지0(메모리에 있음)에 page fault 비용 더하거나, TLB hit인데 테이블 접근을 빼지 않는 것."},

  {n:"6", pts:"5점 (각 1점)", tags:["파일관리","OX"],
   q:"파일 인덱스 할당·수정 OX — 틀린 것을 모두 고르시오.",
   oxIntro:"(1)~(5) 중 틀린 것을 모두 고르고 이유를 쓰시오. (일부 보기는 추론 복원)",
   ox:[
    {n:"(1)", ans:"O", stmt:"인덱스 할당(indexed allocation)은 inode의 index block을 통해 파일의 각 데이터 블록 위치를 가리킨다. [복원]", expl:"맞다. 파일마다 **index block(inode 내 포인터 배열)**을 두고 그 포인터들이 데이터 블록 주소를 가리킨다. 블록이 흩어져 있어도 **직접 접근(direct access)** 가능."},
    {n:"(2)", ans:"O", stmt:"single / double / triple indirect 블록을 이용하면 매우 큰 파일도 표현할 수 있다. [복원]", expl:"맞다. direct 외에 **single·double·triple indirect**로 인덱스를 다단계 확장 → 한정된 inode로 큰 파일 표현."},
    {n:"(3)", ans:"O", stmt:"인덱스 할당은 데이터 블록이 디스크 곳곳에 흩어져 있어도 되므로 외부 단편화가 발생하지 않는다. [복원]", expl:"맞다. 연속 할당과 달리 블록을 연속으로 둘 필요가 없어 **external fragmentation 없음**. 대신 index block 공간 비용·순차 접근 저하."},
    {n:"(4)", ans:"X", stmt:"인덱스 할당 방식에서 블록 주소는 direct field의 마지막 자리부터 기록된다.", expl:"데이터 블록 주소는 direct 포인터 배열의 **첫 자리(앞)부터** 차례로 채운다. '마지막 자리부터'가 틀림. **'첫 자리부터'**로 바꿔야 맞다."},
    {n:"(5)", ans:"X", stmt:"파일 내용을 수정하면 데이터 블록만 수정하면 된다.", expl:"데이터 블록뿐 아니라 **FCB(inode)** 메타데이터(**파일 크기·수정 시각 등**)도 함께 갱신해야 한다. '데이터 블록만'이 틀림."}
   ],
   a:"틀린 것: (4)(5) / 옳은 것: (1)(2)(3).\n(4) X — direct field의 마지막이 아니라 첫 자리부터 기록\n(5) X — 데이터 블록 외에 FCB(inode)도 수정(크기·수정시각 등)",
   expl:"단골 함정: 인덱스 할당은 외부 단편화 없음(연속 불필요) / 파일 수정 시 inode 메타데이터(size·mtime)도 갱신.",
   crit:"틀린 것 (4)(5) 각 채점. **필수 키워드** — (4) 첫 자리(앞)부터 기록 / (5) FCB(inode) 메타데이터(크기·수정시각) 갱신. 번호만 맞고 이유 없으면 감점."},

  {n:"7", pts:"10점 (각 1점)", tags:["프로세스","빈칸","용어"],
   q:"다음 빈칸에 알맞은 용어를 쓰시오. [추론 복원]\n(1) 외부 장치의 비동기적 사건 처리를 위해 현재 작업을 중단시키는 신호 = ( )\n(2) 고급언어를 기계어로 번역하는 프로그램=( ), user/kernel 모드 전환=( ), 텍스트 편집 프로그램=( )\n(3) 어느 프로세스를 실행할지 고르는 OS 구성요소=( ), 그 우선순위는 ( ) 우선순위\n(4) 프로그램 작성용 응용=( ), CPU를 다른 프로세스로 넘기는 동작=( ), 그 후 가는 상태=( ) 상태\n(5) 입출력 완료를 기다리며 가는 상태 = ( ) 상태",
   a:"(1) **interrupt**\n(2) **compiler** / **mode change(mode switch)** / **editor**\n(3) **scheduler**(process/CPU scheduler) / **higher**(더 높은)\n(4) **editor** / **context switch** / **ready** 상태\n(5) **block**(blocked) 상태",
   crit:"빈칸 하나당 1점, 총 10점.\n**필수 정답** — interrupt / compiler / mode switch / editor / scheduler / higher / editor / context switch / ready / block.",
   expl:"핵심 구분: CPU를 양보당해 다시 실행 가능하면 **ready**, I/O 등 사건을 기다리면 **block**. interrupt는 비동기(외부 장치 발) — 동기적 trap(시스템 콜·예외)과 구분."},
]},

/* ============================ 2020 ============================ */
{id:"e2020", year:"2020", title:"2020학년도 1학기 운영체제및실습 기말고사", meta:"2020.6.17 · 75분 · single CPU 대상", tag:"exam", items:[

  {n:"1", pts:"종합 OX", tags:["종합","OX"],
   q:"종합 OX — 의미상 틀린 것 5개를 가려내시오.",
   oxIntro:"각 보기의 정오를 판단하고 틀린 것은 어디가 왜 틀렸는지 쓰시오. (틀린 것 5개)",
   ox:[
    {n:"①", ans:"O", stmt:"프로세스 속성이 PCB에 저장되듯 파일 속성은 FCB에 저장된다. FCB는 보조기억장치(디스크)에 저장되며, open 시 그 복사본을 메인 메모리에 만들어 두고 갱신하다가 close 시 디스크로 백업(write)한다.", expl:"맞다. **FCB(=inode)**는 파일 속성을 담아 **디스크에 저장**되고, **open 시 메모리로 복사**, **close 시 디스크로 백업(write-back)**된다. PCB가 프로세스 정보를 담는 것과 대응."},
    {n:"②", ans:"O", stmt:"Compile-time binding does not allow the memory compaction in dynamic memory management. To make the compaction possible, load-time or execution-time binding must be used.", expl:"맞다. **compile-time binding**은 절대주소가 고정돼 **재배치 불가** → **compaction(압축) 불가**. 실행 중 위치를 옮기려면 **execution-time binding**(재배치 레지스터/주소변환)이 필요하다."},
    {n:"③", ans:"X", stmt:"Dynamic memory allocation에서 best fit 방법은 first fit보다 메모리 활용율이 높고 속도도 빠르다.", expl:"틀리다. **best fit**은 가장 잘 맞는 공간을 찾으려 **free list 전체를 탐색**하므로 **first fit보다 느리다.** '속도도 빠르다'를 **'더 느리다'**로 바꿔야 맞다. (게다가 작은 조각을 많이 남겨 활용율도 항상 좋다고 보기 어렵다)"},
    {n:"④", ans:"O", stmt:"Buddy system은 2의 제곱 단위로 할당하는 방식이다. Internal fragmentation이 생기지만 빠르게 할당할 수 있고, release 시 buddy가 free면 합쳐 더 큰 free 공간으로 만든다.", expl:"맞다. **buddy system**은 **2의 거듭제곱 크기**로 분할·할당해 **internal fragmentation**이 생기지만 분할·병합이 단순해 빠르고, **해제 시 짝(buddy)이 비면 병합(coalescing)**한다."},
    {n:"⑤", ans:"X", stmt:"32bit virtual memory에서 page size 4KB이면, 프로세스 생성 시 디스크에 1 Mega개(4GB/4KB) 블록을 모두 할당해 virtual address space를 저장한 후 필요한 부분만 메모리로 가져온다.", expl:"틀리다. **demand paging**은 생성 시 **가상주소공간 전체(1M 블록)를 미리 디스크에 할당·저장하지 않는다.** 실제 쓰는 페이지만 **page fault 시 적재**. '전체를 모두 할당해 저장 후'를 **'필요한 부분만 요구 시 적재'**로 바꿔야 맞다."},
    {n:"⑥", ans:"X", stmt:"page table은 OS가 메인 메모리에서 관리하며, 프로세스마다 하나씩 있어야 하고, 어떤 프로세스에서의 변환이든 그 프로세스를 구분하는 부분이 수반된다.", expl:"틀리다. page table이 메모리에 있고 프로세스마다 하나인 건 맞으나, 그 역할은 **논리주소(page#)→물리주소(frame#) 변환 매핑**이다. 변환 시 현재 실행 중인 프로세스의 page table을 그대로 쓰므로 '프로세스를 구분하는 부분이 수반된다'는 변환 설명이 오류."},
    {n:"⑦", ans:"O", stmt:"Demand paging은 전체 page를 미리 올리지 않고 page fault 시 비로소 적재하는 방식이다. locality와 disk cache 덕에 turn-around time이 크게 느려지지 않는다.", expl:"맞다. **demand paging**은 필요한 페이지만 **fault 시 적재**. **locality(지역성)**로 fault가 드물고 **disk cache**가 디스크 접근을 줄여 전체 적재 대비 손해가 크지 않다."},
    {n:"⑧", ans:"X", stmt:"inode는 파일 시스템 전체에 대한 제어 정보를 저장하므로 inode가 깨지면 파일시스템을 신뢰할 수 없다.", expl:"틀리다. **파일시스템 전체 제어 정보**(블록 크기·free block 목록·inode 개수 등)는 **inode가 아니라 superblock**에 있다. inode는 **개별 파일 하나의 메타데이터**. 'inode'를 **'superblock'**으로 바꿔야 맞다."},
    {n:"⑨", ans:"O", stmt:"page fault 수를 모니터링하여 upper/lower bound 안에 들도록 한다. lower bound보다 적게 발생하면 메모리를 너무 많이 준 것이므로 일부를 회수한다.", expl:"맞다. **PFF(Page-Fault Frequency)** 기법. fault가 **lower bound보다 적으면 프레임 과다 할당** → 일부 회수, **upper bound보다 많으면 프레임 추가**."},
    {n:"⑩", ans:"X", stmt:"While the non-preemptive scheduling gives better response time, the preemptive scheduling gives better throughput.", expl:"틀리다. 설명이 **뒤바뀜**. **preemptive(선점)**가 짧은/대화형 작업을 빨리 처리해 **response time이 좋고**, **non-preemptive**는 context switch가 적어 **throughput에 유리**. 둘을 서로 바꿔야 맞다."}
   ],
   a:"① O — FCB는 디스크 저장, open 시 메모리 복사, close 시 백업\n② O — compile-time binding은 compaction 불가, execution-time 필요\n③ X — best fit은 전체 탐색이라 first fit보다 느림\n④ O — buddy는 2^k 할당, internal 단편화, 해제 시 buddy 병합\n⑤ X — 생성 시 전체 할당이 아니라 demand paging으로 필요분만 적재\n⑥ X — page table은 논리→물리 변환 매핑, '프로세스 구분 수반' 설명 오류\n⑦ O — demand paging은 locality·disk cache로 turn-around 손해 적음\n⑧ X — 파일시스템 전체 제어 정보는 inode가 아니라 superblock\n⑨ O — PFF로 lower bound 미만이면 프레임 회수\n⑩ X — response time=preemptive, throughput=non-preemptive로 뒤바뀜",
   expl:"틀린 것 5개 = ③⑤⑥⑧⑩. 단골: ③ best fit이 더 느림 / ⑤ 생성 시 전체 미할당(demand paging) / ⑥ page table 변환 설명 / ⑧ 전체 제어=superblock / ⑩ 선점·비선점과 response/throughput 짝 뒤바뀜.",
   crit:"각 1~4점. **틀린 번호(③⑤⑥⑧⑩)를 맞히고** 이유를 올바른 용어로.\n**필수 키워드** — ③ best fit=전체 탐색→느림 / ⑤ demand paging(생성 시 전체 미할당) / ⑥ page table=논리(page#)→물리(frame#) 변환 / ⑧ superblock(≠inode) / ⑩ preemptive=response↑, non-preemptive=throughput↑"},

  {n:"2", pts:"10점", tags:["프로세스","상태도","그림"],
   q:"강의노트에 소개된 7개 상태로 구성된 프로세스 상태도를 그리고, 프로세스 스케줄러 3종류(long/medium/short-term)의 위치를 적절히 표시하시오. (상태 이름과 상태 변화를 정확히 쓸 것)",
   afig: examFig7StateSchedAns,
   a:"강의노트 49페이지 그림. 7상태(New, Ready, Running, Blocked, Exit, Ready-suspend, Blocked-suspend).\n- Long-term scheduler: New → Ready(admit) 위치\n- Medium-term scheduler: suspend/activate(swap) 위치 — 특히 Blocked-suspend → Blocked로 갈 때 표시 필요\n- Short-term scheduler: Ready → Running(dispatch) 위치\n단, New에서 Ready-suspend로 가는 long-term scheduling 표시는 해도 되고 안 해도 됨.",
   crit:"상태도 정확도 0~5점, 스케줄러 이름·위치 정확도 0~5점. Blocked-suspend→Blocked에 mid-term scheduling 표시 필요.",
   expl:"long=입장(admit), medium=swap(suspend/activate), short=dispatch."},

  {n:"3", pts:"15점", tags:["파일관리","계산","inode"],
   q:"UNIX file system의 block size가 2,048byte이고 정수(블록 번호) 표현에 4byte가 필요하다고 하자. 이 파일시스템에서 표현 가능한 파일의 최대 크기를 구하시오. (단위를 명확히 표시할 것)",
   qfig: examFigInodeAddr,
   a:"한 블록당 저장 가능한 블록 번호 개수 = 2048 / 4 = 512개.\nUNIX inode = direct 10개 + single + double + triple indirect.\n- direct: 10 × 2KB = 20 KB\n- single indirect: 512 × 2KB = 1024 KB = 1 MB\n- double indirect: 512 × 512 × 2KB = 512 MB\n- triple indirect: 512 × 512 × 512 × 2KB = 512 × 512 MB (≈ 256 GB)\n\n최대 파일 크기 = 20KB + 1MB + 512MB + (512²×512×2KB)\n             = (10 + 512 + 512² + 512³) × 2KB",
   crit:"설명·수식 정확도에 따라 0~15점. 한 블록당 주소 개수(512), 4단계 합산이 핵심.",
   expl:"한 블록당 주소 개수 = block size / 정수크기 = 2048/4 = 512. 각 단계 ×512씩 증가."},

  {n:"4", pts:"20점 (각 1점, 최대 20점)", tags:["입출력","비교표","그림"],
   q:"아래 표의 각 항목에 대해 Programmed I/O / Interrupt-driven I/O / DMA 별로 해당하면 O, 아니면 X를 채우시오. (마지막 행은 ①다량 데이터 ②빠른 입출력 ③느린 입출력 중 최적 사례를 고름)",
   afig: examFigIOTableAns,
   a:"I/O 개시 후 context switch:    Prog=X  Int=O  DMA=O\nI/O 완료 후 interrupt 발생:     Prog=X  Int=O  DMA=O\nI/O 완료로 인한 context switch: Prog=X  Int=O  DMA=O\nBusy waiting 이용:             Prog=O  Int=X  DMA=X\n데이터를 장치→메모리 저장을 CPU가: Prog=O  Int=O  DMA=X\nDevice driver 필요:            Prog=O  Int=O  DMA=O\n최적 입출력 사례:              Prog=②빠른  Int=③느린  DMA=①다량",
   crit:"맞은 것 하나당 1점, 최대 20점.",
   expl:"DMA만 데이터 전송에 CPU 비관여. polling(Programmed)만 busy waiting. device driver는 셋 다 필요."},

  {n:"5", pts:"각 0~5점", tags:["입출력","OX","인터럽트"],
   q:"인터럽트 처리 OX — 틀린 것을 고르고 이유를 쓰시오.",
   oxIntro:"인터럽트 처리에 관한 설명 중 틀린 것의 번호를 고르고 이유를 쓰시오. (보기 (1),(4)만 복원됨)",
   ox:[
    {n:"(1)", ans:"X", stmt:"인터럽트가 발생하면 context switch를 하여 interrupt handler를 실행한다.", expl:"틀리다. 인터럽트 발생 시는 **context switch가 아니라 mode change(모드 전환)**. 현재 프로세스의 최소 상태만 저장하고 **user→kernel mode**로 전환해 같은 흐름에서 ISR을 실행한다. (context switch는 프로세스 자체를 교체하는 것 — 인터럽트 처리 후 스케줄러가 결정할 때나 일어남)"},
    {n:"(4)", ans:"X", stmt:"진행 중인 인터럽트 처리를 끝마친 후 새 인터럽트 처리를 시작한다.", expl:"틀리다. 우선순위 높은 새 인터럽트는 진행 중 처리를 **끝마치기 전에 도중에 처리 시작**(중첩, nested). '끝마친 후'가 아니라 **'끝나기 전 선점·중첩'**이 맞다."}
   ],
   a:"(1) X — 인터럽트 발생 시는 context switch가 아니라 mode change(모드 전환)\n(4) X — 끝마친 후가 아니라 끝마치기 전에 우선순위 따라 새 인터럽트를 중첩 처리",
   expl:"단골 함정: 인터럽트=context switch(✕, mode change) / 인터럽트는 끝낸 뒤 처리(✕, 끝나기 전 중첩). 둘 다 뒤집힌 서술이라 X.",
   crit:"각 0~5점. **틀린 번호를 고르고** 이유를 올바른 용어로.\n**필수 키워드** — (1) context switch가 아니라 mode change / (4) 끝내기 전 nested(중첩) 인터럽트"},

  {n:"6", pts:"10점", tags:["가상메모리","계산","2단계페이징","그림"],
   q:"2단계 페이징 시스템에서 logical address가 [p1 | p2 | page offset] = [8비트 | 11비트 | 13비트]로 분할된다.\n(1) p1, p2, page offset 각각의 이름과 용도를 쓰고, 비트 길이의 계산 근거를 보이시오.\n(2) [추론] 주어진 수치로 effective access time 또는 주소 변환 과정을 계산/설명하시오.",
   afig: examFig2LevelPaging20Ans,
   a:"**비트 분할**: [ p1 8비트 (outer index) | p2 11비트 (page table index) | offset 13비트 ]\n**계산 근거**:\n- offset: 페이지 크기 8KB = 2¹³ → **13비트**\n- p2(inner): PTE 4byte → 한 페이지(8KB)에 8KB/4 = 2¹¹ = 2048개 → **11비트**\n- p1(outer): 32 − 13 − 11 = **8비트**\n**각 부분 용도**: p1=outer table에서 어느 inner table인지 / p2=inner table에서 frame# / offset=frame 안 byte 위치(그대로 복사).",
   crit:"비트 분할 **8 / 11 / 13** + 계산 근거(8KB=2¹³, 8KB/4=2¹¹) + 각 부분 의미.\n**필수** — offset 13(8KB), p2 11(8KB/PTE 4byte), p1 8(나머지).",
   expl:"2단계 페이징 비트 분할의 기본형. offset=log₂(page크기), p2=log₂(page÷PTE), p1=나머지. 함정: PTE 크기(4byte)로 inner 비트 계산하는 걸 빠뜨리기."},
]},

/* ============================ 2020 연계 ============================ */
{id:"e2020y", year:"2020연계", title:"2020학년도 운영체제 기말고사 (연계)", meta:"연계(공유대학) · 60분 · 문제+답 통합본", tag:"exam", items:[

  {n:"1", pts:"36점", tags:["종합","빈칸/OX"],
   q:"아래 각 항목의 빈 칸·정오를 판단하고 이유를 쓰시오.\n① 주소 binding: execution time binding이 가장 유연하나 속도가 느려 상용 OS는 다른 방식을 이용한다.\n② deadlock 발생 조건: 자원 A를 P1이 점유 중이고 공유 불가(mutual exclusion), 강제로 뺏을 수 없으며(no preemption), A를 가진 P1이 B를 기다리고(hold and wait), B는 P2가 가졌고 P2가 A를 기다리는(circular wait) 상황에서 deadlock 가능.\n③ Disk scheduling의 목적은 rotational delay를 줄이는 것이다. SSTF와 Scan은 성능이 비슷하나 SSTF는 starvation이 있어 Scan이 일반적이다.\n④ 페이징에서 logical address = page number + page offset, 변환에 page table 이용, running 프로세스의 page table을 가리켜 관리한다.\n⑤ virtual memory의 이점: 프로세스 크기가 물리 메모리에 제한받지 않고 degree of multiprogramming을 높인다.\n⑥ virtual memory 단점: page fault 시 디스크 read 동안 프로세스가 wait. locality로 완화 가능.\n⑦~⑫ [일부 추론]",
   a:"① O — execution time binding이 가장 유연하나 느림.\n② O — deadlock 4조건(상호배제·비선점·점유대기·순환대기) 정확.\n③ X — disk scheduling의 1차 목적은 rotational delay가 아니라 seek time 단축. (SSTF starvation·Scan 설명은 맞음)\n④ O.  ⑤ O.  ⑥ O.\n⑩ X — 파일시스템 전체 크기/data block 정보는 inode가 아니라 superblock.\n⑫ X — process termination은 preemptive가 아니라 non-preemptive.\n③ (대처) 대부분 상용 OS는 deadlock 탐지·회복이 아니라 무시(ostrich) 방식을 쓰기도 함.",
   crit:"항목별 빈칸·정오와 이유. 핵심: ③(seek time), ⑩(superblock), ⑫(non-preemptive)."},

  {n:"2", pts:"0~7점", tags:["입출력","서술","device driver"],
   q:"운영체제를 개발할 때 세상의 모든 입출력 장치 제어 기능을 운영체제 안에 다 포함하도록 구현하는 것이 불가능한 이유를 설명하고, device driver를 kernel의 I/O subsystem과 분리해 구현하는 방식의 장점을 설명하시오.",
   a:"**불가능한 이유**: 입출력 장치는 종류가 매우 많고 **미래에 새로 등장할 장치까지 OS가 미리 다 알 수 없으므로**, 모든 장치 제어 코드를 OS 안에 내장하는 것은 불가능하다.\n**분리 방식의 장점**: 장치별 제어 로직을 **device driver로 분리**하면 ① 제조사가 **자기 장치 driver를 직접 구현해 kernel에 plug-in**하고 ② kernel I/O subsystem은 **표준 인터페이스(DDI)**만 정의하면 되어, 새 장치가 나와도 **OS 본체를 수정·재컴파일하지 않고** 일관되게 제어(확장성·이식성).",
   crit:"불가능 이유(미래/모든 장치를 미리 알 수 없음) + 분리 장점(제조사 driver 구현·표준 인터페이스로 OS 무수정 확장).\n**필수 키워드** — 미래 장치 예측 불가, device driver 분리, 표준 인터페이스(DDI), OS 본체 수정 없이 확장.",
   expl:"이것이 **DDI(Device Driver Interface)** — device I/O를 device file I/O로 추상화해 통일된 read/write로 모든 장치를 다룸. 새 장치 = 새 driver 추가만으로 지원."},

  {n:"3", pts:"10점", tags:["파일관리","비교표","그림"],
   q:"contiguous allocation과 indexed allocation을 비교하는 아래 표의 빈 칸을 채우시오. (file size 증가 용이성 / External fragmentation 가능 여부 / 안정성 / 필요한 data block 공간 / 순차 access 속도)",
   afig: examFigAllocTableAns,
   a:"**contiguous allocation**: 파일 크기 증가 **어려움** / External fragmentation **발생(Yes)** / 안정성 **좋음**(시작주소+길이만) / data block 공간 **적음**(인덱스 불필요) / 순차 access **빠름**(연속 저장).\n**indexed allocation**: 크기 증가 **쉬움**(포인터 추가) / External fragmentation **없음(No)** / 안정성 **상대적 낮음**(index block 손상 시 영향) / data block 공간 **많음**(index block 추가) / 순차 access **상대적 느림**(흩어짐).",
   crit:"칸당 1점(총 10점, 5항목×2방식).\n**필수** — contiguous=(증가 어려움/External Yes/공간 적음/순차 빠름), indexed=(증가 쉬움/External No/공간 많음/순차 느림).",
   expl:"contiguous=연속 저장→순차 빠르고 공간 효율 좋으나 외부 단편화·확장 어려움. indexed=분산+index block→단편화·확장 해결하나 index 공간 비용·순차 저하."},

  {n:"4", pts:"10점", tags:["입출력","OX","인터럽트"],
   q:"인터럽트 처리 OX — 틀린 것 2개를 고르고 각각 이유를 쓰시오.",
   oxIntro:"①~④ 중 틀린 것 2개를 모두 고르고 각각 틀린 이유를 쓰시오. (맞은 것을 틀렸다고 고르면 문항당 3점 감점)",
   ox:[
    {n:"①", ans:"X", stmt:"인터럽트가 발생하면 context switch를 하여 interrupt handler를 실행함으로써 원인을 알아낸다.", expl:"틀리다. 인터럽트 발생 시는 **context switch가 아니라 mode change(모드 전환)**. 같은 프로세스 흐름에서 **user→kernel mode**로만 전환해 ISR을 실행한다. 'context switch'라는 용어가 오답 포인트."},
    {n:"②", ans:"O", stmt:"Interrupt Descriptor Table을 거쳐 원인에 해당하는 ISR을 실행한다.", expl:"맞다. CPU는 인터럽트 번호로 **IDT**를 조회해 원인에 맞는 **ISR 주소**를 찾아 실행한다. 정상적인 디스패치 과정."},
    {n:"③", ans:"X", stmt:"인터럽트 처리 중 새 인터럽트가 발생하면 진행 중 처리를 끝마친 후 IDT를 조회한다.", expl:"틀리다. 우선순위 높은 새 인터럽트는 진행 중 처리를 **끝마치기 전에 도중에 IDT 조회·중첩 처리**할 수 있다. '끝마친 후'가 틀린 부분."},
    {n:"④", ans:"O", stmt:"인터럽트가 여러 개 중복 발생 시 모두 끝낸 후 마지막에 process scheduler를 실행하고 user 프로그램을 실행한다.", expl:"맞다. 중첩 인터럽트를 모두 처리해 마치면 **scheduler**로 다음 프로세스를 정하고 **user mode로 복귀**해 user 프로그램을 이어 실행한다. 정상 흐름."}
   ],
   a:"틀린 것: ①, ③\n① X — 인터럽트 발생 시는 context switch가 아니라 mode change\n② O — IDT를 거쳐 원인에 맞는 ISR 실행(정상)\n③ X — 끝마친 후가 아니라 끝마치기 전에 IDT 조회·중첩 처리\n④ O — 모두 끝낸 뒤 scheduler 실행하고 user 복귀(정상)",
   expl:"단골 함정: ① 인터럽트=context switch(✕, mode change) / ③ 끝낸 뒤 IDT 조회(✕, 끝나기 전 중첩). 정상(②④) vs 뒤집힘(①③) 구분. 정답 ①③.",
   crit:"10점. **틀린 것 ①③을 모두 고르고** 각각 이유를 올바른 용어로(맞은 것을 틀렸다 하면 문항당 3점 감점).\n**필수 키워드** — ① context switch가 아니라 mode change / ③ 끝내기 전 nested(중첩) 인터럽트·IDT 재조회"},

  {n:"5", pts:"10점", tags:["입출력","빈칸"],
   q:"빈 칸에 들어갈 용어를 쓰시오.\n(1) 최근 access한 디스크 블록을 저장하는 커널 메모리 공간으로 디스크 입출력 성능을 높이는 것은 ( )이다.\n(2) 수업에서 배운 입출력 제어 방법 3가지는 ( ), ( ), ( )이고, 일반 응용 프로그램에 이용되는 것은 이 중 ( )이다.",
   a:"(1) **buffer cache**(disk cache, 디스크 캐시)\n(2) 세 가지 = **programmed I/O(polling)**, **interrupt-driven I/O**, **DMA** / 일반 응용에 이용되는 것 = **interrupt-driven I/O**.",
   crit:"(1) 1칸, (2) 4칸(방법 3 + 일반 응용 1), 총 10점.\n**필수 정답** — buffer cache / programmed I/O·interrupt-driven I/O·DMA / (일반 응용) interrupt-driven I/O.",
   expl:"buffer cache는 최근 디스크 블록을 메모리에 캐싱해 반복 접근 가속. I/O 3방식: programmed I/O=busy waiting(비효율), interrupt-driven=완료 시 인터럽트(일반 응용 적합), DMA=대용량을 CPU 개입 없이. 함정: 일반 응용용을 DMA로 적기."},

  {n:"6", pts:"20점", tags:["메모리","계산","페이징","그림"],
   q:"16bit address, page size 2,048byte 시스템에서 logical address = 0010 0110 0001 0110 이고 page table이 (0→4, 1→15, 2→6, 3→27, 4→3, 5→14, 6→10) 일 때, physical address를 이진수로 구하는 과정을 그림으로 보이시오.",
   afig: examFigPageTrans20yAns,
   a:"단계별 풀이:\n① page size 2,048 = 2¹¹ → **offset 11비트**, page number = 16−11 = **5비트**\n② logical 0010 0110 0001 0110 을 5+11로 분할: page# = **00100**, offset = **110 0001 0110**\n③ page# 00100 = **4** → page table[4] = **3** → frame# = **00011**(5비트)\n④ offset은 변환 없이 그대로 복사 → 110 0001 0110\n⑤ physical = frame ‖ offset = **00011 110 0001 0110**",
   crit:"과정 단계별 표시(20점).\n**필수** — offset 11비트·page# 5비트 산출, page#=4 추출, page table[4]=frame **3=00011** 치환, offset 그대로 유지, 최종 physical = **00011 110 0001 0110**.",
   expl:"페이징 핵심: **offset은 변하지 않고 page number만 frame number로 교체**. 함정: ① page size로 offset 비트수(2¹¹→11) 잘못 잡아 경계 틀림 ② frame을 5비트 zero-padding 안 함 ③ page table 인덱스를 frame 값으로 착각."},
]},

/* ============================ 2019 ============================ */
{id:"e2019", year:"2019", title:"2019학년도 1학기 운영체제 기말고사", meta:"2019.6.18 · 75분 · single CPU 대상", tag:"exam",
 note:"문제지 사진이 저화질·회전이라 1~3번 일부 보기는 답안/채점기준 기준으로 의미 복원([추론]). 4~8번은 비교적 선명.", items:[

  {n:"1", pts:"20점 (각 4점)", tags:["종합","OX","영문"],
   q:"종합 True/False — 맞으면 O(True), 틀리면 X(False).",
   oxIntro:"각 문장의 True/False를 판단하고, 틀리면 이유를 올바른 용어로 설명할 수 있어야 합니다.",
   ox:[
    {n:"①", ans:"O", stmt:"When a write operation is made by polling method, the device driver repeatedly reads the busy bit, writes a byte into the data-out register, sets the command-ready bit; the controller then sets the busy bit and does output.", expl:"맞다(True). **폴링 write 절차**: 드라이버가 ① **busy bit가 0이 될 때까지 반복 확인**(busy-waiting) → ② **data-out register에 1바이트 쓰기** → ③ **command-ready bit set** → 컨트롤러가 **busy bit set** 후 **출력 수행**. 핸드셰이킹 순서가 정확하다."},
    {n:"②", ans:"X", stmt:"Round robin에서 time slice가 작아질수록 throughput은 올라가고 평균 response time은 줄어든다.", expl:"틀리다(False). time slice가 작아지면 **context switch 횟수 급증** → 오버헤드로 **throughput은 오히려 감소**한다. 작아져서 좋아지는 건 **response time**뿐. 'throughput이 올라간다'가 틀린 부분."},
    {n:"③", ans:"O", stmt:"In interrupt-driven I/O, the kernel puts the process to sleep until data arrives and gives the CPU to another process; when the device finishes, it interrupts the CPU.", expl:"맞다(True). 폴링과 달리 busy-wait하지 않고, 커널이 I/O 요청 프로세스를 **sleep(blocked)**시키고 **CPU를 다른 프로세스에 양도**. 장치가 끝나면 **인터럽트로 완료를 알림** → ISR 실행, 대기 프로세스 깨어남."},
    {n:"④", ans:"X", stmt:"인터럽트 처리 중 새 인터럽트가 발생하면 kernel은 진행 중 루틴 복귀 후 새 인터럽트를 처리한다.", expl:"틀리다(False). 더 높은 우선순위 인터럽트는 진행 중 처리를 **끝마치기 전에 중첩(nested) 선점**해 먼저 처리할 수 있다. '진행 중 루틴 복귀 후'가 아니라 **'도중에 새 인터럽트 처리'**가 맞다."},
    {n:"⑤", ans:"O", stmt:"32bit virtual memory에서 1 Mega개 엔트리의 단순 page table을 쓸 때 주소 공간을 다 안 쓰면 메모리 낭비가 생긴다.", expl:"맞다(True). 32비트+4KB면 page#가 20비트라 **단일 1단계 page table은 약 2²⁰≈1M개 엔트리**를 항상 통째로 가짐. 실제로 일부만 써도 **안 쓰는 영역 엔트리까지 차지** → 낭비. 그래서 **multi-level/inverted page table**을 도입."},
    {n:"⑥", ans:"O", stmt:"Thrashing means the processor spends most of its time swapping pages in/out rather than executing instructions.", expl:"맞다(True). **thrashing 정의**: 프레임 부족으로 **page fault 폭증** → CPU가 명령 실행보다 **page swap in/out에 대부분 시간**을 씀. working-set/PFF로 multiprogramming 정도를 조절해 막는다."}
   ],
   a:"① O — 폴링 write 핸드셰이킹 순서 정확\n② X — time slice 작아지면 context switch↑로 throughput 하락(response time만 짧아짐)\n③ O — interrupt-driven: 프로세스 sleep 후 CPU 양도, 완료 시 인터럽트\n④ X — 진행 중 처리를 끝내기 전에 우선순위 따라 중첩 처리\n⑤ O — 단순 1단계 page table은 안 쓰는 영역도 엔트리 차지해 낭비\n⑥ O — thrashing 정의(대부분 시간을 swap in/out에 소비) 정확",
   expl:"단골 함정: ② time slice↓ → throughput↓(올라간다✕) / ④ 인터럽트는 끝낸 뒤가 아니라 끝나기 전에 우선순위로 중첩 처리. 정상 서술(①③⑤⑥) vs 뒤집힌 서술(②④) 구분이 핵심.",
   crit:"각 4점. **정답(O/X)을 맞히고** 틀린 것(②④)은 이유를 올바른 용어로.\n**필수 키워드** — ② context switch↑로 throughput↓ / ④ 우선순위에 따른 nested(중첩) 인터럽트, 끝내기 '전' 처리"},

  {n:"2", pts:"15점", tags:["파일관리","계산","inode","그림"],
   q:"FCB를 UNIX inode처럼 사용하는 파일시스템에서, (1) 주어진 inode의 direct/indirect 구조를 따라 특정 논리 블록 번호에 해당하는 실제 디스크 블록 번호를 구하시오. (2) block size 4096byte, 블록 주소 4byte일 때 single/double/triple indirect로 표현 가능한 최대 파일 크기를 계산 과정과 함께 구하시오.",
   qfig: examFigInodeAddr,
   a:"**핵심 공식**: 최대 파일 크기 = (direct + single×N + double×N² + triple×N³) × block_size, N = block_size / 주소크기.\n\n**(1) 논리→물리 블록 매핑** (인덱스 블록당 주소 수 N = 4096/4 = 1024):\n- L < 10 → **direct**: inode의 direct[L] 값이 곧 디스크 블록 번호.\n- 10 ≤ L < 10+1024 → **single indirect**: 인덱스 블록 읽어 (L−10)번째 주소.\n- 그 위 ≤ +1024² → **double indirect**: 인덱스 2단계.\n- 그 위 ≤ +1024³ → **triple indirect**: 인덱스 3단계.\n\n**(2) 최대 파일 크기**:\n- direct 10블록 / single 1024 / double 1024²=1,048,576 / triple 1024³=1,073,741,824\n- 총 ≈ (10 + 1024 + 1024² + 1024³) × 4096 ≈ **4TB** (triple이 지배).",
   crit:"인덱스 블록당 주소 수 **N = 4096/4 = 1024** 명시. 4단계(direct 10 / single N / double N² / triple N³) 블록 수 합산 + × block_size(4096). 최대 ≈ 4TB. (1)은 L 구간별 direct/single/double/triple 판별.\n**필수 키워드** — N=1024, 4단계 합산, ×4096, ≈4TB.",
   expl:"block 4KB·주소 4byte → 슬롯 N=1024. 단계마다 ×1024(N,N²,N³). 함정: ① block÷주소를 빠뜨리고 1024 암기 ② direct·single·double을 빼고 triple만 계산 ③ 블록 vs byte 단위 혼동."},

  {n:"3", pts:"10점", tags:["입출력","디스크스케줄링","서술"],
   q:"Disk scheduling 알고리즘 중 SSTF에서 발생할 수 있는 starvation(기아)을 설명하고, 이를 방지할 수 있는 방안을 설명하시오.",
   a:"**SSTF(Shortest Seek Time First)**는 현재 헤드 위치에서 **seek time이 가장 짧은(가장 가까운 실린더의) 요청**을 우선 처리한다.\n\n**Starvation 발생 원리**: 헤드 근처에 새 요청이 계속 도착하면 SSTF는 항상 가까운 요청만 선택하므로, 멀리 떨어진 요청은 계속 뒤로 밀려 **무한정 서비스받지 못하는** 기아 상태에 빠진다. 거리만 기준으로 삼고 '대기 시간'을 고려하지 않아 공정성이 깨진다.\n\n**방지책**:\n- **SCAN / C-SCAN(엘리베이터)**: 헤드가 한 방향으로 끝까지 이동하며 도중 요청을 처리 → 멀리 있는 요청도 그 방향을 지날 때 반드시 처리됨.\n- **Aging**: 요청 대기 시간을 우선순위에 반영해 오래 기다릴수록 우선 처리.",
   crit:"① SSTF 정의(가장 가까운/seek 최소 요청 우선) ② starvation 발생 원리(가까운 요청 계속 도착→먼 요청 무한 대기) ③ 방지책(SCAN/C-SCAN 또는 aging) — 세 요소 모두 있어야 만점.\n**필수 키워드** — seek 최소 우선, 먼 요청 무한 대기, SCAN/C-SCAN(방향성) 또는 aging(대기시간 반영).",
   expl:"SSTF=가까운 것 우선 → 거리만 보고 대기시간 무시 → 먼 요청 굶음. SCAN은 헤드를 한 방향으로 쓸고 지나가며 모든 요청을 보장해 starvation이 구조적으로 불가능. 함정: FCFS는 starvation 없지만 비효율, SSTF는 효율적이나 starvation 있음 — trade-off."},

  {n:"4", pts:"20점", tags:["가상메모리","계산","TLB","그림"],
   q:"32bit address 컴퓨터가 TLB를 이용하는데 page size가 16K byte라 하자. 이 시스템의 page table 엔트리 하나의 길이는 8 byte이다. Demand paging 방식을 사용할 때, (20점)\n(1) logical address 구성을 설계하시오. 각 부분의 이름·비트 수를 그림으로 보이고, 각 부분이 무엇하는 데 이용되는지를 쓰고, 비트 수 계산 과정을 보이시오.\n(2) logical address로부터 주소변환이 이루어지는 과정을 그림으로 자세히 보이시오. (별도 설명은 필요 없으나 TLB로의 입력 비트 수, 페이지 테이블의 최소·최대 인덱스 값 등을 그림에 자세히 표현할 것)\n(3) TLB 액세스 시간 0.05μs, hit ratio 0.9, 메인 메모리 액세스 시간 1μs일 때 effective access time을 수식으로 보이시오.",
   afig: examFigTLB19Ans,
   a:"(1) 구성 = [ p1 7비트 | p2 11비트 | offset 14비트 ] (합 32).\n  **비트 수 계산**:\n  - offset: page 16KB = 2¹⁴ → 14비트\n  - p2(inner): PTE 8byte → 한 페이지(16KB)에 PTE 16KB/8B = 2¹¹ = 2048개 → 11비트\n  - p1(outer): 남은 32 − 14 − 11 = 7비트\n  **각 부분 용도**:\n  - **p1 (7)** = 바깥(outer) 페이지테이블 인덱스 → '여러 안쪽 테이블 중 어느 inner table'인지 선택\n  - **p2 (11)** = 안쪽(inner) 페이지테이블 인덱스 → 그 inner table에서 PTE 한 칸 골라 'frame number' 획득\n  - **offset (14)** = frame(=page) 안에서의 byte 위치 → 변환 없이 그대로 physical address 하위에 복사\n  흐름: p1로 inner table 찾고 → p2로 frame# 찾고 → offset으로 그 frame 안 정확한 byte.\n(2) p1(7)으로 outer table → inner table 위치, p2(11)로 inner table에서 frame#, offset(14) 그대로 붙여 physical address.\n  TLB 입력 = page number = p1+p2 = **18비트**.\n  outer 인덱스: 최소 0 ~ 최대 2⁷−1 = **127**. inner 인덱스: 최소 0 ~ 최대 2¹¹−1 = **2047**.\n(3) EAT = (0.05 + 1) × 0.9 + (0.05 + 3) × 0.1 = 0.945 + 0.305 = **1.25 μs**.\n   (TLB hit: ε+메모리 1회. TLB miss: ε + 페이지테이블 2회(outer+inner) + 데이터 1회 = ε + 3.)",
   crit:"(1) offset 14·p2 11·p1 7 + 각 부분 용도·계산과정. (2) 변환 그림 + TLB 입력 18비트 + outer 0~127 / inner 0~2047. (3) EAT 수식 1.25μs. ※핵심: PTE 8byte → inner = 16KB/8B = 2¹¹ = 11비트 (4byte로 착각 주의).",
   expl:"PTE 8byte가 함정. inner = log₂(page÷PTE) = log₂(16KB/8B) = 11비트. 2단계 miss 시 메모리 3회(테이블2+데이터1)."},

  {n:"5", pts:"10점", tags:["메모리","서술","단편화"],
   q:"가상 메모리를 안 쓰는 컴퓨터의 메모리 관리에서, (1) internal fragmentation이 발생할 수 있는 메모리 관리 기법 3가지, (2) 그 장단점, (3) 그 중 external fragmentation 개수를 줄이는 기법과 이유를 쓰시오.",
   a:"**(1) Internal fragmentation 발생 기법 3가지**:\n- **고정 분할(fixed partitioning)** / **페이징(paging)** / **버디 시스템(buddy system)**\n- 셋 다 **고정(정해진) 크기 단위 할당** → 요청이 블록에 딱 안 맞으면 블록 내부에 빈 공간 발생.\n\n**(2) 장단점**:\n- internal = 할당된 블록 **내부** 낭비 / external = 메모리 **외부**에 흩어진 빈 공간.\n- 장점: 관리 단순, external 크게 감소/제거. 단점: 요청·블록 크기 불일치 시 internal 낭비(블록 클수록↑).\n\n**(3) External을 줄이는 기법 = 페이징**:\n- 동일 크기 **프레임**으로 나눠 **아무 빈 프레임에나 비연속 배치** → 흩어진 빈 프레임도 다 활용 → **external ≈ 0**. (마지막 페이지에 소량 internal만)",
   crit:"(1) **고정 분할·페이징·버디 시스템** 3가지. (2) internal(내부)·external(외부) 구분 + 장단점. (3) **페이징** 지목 + 고정 프레임 비연속 배치로 external 제거 이유.\n**필수 키워드** — 고정 크기 프레임, 비연속 할당, external≈0/internal만 남음.",
   expl:"셋 다 '고정 크기 할당→internal 발생' 공통. 페이징이 external 제거하는 이유=프레임 단위+비연속 배치. 함정: ① internal/external 반대 설명 ② 페이징은 external '제거'(줄임 아님), 대신 internal 소량 ③ 가변 분할은 external 주범이라 답 아님."},

  {n:"6", pts:"10점", tags:["가상메모리","페이지교체","표"],
   q:"page frame 4개를 쓰는 프로세스의 frame 정보가 아래와 같다. (1) LRU, (2) Second chance(0번부터), (3) Enhanced second chance(0번부터)로 replace될 page 번호를 구하시오.",
   qfig: examFigPageReplaceQ, afig: examFigPageReplaceAns,
   a:"**주어진 표**: P0(Load110, 최근260, Ref1, Mod0) P1(210,240,0,0) P2(126,230,0,0) P3(165,264,1,1).\n\n**(1) LRU** — 최근 access 시각 최소 페이지 교체: 260/240/**230**/264 → **Page 2**.\n**(2) Second chance(0번부터, ref bit만)** — ref=1은 0으로 클리어 후 통과, ref=0 첫 만남 교체: P0(ref1→클리어 통과) → P1(ref0) → **Page 1**.\n**(3) Enhanced((ref,mod) (0,0)>(0,1)>(1,0)>(1,1), 0번부터)** — (ref,mod): P0(1,0) **P1(0,0)** P2(0,0) P3(1,1). 최우선 (0,0) 중 0번부터 첫 만남 → **Page 1**. (P2도 (0,0)이나 P1이 먼저)",
   crit:"(1) LRU=최근 access 최소 → **Page 2**(230 근거). (2) Second chance=0번부터, ref0 첫 만남 → **Page 1**. (3) Enhanced=(0,0) 최우선, 0번부터 첫 → **Page 1**. 세 답(2,1,1)+근거.",
   expl:"LRU는 'Load 시각' 아니라 '최근 access 시각' 최소(Load 110 P0에 낚이지 말 것). Second chance는 ref=1에 2번째 기회 주는 FIFO 변형(0번 순서 결정적). Enhanced는 (0,0)이 최우선(참조·수정 안 됨→버리기 좋음), P1·P2 동급이나 인덱스 작은 P1."},

  {n:"7", pts:"10점", tags:["입출력","서술","system call"],
   q:"System call 처리 방법을 설명하시오. 예: 3번 시스템 콜을 사용하는 프로그램이 커널의 3번 시스템 콜에 진입하기까지의 과정을, 이용되는 자료구조와 함께 자세히 설명하시오.",
   a:"**3번 시스템 콜 진입 과정 (자료구조 포함)**:\n1. 사용자 프로그램이 콜 **번호 3을 레지스터에 넣고** trap/소프트웨어 인터럽트(int 0x80 / syscall) 실행 → **user→kernel 모드 전환**.\n2. CPU가 **IDT(Interrupt Descriptor Table)**에서 trap 벡터에 대응하는 system_call 핸들러 주소를 찾아 진입.\n3. system_call 핸들러가 **콜 번호 3을 인덱스**로 **system call table(sys_call_table)**에서 실제 커널 함수 주소를 찾아 호출.\n4. 함수가 처리 후 **반환값을 레지스터에 담고** iret 등으로 **kernel→user 모드 복귀**.\n\n**핵심 자료구조 2개**: **IDT**(벡터→핸들러 주소), **system call table**(콜 번호→커널 함수 주소).",
   crit:"흐름(번호를 레지스터→trap→모드전환→핸들러→테이블 조회→함수 호출→복귀) + 자료구조 **IDT**·**sys_call_table** 두 개와 역할.\n**필수 키워드** — IDT, system call table, user↔kernel 모드 전환, 2단계 매핑.",
   expl:"본질은 '콜 번호 → IDT로 공통 핸들러 진입 → sys_call_table에서 번호로 실제 함수 분기'의 **2단계 매핑**. 함정: 일반 인터럽트는 IDT만으로 핸들러 직행이지만, 시스템 콜은 단일 system_call 핸들러로 먼저 간 뒤 sys_call_table을 한 번 더 인덱싱."},

  {n:"8", pts:"10점", tags:["스케줄링","계산","Gantt","표"],
   q:"다음과 같이 프로세스가 도착했을 때 ① Round Robin(time quantum 2), ② Priority scheduling(preemptive)에 대해 (1) Gantt chart를 그리고 (2) 각 프로세스의 waiting/turnaround time 표를 완성하시오. (Priority는 숫자가 작을수록 높음)",
   qfig: examFigSched19Q,
   a:"**프로세스**: P1(도착0,서비스2,우선5) P2(3,6,3) P3(4,3,1) P4(4,2,2) P5(5,6,4). 우선순위 숫자 작을수록 높음.\n**공식**: turnaround=완료−도착, waiting=turnaround−service.\n\n**① Round Robin (TQ=2)**\n간트: P1[0–2] (idle 2–3) P2[3–5] P3[5–7] P4[7–9] P5[9–11] P2[11–13] P3[13–14] P5[14–16] P2[16–18] P5[18–20].\n완료: P1=2 P4=9 P3=14 P2=18 P5=20.\nTAT/WT: P1(2/0) P2(15/9) P3(10/7) P4(5/3) P5(15/9). 평균 TAT=9.4, WT=5.6.\n\n**② Priority (preemptive, 숫자 작을수록 우선)**\n간트: P1[0–2] (idle 2–3) P2[3–4] →t=4 P3·P4 도착, P3(우선1) 선점 → P3[4–7] P4[7–9] P2[9–14] P5[14–20].\n완료: P1=2 P3=7 P4=9 P2=14 P5=20.\nTAT/WT: P1(2/0) P2(11/5) P3(3/0) P4(5/3) P5(15/9). 평균 TAT=7.2, WT=3.4.",
   crit:"① RR(TQ2): 순서 P1·P2·P3·P4·P5·P2·P3·P5·P2·P5, 완료 P1=2/P4=9/P3=14/P2=18/P5=20, WT=0/9/7/3/9. ② Priority preemptive: 순서 P1·P2·P3·P4·P2·P5, 완료 P1=2/P3=7/P4=9/P2=14/P5=20, WT=0/5/0/3/9. turnaround=완료−도착, waiting=TAT−service.\n**필수** — t=2~3 idle 반영, t=4 P3 선점, 공식 적용.",
   expl:"turnaround=완료−도착, waiting=TAT−service. RR 함정: t=2 P1종료 후 t=3까지 도착 없어 CPU idle(빠뜨리면 이후 전부 어긋남). Priority preemptive 함정: 도착 시각마다 선점 재판단 — t=4 P3(우선1) 도착 시 P2(우선3) 선점, 선점된 P2는 ready로 돌아가 남은 시간 재실행. 숫자 작을수록 우선."},
]},

/* ============================ 2018 ============================ */
{id:"e2018", year:"2018", title:"2018학년도 운영체제 기말고사", meta:"2018.6.14 · 60분 · 동기화 비중 큼", tag:"exam",
 note:"이 해는 동기화(critical section/semaphore/readers-writers)와 deadlock 비중이 큼. 최근 커리큘럼과 다소 다를 수 있어 참고용.", items:[

  {n:"1", pts:"30점 (각 3점)", tags:["동기화","OX"],
   q:"아래 각 문항이 맞으면 O, 틀리면 X와 이유를 쓰시오.\n(1) Critical section을 atomic하게 실행하면 race condition이 안 생긴다.\n(2) atomic하게 보장되는 lock으로 critical section problem을 해결할 수 있고, software 해법으로 Banker's algorithm이 있다.\n(3) testset instruction은 하드웨어 지원 동기화이고, Peterson's algorithm은 software 방법이다.\n(5) Enhanced Second Chance는 LRU를 흉내내며 Second Chance보다 page fault rate가 작을 수 있다.\n(7) Buddy system은 같은 사이즈 단위로 메모리를 할당하며 release 시 buddy가 free면 합친다.\n(8) Time sharing에서 running 중 interrupt로 프로세서를 뺏기면 critical section 실행 중에는 context switch가 절대 안 일어난다.\n(10) segment table은 OS에 하나만 있으면 된다.",
   a:"(1) O.  (3) O.  (5) O.  (6) O.  (9) O.\n(2) X — software 해법은 Banker's algorithm이 아니라 Bakery algorithm. (Banker's는 deadlock 회피 알고리즘)\n(4) X — page fault rate 개선이 아니라 시스템 성능(디스크 write 시간) 개선.\n(7) X — buddy는 '같은 사이즈'가 아니라 2의 제곱 단위로 할당. (혹은 다음 scheduling time slice 누적 관련 오류)\n(8) X — critical section 실행 중에도 context switch가 발생할 수 있다.\n(10) X — segment table은 프로세스마다 하나씩 있어야 한다.",
   crit:"하나당 3점. 틀린 것 정확히 고르고 용어 교정.",
   expl:"Bakery≠Banker, buddy=2의 제곱, segment/page table=프로세스마다."},

  {n:"2", pts:"10점", tags:["동기화","Readers-Writers","코드"],
   q:"아래 Readers/Writers 코드에 대해 (1) read/write 중 어느 쪽이 동시 다중 진입 가능한지, (2) 이 코드가 정상 동작하지 못하는 이유를 설명하시오.\n\nwhile(true){\n  semWait(rsem);\n    readcount++;\n    if(readcount==1) semWait(wsem);\n    READUNIT();\n    readcount--;\n    if(readcount==0) semSignal(wsem);\n  semSignal(rsem);   // rsem, wsem 초기값 모두 1\n}",
   a:"(1) read는 다수 프로세스가 동시에 critical section 진입 가능해야 하고, write는 한 번에 한 프로세스만(상호배제) 가능해야 한다.\n(2) 첫 reader가 rsem을 잡고 들어가 read하는 동안 rsem을 계속 쥐고 있다가 나갈 때 반납하므로, 다른 reader가 rsem을 못 얻어 동시에 들어가지 못한다. 결국 한 번에 한 reader만 read하게 되어 '다수 reader 동시 접근'이라는 원래 목적에 어긋난다.",
   crit:"(1) 각 1점, (2) 0~8점. 'rsem을 read 전체 구간 동안 쥔다'는 점 지적이 핵심.",
   expl:"올바른 코드는 readcount 증감만 rsem으로 보호하고 READUNIT()은 rsem 밖에서 수행해야 함."},

  {n:"3", pts:"10점 (각 2점)", tags:["동기화/메모리","빈칸","영문"],
   q:"빈칸을 1~3 단어로 채우시오.\n(1) A process keeps testing a variable to gain entrance to its critical section, doing nothing useful — this is called ( ).\n(2) compaction/swapping과 관계되어 process가 메모리의 다른 위치로 이동하는 ( )이 가능해야 하며, 이를 위해 주소 binding은 ( ) 시점에 이루어진다.\n(3) Paging용 TLB에는 control 정보와 frame number 외에 ( )가 추가로 저장된다.\n(4) The dining-philosophers solution of picking up two chopsticks only if both are available prevents deadlock because it breaks the ( ) requirement.",
   a:"(1) busy waiting\n(2) relocation / execution time(실행 시점)\n(3) page number (tag)\n(4) hold and wait",
   crit:"칸당 2점, 총 10점."},

  {n:"4", pts:"25점", tags:["가상메모리","계산","TLB","그림"],
   q:"2단계 페이징 + TLB 구조 그림에서 A~P에 들어갈 숫자/값을 구하시오. Frame size 8KB, user page table 한 엔트리 4byte. (TLB의 위치, frame number를 찾는 표, 물리주소 구성을 함께 묻는 종합 계산 문제)\n(3) TLB는 빠르게 동작하도록 어디에 두어야 하는가? ①Processor ②Memory ③Secondary storage ④Bus\n(4) 어떤 표에서 메모리 프레임 번호를 찾는가?\n(5) 프로세스가 자주 참조하는 성질(지역성) 덕에 TLB가 효과적이다 — 그 성질의 이름은?",
   a:"(주요 값) offset = 13비트(8KB=2¹³), 한 페이지 PTE 수 = 8KB/4B = 2¹¹ = 2048개 → page table index 11비트.\n(3) ① Processor (TLB는 CPU 안의 빠른 연관 메모리).\n(4) (inner) page table — frame number는 page table 엔트리에서 얻음.\n(5) Locality(지역성).",
   crit:"(1) 칸당 0.5점, (2) 칸당 1점, (3)(4)(5) 각 4점.",
   expl:"TLB=CPU 내 associative register. frame number는 page table에 저장. locality가 TLB hit률을 높임."},

  {n:"5", pts:"10점", tags:["동기화","코드","semaphore"],
   q:"semWait() 함수를 의사(pseudo) 코드로 작성하시오.",
   a:"void semWait(semaphore S){\n  S.count--;\n  if (S.count < 0){\n    place this process in S.queue;\n    block this process;\n  }\n}",
   crit:"count 감소(3점) + count<0 조건 검사(3점) + 큐에 넣고 block(4점).",
   expl:"semSignal은 반대: count++ 후 count<=0이면 큐에서 하나 꺼내 ready로."},

  {n:"6", pts:"15점", tags:["스케줄링/동기화","서술","반별선택"],
   q:"[00/01/02반] I/O bound 프로세스 관점에서 다음 스케줄링을 좋은 순서로 나열하고 이유(특히 time slice 영향)를 설명하시오. ①TQ 40ms RR ②TQ 100ms RR ③Multi-programmed Batch with FCFS.\n[04반] Critical section problem의 3가지 요구사항을 쓰고, 주어진 세마포어 코드가 이를 만족함을 설명하시오.",
   a:"[00/01/02반] 순서: ① → ② → ③.\n time slice가 짧을수록 프로세스가 더 자주 프로세서를 받는다(response time↓). I/O bound 프로세스는 입출력이 잦아 time slice를 다 못 쓰고 block되었다가 ready로 돌아오는데, time slice가 짧을수록 더 일찍 프로세서를 받아 유리하다. FCFS 배치는 가장 불리.\n[04반] ① Mutual exclusion ② Progress ③ Bounded waiting.\n - mutual exclusion: 세마포어 초기값 1이라 처음 1명만 진입, 나머지는 block.\n - progress: critical section이 비면(값 1) 진입 원하는 누구든 들어갈 수 있음.\n - bounded waiting: 도착 순서대로 큐에서 기다려 차례로 깨어나므로 무한 대기 없음.",
   crit:"해당 반이 아니면 0점. [00~02반] 순서 5점+설명 0~10점. [04반] 요구사항 5점+설명 0~10점.",
   expl:"I/O bound엔 짧은 quantum이 유리. CS 3요건=상호배제·진행·유한대기."},
]},

];
