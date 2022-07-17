/**
 *           ===== 콜백 패턴 =====
 *
 *      - 코드가 길지만, 코드 테스팅 목적을 이해하면 어려울 것 없는 코드
 *      --> 이코드에서 확인하는 두가지
 *
 *      1. 콜백 실행 횟수가 정확하다
 *
 *      2. 콜백이 실행될때마다 알맞은 인자가 전달된다
 *
 *      --> 이런 테스트 목적을 위해 재스민 스파이가 제격이다
 *
 */
title( '콜백 패턴' );
{

    title( "attendeeCollection.iterate 함수의 단위 테스트" );

    describe( "Conference.attendeeCollection" , function(){

        describe( "contains( attendee )" , function(){
            // contains 테스트
        } )

        describe( "add( attendee )" , function(){
            // add 테스트
        } )

        describe( "remove( attendee )" , function(){
            // remove 테스트
        } )

        describe( "iterator( callback )" , function(){

            var collection , callbackSpy;

            // 도우미 함수
            function addAttendeesToCollection( attendeeArray ){
                attendeeArray.forEach( function( attendee ){
                    collection.add( attendee );
                } );
            }

            // 실질적으로 테스트 항목을 확인하는 함수
            function verifyCallbackWasExecutedForEachAttendee( attendeeArray ){

                debugger;
                // 각 원소마다 한 번씩 스파이가 호출되었는지 확인한다
                expect( callbackSpy.calls.count() ).toBe( attendeeArray.length );

                // 각 호출마다 spy 에 전달한 첫 번째 인자가 해당 attendee 인지 확인한다
                var allCalls = callbackSpy.calls.all();

                for ( var i = 0; i < allCalls.length; i++ ){
                    expect( allCalls[ i ].args[ 0 ] ).toBe( attendeeArray[ i ] );
                }

            }

            beforeEach( function(){

                collection = Conference.attendeeCollection();

                callbackSpy = window.jasmine.createSpy();

            } );

            it( "빈 컬렉션에서는 콜백을 실행하지 않는다" , function(){

                collection.iterate( callbackSpy );

                expect( callbackSpy ).not.toHaveBeenCalled();

            } )

            it( "원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다" , function(){

                var attendees = [
                    Conference.attendee( 'Tom' , 'Kazansky' ),
                    Conference.attendee( 'Charlotte' , 'Blackwood' ),
                    Conference.attendee( '태영' , '김' ),
                ];

                addAttendeesToCollection( attendees );

                collection.iterate( callbackSpy );

                verifyCallbackWasExecutedForEachAttendee( attendees )

            }  )

        } )
    } )
}

/**
 *  - 익명 콜백 함수는 콜백만 따로 떼어낼 방법이 없어서 단위테스트를 매우 어렵게 맨든다
 *  --> 단위 체크 기능이 attendeeCollection 에 묶여있기 때문에, 참가자들의 체크인 여부를
 *      전체 컬렉션을 상대로 계속 테스트를 반복할 수 밖에 없다
 *
 *  --> 익명 콜백 함수하나를 테스트하는 코드가 전체 테스트 꾸러미를 WET 하게 만든다
 *      ( 엄청난 반복의 늪에 빠지게 된다 )
 *
 *  --> 익명 함수는 디버깅을 매우 어렵게 맨든다
 *      ( 호출 스택에 식별자를 표시할 수 없다 )
 */