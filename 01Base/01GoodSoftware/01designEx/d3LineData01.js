/**
 *      1. 일반적인 배열 형태의 데이터
 */
window.addEventListener( 'load' , function(){
    title( '일반적인 형태의 데이터' );
    var arrayData = [
            [ 10 , 130 ],
            [ 100 , 60 ],
            [ 190 , 160 ],
            [ 280 , 10 ],
        ],
        // 실행하는 함수를 generator( 실행기 ) 에 담아두네
        // 실행할 수 있는 함수를 반환해주는구만
        lineGenerator = rj3.svg.line(),
        path = lineGenerator( arrayData );

    document.getElementById( 'svgPath' ).setAttribute( 'd' , path );
    console.log( "line Generator 함수 : " , rj3.svg );
    debugger;
});

