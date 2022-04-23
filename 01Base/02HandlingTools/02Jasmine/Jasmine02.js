/**
 *               ===== spyOn =====
 *      -----------------------------------------------------
 *      - 파라미터                  - 객체 인스턴스 , 감시할 함수 명
 *
 *      -----------------------------------------------------
 *
 *                    ===== toHaveBeenCalled =====
 *
 *        - expect 의 파라미터에 작성한 함수가 실제로 호출되었는지 확인한다.
 */
title( 'spy 를 사용해 테스트 수정' );

// 항공편 예약 객체를 만든다
function createReservation( passenger , flight , saver ){
    var reservation = {
        passengerInformation : passenger,
        flightInformation : flight,
    }
    /**
     * - 여기에서 saveReservation 를 호출하며 정보를 저장하는 군
     */
    // 항공편 예약정보 저장
    saver.saveReservation( reservation );

    return reservation;
}

// 항공편 예약 정보를 저장한다
function ReservationSaver(){
    /**
     * - createReservation 를 호출하기전에
     *   saveReservation 함수에 스파이를 심음
     *   spy 함수로 실행 여부를 알 수 있음
     */
    this.saveReservation = function( reservation ){
        // 예약 정보를 저장하는 웹 서비스와 연동하는 복잡한 코드가 있을 것이다.
    }
}
{
    describe( 'createReservation' , function (){
        var testPassenger = null,
            testFlight = null,
            testReservation = null,
            testSaver = null;

        beforeEach( function(){
            testPassenger = {
                firstName : '윤지',
                lastName : '김,'
            };

            testFlight = {
                number : '3443',
                carrier : '대한항공',
                destination : '울산',
            };

            testSaver = new ReservationSaver();
            spyOn( testSaver , 'saveReservation');
            testReservation = createReservation( testPassenger , testFlight , testSaver );
        });

        it( 'passenger를 passengerInformation 프로퍼티에 할당한다' , function (){
            expect( testReservation.passengerInformation ).toBe( testPassenger );
        });

        it( '주어진 flight를 flightInformation 프로퍼티에 할당한다' , function (){
            expect( testReservation.flightInformation ).toBe( testFlight );
        })

        it( '예약정보를 저장한다' , function (){
            expect( testSaver.saveReservation ).toHaveBeenCalled();
        })
    } )

}
