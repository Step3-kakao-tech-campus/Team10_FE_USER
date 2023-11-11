![뽀득뽀득](https://user-images.githubusercontent.com/104883910/273441051-28dc9814-84e5-4828-abcb-c5e67d3deee4.png)

## 뽀득뽀득

뽀득뽀득은 편리하고 스트레스 없는 세차 경험을 제공하기 위한 셀프세차장 예약 플랫폼입니다. 사용자가 미리 세차 시간을 예약할 수 있도록 하여, 세차장에서의 기다림을 없애고 보다 여유로운 세차 시간을 보장합니다. 뒤에 오는 사람을 신경 쓰지 않고 예약 기능을 사용하여 이젠 세차장을 보다 편하게 이용할 수 있습니다.  


또한, 뽀득뽀득은 이용자 중심의 예약 시스템과 가맹주 중심의 서비스 관리를 분리하여, 모든 유저가 자신에게 최적화된 기능을 사용할 수 있게 설계되었습니다.

현재 이 레포지토리는 이용자가 사용하는 프론트엔드 부분으로, React, TailwindCSS, JavaScript를 사용하여 구현되었습니다. 사용자의 편의를 최우선으로 생각하며, 세차장 예약부터 세차 완료까지의 전 과정을 간소한 뽀득뽀득 서비스를 이용해 보시면서 최상의 사용자 경험을 체험해 보세요!


## 주요 기능

<p align="center">
  <img src="https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/4c0e5cf4-4370-4fcf-842d-a77a2eba2bb9.png" align="center" width="24%">
  <img src="https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/b909c41f-67d0-411d-ab0e-49cafe49a3f1.png" align="center" width="24%">
  <img src="https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/a7c3866e-8d38-4bd9-86f6-fc711cecef6d.png" align="center" width="24%">
  <img src="https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/9bffc4db-74a6-43f6-af53-86706c22b164.png" align="center" width="24%">
</p>

1. 뽀득뽀득 서비스는 사용자의 위치 기반으로 주변 셀프세차장을 검색해 시간 단위로 예약하는 기능을 제공합니다.

2. 예약한 정보를 조회, 삭제, 완료한 세차에 대한 평가 기능 또한 제공합니다.

3. 에러 처리와 상태 관리를 통해, 예상치 못한 상황에도 대비하였습니다.  

## 개발 문서

[주차별 개발 일지](https://www.notion.so/6cedabdbf1e343ab9bd64354ee45515f?pvs=4)<br>
[ERD 설계서](https://www.notion.so/ERD-984ec51ccd7e435f8331857a325d1516?pvs=4)<br>
[API 명세서](https://www.notion.so/API-67efa4eea535426b89649a8c311b80a0?pvs=4)<br>
[와이어프레임](https://www.figma.com/file/raidVFqnBM3KgJY4KFCoB1/%EB%BD%80%EB%93%9D%EB%BD%80%EB%93%9D-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=1832%3A6899&mode=design&t=X4E2jm08WA3gzqba-1)

## 기술 스택

사용된 기술 스택은 아래  표와 같습니다. 
| Category                     | Technologies                     | Version     |
|------------------------------|----------------------------------|-------------|
| Package Management           | `npm`  | -           |
| Development Library          | `React`                            | v18.2.0     |
|                              | `Redux & @reduxjs/toolkit`         | v4.2.1 & v1.9.7 |
|                              | `@tanstack/react-query`            | v5.0.0      |
|                              | `React Router DOM`                | v6.16.0     |
| CSS Framework                | `TailwindCSS`                     | v3.3.3 |
| Other Development Tools      | `Axios`                            | v1.5.1      |
|                              | `Day.js & dayjs-plugin-utc`        | v1.11.10 & v0.1.2 |
|                              | `dotenv`                           | v16.3.1     |
|                              | `React Hook Form`                  | v7.47.0     |
|                              | `UUID`                             | v9.0.1      |
| Build Tool                   | `Vite`                             | v4.4.5 |


뽀득뽀득 프로젝트는 여러 현대적인 기술들을 통해, 효율적인 웹 애플리케이션을 구축하고자 하였습니다. 상호작용하는 주요 기술들의 역할은 다음과 같습니다:

- **React와 Redux Toolkit**: React는 사용자 인터페이스를 구성하는 반면, Redux Toolkit은 애플리케이션 상태를 중앙에서 관리합니다. 이 두 기술의 조합은 유지 관리가 쉽고 확장 가능한 상태 관리 아키텍처를 가능하게 합니다.

- **React Query와 Axios**: React Query는 데이터 가져오기와 캐싱을 담당하며, Axios는 HTTP 요청을 처리합니다. Axios로 데이터를 가져온 후, React Query는 그 데이터를 자동으로 캐시하고 UI가 최신 상태를 반영하도록 동기화합니다.

- **TailwindCSS와 React**: TailwindCSS는 반응형 디자인을 빠르게 구현할 수 있는 유틸리티 중심의 CSS 프레임워크입니다. React와 함께 사용되어 개발자가 디자인과 기능 사이의 격차를 줄이고, 빠르게 프로토타이핑하고 제품을 출시할 수 있도록 돕습니다.

- **Vite**: Vite는 모듈 번들링과 개발 서버 기능을 제공하여 프로젝트의 빌드와 개발 과정을 가속화합니다. React 및 기타 JavaScript 파일을 빠르게 변환하고, 개발 중에 핫 모듈 리로딩을 제공하여 생산성을 향상시킵니다.

- **React Router DOM과 React의 상태 관리**: React Router는 SPA(Single-Page Application)를 위한 라우팅을 관리하며, React와 Redux는 사용자 경험을 일관되게 유지하면서 페이지 전환 시 상태를 유지합니다.

- **Day.js, dotenv, React Hook Form, UUID**: 이러한 도구들은 시간 관리, 환경 설정, 폼 처리, 데이터 식별과 같은 애플리케이션의 다른 측면에서 중요한 역할을 합니다. Day.js는 날짜와 시간을 다루며, dotenv는 환경 변수를 안전하게 관리합니다. React Hook Form은 폼의 성능을 최적화하고, UUID는 애플리케이션 내에서 고유한 식별자를 생성합니다.

이 기술 스택들을 통해 개발자에게 강력하면서도 유연한 개발 환경을, 사용자에게는 빠르고 반응이 좋은 애플리케이션 경험을 보장하고자 합니다.


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
