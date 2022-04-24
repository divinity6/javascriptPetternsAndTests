/**
 *            ===== 최신 의존성 주입 프레임 워크 - 리콰이어 JS =====
 *
 *      - 리콰이어 JS 는 작성한 DiContainer 와 구문이 흡사하다
 *      --> DiContainer.register === RequireJS.define
 *      --> DiContainer.get( 모듈명 ) === RequireJS.require( 모듈 URL );
 *
 *      - 특이하게 리콰이어 JS 는 스크립트 위치를 모듈 명으로 사용
 */
{
    title( '스크립트 위치를 모듈 명으로 사용' );
    try {
        define( [ './Service' , './Messenger' ] , function( service , messenger ){
            return function( attendeeId ){
                return new Attendee( service, messenger , attendeeId );
            };
        } );
    }
    catch {
        console.log( '리콰이어 JS 는 DiContainer.get 과 달리 스크립트 위치를 이름으로 찾아요' );
    };
    // 이렇게 되면 AttendeeFactory 는 모듈명( [ 'Service' , 'Messenger' ] )이 아니라
    // 상대 URL(  [ './Service' , './Messenger' ] )을 바라보게 된다.
    /**
     *  --> 리콰이어 JS 의 기본 사상 : 파일 하나당 모듈 하나.
     *      ( 파일 URL 을 모듈명으로 쓸 수 있어서 편리 )
     *
     *  ----> require 시점에 불러오므로 스크립트 로딩최적화...!!
     *  ------> 아, 이기술을 채택해서 ES6 의 mjs 개념을 맨든거구나...
     */
};
/**
 *           ===== 최신 의존성 주입 프레임 워크 - 앵귤러 JS =====
 *
 *  --> 앵귤러 JS 에서 DI 는 핵심 중의 핵심.
 *      ( 단일 페이지 애플리케이션( SPA ) 제작에 독자적으로 특화된 프레임 워크 )
 *
 *  --> 다른 객체 타입에 맞는 DiContainer.register 같은 함수가 여럿 비치됨.
 *  ----> 상수 까지도 constant 함수로 의존성 주입할 수 있음.
 *
 *  - 아주 잘 설계된, 최고의 SPA 종합 솔루션.
 */