/**
 *           ===== 의존성 주입 프레임워크 제작 =====
 *  --> 여기에서 전역설정을 하고 사용
 */

title( '의존성을 제공' );
var DiContainer = function (){
    // 반드시 생성자로 객체를 생성하게 한다
    if ( !( this instanceof DiContainer) ){
        return new DiContainer();
    }

    // 내부 프로퍼티에 등록 배열 설정( 초기화 )
    // 애는 보이는 것만 배열이지 실제 쓰임새는 배열처럼 쓰이질 않네...ㅋㅋㅋ
    this.registrations = [];
};

// 에러났을 경우 발생할 메시지
DiContainer.prototype.messages = {
    registerRequiresArgs : '이 생성자 함수는 인자가 3개 있어야 합니다' +
                            '문자열 , 문자열 배열 , 함수',
};

/**
 *  - 여기서 인자로 name 을 받는 이유중 하나가, 물론 프로퍼티에 저장하려고하는 것도 있지만
 *    그 name 으로 해당 함수를 찾으려고하는것
 */
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
    this.registrations[ name ] = { dependencies : dependencies , func : func };
};

title( '의존성을 제공하는 get 메서드' );
DiContainer.prototype.get = function ( name ){
    var self = this,
        registration = this.registrations[ name ],
        dependencies = [];

    if ( registration === undefined ){
        return undefined;
    }

    registration.dependencies.forEach( function( dependencyName ){
        // 여기서 재귀적으로 호출하는 이유가 있었네...
        // 의존성 애들을 여기서 설정하려고...
        /**
         * - 보통 이런건 분리해서 사용하는데, 같은함수를 사용해보리네...
         * --> 와 진짜 머리를 개잘써야하네...ㅋㅋ
         *     ( 그 의존성의 의존성을 넣을 수 있으니깐... )
         */
        var dependency = self.get( dependencyName );
        dependencies.push( dependency === undefined ? undefined : dependency );
    } );
    /**
     *  - 미쳤다 여기서 파라미터로 dependencies 들을 넘겨주니깐
     *    받는쪽에서 없으면 없는대로 있으면 있는대로 들어가는 거구나...
     *
     *  --> this 를 왜 굳이 undefined 로 줄까...?
     *  ----> 와...이거 undefined 를 넘겨주면 this 가 window 를 참조하네!!
     */
    return registration.func.apply( undefined , dependencies );
}
/**
 *           ===== 테스트 =====
 */
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

            container.register( main , [ dep1 , dep2 ] ,
                // apply( undefined , ... ) 이거는 this 가 window 를 참조.
                function( dep1Func , dep2Func ){
                    /**
                     *  아... 여기의 함수에서 생성자 함수로 인스턴스를
                     *  반환할 작정이구나...는
                     */
                return function(){
                    return dep1Func() + dep2Func();
                };
            } );

            /**
             *  - 의존성을 설정할 녀석들은 여기서 넘겨주고 위의 main 에서 실행해버리는구나...
             */
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

            /**
             *  - 여기서 mainFunc 가 generator 역할을 하네...
             */
            mainFunc = container.get( main );
            expect( mainFunc() ).toBe( 3 );
        } );

    } );
} );


/**
 *  - 구조 진짜 미쳣다
 *  --> 디버깅을 찍어보는데 전부 밖에서 값들을 떤져주면
 *      container 는 진짜 내부에 저장만 해두고 있다가
 *      get( 요청 ) 하면 던져주는 개념이네...
 *
 *  - 큰 흐름...
 *
 *  --> 즉, container.register 로 의존성 메소드와
 *      실제 사용할 객체( 메소드 )들을 등록하고
 *
 *  --> container.get 으로 요청해서 가져오는 것
 *
 *  - 그러면 container 함수는 등록시켜주고 , 요청받은 데이터를
 *    보여주는 역할만 하니깐...
 *    ( 내부 프로퍼티에 담아두지 않고, 의존성은 주입받을 뿐임... )
 *
 *  - 등록할때 일단 한곳에 전부 등록시켜버리는군...
 */

/**
 *   - 정리
 *
 *   =======================================================================
 *
 *      - 어떤 기능을 구현해야 된다면, 그 구현에서 의존성이 들어가는지 살펴봐라!
 *        ( 의존성이 들어가게 된다면 의존성을 주입할 컨테이너를 맨들어야함 )
 *
 *      - 컨테이너는 조회 및 등록 같은 CRUD 등의 기능들만 지원해야 한다!!
 *
 *      - 실제 기능을 구현할때 의존성 코드를 추가해야 한다면 factory 함수를 이용해 인스턴스화 해라!
 *        호출할때도 편하고 , 사용성도 높아진다
 *        ( 호출할때, 그지점의 환경에서 중간중간 파라미터를 삽입할 수 있다.  )
 *
 *   =======================================================================
 */