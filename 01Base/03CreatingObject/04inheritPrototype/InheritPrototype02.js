/**
 *           ===== 프로토타입 상속 =====
 *
 *      - chimp 객체와 bonobo 객체가 공유하는 프로퍼티들을
 *        공통 객체인 ape 에 연결해
 *
 *      - ape 를 공유 프로토타입( shared prototype )으로 사용
 *
 *      --> Object.create 메서드 이용
 */
title( 'chimp 객체' );
{

    var ape = {
        hasThumbs : true,
        hasTail : false,
        swing : function(){
            return '매달리기';
        }
    };

    /**
     * - 첫번째 파라미터가 __proto__ 로 변경됨
     */
    var chimp = Object.create( ape );
    var bonobo = Object.create( ape );

    bonobo.habitat = '중앙 아프리카';

    console.log( chimp , bonobo );
    debugger;
}
/**
 *      - 위의 사례에서 chimp 와 bonobo  모두 ape 에서 프로토타입을 상속받음
 *      --> 따라서 ape 를 수정하면 chimp , bonobo 모두 영향을 받는다
 */