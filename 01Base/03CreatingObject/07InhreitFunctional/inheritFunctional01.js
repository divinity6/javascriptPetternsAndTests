/**
 *           ===== 함수형 상속 =====
 *
 *      - 함수형 상속( functional inheritance )을 하면 데이터를 숨긴 채
 *        접근을 다스릴 수 있다
 *
 *      --> 고전적 상속 흉내내기의 생성자 반복문제를 함수형 상속에서는 어떻게 해결했는지,
 *          외부 객체 사용부와 사용자로부터 데이터를 감추는 방법등
 *
 *      ----> 이렇게 할 수 있다면 public/ private 데이터 모두
 *            실수와 오용에 노출될 빈도가 줄어들어 믿음성이 커짐
 *
 *      - 모듈 패턴 역시 고전적 상속 흉내내기에서 생성자 로직 중복을
 *        들어냈던 식으로 깔끔하게 상속을 지원함
 *
 *      ----> 관건 : Marsupial 을 상속한 이후 hop 함수를 추가한
 *                  Kangaroo 객체를 맨드는 일이 관건인데,
 *                  함수형 상속 패턴과 모듈을 이용한 구현
 *
 */
title( 'marsupial 과 kangaroo 함수가 있는 AnimalKingdom 모듈' );
{
    /**
     *  - 아 함수형 상속은 모듈패턴 처럼 구현하네!!
     */

    var AnimalKingdom = AnimalKingdom || {};

    AnimalKingdom.marsupial = function( name , nocturnal ){

        var instanceName = name,
            instanceIsNocturnal = nocturnal;

        return {
            getName : function(){
                return instanceName;
            },
            getIsNocturnal : function(){
                return instanceIsNocturnal;
            }
        };
    };

    /**
     *  - kangaroo 객체로 marsupial 객체를 내부에서 호출하는구나
     *
     *  --> 이렇게 감싸면 kangaroo 는 marsupial 에 의존하게 되겠네
     */
    AnimalKingdom.kangaroo = function( name ){
        var baseMarsupial = AnimalKingdom.marsupial( name , false );

        baseMarsupial.hop = function (){
            return baseMarsupial.getName() + '가 껑충 뛰었어요!';
        };
        return baseMarsupial;
    };

    var jester = AnimalKingdom.kangaroo( '제스터' );
    console.log( jester.getName() );
    // :: 제스터
    console.log( jester.getIsNocturnal() );
    // :: false
    console.log( jester.hop() );
    // :: '제스터가 껑충 뛰었어요!'
    debugger;

    /**
     *      - 와 JS 에서 함수형 상속은 진짜 혁신이네...
     *
     *      --> 코드가 진짜 깔끔해지고 DRY 해진다
     *          내부 프로퍼티들은 숨겨두고
     *
     *          그녀석들을 꺼내서 가지고오는 메서드들만
     *          외부에 보여주는구나...
     *
     *      ----> 이런식으로 코드를 짜야 개에뻐지겟네
     *
     *      ----> 근데 이건 모듈패턴이랑 똑같은데...?
     */

}

/**
 *      - AnimalKingdom.kangaroo 가 생성된 후 반환한
 *        baseMarsupial 객체는 AnimalKingdom.marsupial 로
 *        생성한 객체의 인스턴스다
 *
 *      --> 다음으로 AnimalKingdom.kangaroo 함수는
 *          baseMarsupial 인스턴스를 확장해 hop 함수를 추가한다
 *
 *      --> 이 과정에서 AnimalKingdom.marsupial 은 달라질게 없다
 *          ( 개방 / 폐쇄  의 원칙이 충실히 반영된 결과다 )
 *
 *      - 모듈을 이용한 함수형 상속은 고전적 상속 흉내내기와 달리
 *        AnimalKingdom.marsupial 의 생성로직을
 *        AnimalKingdom.kangaroo 에 다시사용할 필요가 없음
 *        AnimalKingdom.kangaroo 는 AnimalKingdom.marsupial 의
 *        생성로직을 그대로 사용하기 때문임.
 *
 *      ----> 이보다 더 DRY 할 수 있을까?
 */