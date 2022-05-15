/**
 *           ===== 클래스 상속 =====
 *
 *      - JS 는 클래스가 없으므로 C# , C++ 처럼 클래스 상속을 할 수 없지만,
 *        프로토타입 상속으로 어느정도 흉내낼 수 있음
 *
 *           ===== 고전적 상속 흉내내기 =====
 *
 *      - 고전적 상속( classical inheritance )을 모방할 수 있는 건 순전히
 *        함수 프로토타입 덕분
 */
title( 'Marsupial 함수와 생성자 함수 사용법' );
{
    // nocturnal :: 야행성
    function Marsupial( name , nocturnal ){
        if ( !( this instanceof Marsupial ) ){
            return new Error( '이 객체는 new 를 사용하여 생성해야 한다' );
        }

        this.name = name;
        this.isNoctoural = nocturnal;
    }

    Marsupial.prototype.isAwake = function( isNight ){
        return isNight === this.isNoctoural;
    }

    debugger;
}

/**
 *           ===== 함수 확장 =====
 *
 *      - 만약 위의 Marsupial 생성자 함수를 확장해, 캥거루 일 경우
 *        hop 메서드라는 특정 프로퍼티를 넣는다고 한다
 *
 *      - Marsupial 생성자 함수 프로토타입에 hop 함수를 추가
 *        ( 또는 Marsupial 함수로 생성한 객체 인스턴스에 직접 추가 )
 *        할 수 있지만 그것이 최선일까?
 *
 *      --> 만약, Marsupial 생성자 함수 프로토타입에 hop 함수를 추가하게 되면
 *          모든 객체 인스턴스는 hop 함수를 달고 다닐것이다.
 *
 *      ----> 캥거루만 뛰게( hop )하고 싶지만, Marsupial 을 바꾸면 젠부 뛰게 된다.
 *            이는 개방/폐쇄 원칙에도 맞지않음
 *
 *
 *  ================================================================================
 *        최선의 미더운 해결책은 Marsupial 을 상속한 Kangaroo 함수를 생성한 뒤 확장하는 것
 *  ================================================================================
 */