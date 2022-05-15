/**
 *           ===== 기본 객체 프로토 타입 =====
 *
 *      - chimp 객체가 상속받은 toString 을 참조
 */
title( 'chimp 객체' );
{
    var chimp = {
        hasThumbs : true,
        swing : function(){
            return '나무 꼭대기에 대롱대롱 매달려 있네요;'
        }
    };
    console.log( chimp.toString() );
    // :: [ object Object ]
}