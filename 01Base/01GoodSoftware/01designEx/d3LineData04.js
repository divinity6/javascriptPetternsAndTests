/**
 *      4. 외부 객체에서 값을 얻게끔 라인 생성기 확장
 *      --> 라인생성기에 년도별 값같은거를 넣어주는 거구나...
 *
 *      --> 주의할 것 :
 *          자바스크립트는 적은 코드로도 많은일을 할 수 있기 때문에
 *          사용자가 무엇을 던져넣을지 알 수가 없다는 것.
 *
 *      --> 따라서 함수인자를 반드시 검증하는 처리가 필요하다!
 *      ----> 검증처리 규약 레지스트리( contract registry )
 *            함수에 따로 코딩을 안해도 인자, 반환값을 확인하게 해주는 장치
 */
window.addEventListener( 'load' , function(){
    title('외부 객체에서 값을 참조');
    rj3.svg.samples = {};
    // samples 의 기본 basedLine에 generator 할당
    rj3.svg.samples.functionBasedLine = function functionBasedLine(){
        var firstXCoord = 10,            // 기본 X 위치구나.
            xDistanceBetweenPoints = 50, // 거리 값 아 , 첫번째 위치에서 이만큼 늘어나겠구나
            lineGenerator,
            svgHeight = 200;

        // lineGenerator 에 생성
        lineGenerator = rj3.svg.line()
            .x( function( d , i ) {
                /**
                 *  - 즉 첫번째 코드 위치에서
                 *  index 값만큼 50씩 곱해서 늘어나는 개념이구나
                 */
                return firstXCoord + ( i * xDistanceBetweenPoints );
            } )
            .y( function( d , i ) {
                /**
                 *  - 여기에서 this 는 functionBasedLine 가
                 *    할당된 곳을 참조합니다.
                 */
                return svgHeight - this.getValue( d );
            });

        return lineGenerator;
    };
    debugger;

    ( function(){
        /**
         * - yearlyPriceGrapher 객체로 묶어둔 이유는
         *   오버로딩 한 곳에서 this 를 사용할 수 있게
         *   ( data 를 가공할 수 있게 )
         *   묶어둔 거구나...
         *
         * --> 좀더 자세히 보자면 generator 함수 주변환경도
         *     이용할 수 있도록 설계해둔 거네...
         */
        var yearlyPriceGrapher = {
            // 여기에서 generator 를 실행해 할당해 두는구나
            lineGenerator : rj3.svg.samples.functionBasedLine(),
            getValue : function getValue( year ){
                // 마치 웹 서비스 처럼 호출함
                // Math.pow 1.8 의 두번째 인자 제곱 값
                return 10 * Math.pow( 1.8 , year - 2010 );
            }
        },
        years = [ 2010 , 2011 , 2012 , 2013 , 2014 , 2015 ],
        path = yearlyPriceGrapher.lineGenerator/* pure */( years );
        debugger;
        document.getElementById( 'svgPath').setAttribute( 'd' , path );
        debugger;

    }());
});
/**
 *         ===== 여기까지 보면서 느낀점... =====
 *
 *  - 이게 미친놈처럼 잘짠설계라고 느낀이유 :
 *  --> 진짜 넘겨주는 곳의 주변 객체들도 활용할 수 있도록 내부에서
 *      this 도 바인딩시켜준다는 점...
 *  ---> 즉 generator 함수가 설정된 객체또한 참조할 수 있도록 짜여있기 때문에
 *       generator 함수를 담아둔 함수 주변환경도 이용할 수 있기 때문!!
 */
