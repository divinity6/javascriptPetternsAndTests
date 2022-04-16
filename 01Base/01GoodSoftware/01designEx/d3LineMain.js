title('d3 line 생성기 제너레이터');
/**
 *  ==========================================================
 *                      - 실행기 ( Generator )
 *  ==========================================================
 * - 배열 데이터를 SVG path 로 변환하는 함수
 *  예) <path d="M10,130 L100,60 L190,160 L280,10"> </path>
 */
// 다른 전역 변수와 충돌을 피하기 위해 이름공간 생성
var rj3 = {};
// svg 라는 하위 이름공간 생성
rj3.svg = {};
// rj3.svg 이름 공간에 line 함수를 넣는다
rj3.svg.line = function(){

    // 배열 자체를 받아서 첫번째 두번째 만 설정하네
    /**
     * - 클로저로 인해 getX,getY, interpolate 함수를 사용할 수 있음
     * --> 좀더 자세한 이유는 사실애네들이 line 함수의 내부 프로퍼티인
     *     [[Scope]] 에 바인딩 되어있기 때문.
     * --> ( lexical 환경 컴포넌트의 외부 레퍼런스 참조 객체 )에 설정됨.
     *
     * =======================================================
     *              여기에 위치한 애들이 private 개념
     * =======================================================
     *  - 클로저안의 변수들을 스코프안에 선언하는 방식으로
     *    private 개념을 사용할 수 있다.
     */
    var getX = function( point ){
            return point[ 0 ];
        },
        getY = function( point ){
            return point[ 1 ];
        },
        // :: 사전적의미 : 말참견하다
        /**
         * - 이녀석도 실제 코드에선 getX , getY 처럼
         *   오버로딩 되어 있다...
         */
        interpolate = function( points ){
            // 이중배열도 배열을 전부 풀고 join 하는 구만.
            return points.join( "L" );
        };
    function line /* pure */( data ){
        debugger;
        var segments = [], // 분할하다( 부분 )
            points = [],   // 제대로 가공된 데이터가 들어가는 공간
            i = -1,
            n = data.length,
            d; // data 의 i 번째 객체( 마지막객체를 담게될듯 )

        function segment(){
            /**
             *  - 첫 번째 자리에 M( 명령어 ) 이들어오고
             *    그 이후에 뒤 쪽에 L( 경로 ) 을 연결해주기 위함이구만...
             */
            segments.push( "M" , interpolate( points ) );
        }

        // data 의 길이까지 반복
        while( ++i < n ){
            d = data[ i ];
            /**
             *  - 이건 여기에서 뭔가 또 처리를 할게 있으면 하기 위해서 쪼개논건가...
             *  --> 일단 나중에 +연산자로 인해 어떻게 바뀌는지 한번 보자구...
             *  --> 앞의 + 는 숫자처럼 생긴 문자열을 걸러내고 진짜 숫자만 points 배열에 넣는다
             *      ( Number 타입으로 변환해서 넣는구나 )
             *
             *  ================================================================
             *          - 진짜 설계에서 감탄스러운점. 오버로딩 한 곳에서
             *            인덱스가 필요할 지 모르니 i도 같이 넘겨줌...
             *
             *          --> 더 감탄스러운점
             *              this 를 데이터를 변경할 때 넘겨준다는점
             *              ( 즉, generator 함수( line )가 어딘가에 연결되어 있다면
             *                그곳의 객체를 여기서 이용할 수 있다는 뜻... )
             *  ================================================================
             */
            points.push( [ +getX.call( this , d , i ) , +getY.call( this , d , i )] );
        }

        // points 의 길이가 0 이아니면 points 에 segments
        if ( points.length ){
            segment();
        }

        // 마지막에 문자열로 전부 병합해서 반환
        return segments.length ? segments.join('') : null;
    }

    /**
     *  - getX , getY 오버라이드
     */
    line.x = function( funcToGetX ){
        /**
         *  - 미쳤네... 인자없이 x 를 호출하면
         *    현재 액세서( 접근자 )를 내어줌
         *    ( 즉, 인자없이 호출하면 그냥 기본값으로 사용하겠다는 이야기... )
         */
        if ( !arguments.length ){
            return getX;
        }
        getX = funcToGetX;
        // 오버로딩 해서 함수형으로 자기자신을 쓸 수 있도록...
        return line;
    };

    line.y = function( funcToGetY ){
        if ( !arguments.length ){
            return getY;
        }
        getY = funcToGetY;
        // 오버로딩 해서 함수형으로 자기자신을 쓸 수 있도록...
        return line;
    };

    // line 함수 반환
    return line;
}