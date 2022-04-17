/**
 *          ===== 단일 책임 원칙 =====
 *
 *      - 모든 클래스( 자바스크립트 : 생성자 함수 )는 반드시 한 가지
 *        변경사유가 있어야 함.
 *
 *      --> rj3.svg.line() 함수 는 어떤 데이터 소스를 받더라도 동작가능.
 *          ( 데이터가 바뀌더라도 바뀌는 정보는 외부에서 받고,
 *            심지어 데이터를 처리하는
 *            - x , y 를 추출하는 방식 -
 *            까지도 넘겨받아 처리 )
 *
 *      ----> rj3.svg.line() 함수는 알고 있는게 거의 없다.
 *            점 데이터를 배열로 받아서 SVG 경로를 그려주는 함수를
 *            반환할 뿐!.
 *
 *      ----> 오직 line() 함수의 관심사는 배열에서 SVG() 경로를
 *            맨드는 일!
 *
 *      ----> 어떻게 이행할지는 외부에서 제공한 함수에 달려있다!
 *
 *
 *      ------> 자, 정리해서 생각해보자...
 *              line() 함수는 외부에서 주는 값을 가공해서 내어주는 것 뿐임
 *              그런데 가공 할때 알아야하는 정보는 모두 오버로딩으로
 *              처리했음.
 *
 *      ------> 즉, 진짜 나는 가공만 할게... 가공해야할 정보도 모두 너가 가지고
 *              넘겨주던가, 아니면 기본 값을써 이거네!!
 *              ( 그렇기 때문에 rj3.svg.line() 함수가 가지는 책임은
 *                SVG() 경로를 맨드는 책임 밖에 없다 )
 */

