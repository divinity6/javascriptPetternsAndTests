/**
 *           ===== 실수를 모면하게 할 뿐 =====
 *
 *      - jester 는 new 가 빠져있지만 Marsupial 생성자 함수로 객체를 생성했음
 *
 *      --> 만약, 객체 생성 규칙에 생성자 함수명 첫 글자는 대문자여야 한다는
 *          규칙이 있다면 jester 인스턴스 생성코드는 오류처럼 보임
 *
 *      --> 일관성이 갖춰진 코드가 믿음성을 보이듯이, new 가 빠졋다면
 *          새로 맨들어 주는것이 아니라, 에러를 내뿜는게( 보호 장치 )
 *          훨씬 더 좋다.
 *
 *      --> new 가 빠졌을시 예외가 발생하면 Marsupial 객체 인스턴스가 모두 같은
 *          방식으로 생성되었다고 확신할 수 있음
 *
 *      ===== 일관적이고 분명한 코드베이스를 구축할 수 있도록 도와줌 =====
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

    /**
     *  - 만약 생성자 함수명 첫글자는 대문자여야 한다는 규칙이 있다면
     *    jester 인스턴스 는 오류처럼 보인다!!
     */
    var jester = Marsupial( '제스터' , false );
    var merlin = new Marsupial( '멀린' , false );
    // :: 슬라이더
    debugger;

    /**
     *      ===== 일관성은 곧 믿음성이다 =====
     */
}
