/**
 *           ===== 반복이 캥거루 잡네 =====
 *
 *      - inheritClass02 처럼 고전적 상속을 흉내내면 코드 반복과
 *        메모리 점유는 피하기 어렵다
 *
 *      --> Marsupial 인스턴스를 Kangaroo 함수의 프로토타입에 할당하는 장면
 *
 *          Kangaroo.prototype = new Marsupial();
 *
 *      --> Marsupial 생정자 함수에 인자가 하나도 없다.
 *          Kangaroo 의 프로토타입을 지정하는 시점은 물론이고,
 *          Kangaroo 인스턴스가 맨들어지기 전까지 어떤 인자가 올지 알 길이 없다
 *
 *      --> 프로토타입 지정시 인자를 알 수 없으므로 Marsupial 함수의 프로퍼티
 *          할당 작업은 Kangaroo 함수에서도 되풀이 된다.
 *
 */
title( '반복이 캥거루잽음' );
{
    function Marsupial( name , nocturnal ){
        if ( !( this instanceof Marsupial) ){
            return new Error( '이 객체는 new 를 사용하여 생성해야 합니다' );
        };

        this.name = name;
        this.isNocturnal = nocturnal;
    };

    function Kangaroo( name ){
        if ( !( this instanceof Kangaroo ) ){
            return new Error( '이 객체는 new를 사용하여 생성해야 합니다' );
        }

        // name 과 isNocturnal 프로퍼티를 반복해서 할당한다
        this.name = name;
        this.isNocturnal = false;
    }

    debugger;

    /**
     *  - 이처럼 반복해서 프로퍼티를 할당하는 것은 명백한 DRY 원칙 위반이다.
     *    ( 불필요한 반복은 부실한 코드를 양산한다 )
     */
}

/**
 *  - 또한, Kangaroo 프로토타입( Marsupial 인스턴스 )과 Kangaroo 인스턴스 자신까지
 *    name , isNocturnal 프로퍼티를 들고 다니는 꼴이다
 *
 *  - 인자없이 Marsupial 을 호출했으니 Kangaroo.prototype 프로퍼티 값들은 undefined 이다.
 *
 *
 *            ===== 고전적 상속 흉내내기의 SOLID/DRY 요약표 =====
 *     ----------------------------------------------------------------
 *
 *     - 원칙                   - 결과
 *
 *     - 단일책임                - 고전적 상속 흉내 내기는 단일 책임 원칙을 지원하지만,
 *                               강제하지는 못한다.
 *
 *                               의존성을 주입하면 여러책임들을 객체들에 전가하지 않게끔
 *                               할 수 있다.
 *
 *                               new 키워드를 사용하면 생성자 함수를 애스팩트로
 *                               장식할 수 없다
 *
 *     - 개방/폐쇄               - 이 패턴의 주제자체가 개방/폐쇄 원칙이다
 *
 *     - 리스코프 치환            - 이 패턴은 의존성을 수정하는게 아니라 확장하려는 것이다
 *                               따라서 리스코프 치환 원칙에 충실하다
 *
 *     - 인터페이스 분리           - 해당 없음
 *
 *     - 의존성 역전              - 상속하는 객체의 생성자 함수에 의존성을 주입하는 형태로
 *                               실현할 수 있다
 *
 *     - DRY( 반복하지 마라 )     - 그다지 관련이 없다. 초기화 로직이 상속을 주고받는
 *                               객체 모두의 생성 함수에 걸쳐 반복된다
 *
 *                               하지만 프로토타입을 공유하면 함수 사본 개수를
 *                               줄일 수 있다
 *
 *     ----------------------------------------------------------------
 */