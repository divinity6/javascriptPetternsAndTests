/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - next 함수를 이용해 함수안에서 연결되는 함수들을 캡슐화
 *      --> 아 , 그런데 this 를 콘텍스트라 부르는구나...
 *          ( 하긴 실행콘텍스트 가 실행되는 환경이니깐... 그 함수가 실행되는 환경을 가르킨다고 봐도 무방하나? )
 */
title( 'Aop.next 를 추가' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            var originalFn = fnObj[ fnName ]; // 원본함수 설정
            fnObj[ fnName ] = function(){
                return advice.call( this , { fn : originalFn , args: arguments } ); // 아하, 원본코드를 파라미터로 넘겨버리는군
            };
        },
        next : function( targetInfo ){
            // 이 함수는 다음과 같은 단계를 밟아 하나하나 테스트를 하며 작성했다
            //      targetInfo.fn();
            //      targetInfo.fn.apply( {} , targetInfo.args );
            // return targetInfo.fn.apply( {} , targetInfo.args );
            return targetInfo.fn.apply( this , targetInfo.args );
        }
    };
};
/**
 *  - 뭐야 근데 advice 함수안에 있는 내용을 next 로 뺀것뿐인데...? next 로 뺀거에 불과한데?
 *  --> 사용자가 구조를 알 필요없게 할려는 것인가
 *  --> 그치, 왜냐면 나중에 이 next 를 한번더 감싸서 호출할때 계속해서 targetInfo.args 를
 *      호출하지 않도록 감싸버린거지...
 */