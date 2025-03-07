# LocaQuest - Backend - Activity
**LocaQuest**는 Redis와 Kafka를 활용한 실시간 데이터 분석을 통해 사용자에게 경험치, 레벨, 도전 과제 등 게임화된 요소를 제공하고, 마이크로서비스 아키텍처로 높은 성능을 구현하는 위치 기반 게임화 플랫폼입니다.

## Features
### 1. 실시간 데이터 처리
- **Redis**: 실시간 데이터 캐싱과 빠른 데이터 처리를 위한 캐시 시스템으로 사용합니다.
- **Kafka**: 서버 간 실시간 데이터 스트리밍 및 메시징 시스템으로 사용합니다.

### 2. 게임화 요소
- **경험치 시스템**: 사용자의 활동에 따른 경험치를 계산합니다.
- **도전 과제 시스템**: 사용자 활동에 따른 도전 과제를 관리하고 달성 여부를 추적합니다.

### 3. 실시간 데이터 스트리밍
- **WebSocket**: 클라이언트와 서버 간 실시간 통신을 위한 프로토콜을 사용합니다.
- **Kafka**: 서버 간 실시간 통신을 통해 데이터를 안전하게 전송하고 처리합니다.

## Stack
- **Node.js**
- **Express.js**
- **Typescript**
- **Redis**
- **Kafka**

## Structure
```
src/
 ├── api/           # 서버 API 요청
 ├── config/        # 설정 정보 저장
 ├── controllers/   # 클라이언트 요청 응답
 ├── libs/          # 외부 라이브러리 래퍼
 ├── middlewares/   # Express 미들웨어
 ├── services/      # 비즈니스 로직
 ├── types/         # 타입 정의
 └── utils/         # 정적 유틸리티 함수
```
