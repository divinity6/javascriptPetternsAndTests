/**
 *           ===== new 를 사용하도록 강제 =====
 *
 *      - JS 로는 반드시 new 를 써서 생성자 함수를 호출하게 할 도리가 없음
 *      --> 하지만, instanceof 연산자를 써서 우회적으로 강제할 수 있음
 */
title( 'instanceof 연산자로 new 사용을 강제' );
{
    // nocturnal :: 야행성
    function Marsupial( name , nocturnal ){

        if ( !( this instanceof Marsupial ) ){
            return new Error( '이 객체는 new 를 사용하여 생성해야 합니다' );
        }

        this.name = name;
        this.isNoctoural = nocturnal;
    }

    var maverick = new Marsupial( '매버릭' , true );
    var slider = new Marsupial( '슬라이더' , false );

    console.log( maverick.isNoctoural );
    // :: true
    console.log( maverick.name );
    // :: 매버릭
    debugger;
}

/**
 *  - 만약 new 가 없을때 에러를 내지 않고 자동으로 new 를 붙여 인스턴스를 반환하게 맨들 수도 있다
 *
 */
title( 'new 를 자동으로 삽입하여 인스턴스를 생성' );
{
    // nocturnal :: 야행성
    function Marsupial( name , nocturnal ){

        if ( !( this instanceof Marsupial ) ){
            return new Marsupial( name , nocturnal );
        }

        this.name = name;
        this.isNoctoural = nocturnal;
    }
    var slider = new Marsupial( '슬라이더' , false );

    console.log( slider.name );
    // :: 슬라이더
    debugger;
}
/**
 *  - 이런식으로 new 없이 호출하더라도 new 가 없으면 자동으로 삽입하게
 *    처리하면 개발자는 함수 호출부에서 굳이 new 를 신경쓸 필요가 없다.
 *
 *
 *  - 하지만, 얼핏 편해보이는 new 키워드 자동삽입은 개발자의 실수를 모면하게 해줄 뿐임.
 */

