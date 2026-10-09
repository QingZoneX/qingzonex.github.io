---
title: 기여 가이드
description: qtable-server, qtable-web, 포털 사이에서 올바른 기여 지점을 선택합니다.
---

QTable은 하나의 제품이지만 코드는 구현 경계에 따라 여러 저장소에 유지됩니다. Issue나 Pull Request를 보내기 전에 해당 기능을 담당하는 저장소를 선택하세요.

## qtable-server

API, 데이터 모델, 권한, 자동화, 첨부, 감사, 검색, OAuth, AI 서비스를 변경할 때는 [`QingZoneX/qtable-server`의 CONTRIBUTING.md](https://github.com/QingZoneX/qtable-server/blob/main/CONTRIBUTING.md)를 읽으세요.

서버 변경은 권한·마이그레이션·감사·원자적 쓰기·호환성 계약을 보존해야 합니다.

## qtable-web

워크 센터, 보기, Dashboard, Automation, 협업, 검색, 접근성, i18n, AI 상호작용을 변경할 때는 [`QingZoneX/qtable-web`의 CONTRIBUTING.md](https://github.com/QingZoneX/qtable-web/blob/main/CONTRIBUTING.md)를 읽으세요.

프런트 저장소에는 빌드, 의존성, 보안, 라이선스, 컨테이너, 제품 계약 검사가 포함됩니다.

## 포털과 문서

포털 내용은 간체 중국어·번체 중국어·영어를 함께 유지하고, 공개 저장소의 현재 소스·버전 파일·Release 상태·Issues를 사실 출처로 삼아야 합니다. 로드맵 기능을 구현 완료로 쓰지 말고, 공개 소스 상태를 공개 배포물과 동일시하지 마세요.
