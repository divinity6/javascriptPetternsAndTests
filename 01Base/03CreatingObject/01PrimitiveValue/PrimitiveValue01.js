/**
 *           ===== 원시형 =====
 *
 *      - 객체의 프리미티브 value
 *      --> Number , String , Boolean , Undefined , Null , Symbol
 *      ----> Js 는 기본적으로 프리미티브 값이라도 빌트인 오브젝트의
 *            Wrapper 객체를 상속받고 있다.
 *
 *      ----> Wrapper 객체를 제공함에 있어서의 장점 :
 *            원시형만으로 구현하려면 더러워지고 복잡해지는 코드를
 *            많은 기능을 제공함으로써 깔끔하게 사용할 수 있음.
 *
 *
 *            ===== 원시형의 SOLID/DRY 표 =====
 *
 *     ----------------------------------------------------------------
 *
 *     - 원칙                   - 결과
 *
 *     - 단일책임                - 그 누가 원시형만큼 일편단심일 수 있을까
 *
 *     - 개방/폐쇄               - 확장에 개방적? No, 변경에 폐쇄적? No
 *                               원시형은 불변값( immutable )
 *
 *     - 리스코프 치환            - 해당사항 없음
 *
 *     - 인터페이스 분리           - 원시형에 인터페이스를 구현하고 싶지만
 *                               불가능한 일이다
 *
 *     - 의존성 역전              - 원시형에 의존성은 없다
 *
 *     - DRY( 반복하지 마라 )     - 실제로 많은 유혹을 느낌
 *
 *     ----------------------------------------------------------------
 */
title( 'primitiveValue' );
{
    debugger;
}
/**
 *  - 팁 : 원시형을 자꾸 반복하는건 좋지 않음.
 *
 *  - 변수에 값을 넣고 다른곳에서 참조하는 것보다 그 값을 한번 더 입력하는것이
 *    더 편하지만 한번 이상 참조할 상수는 변수에 담아두고 변수를 참조
 *    ( 아니면 상수를 의존성 주입으로 하는 방법도 있음 )
 *
 */