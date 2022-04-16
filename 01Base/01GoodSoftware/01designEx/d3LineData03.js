/**
 *      3. 어떤 형태로 데이터가 들어오든 가공 가능하게( 오버로딩 할 수 있도록 ) 작성한 코드 )
 *
 *   ---> 이렇게 함수를 오버로딩 해서 사용하면 진짜 멋진 코드 뿜뿜~~
 */
window.addEventListener( 'load' , function(){
    title( '어떤형태로 데이터가 들어오든 오버로딩' );
    /**
     * - 일반 Object 로 맨든 예시
     */
    // var objectData = [
    //         { x : 10 , y : 130 },
    //         { x : 100 , y : 60 },
    //         { x : 190 , y : 160 },
    //         { x : 280 , y : 10 },
    //     ],

    /**
     * - 생성자 함수로 맨든 예시
     */
    function XYPair( x , y ){
        this.x = x;
        this.y = y;
    }
    var objectData = [
        new XYPair( 10 ,130 ),
        new XYPair( 100 ,60 ),
        new XYPair( 190 ,160 ),
        new XYPair( 280 ,10 ),
    ],
    // 실행하는 함수를 generator( 실행기 ) 에 담아두네
    lineGenerator = rj3.svg.line()
        .x( function( d ){ return d.x })
        .y( function( d ) { return d.y } ),
    // 이렇게 오버로딩 하면 어떤 데이터를 넣어주든 중간에 오버로딩만하면되네
    path = lineGenerator( objectData );

    document.getElementById( 'svgPath' ).setAttribute( 'd' , path );
    console.log( "line Generator 함수 : " , rj3.svg );
    debugger;
});

/**
 *          ===== 여기까지 보면서 느낀점... =====
 *
 *  --> 난 지금까지 코드를 짤때 데이터가 배열, 객체 , 문자열, 숫자등
 *      어떤 데이터가 들어오든 처리할 수 있도록( 아니면 빨리 리턴해버리도록... )
 *      제네릭 함수처럼 사용하려고 했었다.
 *
 *  ----> 그러나 사실은 데이터를 가공하는 로직부분을 public 하게 해
 *        데이터를 넘겨주는 부분에서 함수를 오버로딩 해,
 *        처리할 수 있도록 하는것이 매우 좋은 로직이라는 것을 깨달았다
 *
 */

