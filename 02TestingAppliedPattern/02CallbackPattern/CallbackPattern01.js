/**
 *           ===== 콜백 패턴 =====
 *
 *      - 요구 과제 :
 *
 *      --> 콘퍼런스 자원봉사자가 사용할 참가자 체크인 화면 구현
 *      ----> 참가자 목록을 보여주고 그중 한사람, 여러사람을 선택하고.
 *            외부 시스템과 연동하여 체크인 완료
 *
 *      ----> UI 체크인 기능은 checkInService 함수에 구현
 *
 *      ----> 체크인 여부, 각종 정보 를 Conference.attendee 함수에서 생성한 객체에 담기
 *
 *      ----> 참가자 체크인 뒤처리 를 처리 : checkInService
 *
 *      - 업무 요건 :
 *      --> 하나 , 둘 이상의 attendee 객체에 checkedIn 함수 실행
 *
 *      --> 나중에 참가자 컬렉션( 집단 )을 처리하는 방식이 바뀔 수 있기 때문에 attendee 객체 컬렉션을 캡슐화한
 *          attendeeCollection 객체를 두는 것이 타당함
 *
 *      --> 참가자를 각각 체크인하려면 attendeeCollection 객체는 참가자 개인별로 어떤 액션을 수행할 수 있는
 *          구조여야 함
 *
 *      ----> 아... 처리방식이 바뀔 수 있으니 이걸 처리하는 객체를 하나를 만들어두네...
 *            진짜, 객체로 시작해서 객체로 끝나네
 *
 *      ----> 객체를 하나만들어두면, 그객체를 잘사용하여 확장하여 사용할 수 있게 해야한다..!!! 제발!!
 */
title( '콜백 패턴' );
{
    // 내가 지금 안되는게 이렇게 객체를 하나로 묶어서 처리하는게 안되네...
    // 이렇게 공통화된 객체로 묶어서 처리해야하는데

    var Conference = Conference || {};
    /**
     * - 체크인 여부, 각종 정보를 담은 attendee 객체
     * @param { string } firstName
     * @param { string } lastName
     */
    Conference.attendee = function( firstName , lastName ){

        var checkedIn = false,
            first = firstName || 'None',
            last = lastName || 'None';

        return {
            getFullName : function(){
                return first + " " + last;
            },

            isCheckedIn : function(){
                return checkedIn;
            },
            checkIn : function(){
                checkedIn = true;
            }
        }
    }

    /**
     * - 이렇게 간결하고 이해하기 쉽게 작성해야 하는데...
     */
    Conference.attendeeCollection = function(){
        var attendees = [];

        return {
            contains : function( attendee ){
                return attendee.indexOf( attendee ) > -1;
            },
            add : function( attendee ){
                if ( !( this.contains( attendee ) ) ){
                    attendee.push( attendee );
                }
            },
            remove : function ( attendee ){
                var index = attendees.indexOf( attendee );

                if ( index > -1 ){
                    attendees.splice( index , 1 );
                }
            },

            iterate : function( callback ){
                // attendees 의 각 attendee 에 대해 콜백을 실행한다
            }
        }
    };
}