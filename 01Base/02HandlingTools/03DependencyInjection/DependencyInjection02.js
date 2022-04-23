/**
 *          ===== 경량급 의존성 주입 프레임워크 개발 =====
 *
 *      - 의존성 주입 프레임워크 작동원리
 *
 *      1. 애플리케이션이 시작되자마자 각 인젝터블( injectable )명을 확인하고,
 *         해당 인젝터블이 지닌 의존성을 지칭하며 순서대로 DI 컨테이너에 등록한다
 *         ( injectable :: 주입가능한 모든 의존성을 집합적으로 일컫는 말 )
 *
 *      2. 객체가 필요하면 컨테이너에 요청한다
 *
 *      3. 컨테이너는 요청받은 객체와 그 의존성을 모두 재귀적으로 인스턴스화.
 *         ( 그 다음, 요건에 따라 필요한 객체에 각각 주입 )
 *
 */
title( '일부러 Error 던진거에요~ 무서워 말아용' );
{
    title( '빈 DIContainer.register 함수' );
    /**
     *           ===== Container( 컨테이너 ) =====
     *
     *          --> 인젝터블과 의존성등록, 요청시 객체를 내어주는 두가지일을 함.
     *              ( register 함수부터 코딩 )
     *
     *  - 인젝터블 명
     *
     *  - 의존성 명을 담은 배열
     *
     *  - 인젝터블 객체를 반환하는 함수.
     *    1) 인젝터블 인스턴스를 요청하면 컨테이너는 이 함수를 호출하여 반환값을 다시 반환.
     *    2) 요청받은 객체의 의존성 인스턴스를 이 함수에 전달.
     *
     *
     *
     *                       ===== toThrow( mather ) =====
     *
     *      - 개요 : expect() 함수의 예외 발생여부를 체크
     *      ---------------------------------------------------------------
     *      @return          - undefined
     *      ---------------------------------------------------------------
     */

    // register 는 DiContainer 의 인스턴스가 모두 공유하는 자원
    // ( 따라서 prototype 에 작성 )
    var DiContainer = function (){};
    DiContainer.prototype.register = function ( name , dependencies , func ){
    }

    title( '인자를 확인하는 테스트' );

    describe( 'DiContainer' , function(){
        var container;
        beforeEach( function() {
           container = new DiContainer();
        });

        describe( 'register( name , dependencies, func )' , function (){

            // 01
            it( '인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 탄다' , function (){
                var badArgs = [
                    // 인자가 아예 없는 경우
                    [],
                    // name 만 있는 경우
                    [ 'Name' ],
                    // name 과 dependencies 만 있는 경우
                    [ 'Name' , [ 'Dependency1' , 'Dependency2' ] ],
                    // dependencies 가 빠진 경우
                    // ( 상용 프레임워크는 지원하지만, DiContainer 는 지원하지 않음 )
                    [ 'Name' , function(){} ],
                    // 타입이 잘못된 다양한 사례들
                    [ 1 , [ 'a' , 'b' ], function(){} ],
                    [ 'Name' , [ 1 , 2 ], function(){} ],
                    [ 'Name' , [ 'a' , 'b' ], 'should be a function' ],
                ];

                badArgs.forEach( function( args ){
                    expect( function(){
                        /**
                         *  - 아 배열을 그대로 전달하려고 apply 를 사용했구나...
                         */
                        container.register.apply( container , args );
                    } ).toThrow();

                } );
            } );
        } );
    } );
    /**
     *           ===== 내용 정리 =====
     *
     *      - container 는 '테스트 대상' 으로 beforeEach 에서 생성.
     *        테스트마다 인스턴스 생성
     *
     *      - 중첩된 describes 와 it 함수의 파라미터 문자열을 읽어보면
     *        'DiContainer register( name , dependencies , func )는
     *        인자가 하나라도 누락 or 타입이 잘못되면 예외를 던진다는 문장이 됨
     *
     *      ----> 진짜 합쳐서 읽으면 문장이됨ㅋㅋㅋ
     *            ( 테스트 해야할 일을 명확하게 하는 거군... )
     */

}