![뽀득뽀득](https://user-images.githubusercontent.com/104883910/273441051-28dc9814-84e5-4828-abcb-c5e67d3deee4.png)

## 뽀득뽀득

뽀득뽀득은 `셀프세차장 예약 서비스`입니다. 셀프세차장에 예약이라는 시스템을 더해 유저들에게 보장된 시간동안 여유롭게 즐기는 세차 경험을 주는 것을 목표로 합니다. 이를 통해 기다리는 뒷사람 눈치보지 않고, 개인 세차용품을 마음껏 사용하며 세차를 즐기는 환경을 만들어 나가고자 합니다.

# 세차장 예약 앱

이 애플리케이션은 사용자가 주변 세차장 베이를 쉽게 찾아 예약할 수 있도록 합니다. 각 세차장에 대한 자세한 정보를 제공하며, 카카오페이 테스트 결제 옵션을 통한 편리한 예약 기능을 제공합니다.

## 주요 기능

### 위치 & 키포인트 기반 검색
- 지도에서 현위치를 기반으로 10km 이내의 서비스 세차장을 보여줍니다.
- 세차장을 직접 검색하여 찾을 수 있습니다.
- 원하는 키포인트를 선택하여 해당 세차장만 보여줍니다. 

### 예약 내역
- 예정된, 진행 중인, 완료된 세차를 확인합니다.
- 리뷰 작성 또는 예약 취소를 제공합니다. 

### 세차장 상세 정보
- 영업시간, 전화번호, 주소, 키포인트, 설명, 리뷰, 평점 등의 정보를 제공합니다. 

### 세차장 예약
- 실시간으로 현재 예약 현황 및 이용 가능한 시간을 보여줍니다.
- 원하는 세차장의 베이 번호, 날짜, 시작 시간, 사용 시간을 선택하여 예약을 진행합니다.

### 카카오페이 테스트 결제
- 카카오페이 테스트 결제 기능을 사용하여 예약 절차를 완료합니다.

## 사용자 예약 시나리오 
1. **세차장 찾기**: 지도로 이동하여 주변 세차장을 확인하거나 검색 기능을 사용합니다.
2. **예약 내역 확인**: 지난 예약 및 예정된 예약을 확인하고 관리하거나 리뷰를 남깁니다.
3. **세부 정보 확인**: 각 세차장의 상세 페이지에서 종합적인 정보를 탐색합니다.
4. **예약 진행**: 베이를 선택하고 방문에 대한 세부 정보를 명시하여 예약을 확정합니다.
5. **결제 완료**: 카카오페이 테스트 결제 기능을 사용하여 예약을 확정합니다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/104883910/273441056-05c43463-5bd5-4656-95fb-f6b135d64659.png" align="center" width="24%">
  <img src="https://user-images.githubusercontent.com/104883910/273441057-8feb9154-acc2-499d-9b1a-833f59a0cebc.png" align="center" width="24%">
  <img src="https://user-images.githubusercontent.com/104883910/273441058-d923cc94-5b53-4ab2-9f52-67ebb8a6454c.png" align="center" width="24%">
  <img src="https://user-images.githubusercontent.com/104883910/273443450-10a46190-e2b8-427d-803d-ba2001291a68.png" align="center" width="24%">
</p>

## 개발 문서

[주차별 개발 일지](https://www.notion.so/6cedabdbf1e343ab9bd64354ee45515f?pvs=4)<br>
[ERD 설계서](https://www.notion.so/ERD-984ec51ccd7e435f8331857a325d1516?pvs=4)<br>
[API 명세서](https://www.notion.so/API-67efa4eea535426b89649a8c311b80a0?pvs=4)<br>
[와이어프레임](https://www.figma.com/file/raidVFqnBM3KgJY4KFCoB1/%EB%BD%80%EB%93%9D%EB%BD%80%EB%93%9D-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=1832%3A6899&mode=design&t=X4E2jm08WA3gzqba-1)

## 기술 스택

| 패키지 매니저 | 개발 라이브러리  | CSS 프레임워크     | 개발 환경        |
| ------------- | ---------------- | ------------------ | ---------------- |
| npm v9.8.1    | react v18.2.0    | tailwindcss v3.3.3 | eslint v8.50.0   |
|               | storybook v7.4.5 |                    | prettier v.3.0.3 |

## 시작 가이드

```
$ git clone https://github.com/Step3-kakao-tech-campus/Team10_FE_USER.git
$ cd Team10_FE_USER
$ npm install
$ npm run dev
```

## 함께한 사람들

|                                                           FE                                                           |                                                         FE                                                          |                                                         FE                                                         |
| :--------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
|                                     [노주영(조장)](https://github.com/juyeongnoh)                                      |                                 [김좌훈(FE 테크리더)](https://github.com/catnofat)                                  |                                   [고민주(리마인더)](https://github.com/minjuko)                                   |
| ![juyeongnoh](https://user-images.githubusercontent.com/104883910/273441208-04b916c7-3d13-437e-b269-6837e6977453.jpeg) | ![catnofat](https://user-images.githubusercontent.com/104883910/273441205-78f72cd1-1c75-495c-9d9a-9fd68ee7f755.png) | ![minjuko](https://user-images.githubusercontent.com/104883910/273441202-5cd106a5-b15c-4b1e-a609-59c1ce2d05ae.png) |

|                                                           BE                                                            |                                                         BE                                                         |                                                        BE                                                         |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
|                                 [김명지(BE 테크리더)](https://github.com/Starlight258)                                  |                                   [김철호(기획리더)](https://github.com/Cheoroo)                                   |                                   [이유진(타임키퍼)](https://github.com/2Using)                                   |
| ![Starlight258](https://user-images.githubusercontent.com/104883910/273441204-57ff5077-61b7-46fb-9252-4d07d751c2f7.png) | ![Cheoroo](https://user-images.githubusercontent.com/104883910/273441206-53e3289b-4d54-416c-a4bb-8378b6bdeee5.png) | ![2Using](https://user-images.githubusercontent.com/104883910/273441211-80d28f43-ef45-40cc-893a-f3787823f725.png) |


## 디렉터리 구조 
```
📂 src
  ┣ 📂 apis
  ┣ 📂 components       
     ┗ 📂 atoms
     ┗ 📂 molecules
     ┗ 📂 organisms
     ┗ 📂 templates
  ┣ 📂 hooks            
  ┣ 📂 layouts           
  ┣ 📂 mocks            
  ┣ 📂 pages
  ┣ 📂 store
  ┣ 📄 App.jsx
  ┗ 📄 main.jsx

```
