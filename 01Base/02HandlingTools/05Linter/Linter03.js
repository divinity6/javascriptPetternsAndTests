/**
 *            ===== JSHint 의 주석 사용 =====
 *
 *      - JSHint 를 깔지는 않았지만 만약 사용시 특별한 형태의 주석으로
 *        규칙을 건너뛸수 있게해줌
 *        ( 만약 calcRewardsMils 함수가 반복문안에서 어쩔수 없이
 *          실행되어야 할경우, 이런 주석을 사용하면 됨 )
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

function calculateUpgradeMileages( tripMileages , memberMultiplier ){
    var upgradeMileage = [],
        i = 0;

    for ( i = 0; i < tripMileages.length; i++ ){
        /* jshint loopfunc : true */
        var calcRewardsMils = function( mileage ){
            return mileage * memberMultiplier;
        };
        /* jshint loopfunc : false */
        upgradeMileage[ i ] = calcRewardsMils( tripMileages[ i ] );
    };

    return upgradeMileage;
}

/**
 *  - jshint loopfunc : true
 *  --> 다음 jshint loopfunc : false 주석이 나올때까지 loopfunc 규칙 적용은 해제됨
 *
 *  - 정해진 영역의 코드가 JSHint 규칙을 전부 건너뛰게 할 수 도있지만 꼭 필요한 경우가아니면 비추...
 *    ( 나중에 유지보수시 개발자가 린팅 경고를 보지못하기 때문... )
 *
 *           ===== 린팅도구 종류 =====
 *
 *      - JSLint
 *      --> 더글라스 크락포드가 개발함
 *          ( JSLint 및 JSON 보급활동으로 유명함 )
 *
 *      - ESLint
 *      --> 니콜라스 자카스가 개발함
 *          ( 모듈성이 가장 큰 특징 , 사용자가 임의로 정한 린팅 규칙을 린터가 런타임시 읽어들일 수 있음 )
 */