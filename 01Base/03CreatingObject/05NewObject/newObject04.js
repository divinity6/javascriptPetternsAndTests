/**
 *           ===== 고유한 프로퍼티 생성 =====
 *
 *      - 아래의 예제는 new 객체 생성 패턴을 이용해
 *        생성자 함수 내부에서 함수 프로퍼티를 new 객체에 직접 정의하고
 *        각 객체 인스턴스에 프로퍼티를 추가하는 코드
 *        ( 각 인스턴스는 자신만의 고유한 메서드를 가지게 할 수 있음 )
 *
 */
title( 'new 객체에 함수를 직접 추가' );
{
    // nocturnal :: 야행성
    function Marsupial( name , nocturnal ){

        if ( !( this instanceof Marsupial ) ){
            return new Error( '이 객체는 new 를 사용하여 생성해야 합니다' );
        }

        this.name = name;
        this.isNocturnal = nocturnal;

        /**
         * - 그치, isAwake 이런거는 파라미터로 넘겨줄 필요 없이,
         *   내부의 isNocturnal 프로퍼티와 비교하면되는거니깐...
         */
        // 각 객체 인스턴스는 자신만의 isAwake 사본을 가진다
        this.isAwake = function( isNight ){
            return isNight === this.isNocturnal;
        };
    }

    var maverick = new Marsupial( '매버릭' , true );

    var slider = new Marsupial( '슬라이더' , false );

    var isNightTime = true;

    console.log( maverick , slider );

    console.log( maverick.isAwake( isNightTime ) );
    // :: true - 야행성이니깐... true 지

    console.log( slider.isAwake( isNightTime ) );
    // :: false
    debugger;
}
/**
 *  - 함수 프로퍼티를 생성자 함수의 프로토타입에 붙일 수도 있다.
 *  --> 생성자 함수의 프로토 타입 함수에 정의하면 객체 인스턴스를
 *      대량으로 생성할때 함수 사본 객체를 한 개로 제한 하여
 *      메모리 점유율을 낮추고 성능까지 높이는 추가 이점이 있음
 *
 *  ----> 아, 그니까, 즉 생성자 함수의 prototype 에 붙이는 이유가
 *        여러곳에서 공유하는거 뿐만아니라,
 *
 *        메모리 점유율을 낮추고 성능까지 높일 수 있는 효과가 있는거구나!!!
 *
 *  -----> 이런거 ) Marsupial.prototype.isAwake = function( isNight ){ ... }
 *
 *  ----> 이렇게 작성하면 메서드 구현부( isAwake )까지 공유하는 이점이 있구만
 *
 *  ================================================================================
 *          - 프로토타입을 사용하면 성능이 말도 안되게 개선된다
 *          예 ) http://jsperf.com/performance-prototype-vs-nonprototype
 *          --> http://jsperf.com 에서 성능비교를 확인할 수 있음
 *  ================================================================================
 *
 */

