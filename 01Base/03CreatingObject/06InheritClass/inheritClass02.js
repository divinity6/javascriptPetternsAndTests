/**
 *           ===== 고전적 상속( classical inheritance ) =====
 *
 *      - 아 해당 생성자에 곧바로 추가하는게 아니라,
 *        새로운 객체를 맨들어서 그 객체가 상속받도록 하는것이구만...
 */
title( '고전적 상속을 흉내 내어 Marsupial 확장' );
{
    function Marsupial( name , nocturnal ){
        if ( !( this instanceof Marsupial) ){
            return new Error( '이 객체는 new를 사용하여 생성해야 합니다' );
        };

        this.name = name;
        this.isNocturnal = nocturnal;
    }

    Marsupial.prototype.isAwake = function( isNight ){
        return this.isNocturnal === isNight;
    };

    function Kangaroo( name ){
        if ( !( this instanceof Kangaroo ) ){
            return new Error( '이 객체는 new를 사용하여 생성해야 합니다' );
        }

        this.name = name;
        this.isNocturnal = false;
    }

    Kangaroo.prototype = Object.create( new Marsupial() , {
        hop : { value : function(){
            return this.name + '가 껑충 뛰었어요!';
        } },
        constructor : { value : Kangaroo },
    } )

    // Kangaroo.prototype = new Marsupial();
    // Kangaroo.prototype.hop = function(){
    //     return this.name + '가 껑충 뛰었어요!';
    // }

    var jester = new Kangaroo( '제스터' );
    console.log( jester.name );
    // :: 제스터

    var isNightTime = false;
    console.log( jester.isAwake( isNightTime ) );
    // :: true
    console.log( jester.hop() );
    // :: 제스터가 껑충 뛰었어요!

    console.log( jester instanceof  Kangaroo );
    // :: true
    console.log( jester instanceof  Marsupial );
    // :: true
    debugger;

    /**
     *  - Kangaroo 함수의 기본 프로토타입을
     *    Marsupial 인스턴스로 교체했음
     *  --> 위 코드에선 Object.create 함수로
     *      교체가 아닌 상속받았음
     *
     *  - 암튼, 결론적으로 Kangaroo 의 프로토타입이 된
     *    Marsupial 인스턴스( Kangaroo )에 hop 함수를 추가하여 확장할 수 있게 됨
     */

}
/**
 *      - hop 함수는 Marsupial 생성자 함수는 물론 Marsupial 생성자 함수의
 *        prototype 어느쪽에도 추가되지 않음
 *
 *      --> 즉, Marsupial 함수는 달라진게 없다
 *
 *      - 개방 / 폐쇄 원칙을 제대로 실천한 사례!!!
 */