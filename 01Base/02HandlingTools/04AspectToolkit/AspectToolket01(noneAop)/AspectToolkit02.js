/**
 *            ===== 애스팩트 툴킷 =====
 *
 *      - 아래코드는 작동은 잘되지만 getSuggestedTicket 코드가
 *        갑절로 불어남
 *        ( 핵심 기능과 무관한 코드가 많이 보임 )
 *
 *      --> 이런코드에서 getSuggestedTicket 를 그대로 두고 기능만 추가하기
 *          매우 힘듬.
 *
 *      ----> 예 ) 10 분후 추가한 캐시 결과를 만료시켜달라는 요구사항
 *                ( 사용자가 원하는 옵션을 쿠키에 저장 )
 *
 *      ----> 애스팩트 지향 프로그라밍으로 해결할 수 있음.
 *
 *      - AOP 프레임 워크로 개발하면 원본 코드를 하나도 건드리지 않은채
 *        어플리케이션 시동 로직에 코드를 넣을 수 있음.
 *
 */
title( 'AOP 없는 캐싱' );
{
    // new 키워드 대신 다른 모듈 생성 패턴 적용
    title( 'AOP 없는 캐싱' );

    var TravelService = ( function( rawWebService ){
        var conferenceAirport = 'BOS';
        var maxArrival = new Date( /* 날짜 */ ); // Arrival :: 도착
        var minDeparture = new Date( /* 날짜 */ ); //  Departure :: 출발

        // 간단한 캐싱 : 인덱스는 공항이고 객체는 타겟이다
        var cache = [];

        return {
            getSuggestedTicket : function( homeAirport ){ // Suggested :: 제안된
                var ticket;

                /**
                 *  - 이미 존재하면 기존것을 반환하네
                 */
                if ( cache[ homeAirport ] ){
                    return cache[ homeAirport ];
                }

                ticket = rawWebService.getCheapestRoundTrip(
                    homeAirport , conferenceAirport ,
                    maxArrival , minDeparture );

                /**
                 *  - 여기 cache 안에 저장해놓는구나
                 */
                cache[ homeAirport ] = ticket;

                return ticket;
            }
        };
    } )();

    // 광고 정보를 가져온다
    title( '만약 AOP 를 이용한다면...?' );
    try{
        /**
         *  - cacheAspectFactory() 는 모든 호출을 가로챌 수 있는,
         *    완전히 재사용 가능한 캐싱함수를 반환
         *    ( 똑같은 인자가 들어오면 똑같은 결과를 반환 )
         *
         *  --> js 의 Proxy 개념이랑 비슷한건가...?
         */
        Aop.around( 'getSuggestedTicket' , cacheAspectFactory() );
    }
    catch {
        console.log( '캐싱없이 맨든거래용~' );
    }
}
/**
 *      - 아직까지는 AOP 개념이 감이 잘 안잡히고 아리송하네용...?
 */