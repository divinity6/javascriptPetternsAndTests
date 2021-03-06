/**
 *           ===== 모듈 생성의 원칙 =====
 *
 *      - 임의든, 즉시든 모듈을 생성할때는 다음 사항을 유념해야함.
 *
 *      1. 단일 책임 원칙을 잊지말고 한 모듈에는 한가지 일만 시켜야함.
 *      --> 결속력이 강하고, 다루기 쉬운 아담한 API 를 작성하게 됨
 *
 *      2. 모듈 자신이 쓸 객체가 필요하다면 의존성 주입형태로
 *         ( 팩토리 주입 형태 ) 이 객체를 제공
 *
 *      3. 다른 객체 로직을 확장하는 모듈은 해당 로직의 의도가 바뀌지 않도록
 *         분명히 밝혀라
 *         ( 리스코프 치환 원칙 )
 *
 *
 *
 *            ===== 모듈의 SOLID/DRY 표 =====
 *
 *     ----------------------------------------------------------------
 *
 *     - 원칙                   - 결과
 *
 *     - 단일책임                - 모듈은 태생 자체가 의존성 주입과 친화적이고,
 *                               애스팩트 지향적이라 단일 책임 유지는
 *                               어렵지 않다
 *
 *     - 개방/폐쇄               - 다른 모듈에 주입하는 형태로 얼마든지 확장할 수 있다
 *                               통제해야할 모듈은 수정하지 못하게 차단할 수 있다
 *
 *     - 리스코프 치환            - 의존성의 의미를 뒤바꾸는 일만 없으면 별 문제 없다
 *
 *     - 인터페이스 분리           - 결합된 API 모듈 자체가 자바스크립트에서 분리된
 *                               인터페이스나 다름없다
 *
 *     - 의존성 역전              - 임의 모듈은 의존성으로 주입하기 쉽다. 모듈이 어떤
 *                                형태든 다른 모듈에 주입할 수 있다
 *
 *     - DRY( 반복하지 마라 )     - 제대로만 쓴다면 DRY 한 코드를 유지하는데
 *                               아주 좋은 방법이다
 *
 *     ----------------------------------------------------------------
 *
 *     - 129p 완료
 */
title( '모듈 생성의 원칙' );
{};
/**
 *  - 와 오늘배운거 ㄹㅇ 레전드인데...?
 *  --> 이건진짜 핵꿀팁이다. 지금 맨들고있는 프로젝트에 바로적용해야겠다
 *  --> 모듈패턴... 이거는 진짜 찐이다
 *
 *  - 진짜 단일책임... 말로는 쉬운데 해보면 진짜 잘안되지.
 *    그치만 해당기능기능별로 분리해서 의존성 주입형태로 넣어줘야해.
 *
 *  - 그리고 결국 모듈에서 반환하는 객체들은 나도 모르는새 API 가 되어있는거지...
 *
 *  --> 객체 리터럴 생성방법도... 무조건 쌩짜로 객체를 생성하는건
 *      망하는 코드의 지름길이엿네...ㅋㅋ
 *
 *  ==============================================================
 *           진짜 객체를 바르게 생성하기... 바르게 생성하는 방법이네
 *  ==============================================================
 *
 */