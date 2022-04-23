/**
 *  - register 메소드의 인자들을 체크하고, 에러메시지를 던짐
 */
{
    title( '인자 체크 기능을 보탠 DIContainer.register' );

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

    title( '인자를 확인하는 테스트' );
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
    } );
}
/**
 *      - 코드를 짤 때, 에러메시지도 prototype 안의 메소드에 넣어두어
 *        에러가 무엇때문에 발생하는지 명확히 하는게 중요하다.
 *
 */