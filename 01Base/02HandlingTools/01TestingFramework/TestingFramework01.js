/**
 *          ===== 여행사의 차세대 예약 시스템 구현 프로젝트 =====
 *
 *      - 승객( passenger ) 객체,
 *      - 항공편( flight ) 객체,
 *
 *      - createReservation : 승객, 항공편 객체를 입력받아
 *                            passengerInfo : 승객객체
 *                            flightInfo : 항공편 객체 반환
 */

title( 'TDD 없이 맨든 createReservation 구현부' );
function createReservation( passenger , flight ){
    return {
        passengerInfo : passenger,
        flightInfo : flight,
    }
}
/**
 *          ===== 재스민 테스팅 프레임워크로 작성한 단위 테스트 코드 =====
 *
 *      - 재스민 : 테스팅 프레임 워크
 *      --> it 함수 : 개별 단위 테스트
 *      --> expect 함수 : 객체의 속성 검사
 *
 *      - 또한 반드시 명세를 보고 코드를 작성하라
 */
{
    title( '테스트 대상을 완성한 다음 작성한 createReservation 의 테스트 코드' );
    describe( 'createReservation( passenger , flight )' , function(){
        it ( '주어진 passenger 를 passengerInformation 프로퍼티에 할당한다' , function(){
            var testPassenger = {
                firstName : '윤지',
                lastName : '김',
            };

            var testFlight = {
                number : '3443',
                carrier : '대한항공',
                destination : '울산',
            };

            var reservation = createReservation( testPassenger , testFlight );

            expect( reservation.flightInfo ).toBe( testFlight );
            // :: 예상, 기대하다
        } )

    } );
    console.log( '재스민 테스트 프레임워크구만 ~ ' );
}
/**
 *
 *      - 테스트하기 쉬운 코드가 유지 보수성과 확장성이 월등히 우수함
 *      ----> 반드시 SOLID 개발 원칙 준수.
 *      ----> 결국 테스트성을 설계 목표로 정하면 SOLID 한 코드 작성 가능.
 *
 *      - 기능 하나하나에 단위 테스트를 붙이는 일이 귀찮더라도
 *        반드시 해야 나중에 에러가 없다.
 *
 *      ----> 새로운 기능이 추가되면 createReservation 을 고치기 보다는 일단
 *            새기능을 확인하는 테스트 작성
 *
 *      - 코드는 최소한으로 작성
 *
 *      - 탄탄한 단위 테스트 : 대상 코드의 실행가능한 명세 역할도 함.
 *                        ( 단위 테스트 메세지를 보고 함수가하는 큰그림도 그릴 수 있음 )
 */
{
    describe( 'createReservation( passenger , flight )' , function(){
        // Existing tests
        it( '예약 정보를 웹 서비스 종단점으로 전송한다' , function (){

            // createReservation 이 웹 서비스 통신까지 맡아야 하나?
        } );
    });
}

/**
 *      - 느낀점)
 *
 *      --> 코드를 맨들고 테스트를 하는게 아니라,
 *          먼저 단위 테스트리스트를 작성하고 코드를
 *          작성해야 오류를 줄일 수 있다는 뜻으로 읽힘
 *          ( 말은 쉬운데 습관들이려면 오래걸릴듯...? )
 *
 */