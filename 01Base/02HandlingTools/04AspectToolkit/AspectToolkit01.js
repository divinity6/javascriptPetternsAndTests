/**
 *            ===== 애스팩트 툴킷 =====
 *
 *      - 개요 : 애스팩트 지향 프로그래밍( AOP )은
 *              ( 단일한 책임 범위 내에 있지 않은... )
 *              하나 이상의 객체에 유용한 코드를 한데 묶어 눈에 띄지 않게 객체를
 *              베포하는 방법
 *
 *      --> AOP 용어
 *
 *      ----> 어드바이스( advice ) : 배포할 코드 조각
 *      ----> 애스팩트( aspect ) : 어드바이스가 처리할 문제
 *
 *      - 사용할 예시 : DependencyInjection 의 자바스크립트 레퍼런스 코드
 *      --> 원인 : 행사주최자가 비용 문제로 항공권 판매 여행사와 제휴를 맺음
 *      --> 할것 : 로그인한 참가자가 원하는 지역 공항의 항공권 할인 운임을 조회하는
 *                웹 서비스를 호출해야함
 *      --> 분석 : 웹 서비스 호출은 시간이 걸림 --> 참가자 본인이 공항을 바꾸지 않는 한
 *                                          해당 항공권 정보를 캐싱하기로 함.
 *
 *      ----> 캐싱 : 애스팩트 지향 프로그래밍의 유력한 후보자
 *
 *      ------> 캐싱 ::
 *                      이미 가져온 데이터나 계산된 결과값의 복사본을
 *                      저장함으로써 처리 속도를 향상시키며, 이를 통해
 *                      향후 요청을 더 빠르게 처리할 수 있다.
 *
 *                      대부분의 프로그램이 동일한 데이터나 명령어에 반복해서
 *                      엑세스하기 때문에 캐싱은 효율적인 아키텍처 패턴.
 *
 *      ------> 웹 캐시 ::
 *                      사용자(client)가 웹 사이트(server)에 접속할 때,
 *                      정적 컨텐츠(이미지, JS, CSS 등)를 특정 위치(client, network 등)에
 *                      저장하여, 웹 사이트 서버에 해당 컨텐츠를 매번 요청하여 받는것이 아니라,
 *                      특정 위치에서 불러옴으로써 사이트 응답시간을 줄이고,
 *                      서버 트래픽 감소 효과를 볼 수 있다.
 */
title( 'AOP 없는 캐싱' );
{
    // new 키워드 대신 다른 모듈 생성 패턴 적용
    title( '캐싱 없는 TravelService 모듈' );

    // 콘퍼런스에 해당하는 파라미터를 제공하여
    // 여행사의 원래 웹 서비스를 래핑한다

    /**
     *  - getSuggestedTicket 에서 주변환경을 이용하기 위해서
     *    즉시실행 함수를 썻구낭...!!
     *    ( 머리좋네...! )
     */
    var TravelService = ( function( rawWebService ){
        var conferenceAirport = 'BOS';
        var maxArrival = new Date( /* 날짜 */ ); // Arrival :: 도착
        var minDeparture = new Date( /* 날짜 */ ); //  Departure :: 출발

        return {
            getSuggestedTicket : function( homeAirport ){ // Suggested :: 제안된
                // 고객이 전체 콘퍼런스에 참가할 수 있게
                // 해당 지역의 공항에서 가장 저렴한 항공권을 조회한다
                return rawWebService.getCheapestRoundTrip(
                    homeAirport , conferenceAirport ,
                    maxArrival , minDeparture );
            }
        };
    } )();

    // 광고 정보를 가져온다
    try{
        TravelService.getSuggestedTicket( attendee.homeAirport );
    }
    catch {
        console.log( '캐싱없이 맨든거래용~' );
    }
}

/**
 *  - 아니, 근데 진짜 애초에 처음 구조를 설계할 때,
 *    어떻게 이렇게 단계적으로 잘 나눠서 짜지...
 *
 *  --> 후... 무친 연습을 해야하겠구나...
 *  --> 제안하는 메소드, 웹 서비스 안에 가장 저렴한 항공권을 구하는 메소드...
 */