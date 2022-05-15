/**
 *           ===== new 생성 객체의 SOLID/DRY 요약표 =====
 *
 *    - 각각 인스턴스가 isAwake 메서드를 들고 있는것보다,
 *      모든 객체 인스턴스가 isAwake 함수 사본 하나를 공유한 것이
 *      90% 이상 실행이 빠르다
 *
 *    ----------------------------------------------------------------
 *
 *     - 원칙                   - 결과
 *
 *     - 단일책임                - 물론 가능하다. 하지만 생성한 객체가 반드시 한가지,
 *                               한 가지 일에만 전념토록 해야함.
 *                               ( 생성자 함수에 의존성을 주입할 수 있다는 점에서
 *                                 도움이 된다 )
 *
 *     - 개방/폐쇄               - 당연하다. 상속을 다룰 때 new 로 생성한 객체를
 *                               어떻게 확장할 수 있는지 알게 됨
 *
 *     - 리스코프 치환            - 상속을 잘 이용하면 가능
 *
 *     - 인터페이스 분리           - 상속과 다른 공유 패턴을 이용하면 가능함
 *
 *     - 의존성 역전              - 의존성은 어렵지 않게 생성자 함수에 주입할 수 있다
 *
 *     - DRY( 반복하지 마라 )     - new 객체 생성 패턴을 쓰면 아주 DRY 한 코드가 된다
 *                               다만, AOP 를 이 패턴과 함께 잘 쓸 방법이
 *                               떠오르지 않음
 *
 *                               new 사용을 갖에하는 코드를 AOP 를 이용하여
 *                               캡슐화 하면 좋을 것 같은 아쉬움
 *
 *                               new 는 생성할 객체의 프로토타입을 상속한 객체를
 *                               생성하므로 AOP 와 new 는 친구가 되기 어려움
 *
 *                               이 객체를 애스팩트로 래핑하면 해당 객체의 프로토타입
 *                               이 아닌 애스팩트의 프로토타입을 사용하게 됨
 *
 *                               그러나, new 로 맨든 객체의 프로토타입에 있는 함수를
 *                               AOP 로 장식하는 건 얼매든지 가능!!!
 *
 *     ----------------------------------------------------------------
 *
 */
title( '' );
{
}
