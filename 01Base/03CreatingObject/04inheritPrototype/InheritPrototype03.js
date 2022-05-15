/**
 *           ===== 프로토타입 체인 =====
 *
 *      - 다층 프로토타입을 이용하면 여러 계층의 상속을 구현할 수 있음
 *      --> 예 ) ape 의 프로토 타입은 primate, chimp 의 프로토 타입은 ape
 */
title( 'chimp 객체' );
{

    var primate = {
        stereoscopicVision : true,
    }


    /**
     * - 첫 번째 파라미터는 __proto__ 로 사용할 값
     *
     * - 두 번째 파라미터는 defineProperty 로 선언한
     *   추가할 피로퍼티들
     */
    var ape = Object.create( primate , {
        hasThumbs : { value : true },
        hasTail : { value : false },
        swing : { value : function(){ return '매달리기' } },
    } );


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
 *
 *      - 너무 깊숙하게 프로토타입 체인을 넣어두면 성능상 좋지 않기 때문에
 *        너무 깊이 쓰지 않는게 좋음
 */