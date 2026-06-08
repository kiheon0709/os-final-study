# 운영체제 기말고사 지식베이스 (파일·입출력·메모리·가상메모리·스케줄링)

> 출처 우선순위: ① 수업자료(슬라이드) ② 교수님 강의(STT) ③ 족보(최훈).
> 이 파일은 웹사이트(`운영체제 기말고사 공부 웹사이트.html`)의 원본 정리. 새 질문/내용 있을 때만 갱신.

## 챕터 ↔ PDF ↔ STT 매핑
- 06 파일관리: 7-3 파일, 7-4 디렉토리, 8-2 파일시스템, 8-3 데이터블록관리, 9-1 파일시스템 사례(UNIX inode/VFS)
- 07 입출력/디스크: 9-2 IO개요, 9-3 인터럽트처리, 10-1 폴링, 10-2 인터럽트IO/DMA, 10-3 디스크스케줄링, 10-4 device driver, 11-1 RAID
- 08 메모리: 11-2 개요, 11-3 파티셔닝, 11-4 Virtual Address Space, 11-5 어드레스바인딩, 12-1 Paging, 12-2 Segmentation
- 09 가상메모리: 12-3 개념, 12-4 demand paging, 13-1 다계층 페이지테이블, 13-2 TLB, 13-3 페이지교체, 13-4 thrashing, 14-1 Resident Set
- 10 스케줄링: 14-2 종류, 14-3 성능기준/FCFS/RR, 14-4 SPN/SRT/Feedback/UNIX

## 기출 빈출 (매년 반복)
- TLB EAT: miss 항 메모리접근 = (페이지테이블 단계 수)+1. 2단계 → +3.
- multi-level page table 비트 분할: offset(page size)/p2(한 페이지 PTE 수)/p1(나머지).
- inode 최대 파일크기: 한 블록당 주소 개수 = block size / 정수크기. direct10 + single + double + triple.
- 빈블록 grouping: super block 마지막 포인터가 다음 그룹 블록을 가리킴.
- 단편화: 고정분할·페이징·버디=Internal / 가변분할·세그멘테이션=External.

## OX 단골 오답
- best fit > first fit 속도 (X), inode↔superblock 혼동, SSTF=deadlock(X→starvation),
  Enhanced second chance가 page fault 줄임(X→disk write), page/segment table OS에 하나(X→프로세스마다),
  preempt당한 프로세스 block queue로(X→ready queue), 타임슬라이스 남은시간 다음에 더해짐(X→우선순위로 보상),
  인터럽트 시 context switch(X→mode change), 인터럽트 끝낸 후 새 인터럽트(X→끝내기 전).

## 족보 목록 (운체_손봉우/족보_최훈/)
- 2018기말(이미지 답01/02 + 문제 PDF), 2019기말(문제PDF+답 이미지, 채점기준 PDF), 2020기말,
  2020연계기말, 2021기말(답만), 2023기말, 2025년1학기기말. → 웹사이트 기출시험 섹션에 정리됨.

(상세 회차 내용은 HTML의 LESSONS/QUIZZES/EXAMS 데이터 객체에 임베드되어 있음.)
