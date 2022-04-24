/**
 *            ===== 의존성 주입 프레임 워크 활용 =====
 *
 *  --> DependencyInjection06(main) 에서 사용했던 전역 컨테이너를 사용
 *
 *  - 개요 : 앞의 자바스크립트 콘퍼런스 참가자 예약 모듈 제작
 *
 *  --> 의존성 주입 설정 루틴 제작
 *
 *  - 아래 코드에서 주의 깊게 보아야 할것.
 *    ( Attendee 객체를 DiContainer 안에 넣는 기법 )
 *
 *  --> Attendee 를 맨드는 함수가 아닌, Attendee 를 맨들
 *      팩토리를 맨드는 함수가 등록을 대신함
 *      ( 아래에 정리해둠... )
 */
{
    title( 'DiContainer 를 Attendee 에 적용' );

    var MyApp = {};

    MyApp.diContainer = new DiContainer();

    MyApp.diContainer.register(
        'Service' ,  // 웹 서비스를 가리키는 DI 태그
        [] ,         // 의존성 없음
        function() { // 인스턴스를 반환하는 함수
            return new ConferenceWebSvc();
        }
    );

    MyApp.diContainer.register(
        'Messenger',
        [] ,
        function(){
            return new Messenger();
        }
    );

    MyApp.diContainer.register(
        'AttendeeFactory' ,
        [ 'Service' , 'Messenger' ] ,   // Attendee 는 Service 및 Messenger 에 의존한다
        function( service , messenger ){
            // 왜 Attendee 를 바로 넣지 않고
            // 한번 더 함수로 감싸서 넣는거지...?
            return function( attendeeId ){
                // 아... 여기서 Attendee 객체를 넣는구나...
                // ( 근데 왜 이렇게 넣는거지...? )
                return new Attendee( service , messenger , attendeeId );
            };
        }
    );

    /**
     *  - 사용 예시 1) 만약 Attendee 를 factory 함수로 감싸지 않았을 경우.
     *
     *  --> 이런식으로 attendeeId 를 추가로 제공해야 한다
     *  ----> 그런데 이렇게 작성하게 되면,
     *        예외를 맨들거나 다른 객체의 재귀적 의존성( 이게먼솔이여... )
     *        ( 아 , DependencyInjection06(main) 의
     *          var dependency = self.get( dependencyName ); 이부분!!
     *          --> 그치 재귀호출 하는데 다른 함수들도 전부 사용하고 있지
     *        )
     *        으로 인해 attendeeId 전달이 끊긴다.
     *
     *  - 이거 제작자는 천재인가...?
     */
    try {
        var attendee = MyApp.diContainer.get( 'Attendee' , attendeeId );
    }
    catch {
        console.log('데헷 콘테이너 생김새나 보세용~' , MyApp.diContainer );
    }

    /**
     * - 사용 예시 2) Attendee 를 factory 함수로 감쌌을 경우.
     * --> 언제, 어디서나 attendeeId 를 주입가능함.( 주입할 수 있음 )
     */
    try {
        var attendeeId2 = 123,
            sessionId2 = 1;

        // DI 컨테이너에섯 attendeeId 를 넘겨 Attendee 를 인스턴스화 한다.
        var attendee = MyApp.diContainer.get( 'Attendee' )( attendeeId2 );
        attendee.reserve( sessionId2 );
    }
    catch {
        console.log( '이게 팩토리 함수로 감싸는 이유란다...', MyApp.diContainer );
    }
}

/**
 *  --> 아, 한번더 Attendee 를 감싸는 이유 ::
 *      Attendee 는 service , messenger 외에 attendeeId 를 추가로 필요로 한다
 *
 *  ----> 따라서, 어디서든 attendeeId 를 주입받아 사용할 수 있게 하기위함...
 *
 *  ----> factory 함수로 한번 더 감싸지 않으면 재귀적 호출( 의존성 객체들 때문에... )
 *        attendeeId 가 소실되기 때문,
 *        또한 어디어디서든 get( 'Attendee' )( attendeeId )
 *        형태로 호출할 수 있기 때문이다!!
 */
