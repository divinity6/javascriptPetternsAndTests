/**
 *  - register 에서 이름으로 기능들을 등록하고,
 *  --> get 에서 등록된 기능들을 가져와 실행하는구나
 *
 *  - 와 진짜 container 는 등록하고, 값을 조회하는 기능만 실천하네...
 *    ( 말그대로 container... )
 *
 *
 *  --> 실제 내부에서 실행해야할 로직들은 젠부 외부에서 주입받아 실행함..
 *      ( 이것이 주입... )
 *
 *  ===== 의존성 등록 테스트!! =====
 */
title( '일부러 Error 던진거에요~ 무서워 말아용' );
{
    title( '등록된 함수를 DiContainer.get 으로 조회' );
    var DiContainer = function (){
        // 반드시 생성자로 객체를 생성하게 한다
        if ( !( this instanceof DiContainer) ){
            return new DiContainer();
        }

        // 내부 프로퍼티에 등록 배열 설정( 초기화 )
        this.registrations = [];
    };

    // 에러났을 경우 발생할 메시지
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
        // 내부 프로퍼티에 등록하는 함수 설정
        this.registrations[ name ] = { func : func };
    };
    title( '의존성을 제공하는 get 메서드' );
    DiContainer.prototype.get = function ( name ){
        var registration = this.registrations[ name ];

        if ( registration === undefined ){
            return undefined;
        }
        // 등록된 기능 실행
        return this.registrations[ name ].func();
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
                        container.register.apply( container , args );
                    } ).toThrowError( container.messages.registerRequiresArgs );
                } );
            } );
        } );

        describe( 'get( name )' , function(){
            it( '성명이 등록되어 있지 않으면 undefined 를 반환한다' , function(){
                expect( container.get('noDefined') ).toBeUndefined();
            } );

            it( '등록된 함수를 실행한 결과를 반환한다' , function(){
                var name = 'MyName',
                    returnFromRegisteredFunction = 'something';

                container.register( name , [] , function(){
                    return returnFromRegisteredFunction;
                } );
                expect( container.get( name ) ).toBe( returnFromRegisteredFunction );

            } );

            it( '등록된 객체에 의존성을 제공한다' , function(){
                var main = 'main',
                    mainFunc,
                    // dep 애네들을 의존성 객체로 본걸로 보임
                    dep1 = 'dep1',
                    dep2 = 'dep2';

                /**
                 *  - 즉, main 이 하고싶은 일은 dep1 과 dep2 를 더하여
                 *    값을 출력하고 싶은거로군...
                 *
                 *  --> 그리고 dep1 과 dep2 는 의존성을 제공하여 넘겨주고....
                 */
                container.register( main , [ dep1 , dep2 ] , function( dep1Func , dep2Func ){
                    return function(){
                        return dep1Func() + dep2Func();
                    };
                } );


                // 의존성 등록
                container.register( dep1 , [] , function(){
                    return function(){
                        return 1;
                    };
                } );

                container.register( dep2 , [] , function(){
                    return function(){
                        return 2;
                    };
                } );

                mainFunc = container.get( main );
                console.log( container.registrations );
                debugger;
                expect( mainFunc() ).toBe( 3 );
            } );

        } );
    } );
}

/**
 *      - 진짜 보고 느낀건 container 메소드는 감싼역할...
 *      --> 조회하고 값을 내보내고 약간 CRUD 개념을 가진 함수로 보임
 *
 *      --> 비즈니스 로직 처리는 전부 주입받아서 처리( 파라미터로 넘겨받아서... )
 *
 *      --> 그리고 비즈니스로직을 처리하는데 있어 필요한 파라미터도 전부 의존성으로
 *          넘겨받아서 처리해버리네...ㅋㅋㅋ
 */