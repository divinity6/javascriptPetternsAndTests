/**
 *            ===== 항공권 예약 시스템 =====
 *
 *      - 어떤 승객이 일등석으로 무료 업그레이드 할 수 있는지 판단하는 기능 구현 요청
 *
 *      --> 비행 마일리지 계산시 VIP 회원에게는 특별 혜택 제공
 *      --> 회원별로 이용실적에 따라 추가 마일리지 적립시 정해진 배율을 곱함
 *
 *      1. 배율만큼 비행 마일리지를 더 쌓아주는 함수( calculateUpgradeMileages ) 필요
 */
title( 'calculateUpgradeMileages 의 단위 테스트' );
{
    describe('calculateUpgradeMileages( tripMileages , memberMultiplier', function () {
        var testPassenger = null;
        beforeEach( function(){
            testPassenger = {
                firstName : '일웅',
                lastName : '이',
                tripMileages : [
                    500,
                    600,
                    3400,
                    2500
                ],
            };
        } );

        it( '배율이 1.0이면 원래 마일리지를 반환한다' , function(){
            expect( calculateUpgradeMileages( testPassenger.tripMileages , 1.0 ) )
                .toEqual( testPassenger.tripMileages );
        } );

        it( '배율이 3.0이면 해당 마일리지를 계산하여 반환한다' , function(){
            var expectedResults = [],
                multiplier = 3.0;

            for ( var i = 0; i < testPassenger.tripMileages.length; i++ ){
                expectedResults[ i ] = testPassenger.tripMileages[ i ] * multiplier;
            };
            expect( calculateUpgradeMileages( testPassenger.tripMileages , multiplier ) )
                .toEqual( expectedResults );

        } );
    });
}

/**
 *  - 위의 테스트를 성공시키는 calculateUpgradeMileages 코드.
 */
function calculateUpgradeMileages( tripMileages , memberMultiplier ){
    var upgradeMileage = [],
        i = 0;

    for ( i = 0; i < tripMileages.length; i++ ){
        var calcRewardsMils = function( mileage ){
            return mileage * memberMultiplier;
        };
        upgradeMileage[ i ] = calcRewardsMils( tripMileages[ i ] );
    };

    return upgradeMileage;
}

/**
 *  --> 오호, 간단한 기능이라도 함수로 묶어서 내부에서 설정해두고 호출해버리는 구먼...
 *  ----> 테스트는 성공했는데 코드가 좀수상쩍다...?
 *        말썽을 일으킬만한 코드가 없는지 찾아봐야함.
 *
 *  --> 이런 코드를 찾아내기 위해 린팅 도구를 사용하는 것!
 *      ( calcRewardsMils 를 반복문 밖으로 빼고 , i 를 그냥 한줄로 하는거 말하는건가? )
 *
 *
 *  ----> 정답 : JSHint( 자바스크립트 커뮤니티가 주도하는 린팅 도구 ) 로 검사시
 *              순회하는 루프문 안에서 함수를 선언한것이 문제.
 *              ( 루프를 순회할때마다 함수를 선언해주는 것은 정상적인 행위는 아님...ㅋㅋ 그치 )
 *
 *  ----> 큰 영향은 없지만 비효율적인 코드
 *        ( 잘못된 방향으로 실행될 수 있음 )
 */