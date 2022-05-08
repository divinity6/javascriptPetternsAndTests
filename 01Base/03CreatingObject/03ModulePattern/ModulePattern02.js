/**
 *           ===== 임의 모듈 생성 =====
 *
 *      - 아래 코드는 원하는 시점에 언제라도 생성할 수 있는 모듈.
 *        모듈 함수를 호출하여 API 를 얻음
 */
title( '임의 모듈 패턴 예시' );
{
    // 해당 애플리케이션에서만 사용할 수 있는 모든 객체( 모듈 )를 담아 넣은
    // 전역 객체를 선언하여 이름공간처럼 활용

    var MyApp = MyApp || {};

    // 애플리케이션 이름공간에 속한 모듈
    // 이 함수는 animalMaker 라는 다른 함수에 의존하며 animalMaker 는 주입 가능하다
    MyApp.wildlifePreserveSimulator = function( animalMaker ){

        // 프라이빗 변수
        var animals = [];

        // API 를 반환
        return {
            addAnimal : function( species , sex ){
                animals.push( animalMaker.make( species , sex ) );
            },
            getAnimalCount : function(){
                return animals.length;
            }
        }
    };

    /**
     *  - 사용 방법
     */
    try {
        // preserve :: 보존하다
        var preserve = MyApp.wildlifePreserveSimulator( realAnimalMaker );
        preserve.addAnimal( 'gorilla' , 'female' );
    }
    catch( error ){
        console.log( 'animalMaker 가 선언되지 않음')
    };
}
/**
 *  - 와, 그니깐 쌩으로 animalMaker 를 맨들어버리는 것이 아니라,
 *  --> 이 의존성을 주입받아서, wrapper 객체에서 기능을 추가해서 반환해버리는 거네...
 *      그치, 시뮬레이터안에다 애니멀들을 넣는 거니깐...
 *      addAnimal 이란 기능은 시뮬레이터에 있는게 맞지.
 *
 *  --> 진짜, 따로따로 분리해서 생각하고 맨드는 습관을 잘들여야겟네
 *
 *
 *           ===== 임의 모듈 생성 특징 =====
 *
 *      - 이 모듈은 객체 리터럴을 반환하지만, animalMaker 같은 의존성을 외부 함수에
 *        주입하여 리터럴에서 참조하게 맨들 수 있다.
 *
 *      - 다른 모듈에 주입할 수 있어 확장성이 좋다.
 *        옛 버전 모듈을 새 버전 모듈에 주입하여 원하는 래핑, 표출, 확장등을 꾀할 수 있다
 *
 *      --> 개방/ 폐쇄 원칙이 최우선 관심사라면 모듈만한 것이 없다
 *
 *      - 추가 ) MyApp.wildlifePreserveSimulator 에 after 어드바이스 등을 추가해
 *              반환된 객체에 애스팩트등을 적용할 수도 있다.
 *
 *              이 어드바이스는 반환된 리터럴을 쥐고 있다가 필요에 따라 이 리터럴은
 *              다른 애스팩트로 수정하는 것도 가능하다.
 */