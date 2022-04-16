/**
 *      2. Object 형태로 데이터가 들어올 경우
 *
 *   ---> 이렇게 같은 데이터를 한번더 복사해서
 *        list 에 넣는 형태는 메모리 낭비이다.
 *        ( 이런건 LINQ 효율에 길든 C# 개발자나 짤법한 코드... )
 */
window.addEventListener( 'load' , function(){
    var objectData = [
            { x : 10 , y : 130 },
            { x : 100 , y : 60 },
            { x : 190 , y : 160 },
            { x : 280 , y : 10 },
        ],
        arrayData = objectData.map( function( d ) {
            // 앞에 + 를 붙여 Number 타입으로 변환
            return [ +d.x , +d.y ];
        } );
        // 실행하는 함수를 generator( 실행기 ) 에 담아두네
        // 실행할 수 있는 함수를 반환해주는구만
        lineGenerator = rj3.svg.line(),
        path = lineGenerator( arrayData );

    document.getElementById( 'svgPath' ).setAttribute( 'd' , path );
    console.log( "line Generator 함수 : " , rj3.svg );
    debugger;
});

