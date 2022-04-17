/**
 *          ===== 재스민 =====
 *
 *      - 재스민 : 행위 주도 개발( Behavior-Driven-Development, BDD )
 *      --> 자신이 작성중인 코드가 '무엇'을 해야하는지 테스트 코드에 표현 가능
 *
 *
 *      - 간단한 재스민( jasmine ) 소개
 *      --> describe :: 테스트 꾸러미 전역함수
 *          @param : ( 문자열 : 무엇을 테스트할지 서술,
 *                       함수  : 테스트 꾸러미 구현부 );
 *
 *      --> it :: 개별 테스트 전역함수
 *          @param : ( 문자열 : 무엇을 테스트할지 서술,
 *                     함수  : 한개의 기대식( expectation )을 가진함수
 *                            코드 상태의 true/false 를 확인하는 단언 );
 *
 *      --> 전체 테스트가 공유할 설정과 정리코드를 담아두는 함수
 *          beforeEach/afterEach( 테스트 꾸러미가 실행되기 전/후 에 호출 )
 *
 */
title( 'reservation 전역으로 사용' );
function createReservation( passenger , flight ){
    return {
        passengerInformation : passenger,
        flightInformation : flight,
    }
}
{
    title( '재스민 beforeEach 와 afterEach 함수' );

    describe('createReservation( passenger , flight )' , function(){
        var testPassenger = null,
            testFlight = null,
            testReservation = null;
        debugger;

        /**
         *  - 아하 각각 it() 함수를 실행하기전에 beforeEach 파라미터 함수를
         *    먼저 실행하는구나!
         *
         *  --> 주의 사항 : 각각 it() 함수들을 실행하기전에
         *                각각 beforeEach 함수를 실행한다는 것임
         */
        beforeEach( function(){
            testPassenger = {
                firsetName : '윤지',
                lastName : '김,'
            };

            testFlight = {
                number : '3443',
                carrier : '대한항공',
                destination : '울산',
            };
            debugger;

            testReservation = createReservation( testPassenger , testFlight );
        });

        it( 'passenger 를 passengerInformation 프로퍼티에 할당한다' , function(){
            expect( testReservation.passengerInformation ).toBe( testPassenger );
            // :: true
        } );

        it( 'flight 를 flightInformation 프로퍼티에 할당한다' , function(){
            expect( testReservation.flightInformation ).toBe( testFlight );
        } );
        debugger;
    });
}
/**
 *               ===== 재스민 매쳐( matcher ) =====
 *
 *      - expect :: 대상코드가 낸 실제값( testReservation.passengerInformation )
 *                  을 기댓값( testPassenger )과 비교
 *                  ( 하나라도 실패하면 실패로 간주 )
 *
 *        @param : 실제값( testReservation.passengerInformation )
 *        @return : Expectation 객체
 *
 *      - toBe : expect 객체의 파라미터 값과 비교
 *
 *        @param : 기댓값( testPassenger )
 *        @return : undefined
 *
 *      ------> 용도에 맞는 내장함수가 없으면 커스텀 매쳐를 만들어 쓸수 있도록 지원함.
 */

/**
 *               ===== 재스민 스파이( spy ) =====
 *
 *      - 테스트 더블( test double ) 역할을 하는 자바스크립트 함수
 *
 *      --> 테스트 더블 :
 *          - 더미( dummy ) : 인자 리스트를 채우기 위해 사용, 전달은 하지만 실제 사용 X
 *
 *          - 틀( stub ) : 더미를 조금 더 구현하여 아직 개발되지 않은 클래스나 메서드가
 *                        실제 작동하는 것처럼 보이게 만든 객체.
 *                        ( 리턴 값은 보통 하드 코딩함 )
 *
 *          - 스파이( spy ) : 틀과 비슷하지만 내부적으로 기록을 남김. 특정 객체가 사용되었는지,
 *                          예상되는 메서드가 특정한 인자로 호출되었는지 등의 상황을 감시
 *                          ( spying ) 및 정보 제공
 *
 *          - 모의체( fake ) : 틀에서 조금 더 발전하여 실제로 간단히 구현된 코드를 갖고는 있지만,
 *                            운영 환경에서 사용할 수는 없는 객체
 *
 *          - 모형( mock ) : 더미 , 틀 , 스파이를 혼합한 형태와 비슷하나 행위를 검증하는
 *                          용도로 주로 사용
 *
 *      --> 테스트 더블은 함수/객체 의 원래 구현부를 테스트 도중 더 간단한 코드로 대체한 것을지칭
 *          ( 외부 자원과의 의존 관계를 없애고 단위 테스트의 복잡도를 낮출 목적 )
 *
 *      ----> 주의 사항 :
 *            외부 시스템과 연동하는 코드에 이상이 없는지 확인하는 테스트를 통합 테스트
 *            ( integration test )라고 함.
 *            이것은 단위 테스트와 구별되는 별개의 테스트임.
 *
 *
 *      -- 75p 오늘은 여기까지, 다음에 이어서...
 */
title( '동료가 작성한 saveReservation 함수' );
function ReservationSaver(){
    this.saveReservation = function( reservation ){
        // 예약 정보를 저장하는 웹 서비스와 연동하는 복잡한 코드가 있을 것이다.
    }
}
{
    describe( 'createReservation' , function (){
        var testPassenger = null,
            testFlight = null,
            testReservation = null;

        beforeEach( function(){
            testPassenger = {
                firsetName : '윤지',
                lastName : '김,'
            };

            testFlight = {
                number : '3443',
                carrier : '대한항공',
                destination : '울산',
            };
            debugger;

            testReservation = createReservation( testPassenger , testFlight );
        });

        it( '예약정보를 저장한다' , function (){
            var saver = new ReservationSaver();

            // testPassenger 와 testFlight 는 이 테스트 꾸러미의
            // beforeEach 함수에서 이미 설정되어 있다고 본다
            createReservation( testPassenger , testFlight , saver );
        })
    } )

}