/**
 *               ===== 개방 / 폐쇄의 원칙 =====
 *
 *      - 모든 소프트웨어는 확장 가능성은 열어두고 , 수정 가능성은 닫아야 한다.
 *      --> 즉, 어떤 경우에도 실행 코드를 변경하지말고,
 *          상속등으로 재사용 및 확장해야함.
 *
 *      ----> rj3.svg.line() 함수 설계시,
 *           - 데이터에서 좌푯값을 뽑아내는 방법( while 구문 ) 과
 *
 *           - 점을 연결하는 방법( segment() 의 interpolate() 함수 부분)
 *
 *           에서 변경사항이 있을거라보고 이러한 특성을 추상화 하여
 *           함수밖으로 빼어내 버린것...
 *
 *      ----> 즉, 바뀌지 않을 것이라고 본건 SVG 경로의 규격
 *            ( segment() 의 "M" )
 *            반드시 "M" 으로 시작해서 그 뒤에 점 데이터가 이어지는 형태로
 *            하드코딩 했음.
 *
 *      ------> 자, 정리해서 생각해보자...
 *              - 설계를 할때는 바뀔 가능성이 있는 부분과
 *                바뀌지 않을 부분을 미리 예측을 해서
 *                밖으로 빼거나 안에다가 하드코딩을 해버리는 구나.
 */
{
}
/**
 *              ===== 리스코프 치환 원칙 =====
 *
 *      - 어떤 타입에서 파생된 타입의 객체가 있다면 어떤 타입을
 *        사용하는 코드는 변경하지 말아야 한다
 *
 *      --> 한 객체를 다른 객체에서 파생하더라도 기본 로직이 변경되어서는 안됨
 *      ----> 작성중인 함수가 기반 클래스로 하는 일과 서브 클래스로 하는 일이
 *            다르다면 이 원칙을 어긴 것
 *            ( 서로 파생 관계가 없는 타입일때는 적용되지 않음 )
 *
 *
 *      ----> 먼저 알아둘 것 )
 *                JS 에서는 어떤 함수의 인자가 숫자, 문자열 , undefined
 *                일때 각각 분기 처리하는 것이 좋은 습관
 *
 *      ----> 함수 오버로딩 이라는 객체지향 개념으로 이를 실천
 *
 *      ------> 자, 생각해보자...
 *              Array, String, Number , undefined 등으로
 *              하드코딩해서 분기를 나누는게 아니라,
 *              함수를 오버로딩 해서 사용해 버린다는 것.
 *
 *              또한, 새로운 서브 클래스는 기반 클래스에서 하는 일이
 *              다르면 안되고 같아야 한다는 것.
 *
 *              - rj3.svg.line() 에서 getX 와
 *                line.x() 가 하는 일은 결국, 파라미터 값을
 *                가공해서 Number 타입으로 던져주는 일이다
 *                ( 하는 일이 같음!! )
 */
{
}
/**
 *              ===== 인터페이스 분리 원칙 =====
 *
 *      - C++, 자바 같은 인터페이스 기반 언어 환경에서 비롯
 *      --> 이들 언어에서 인터페이스 클래스 :
 *          기능을 '구현'하지 않고( 명칭 , 파라미터 , 반환타입 )
 *          '서술'만 한 코드 조각임.
 *
 *      --> 기능이 많은 인터페이스는 더 작게 응축시킨 조각으로 나누어야 함.
 *      ----> 사용할때는 인터페이스 전체가 아닌 작게 응축시킨 조각하나를
 *            바라보면 됨.
 *
 *      ----> 각각 모듈간의 연결 폭을 최소화해야함( 서로 통신을 최소화 해야함 )
 *            그래야 프로그람이 거대해져도 관리하기 편하다.
 *
 *      ------> 자바스크립트에서 이 원칙 실현 :
 *              함수가 기대하는 인자가 무엇인지 명확히하고, 그기대치를
 *              최소화 한다.
 *              ( 특정 타입의 특정 인자를 바라보기 보다는 이 타입에서 필요한
 *                프로퍼티가 더러 있을 거라 기대하는 것 )
 *
 *      ------> 아, 이런건가...?
 *              파라미터로 어떤 객체의 프로퍼티같은거 하나만 던져주거나
 *              타입이 자꾸변하지말고,
 *              해당 객체 자체를 던지고, 그객체로만 받겠다고
 *              명확히 해달라는거 같음.
 *              --> 좀 더 자세한 개념 정리 필요.
 */
{
}
/**
 *              ===== 의존성 역전( 주입 ) 원칙 =====
 *
 *      - 상위 수준 모듈은 하위 수준 모듈에 의존해서는 안되며
 *        이 둘은 추상화에 의존해야 함.
 *      --> 인터페이스 기반 언어 : 의존성 주입 이라고 부름.
 *
 *      ----> 클래스 A 가 클래스 B 의 서비스가 필요할때,
 *            A 는 B 를 생성하지 않음.
 *
 *            대신, A 생성자에 건넨 파라미터가
 *            B 를 서술하는 인터페이스 역할을 함.
 *
 *      ----> A 는 B 에 의존하지 않고 자신의 인터페이스만 바라봄
 *            A 가 생성되면 구체화한 B 를 넘겨받음
 *            ( B 역시, 인터페이스에 의존함 )
 *
 *      ----> 리스코프 치환 원칙 덕분에 인터페이스를 만족하는,
 *            B 의 파생형 버전을 제공할 수 있다는 이점
 *            ( 인터페이스는 개방/폐쇄의 원칙에도 불구하고 )
 *            B 를 고쳐야 할 경우 하위 버전 호환성을 위해서라면,
 *            어떤 로직을 계속 갖고 있어야 하는지 서술해야함.
 *
 *      ------> 아래코드는 실제 rj3.svg.line 의 코드임.
 */
{
    var rj3 = {};
    rj3.svg = {};
    // 위의 예시에서 A
    rj3.svg.line = function(){
        // d3_identify = d3_svg_line( projection 의 기본 값 - 함수 )
        return d3_svg_line( /* d3_identify */ );
    }

    function d3_svg_line( projection ){
        /* vars 선언문 줄임 */

        function line( data ){
            /* vars 선언문 줄임 */
            var segments = [],
                points = [];

            function interpolate() { /* ... */ }

            function segment(){
                segments.push( "M" , interpolate( projection( points ) /* , tension */ ) );
            };
        }

    }

    // 위의 예시에서 B
    rj3.svg.line.radial = function(){
        // 아 애는 콜백 함수구나
        var line = d3_svg_line( d3_svg_lineRadial );
        /* 코드 줄임 */
        return line;
    }

    function d3_svg_lineRadial( points ){
        /*** 점 데이터를 극 좌표계로 변환 ***/
        return points;
    }
    debugger;
}
/**
 *      - d3_svg_line 의 projection 은 점 데이터를 다른 좌표 공간에
 *        투사 할때를 대비한 파리미터.
 *
 *      --> projection 기본값은 d3_identity 로 점 데이터 변경 하지는 않고
 *          다른 방법으로 투사 가능하다.
 *
 *      --> 예컨대 d3_svg_lineRadial 투사를 주입하면
 *          rj3.svg.line.radial 로 극 좌표계를 사용할 수 있음
 *
 *      ------> 아하, 그니깐
 *              실제 핵심 로직인 line(){ ... } 을
 *              d3_svg_line 로 감싸서 d3_svg_line 에 넘겨주는
 *              파라미터 를 바꿔줌으로 인해,
 *              라인을 설정하는 역할을 하는 interpolate 의 "L" 등을
 *              변경 할 수 있다는 이야기로 보임.
 *
 *      ------> 즉, rj3.svg.line() 의 파생형 버전인( 극좌표계를 표시하는 버전 )
 *              rj3.svg.line.radial() 에 대한 정보를 line 이 가지고 있는게
 *              아니라,
 *              rj3.svg.line.radial() 가 따로 핵심로직( 변경되면 안되는 )
 *              을 호출하는거군.
 *
 *      --------> 그러면 핵심 로직에서 실제 interpolate 의 점데이터를 그려주는
 *                부분만 로직의 값으로 변경해 줄 수 있기 때문임.
 *                ( 이러면 코드가 매우 유연해 지겠군. )
 *
 */
