/**
 *           ===== checkInService =====
 *
 *      - 외부 시스템의 체크인 등록 기능을 별도의 책임으로 보고,
 *         등록용 객체를 checkInService 에 주입하는 것
 *
 *      --> checkInRecorder 모듈 주입
 */
title( 'checkInService.checkIn( attendee )의 테스트' );
{
    describe( "Conference.checkInService" , function (){
        var checkInService,
            checkInRecorder,
            attendee;

        beforeEach( function(){

            checkInRecorder = Conference.checkInRecorder();

            spyOn( checkInRecorder , 'recordCheckIn' );

            // checkInRecorder 를 주입하면서
            // 이 함수의 recordCheckIn 함수에 스파이를 심는다
            checkInService = Conference.checkInService( checkInRecorder );

            attendee = Conference.attendee( "형철" , "서" );

        } );

        describe( "checkInService.checkIn( attendee )" , function(){

            it( "참가자를 체크인 처리한 것으로 표시한다" , function(){

                checkInService.checkIn( attendee );

                expect( attendee.isCheckedIn() ).toBe( true );

            } );

            it( "체크인을 등록한다" , function(){

                checkInService.checkIn( attendee );

                expect( checkInRecorder.recordCheckIn ).toHaveBeenCalledWith( attendee );

            } );

        } )

    } );
}

/**
 *  - 체크인 처리/등록 기능을 별도의 모듈로 추출한 덕분에 아주 간명한 checkInService.checkIn
 *    단위 테스트가 만들어 졌다
 *
 *    // 174p
 */