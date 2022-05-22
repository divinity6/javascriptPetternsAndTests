/**
 *           ===== 멍키 패칭의 의의 =====
 *
 *      - 빌린 함수에( 나중에라도 ! ) 다른 요건이 추가될 가능성은 항상 있다.
 *      --> 따라서, 패치를 관장하는 "빌려주는 객체"가 빌리는 객체가 요건을 충족하는지
 *          알아보게 하는 것이 가장 좋은 멍키패칭 방법이다
 *
 *      ----> 아래 예시에서 설명
 */
title( '멍키패칭의 의의' );
{
    var MyApp = MyApp || {};

    MyApp.Human = function( handFactory ){
        this.hands = [ handFactory() , handFactory() ];
    };

    MyApp.Human.prototype.endowSigning = function( receivingObject ){
        /**
         *  - 아, 이렇게 검증을 해서 빌려주는구나
         */
        if ( typeof receivingObject.getHandCount === 'function'
          && receivingObject.getHandCount() >= 2 ){
            receivingObject.useSignLanguage = this.useSignLanguage;
        }
        else {
            throw new Error( '미안하지만 너에게 수화를 가르쳐줄 수는 없겠어.' );
        }
    };
    debugger;

    /**
     *  - 빌리는 객체 또한, 빌려주는 객체의 질문에 반드시 대답해야한다
     */
    MyApp.Gorilla = function( handFactory ){
        this.hands = [ handFactory() , handFactory() ];
    };

    MyApp.Gorilla.prototype.getHandCount = function(){
        return this.hands.length;
    };

    /**
     *  -  koko.useSignLanguage = trainer.useSignLanguage;
     *     를 endowSigning 메서드를 이용하여 검증하고, 빌려주면 된다!!
     */
    try {
        trainer.endowSigning( koko );
    }
    catch( e ){
        console.log('trainer 가 정의되어 있지 아늠!' , e );
    }
}

/**
 *      - 이런식으로 한 객체의 기능 다발 전체를 다른 객체로 패치할 수 있음
 *
 *      --> 전통 개발자들은 인터페이스의 구현체로 오인하기 쉬운데
 *          사실은 인터페이스 뿐만아니라, 코드도 함께 구현한 것이라
 *          다중 상속( multiple inheritance )에 더 가까움!!
 *
 *      ----> 실제로 useSignLanguage 내부에서 참조해 사용하는
 *            코드들을 구현하고 있으니깐, 인터페이스 구현체라고 생각했는데
 *
 *            사실은, Human 과 Hand 의 메서드들을 상속받은 형식과
 *            매우 유사한거지
 *
 *      - 멍키 패칭은 '메서드 빌림( method borrowing )' 이라는 타이틀로
 *        더 자세히 설명할 수 있다.
 *
 */