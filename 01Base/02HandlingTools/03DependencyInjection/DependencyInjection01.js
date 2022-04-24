/**
 *          ===== 의존성 주입 =====
 *
 *      - 개요 : 좌석 예약 기능을 갖춘 클라이언트 코드 개발
 *              ( 좌석 예약 기능 구현 )
 *
 *      - 구현 : 1 인당 세션을 10 개까지 등록가능,
 *              참가자가 한 세션을 등록하면 결과를 성공/실패 메시지로
 *              화면에 표시하는 함수를 개발해야 함.
 *
 *      --> 서비스 캡슐화 객체 : ConferenceWebSvc
 *          ( 캡슐화 : 객체의 속성, 행위를 하나로 묶고 실제 구현 내용을 내부에 은닉 )
 *      --> 화면에 표시할 스크립트 객체 : Messenger
 *
 *
 *      - 단위 테스트는 자바스크립트 코드의 핵심...!!
 */
title( '기본 Attendee 객체' );
// :: attendee 참석자
/**
 * - 아, 각각 참석자들이 서비스를 가지고 있고
 *   messenger 를 가지고 있구나...
 *
 *
 * ===== 난 아래 코드가 이쁜 코드라고 생각을 했는데... 최악의 코드라니...ㅋㅋㅋ =====
 */
{
    try {
        var Attendee = function ( attendeeId ) {
            // 'new' 로 생성하도록 강제한다
            /**
             *  - 이런 방법으로 검사할 수 있구나...
             */
            if (!(this instanceof Attendee)) {
                return new Attendee( attendeeId );
            }

            this.attendeeId = attendeeId;
            // ConferenceWebSvc 내부에 HTTP 호출이 있음
            this.service = new ConferenceWebSvc();
            this.messenger = new Messenger();
        };


        // 주어진 세션에 좌석 예약을 시도한다
        // 성공 / 실패 여부를 메시지로 알려준다
        Attendee.prototype.reserve = function ( sessionId ) {
            /**
             *  - 이렇게 맨 앞줄에서 테스트 코드를 작성하는 구나...
             */
            if ( this.service.reserve( this.attendeeId, sessionId ) ) {
                this.messenger.success('좌석 예약이 완료되었습니다!' +
                    '고객님은' + this.service.getRemainingReservations() +
                    '좌석을 추가 예약하실 수 있습니다.');
            } else {
                this.messenger.failure('죄송합니다, 해당 좌석은 예약하실 수 없습니다.');
            }
        }
        /**
         *  - 위 코드의 문제점.
         *  --> Attendee 객체가 문제가 아니라, Attendee 객체가 의존하는 코드
         *      ( ConferenceWebSvc , Messenger 이걸 말하는거 같은데...? --> 팩트임...ㅋㅋ )
         *
         *  ----> ConferenceWebSvc , Messenger 와의 의존성을 하드코딩하지말고
         *        Attendee 에 주입하는 것...
         *
         *  --> 단위 테스트용으로는 모의체( fake ) 메서드는 같지만 로직은 가짜인 객체 or 재스민 스파이
         *      같은 객체를 주입
         */
        // 운영 환경
        var attendee = new Attendee( new ConferenceWebSvc() , new Messenger() , id );

        // 개발( 테스트 ) 환경
        var attendee = new Attendee( fakeService , fakeMessenger , id )

        /**
         *  - 아 그니깐!! ConferenceWebSvc , Messenger 애네들을 내부 프로퍼티로 갖고있지말고
         *    파라미터로 넘겨주란 말이네...
         */
    } catch( error ){
        console.log( '의존성을 주입하는 예시!!' , error );
    }
}

/**
 *         ===== 빈자의 의존성 주입 =====
 *
 *      - 이처럼 DI( DependencyInjection ) 프레임워크를 사용하지 않고,
 *        의존성을 주입하는 것을 두고 '빈자의 의존성 주입' 이라고 함.
 *
 *      - 아래는 의존성 주입 방식으로 작성한 Attendee 객체
 *
 *      --> 의존성을 주입하면 각각 단위 테스트 가능
 */
{
    var Attendee = function( service , messenger , attendeeId ){
        // 'new' 로 생성하도록 강제한다
        if ( !( this instanceof Attendee ) ){
            return new Attendee( attendeeId );
        }

        this.attendeeId = attendeeId;

        // 파라미터로 받은객체로 할당해버리는구만...
        this.service = service;

        this.messenger = messenger;
    }

    /**
     *         ===== 의존성 주입 코드의 장점 =====
     *
     *  - 위 같은( DI ) 코드는
     *    service , messenger 객체들에 더 많은 제어권을 안겨주므로,
     *    다양한 에러조건을 만들어내기 쉬움
     *    ( 즉, 다양한 방법으로 테스트하기 쉬움 )
     *
     *  - 코드 재사용을 적극적으로 유도함.
     *    ( 의존성을 품은, 하드코딩한 모듈은 무거운 짐을 끌고 다님 )
     *
     *  ----> 위의 코드는 DI 로 바꾸면 성공/실패 메서드만 있으면
     *        어떤 messenger 라도 재사용 가능.
     */
}

/**
 *        ===== 의존성 주입의 모든 것 =====
 *
 *      - 어떤 객체를 코딩하든 한가지라도 해당되면,
 *        직접 인스턴스화( instantiation ) 하지말고 주입하는 방향으로 전환.
 *
 *      --> 객체 또는 의존성 중 어느 하나라도 DB , 설정 파일 , HTTP , 기타 인프라등의
 *          외부 자원에 의존하는가?
 *
 *      --> 객체 내부에서 발생할지 모를 에러를 테스트에서 고려해야 하나?
 *
 *      --> 특정한 방향으로 객체를 작동시켜야 할 테스트가 있는가?
 *
 *      --> 이 서드파티( third-party ) 제공 객체가 아니라 온전히 내가 소유한 객체인가?
 *
 *
 *      =================================================================
 *                - 위의 코드는 의존성 주입을 하드 코딩 했음
 *                ( 지금까지 짠 엉망진창의 코드에 비하면 많은 발전이 있지만,
 *                  최선은 아니다. 전문가다운 의존성 주입 프레임워크 작성 )
 *      =================================================================
 */