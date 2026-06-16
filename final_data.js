/* 막판 점검 — 시험 직전 딱 이것만. 내가 헷갈려한 것 위주 핵심 요약.
   섹션(sec)별 카드(items). 각 item: {t:제목, b:본문(개조식, **bold**, '- ' 불릿, \n)}
   color: 섹션 강조색 (blue/violet/amber/green) */
window.FINAL_DATA = [

{sec:"커널 진입 3가지 — 가장 헷갈림", color:"violet", items:[
 {t:"누가 거느냐로 구분",
  b:"- **인터럽트** = 외부 **장치**가 (비동기, 알림)\n- **트랩** = **CPU**가 명령 실행 중 (동기, 오류/요청)\n- **시스템콜** = **프로세스**가 일부러 (동기, 요청)\n포함관계: 시스템콜 ⊂ 트랩 ⊂ 소프트웨어 인터럽트"},
 {t:"I/O 요청 vs 완료",
  b:"- **I/O 요청 = 시스템콜** (프로세스가) → running→blocked\n- **I/O 완료 = 인터럽트** (장치가) → blocked→ready\n한 I/O에 시스템콜로 시작, 인터럽트로 끝남"},
 {t:"시스템콜이 왜 int $0x80?",
  b:"커널 들어가는 길이 인터럽트뿐이라 **일부러 인터럽트를 걺**.\n- int = interrupt, 0x80 = **128**\n- IDT 128번 → **system_call() 핸들러** → sys_call_table → 진짜 함수(sys_read 등)"},
 {t:"왜 시스템콜만 2단계?",
  b:"- IDT = **256칸(0~255)** 뿐, 시스템콜은 **수백 개** → 다 못 넣음\n- → 128번 한 칸으로 받고 **sys_call_table**에서 번호로 또 나눔\n- 인터럽트·트랩은 수십 개라 IDT 한 칸씩 바로 (2단계 X)\n- **모든 시스템콜**(fork·read·write) 다 같은 방식 — I/O만 그런 게 아님"},
]},

{sec:"인터럽트 하드웨어 — PIC·IDT·ISR", color:"blue", items:[
 {t:"전체 흐름",
  b:"장치 → **PIC**(신호 모아 중계) → **CPU** → **IDT**(번호→함수주소 표) → **ISR**(처리 함수) 실행"},
 {t:"3대 용어",
  b:"- **PIC**: 여러 장치 인터럽트를 모아 CPU에 전달하는 칩\n- **IDT(=IVT)**: '번호 → 처리 함수(ISR) 주소' 표\n- **ISR**: 인터럽트 처리 함수 (= 인터럽트 핸들러, 같은 말)"},
 {t:"IDT엔 이름? 주소?",
  b:"- IDT엔 **함수 주소**가 들어있음 (이름 X)\n- 무슨 장치/오류인지는 **번호로 이미 정해져 옴**\n- IDT는 '그 번호의 처리 함수가 어디 있나(주소)'만 알려줌\n- 핸들러(ISR) = 찾아져서 **실행되는** 함수 (찾는 게 아니라 처리)"},
 {t:"비동기인데 매번 검사?",
  b:"모순 아님. CPU가 **명령 한 줄 끝낼 때마다 자동으로** 인터럽트 핀 확인.\n언제 올지 몰라도(비동기) 매번 확인하니 안 놓침. (폴링과 달리 공짜)"},
 {t:"타이머는 왜 PIC 안 거침?",
  b:"1ms마다 쉼없이 보내 너무 자주라 → **CPU 전용 핀에 직통**.\n그 핀 = '타이머'라고 약속돼 있어 물어볼 것 없이 IDT 0번 직행"},
]},

{sec:"인터럽트 처리 — top/bottom·중첩·context", color:"blue", items:[
 {t:"top/bottom 나누는 이유",
  b:"ISR 도는 동안 다른 인터럽트 못 받음 → 막히는 시간 최소화\n- **top(급한 부분)**: 인터럽트 **OFF** 상태 → 짧게!\n- **bottom(안 급한 부분)**: 인터럽트 **ON** 상태 → 새 인터럽트 받으며 처리\n목적 = bottom을 안 멈추는 게 아니라 **새 인터럽트 안 놓치는 것**\n(urgent part = top half)"},
 {t:"커널 스택 vs PCB 저장",
  b:"- **커널 스택**: 인터럽트/시스템콜로 커널 잠깐 다녀올 때 **매번**. 끼어들기 직전 함수 context. 프로세스 **안 바뀜** (책갈피)\n- **PCB**: 프로세스 **교체(context switch)** 할 때만. 프로세스 전체 (인수인계)"},
 {t:"중첩 시 커널 스택",
  b:"system call→disk int→clock int 순 중첩\n- Layer 1: 유저 함수 context\n- Layer 2: 시스템콜 핸들러 context\n- Layer 3: 디스크 ISR context\n→ 안쪽부터 끝나면 **iret으로 위층부터 역순 복귀**"},
 {t:"타이머 인터럽트 = 항상 스위칭?",
  b:"**아님.** 1ms마다 오지만\n- time slice 안 끝남(count<100) → count++만 하고 복귀 (스위칭 X)\n- time slice 끝남(count==100) → running→ready + **context switch**\n저장 순서: **커널 스택 먼저(항상)** → 교체 결정 시 PCB(나중)"},
 {t:"iret",
  b:"Interrupt Return = 처리 끝내고 원래 자리로 복귀하는 명령.\n커널 스택 context 복원 + kernel→user 모드 복귀"},
]},

{sec:"트랩 처리 — 오류·terminate·page fault", color:"amber", items:[
 {t:"왜 죽여? 다시 돌리면 안 돼?",
  b:"4가지(div_by_zero, invalid code, **segfault**, protection fault)는 **다시 돌려도 또 터지는 복구 불가 오류** → **프로세스(프로그램) 전체 terminate** (명령어만 X)"},
 {t:"page fault만 예외",
  b:"이름만 fault, **오류 아님** = '페이지가 메모리에 없을 뿐'\n- 디스크/스왑/실행파일에 **있으면** → 가져와 명령 재실행 (안 죽임)\n- 어디에도 **없으면** → segfault → terminate\n(page fault와 segfault는 형제: 가져올 수 있으면 살림, 없으면 죽임)"},
 {t:"트랩 핸들러가 하는 일",
  b:"무슨 종류인지(번호로 이미 옴)에 맞게 처리:\n- 오류 → terminate\n- page fault → 페이지 가져와 재실행\n- system call → sys_call_table에서 요청 수행"},
]},

{sec:"I/O 제어 방식 — 폴링 vs 인터럽트", color:"green", items:[
 {t:"Programmed I/O (폴링)",
  b:"CPU가 **status register 계속 읽으며**(busy waiting) 확인 + 데이터도 직접 이동 → CPU 낭비.\n발전: 폴링 → Interrupt-driven → DMA (DMA만 데이터이동도 대신)"},
 {t:"빠른 I/O는 폴링이 유리 (2025 기출)",
  b:"인터럽트는 **context switch 비용**이 듦.\nI/O가 빨리 끝나면 그 시간에 이미 끝나버려 → **폴링이 더 효율적**"},
 {t:"I/O 포트 = 레지스터 4개 (하드웨어)",
  b:"장치 **컨트롤러 안**에 있음 (하드웨어):\n- **status**(읽음·상태) / **control**(씀·명령) / **data-in**(읽음·받은데이터) / **data-out**(씀·보낼데이터)\nstatus·control=상태·명령, data=실제 내용물"},
 {t:"컨트롤러 ≠ 드라이버",
  b:"- **컨트롤러** = 하드웨어(장치 칩, 레지스터 보유)\n- **드라이버** = 소프트웨어(커널 코드, 컨트롤러 조작)\nhost(=드라이버 쪽)가 컨트롤러 레지스터를 읽고 씀"},
 {t:"busy / command-ready 누가 바꾸나",
  b:"레지스터 = host·컨트롤러 **공유 대화판**\n- **busy** = 컨트롤러 상태 (컨트롤러가 켜고 끔)\n- **command-ready** = 드라이버→컨트롤러 신호 (드라이버 켬1, 컨트롤러 처리 후 끔0)\n→ 컨트롤러도 자기 담당 비트는 write 가능"},
]},

{sec:"Interrupt-driven I/O 흐름 — P1 블록·P2·IRQ", color:"green", items:[
 {t:"왜 바로 블록?",
  b:"I/O가 느려서 기다리는 동안 CPU를 딴 프로세스에 주려고 → P1 blocked.\n블록 결정 = **system call handler**(요청 처리, ISR 아님!)\n빠른 I/O라 블록 불필요하면 → 폴링이 처리"},
 {t:"P2가 왜 커널 들어감?",
  b:"'P2가 들어가는' 게 아니라 **P2 멈추고 그 자리에서 커널 ISR 실행**.\n인터럽트는 그때 돌던 P2를 멈춤. 완료 처리(데이터 회수·P1 깨우기·우선순위)는 커널 권한 필요"},
 {t:"완료 후 우선순위",
  b:"ISR이 P1을 blocked→ready로 깨움 → 스케줄러가 P1 vs P2 비교\n- P2 높음 → 그대로 P2 running\n- P1 높음 → P2 ready, P1 running"},
 {t:"IRQ = 인터럽트 요청 신호",
  b:"**경로 2개** 구분:\n- 명령/데이터: 드라이버 ↔ 컨트롤러 (소프트웨어)\n- **IRQ**: 컨트롤러 → PIC → CPU (하드웨어 신호선, **드라이버 안 거침**)\n완료: 장치→컨트롤러 IRQ→PIC→CPU→핸들러→IDT→ISR→Process Mgmt→스케줄러"},
 {t:"Process Management",
  b:"프로세스 상태(running/ready/blocked)·큐·스케줄러·상태변경 함수 묶음.\nhandler/ISR이 '블록해/깨워' 지시 → Process Mgmt가 **실제** 상태 변경·큐 조작"},
]},

{sec:"파일관리 핵심 — Grouping·inode (전에 헷갈림)", color:"blue", items:[
 {t:"Grouping",
  b:"디스크의 **빈 데이터 블록 번호**를 관리하는 법.\n- 슈퍼블록이 작아 다 못 담음 → **빈 블록 하나 빌려** 거기 더 저장, 사슬 연결\n- 블록 1개 = 4096B, 번호 1개 = 4B → 한 블록에 **1024개(슬롯)**\n- 인덱스 블록 맨 위 1칸 = 다음 그룹 블록 주소"},
 {t:"슬롯 vs 블록",
  b:"- **블록** = 실제 4096B 저장공간\n- **슬롯** = 블록 안에서 번호 적는 칸 (블록당 1024칸)\n읽는 건 슬롯 속 번호, 나가는 건 그 번호의 블록"},
 {t:"inode 주소지정",
  b:"- direct 10(또는 12)개 = inode에 직접\n- 초과분 = single/double/triple indirect (인덱스 블록 거침)\n- single=인덱스1→데이터, double=인덱스→인덱스→데이터, triple=인덱스×3→데이터\n- 한 인덱스 블록당 주소 = block size ÷ 주소크기"},
 {t:"디렉토리 = 파일",
  b:"디렉토리 데이터 블록에 **(inode번호, 이름)** 엔트리 저장.\n첫 2칸 항상 **.(자기)·..(부모)**. 루트 inode = **항상 2번**.\n이름→inode번호→inode→데이터블록 순으로 추적"},
]},

{sec:"페이징 핵심 — 주소/비트 (헷갈림)", color:"violet", items:[
 {t:"page / frame / PTE / offset",
  b:"- **page** = VAS(주소 범위)를 쪼갠 조각\n- **frame** = 실제 메모리(RAM) 칸 (page 전용 X, page table·커널도 담김)\n- **PTE** = page table 한 줄 = page 1개 정보(frame#+제어비트)\n- **offset** = page 안 바이트 위치"},
 {t:"logical / physical",
  b:"- **logical** = VAS의 주소(CPU가 봄, =virtual)\n- **physical** = 실제 RAM 주소\n- 변환: logical[page#|offset] → page table → physical[frame#|offset]\n- **page#만 frame#로 바뀌고 offset은 그대로**"},
 {t:"offset 비트 = log₂(페이지 크기)",
  b:"- 4KB=2¹²→12비트, 8KB=2¹³→13비트, 2KB=2¹¹→11비트\n- **비트 나누기 = 2의 제곱만큼 칸 만들기** (n비트=2ⁿ개)\n- 비트→개수→크기: 10비트=1024개, ×4byte=4KB\n- 주의: 논리주소 하위=offset / PTE 하위=제어비트 (다른 것!)"},
 {t:"VAS / page table 크기",
  b:"- VAS = 2^(주소비트). 32비트→**4GB**(=주소 범위, 데이터 양 무관)\n- page 개수 = VAS÷페이지 = 4GB÷4KB = **1M개**\n- page table = 1M × PTE 4byte = **4MB**\n- **K=1024**(1000 아님!)\n- page table은 **메모리에** 있음(PCB엔 위치만)"},
]},

{sec:"가상 메모리 — VAS·demand·다단계", color:"violet", items:[
 {t:"가상 메모리 = RAM + 디스크",
  b:"실제 RAM보다 큰 것처럼 씀. 지금 쓰는 page만 RAM, 나머지 디스크.\n**VAS는 디스크에 통째로 있는 게 아님** — 추상적 주소 범위, 내용(page)이 RAM/디스크에 흩어짐"},
 {t:"demand paging ≠ page fault",
  b:"- **demand paging** = 방식(필요할 때만 올림)\n- **page fault** = 그 방식의 사건(없는 page 접근 시)\n- 전체를 VAS에 잡고(빈 곳도 page로 미리 나눔), 필요한 것만 RAM 적재"},
 {t:"페이징 → 가상메모리 → multiprogramming (인과·헷갈림)",
  b:"셋은 같은 게 아니라 **순서대로 쌓인 인과**:\n- **페이징(쪼갬)** = 전제. 통짜면 일부만 못 올림 → page 단위로 잘라야 비연속·일부 적재 가능\n- **가상메모리(demand paging)** = 그 위에서 '필요한 page만 올림' → 프로세스당 프레임↓\n- **degree of multiprogramming↑** = 그래서 실제 메모리보다 많은 프로세스 동시 적재\n→ 시험: '무엇이 multiprogramming을 늘리나' = **가상메모리** / '가상메모리를 가능케 한 건' = **페이징**\n과하게 늘리면 → **thrashing**"},
 {t:"교체 알고리즘 ≠ thrashing 해결 (층위 다름·함정)",
  b:"- **교체 알고리즘**(Clock/Enhanced/LRU) = 프레임 부족 시 '**누구를 victim으로**'(선택의 질)\n- **Thrashing** = 애초에 '**프레임이 절대 부족**' → 뭘 골라도 곧 쓸 걸 내보냄 → 선택 무의미\n- Enhanced Clock은 modify=0 우선 victim → swap out **1회 비용↓**(disk write 생략)일 뿐, swap **횟수**는 못 줄임\n→ thrashing 해결 = 알고리즘 X, **프레임 확보(process suspension)·multiprogramming↓** O"},
 {t:"Page 연속 = VAS 기준, 물리 frame은 비연속 (2D 배열 예시·함정)",
  b:"`int A[1024][1024]` (int 4B×1024 = 4096B = **1행=1페이지**, 페이지 4KB 가정)\n- 슬라이드: 0번 행=Page n, 1번 행=Page n+1 … 처럼 **연속**\n- 이 연속은 **가상 page 번호(VAS) 기준**일 뿐!\n- 실제 **물리 frame은 페이징이라 흩어져 배치**(비연속), 일부는 아직 디스크에\n- 가상 Page n→frame17, n+1→frame3 … 처럼 page table이 매핑\n→ 그래도 **page fault 계산엔 가상 page 패턴만** 보면 됨 (fault = 그 가상 page가 메모리에 있나 없나, 물리 위치 무관)\n→ 그래서 행 우선(같은 page 쭉)=fault↓ / 열 우선(매번 다른 page 점프)=fault↑ **1000배 차이**"},
 {t:"전용 사본 vs 공유",
  b:"- **stack/data** = 변해서 프로세스 전용 사본\n- **code/kernel** = 안 변해 원본 하나 공유 (code는 실행파일에 실체 있음, 단지 전용 복사 안 함)"},
 {t:"2단계 페이지 테이블",
  b:"page table(4MB)이 frame(4KB) 하나에 안 들어감 → **page table도 4KB씩 쪼개 frame에 흩어 담음**.\n조각 위치는 **outer(root) table**이 기록(항상 메모리).\n[p1|p2|offset]: p1·p2 = log₂(조각당 엔트리 수)"},
]},

{sec:"TLB · 주소변환 흐름 — 시험 단골", color:"green", items:[
 {t:"TLB = CPU 안 변환 캐시",
  b:"page table을 매번 메모리에서 보면 CPU 기준 느림(메모리도 느림) → CPU 안에 (page#→frame#) 캐싱.\n**병렬 비교(associative)** 로 즉시 찾음. PTE 정보(frame#+제어비트) 담음. 작지만 **locality** 덕에 hit률↑"},
 {t:"전체 흐름 (2단계)",
  b:"① 변환: TLB 확인\n- hit → frame# 즉시 (메모리 X)\n- miss → 메모리 page table → frame# (없으면 page fault → 디스크 page in → 인터럽트 → 재시도)\n② 데이터: 물리주소(frame#+offset)로 메모리 가서 읽음"},
 {t:"메모리 접근 횟수 (EAT 기초)",
  b:"- TLB hit: 메모리 **1번**(데이터)\n- miss(단일): **2번**(테이블+데이터)\n- miss(2단계): **3번**\n- EAT = hit율×(hit시간) + miss율×(miss시간) ※기출 단골"},
 {t:"page fault 처리",
  b:"없는 page 접근 → **blocked**(디스크 느림) → 디스크 page in(RAM 꽉 차면 victim 교체, modify=1이면 disk write) → 완료 인터럽트 → **ready** → 명령 재실행.\n**modify bit** = disk write 줄이려고(Enhanced Second Chance)"},
]},

];