/**
 *             ===== DRY 원칙 =====
 *
 *      - 반복하지 마라.( 모든 지식 조각은 딱 한번만 나와야 함 )
 *      --> 모든 소프트웨어 개발 습관의 근원
 *
 *      --> 예 ) X 와 Y 를 함께 하는 모듈이 있다고 가정.
 *          - X 를 하는 코드가 필요할 때, Y 로직을 들어내지
 *            않는 한 모듈을 재사용 할 수 없다.
 *
 *          - Y 를 들어내지 않는한 모듈을 재사용 할 수 없음.
 *            ( 또다시 X 를 코딩해야 사용할 수 있음. )
 *
 *      ----> X, Y 를 하는 함수 2개를 모듈에 주입해서 하나의 책임으로
 *            묶어두면 문제를 해결할 수 있음.
 *            ( DRY 한 코드로 맨드는 과정에서 의존성 주입, 단일 책임 문제가 개입됨 )
 *
 *      --> rj3.svg.line 은 아주 DRY 한 함수임.
 *          어떤곳에서도( 심지어 데이터를 받아 좌푯값을 추출하는 부분 )
 *          에서도 중복 코드가 하나도 없음
 *
 *      ------> 아래 코드가 그 예
 */
{
    var getX = function(){ /* ... */ },
        getY = function (){ /* ... */ };
    function line( data ){
        var d,
            points = [],
            i = -1;
        /**
         *  ===========================================
         *              DRY 한 코드( while )
         *  ===========================================
         */
        while( ++i < n ){
            d = data[ i ];
            points.push( [ +getX.call( this , d , i ) , +getY.call( this , d , i ) ]);
        };
        /**
         *  ===========================================
         *              DRY 하지 못한 코드( while )
         *  ===========================================
         */
        while ( ++i < n ){
            points.push( [ +getX.call( this , data[ i ] , i ) , +getY.call( this , data[ i ] , i ) ]);
        }

    }
    debugger;
}
/**
 *      - 코드는 아래 코드가 더 짧지만 data[ i ] 를 처리하는 지식 조각이 반복되어
 *        DRY 하지 않음.
 *
 *      --> JS 에서는 특별히 DRY 함이 중요.
 *          ( JS 는 잘못 코딩한 특정 클래스를 컴파일러가 알려주지 않기 때문... )
 */


/**
 *      - 내가 느낀요지.
 *      --> 처음 프로그람을 설계할때, 변할 가능성이 있는 부분과 변하지 않을 부분을 먼저
 *          생각해둬야함
 *      ----> 변할 가능성이 있는 부분은 오버라이드 or 오버로딩으로 처리
 *      ----> 변할 가능석이 없는 부분은 상수로 박아버림
 *
 *      --> 변할 가능성이 있는 부분에서 파생되는 코드들은 하는일이
 *          오버로딩 or 오버라이드 전 코드들과 기능이 완벽히 같아야함.
 *
 *      --> 프로그람 설계시 메소드는 하나의 동작만 해야하는데
 *          데이터에 대한 책임은 핵심로직이 가지면 안됨
 *          ( 던져주는 곳에서 지지고 볶든 수정해야함 )
 *
 *      --> 핵심로직은 반드시 분리.
 *      ----> 핵심로직은 파생버전이나 추가요소가 나올때 다른 로직들과 섞여있으면
 *            어거지스러운 코드가나오기 쉬워짐.
 *
 *      ----> 핵심로직은 다른곳에서 wrapper 메소드에 감싸서 부르는 형식으로...
 *
 *
 *
 */