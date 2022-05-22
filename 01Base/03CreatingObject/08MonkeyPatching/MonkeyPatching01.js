/**
 *           ===== 멍키 패칭 =====
 *
 *      - 부분 조합( Composing by Parts )이라고도 불림
 *
 *      - 멍키패칭( monkey-patching )은 추가 프로퍼티를 객체에 붙이는 것
 *        ( 그래서 서로 다른 객체가 같은 프로퍼티( 메서드 )를 사용하게 하는 것 - 빌리는 개념과 유사하네 )
 *
 *      --> 다른 객체의 함수를 붙여 객체의 덩치를 불리는 일은
 *          JS 가 제격임
 *
 *      - 아래 코드는 새 객체에 없는 함수를 불러 쓸때 문제가 된다
 *        ( 이게 먼말이여... )
 *      --> 아, 그니깐, human.useSignLanguage 에서
 *          참조하는 프로퍼티들이 koko.useSignLanguage 에 없을 때 문제가
 *          된다는 뜻이구나!!
 */
title( '프로퍼티를 객체에 붙임 - 멍키패칭' );
{
    var human = {
        who : 'human',
        useSignLanguage : function(){
            return '손을 움직여 수화하고 있어. 무슨 말인지 알겠니?';
        }
    };

    var koko = { who : 'gorilla' };
    koko.useSignLanguage = human.useSignLanguage;

    console.log( koko.useSignLanguage() );
    // :: 손을 움직여 수화하고 있어. 무슨 말인지 알겠니?
    debugger;
}

/**
 *      - 따라서, 아래와 같은 견고하게 고쳐서 사용해야 한다
 */
title('멍키 패칭');
{
    var MyApp = MyApp || {};

    MyApp.Hand = function(){
        this.dataAboutHand = {}; // etc.
    };

    /**
     *  - 이게 일반적으로 쓰는 prototype 상속이지
     */
    // MyApp.Hand.prototype = Object.create( Object.prototype , {
    //     constructor : {
    //         value : MyApp.Hand,
    //     },
    //     arrangeAndMove : {
    //         value : function( sign ){
    //             this.dataAboutHand = '새로운 수화 동작';
    //         }
    //     }
    // } );

    MyApp.Hand.prototype.arrangeAndMove = function( sign ){
        this.dataAboutHand = '새로운 수화 동작';
    };

    MyApp.Human = function( handFactory ){
        this.hands = [ handFactory() , handFactory() ];
    };

    MyApp.Human.prototype.useSignLanguage = function( message ){
        var sign = {};

        // 메시지를 sign 에 인코딩한다
        this.hands.forEach( function( hand ){
            hand.arrangeAndMove( sign );
        } );
        return '손을 움직여 수화하고 있어. 무슨말인지 알겠니?';
    };

    MyApp.Gorilla = function( handFactory ){
        this.hands = [ handFactory() , handFactory() ];
    };

    // 이게 사용부 구나
    MyApp.TeachSignLanguageToKoko = ( function(){
        var handFactory = function(){
            return new MyApp.Hand();
        };
        // ( 빈자의 의존성 주입 )
        var trainer = new MyApp.Human( handFactory );
        var koko = new MyApp.Gorilla( handFactory );

        koko.useSignLanguage = trainer.useSignLanguage;
        console.log( koko.useSignLanguage( '안녕하세요!' ) );
        // :: 손을 움직여 수화하고 있어. 무슨말인지 알겠니?
        debugger;
        return false;
    }() );

    debugger;

    // 아, MyApp.TeachSignLanguageToKoko 여기서 Factory 함수로 MyApp.Hand()를 생성 하는구나

    // 결국, MyApp.Hand() 애가 팩토리 생성자 함수구나...

    // 즉, Hand() 를 의존성 주입으로 받은 Human 생성자 함수의 인스턴스인 trainer 객체라...

    // 그래서 그객체의 useSignLanguage 객체를 Gorilla 객체의 프로퍼티에서 참조한다는거 잖아

    // Human 의 hands 객체를 이용하려고 하는건가...?

    // 아니, 잠만... useSignLanguage 를 사용하는데 this 는 Gorilla 의 hands 를 참조하는데...?
    /**
     *  - 그치, koko.useSignLanguage 이렇게 불렀으니
     *    this 가 참조하는 콘텍스트는 koko 지...
     *
     *  --> 따라서, koko.dataAboutHand = '새로운 수화 동작'
     *      이게 들어가는게 맞지.
     */
}
/**
 *      - 위의 코드는
 *        koko.useSignLanguage = trainer.useSignLanguage;
 *        여기에서 멍키패칭이 일어난다
 *
 *      - 조련사( trainer )의 수화( sign language ) 능력을 코코( Koko )에게 패치한다
 *
 *      --> 코코에게 ( Human.useSignLanguage 함수의 this 에 있어야할 hands 프로퍼티 )
 *          손( hands )이 있기 때문에 가능한 일이다
 *
 *      ----> 아, 즉 이 메서드들의 의도는
 *            Hand 에 손에 관한 프로퍼티들이 정의되어 있고,
 *            Human 에서 이 Hand 에 관한 프로퍼티들을 프로퍼티 형식에 맞춰 사용하는거구나
 *            그리고,
 *            Gorilla 에서 Human 가 가지고 있는 프로퍼티를 참조해서 사용하려 한다는 의의군
 *            ( 그러려면 Gorilla 에서 Human 의 프로퍼티들이 참조하는 프로퍼티들을 가지고 있어야지 )
 *
 *            this 가 koko 를 참조하기 때문에 useSignLanguage 는 한번 정의 되어있지만,
 *            여러 객체에서 마치 자기 객체처럼 사용할 수 있네( this 따라서 움직이자너... )
 *
 *      --> 단계별로 살펴보기
 *
 *      1. koko.useSignLanguage( 'Hello!' ) 호출
 *
 *      2. 멍키 패칭을 했으니 MyApp.Human.prototype.useSignLanguage 가 실행
 *
 *      3. 이 함수는 this.hands 에 접근한다
 *
 *      4. 여기서 this 는 useSignLanguage 를 호출한 객체, 즉 MyApp.Gorilla 객체( koko )다
 *         따라서 MyApp.Gorilla 객체도 비로소 수화할 수 있는 손을 가지게 되었다
 *
 *      ----------------------------------------------------------------
 *        - 멍키패칭을 사용하는 궁극적인 이유가 각각의 인터페이스들을 분리하기 위해서네!!
 *      ----------------------------------------------------------------
 */