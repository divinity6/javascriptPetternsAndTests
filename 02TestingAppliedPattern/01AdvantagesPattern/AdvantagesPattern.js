/**
 *           ===== 패턴의 장점 =====
 *
 *      - 경험으로 축적된 패턴에서 무엇을 쓰면될지 결정할 줄 아는 사람이 진정한 고수다.!!
 *
 *      --> 예전에 겪은 경험과 지혜를 잘 살릴 줄 아는 사람은 모든 걸 하나하나 직접 맨들려고
 *          애쓰는 사람보다 경제적으로 깔끔하게 문제를 해결할 수 있다
 *
 *      --> 패턴의 범위는 사소한 언어의 관용 구문( ++i )부터 시스템 구조( n-계층 아키텍쳐 )에
 *          이를 정도로 넓다
 *
 *      ----> 루프문으로 배열을 순회하는 것도 일종의 패턴이다
 *
 *      --> 다음 코드는 자바스크립트 문법에는 맞지않지만, 더 나은 패턴이 출현하기 전
 *          사람들이 흔히 코딩하던 방식임
 *
 */
title( '최초로 등장한 배열 루프문' );
{
    try{
        ix = 0;
        console.log( 'the_test' )
            if( ix >= myArray.length ){
                console.log( 'goto the_end;' )
            }
            doSomething( myArray[ ix ] );
            ix = ix + 1;
            console.log( 'goto the_test;' ) // js 에 goto 문이 있다고 쳤을 때
        console.log( the_end )
    }
    catch( e ){
        console.log( 'js 형식이 아님' )
    }
    debugger;

    /**
     *  - goto 문이 있으면 코드를 읽어내려가기 힘들어,
     *    결국 이런식으로는 사용하지 않게 됨.
     *
     *  --> 그리고 goto 는 사용이 금지되어 사라지고,
     *      이를 개선한 패턴인 for 루프문이 장착되었다.
     *
     *  - for 루프문은 코드를 한결 짧고 분명하게 밝히고
     *    무슨 일을 하는 코드인지 한눈에 들어오게 함
     *
     *   - forEach 도 같은 이치.
     *
     *   ----> 결국, 폭넓은 어휘력을 소유한 개발자가 더 우아한
     *         코드를 작성할 수 있다.
     */
}
/**
 *  - JS 에서는 구상 클래스( concrete class )와 추상 클래스 ( abstract class )
 *    사이의 구별 문제를 적당히 옮길 말을 찾기가 어려움
 *
 *  - 전체적인 관점에서 패턴은 후반부이고, 전반부는 항상 테스트가 자리한다
 *    ( 테스트가 항상 먼저다!! , 지극히 간단한 패터도 테스트를 거치지 않으면 엉망이 된다 )
 *
 *  - 소프트웨어 패턴에는 언어 문법과 관용 구문같은 소규모 패턴과 시스템 구축 전반에 필요한
 *    대규모 패턴이 있다
 *
 *  --> 노련한 소프트웨어 개발자는 자신만의 폭넓은 패턴 어휘력을 보유하고 있음
 *
 *  --> 패턴을 사고의 안내자로 삼아 테스트를 충분히 거친 믿음성 있는 시스템을 구축하는 것!!
 *
 */