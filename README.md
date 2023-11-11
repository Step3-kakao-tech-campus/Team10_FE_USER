![뽀득뽀득](https://user-images.githubusercontent.com/104883910/273441051-28dc9814-84e5-4828-abcb-c5e67d3deee4.png)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FStep3-kakao-tech-campus%2FTeam10_FE_USER&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)



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


뽀득뽀득 프로젝트는 여러 기술들을 통해, 효율적인 웹 애플리케이션을 구축하고자 하였습니다. 상호작용하는 주요 기술들에 대해 설명드리겠습니다:

- **React와 Redux Toolkit**: React는 사용자 인터페이스를 구성하고, Redux Toolkit은 애플리케이션 상태를 중앙에서 관리합니다. 이 두 기술은 쉬운 유지관리와 상태관리를 도와줍니다.

- **React Query와 Axios**: React Query는 데이터 가져오기와 캐싱을 담당하며, Axios는 HTTP 요청을 처리합니다. Axios로 데이터를 가져온 후, React Query는 그 데이터를 자동으로 캐시하고 UI가 최신 상태를 반영하도록 동기화합니다.

- **TailwindCSS와 React**: TailwindCSS는 반응형 디자인을 빠르게 구현할 수 있는 CSS 프레임워크입니다. React와 함께 사용되면, 빠른 프로토 타이핑으로 디자인과 기능 사이의 격차를 줄일 수 있습니다.

- **Vite**: Vite는 모듈 번들링과 개발 서버 기능을 제공하여 프로젝트의 빌드와 개발 과정을 가속화합니다. React 및 기타 JavaScript 파일을 빠르게 변환하고, 개발 중에 핫 모듈 리로딩을 제공하여 생산성을 향상시킵니다.

- **React Router DOM과 React의 상태 관리**: React Router는 SPA(Single-Page Application)를 위한 라우팅을 관리하며, React와 Redux는 사용자 경험을 일관되게 유지하면서 페이지 전환 시 상태를 유지합니다.

- **Day.js, dotenv, React Hook Form, UUID**: 시간 관리, 환경 설정, 폼 처리, 데이터 식별과 같은 애플리케이션의 다른 측면에서 중요한 역할을 하는 도구들입니다. . Day.js는 날짜와 시간을 다루며, dotenv는 환경 변수를 안전하게 관리합니다. React Hook Form은 폼의 성능을 최적화하고, UUID는 애플리케이션 내에서 고유한 식별자를 생성합니다.

이러한 기술 스택들을 통해 개발자에게 강력하면서도 유연한 개발 환경을, 사용자에게는 빠르고 반응이 좋은 애플리케이션 경험을 제공하고자 하였습니다.


## 개발자 시작 가이드
0. **필요한 프로그램 설치하기**
* nodejs 18.17.0
* npm 10.0.0


1. **소스 코드 복제하기**: `git clone` 명령어를 사용하여 로컬 머신에 프로젝트의 복사본을 만듭니다.
```bash
git clone https://github.com/Step3-kakao-tech-campus/Team10_FE_USER.git
```

2. **프로젝트 폴더로 이동하기:**:
```bash
cd Team10_FE_USER
```

3. **필요한 의존성 설치하기**: npm install 명령어로 필요한 모든 패키지를 설치합니다.
```bash
npm install
```

4. **개발 서버 실행하기**: npm run dev 명령어로 개발 서버를 시작하고 바로 작업을 시작하세요.
```bash
npm run dev
```

5. **환경변수** : 지도를 화면에 불러오기 위해 [카카오 map api](https://apis.map.kakao.com/)를 사용하고, 해당 키를 .env 파일을 생성 뒤 환경변수에 넣어야 합니다.
```
VITE_KAKAOMAP_API_KEY = "카카오javascriptmap api키를 입력하시면 됩니다"
```


## 사용자 시작 가이드
우리 웹 앱은 PWA(Progressive Web App)로서, 설치 없이 여기에서 바로 사용할 수 있습니다. 모바일 환경에 맞춰져 있기 때문에, 모바일 환경에서 접속하는 것을 추천드립니다.
웹앱으로 접속하면 끊김 없는 전체 기능을 갖춘 세차 예약 서비스를 즐길 수 있습니다.

PWA는 웹사이트와 모바일 앱의 장점을 결합하여, 빠른 성능과 오프라인 사용 가능성, 장치의 홈 화면에 추가할 수 있는 기능을 제공합니다. 사용하기 위해서는 단순히 이 [링크](https://k923062c3c512a.user-app.krampoline.com/)로 접속하면 됩니다.






## 화면 구성
| 메인 화면 (로그인 전)                                                                                                            | 메인 화면 (로그인 후)                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ![로그인 전](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/50963362-2ee5-4f3d-b451-4690a61b0061)     | ![로그인 후](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/1a002410-b9d3-4ef7-a4e3-bd2da61049c6)     |
| **회원가입**                                                                                                                     | **로그인**                                                                                                                       |
| ![회원가입](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/cd415194-09aa-4154-9b01-dc85492827c0)       | ![로그인 화면](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/0d71bb67-6c8c-4255-a34a-1cac328dce2c)   |
| **지도 예약 화면**                                                                                                               | **예약 내역 화면**                                                                                                               |
| ![지도 예약 화면](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/7d174559-aa2e-4ea8-870f-8684b6605f7c) | ![예약 내역 화면](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/b3c84811-1a63-41a6-aafc-467d6a0b91b9) |
| **세차장 상세정보**                                                                                                              | **세차장 리뷰**                                                                                                                  |
| ![세차장 상세정보](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/47951e82-0e85-4ead-a0e8-86bfc132f6eb) | ![세차장 리뷰](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/840e071a-2188-49d0-b460-59bc1e4f699d)     |
| **베이 선택 페이지**                                                                                                             | **예약일정 만들기**                                                                                                               |
| ![베이 선택 페이지](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/7fcf4de8-3e95-4bb5-8023-f632d7ad3bfe) | ![예약일정 만들기](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/4642ac90-cd22-474c-86ce-0365632068a2) |
| **결제하기 페이지**                                                                                                              | **결제완료 페이지**                                                                                                               |
| ![결제하기 페이지](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/6abc5d27-36c8-4e70-9a96-6246eee66ae3) | ![결제완료 페이지](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/980d0d91-42bb-4179-af15-518ebe7cae1d) |
| **리뷰 등록 페이지**                                                                                                             | **없는 페이지 검색 결과**                                                                                                         |
| ![리뷰 등록 페이지](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/b78707c8-3a30-4ccb-9896-4efc87e08a76) | ![없는 페이지 검색 결과](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/d0dd4261-3aa2-435a-a1e8-391785b55379) |
| **오류 페이지**                                                                                                                  |                                                                                                                                  |
| ![오류 페이지](https://github.com/Step3-kakao-tech-campus/Team10_FE_USER/assets/50255093/76c53615-9e22-4fc5-95c8-30646254cf1f)     |                                                                                                                                  |






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

















## 함께한 사람들

|                                                           FE                                                           |                                                         FE                                                          |                                                         FE                                                         |
| :--------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
|                                     [노주영(조장)](https://github.com/juyeongnoh)                                      |                                 [김좌훈(FE 테크리더)](https://github.com/catnofat)                                  |                                   [고민주(리마인더)](https://github.com/minjuko)                                   |
| ![juyeongnoh](https://user-images.githubusercontent.com/104883910/273441208-04b916c7-3d13-437e-b269-6837e6977453.jpeg) | ![catnofat](https://user-images.githubusercontent.com/104883910/273441205-78f72cd1-1c75-495c-9d9a-9fd68ee7f755.png) | ![minjuko](https://user-images.githubusercontent.com/104883910/273441202-5cd106a5-b15c-4b1e-a609-59c1ce2d05ae.png) |

|                                                           BE                                                            |                                                         BE                                                         |                                                        BE                                                         |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
|                                 [김명지(BE 테크리더)](https://github.com/Starlight258)                                  |                                   [김철호(기획리더)](https://github.com/Cheoroo)                                   |                                   [이유진(타임키퍼)](https://github.com/2Using)                                   |
| ![Starlight258](https://user-images.githubusercontent.com/104883910/273441204-57ff5077-61b7-46fb-9252-4d07d751c2f7.png) | ![Cheoroo](https://user-images.githubusercontent.com/104883910/273441206-53e3289b-4d54-416c-a4bb-8378b6bdeee5.png) | ![2Using](https://user-images.githubusercontent.com/104883910/273441211-80d28f43-ef45-40cc-893a-f3787823f725.png) |
