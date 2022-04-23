/**
 *  - register 함수만으로는 의존성을 끌어낼 방법이 없어 컨테이너에 의존성이
 *    잘 들어갔는지 확인이 어려움.
 *
 *  - 따라서, get 함수 작성.
 *
 *  - 명심할 것 : 코드가 전혀 없어도 되니 테스트를 성공시킬 최소한의 코드만 작성해야함!!
 *              ( 코드가 테스트보다 앞서나가면 안된다 !! )
 *
 *  - 아... 변수명이나 코드만 봐도 뭘하려는건지 알 수 있게, + DRY 하게 코드를짜야해...
 *
 */
title( '일부러 Error 던진거에요~ 무서워 말아용' );
{
    title( 'get 함수에서 미등록 성명인지 확인' );

    var DiContainer = function (){
        // 반드시 생성자로 객체를 생성하게 한다
        if ( !( this instanceof DiContainer) ){
            return new DiContainer();
        }
    };

    // 에러났을 경우 발생할 메시지
    /**
     * - 내부 함수로 설정해둔게 아니라
     *   prototype 에 넣어두었기 때문에
     *   외부로 표출된다.
     */
    DiContainer.prototype.messages = {
        registerRequiresArgs : '이 생성자 함수는 인자가 3개 있어야 합니다' +
                                '문자열 , 문자열 배열 , 함수',
    };
    DiContainer.prototype.register = function ( name , dependencies , func ){
        var ix;

        // 에러처리
        if ( typeof name !== 'string'
            || !Array.isArray( dependencies )
            || typeof func !== 'function' ){
            throw new Error( this.messages.registerRequiresArgs );
        }

        for ( ix = 0; ix < dependencies.length; ++ix ){
            if ( typeof dependencies[ ix ] !== 'string' ){
                throw new Error( this.messages.registerRequiresArgs );
            }
        }
    };
    title( '최소한의 DiContainer.get 함수 코드' );
    DiContainer.prototype.get = function ( name ){
    }

    describe( 'DiContainer' , function(){
        var container;
        beforeEach( function() {
           container = new DiContainer();
        });

        describe( 'register( name , dependencies, func )' , function (){

            // 01
            it( '인자가 하나라도 누락되었거나 타입이 잘못되면 예외를 탄다' , function (){
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
                    } ).toThrowError( container.messages.registerRequiresArgs );
                } );
            } );
        } );

        describe( 'get(name)' , function (){
            it( '성명이 등록되어 있지 않으면 undefined 를 반환한다' , function(){
                expect( container.get('noDefined') ).toBeUndefined();
            } );

            it( '등록된 함수를 실행한 결과를 반환한다' , function(){
                /**
                 * - 좋은 코드는 주석없이 코드만 보아도 뭘하려는지 금방 알 수 있다
                 *   ( 자기 서술적 코드 ( self-documenting ) )
                 */
                var name = 'MyName',
                    returnFromRegisteredFunction = 'something';

                container.register( name , [] , function(){
                    return returnFromRegisteredFunction;
                } );

                expect( container.get( name ) ).toBe( returnFromRegisteredFunction );

            } );

        } );
    } );
}