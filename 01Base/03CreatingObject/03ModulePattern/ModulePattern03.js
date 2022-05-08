/**
 *           ===== 즉시 실행 모듈 생성 =====
 *
 *      - API 를 반환하는 건 임의 모듈과 같지만, 외부 함수를
 *        선언하자마자 실행하는 방법
 *
 *      - 반환된 API 는 이름공간을 가진 전역 변수에 할당된 후
 *        해당 모듈의 싱글톤 인스턴스가 된다
 */
title( '싱글톤 모듈' );
{
    var MyApp = MyApp || {};

    MyApp.wildlifePreserveSimulator = ( function(){
        var animals = [];
        return {
            /**
             *  - 아, 아 이놈은 addAnimal 자체에서
             *    animalMaker 함수를( 의존성을 ) 인자로 받아서 실행해버리는구나...
             */
            addAnimal : function( animalMaker , species , sex ){
                animals.push( animalMaker.make( species , sex ) );
            },
            getAnimalCount : function(){
                return animals.length;
            }
        }
    }() ); // 즉시 실행

    debugger;

    /**
     *  - 사용 방법
     */
    try {
        // preserve :: 보존하다
        MyApp.wildlifePreserveSimulator.addAnimal( realAnimalMaker , 'gorilla' , 'female' );
    }
    catch( error ){
        console.log( 'animalMaker 가 선언되지 않음')
    };
};
/**
 *  - 오 이렇게 쓰니깐 진짜 MyApp.wildlifePreserveSimulator 의 인스턴스가 되어버렷네...
 *
 *  - 외부 함수는 애플리케이션 기동 코드의 실행과 상관없이 코드가 작성된 지점에서 즉시 실행됨
 *  --> 따라서, 즉시 실행시점에 의존성을 가져오지 못하면 외부함수에 의존성을 주입할 수 없다
 *      ( 매우 불편하다는 단점 )
 *
 *  --> 만약, 싱글톤이 꼭 필요하다면, 임의 모듈 패턴으로 모듈을 코딩하고,
 *      해당 모듈( MyApp.wildlifePreserveSimulator )을 요청할 때마다
 *      의존성 주입 프레임워크에서 같은 인스턴스를 제공하는 편이 의존성 주입 측면에서 더 낫다
 *      ( 앵귤러 JS 도 이와같은 방법을 사용하고 있음 )
 *
 *  ----> 싱글톤을 아직모르니 , 뒷장에 싱글톤 배우고 다시한번 보자...ㅋㅋ
 *        근데 대략 느낌적으로는 알겠는데 확실히 모를땐 아닥하는게 좋음
 *
 *  ========================================================================
 *              즉, 일반적인 경우에는 되도록 ModulePattern02 의
 *              임의 모듈 생성 패턴이 훨씬 좋다는 거네...
 *  ========================================================================
 */