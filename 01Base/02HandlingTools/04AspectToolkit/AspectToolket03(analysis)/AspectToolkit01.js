/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - Aop 의 핵심은 함수 실행( 타깃 )을 가로채어 다른 함수( 어드바이스 : 추가 기능 )를
 *        실행 직전, 전후에 실행시키는 것.
 */
title( 'AOP.js' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            // 처음 버전이라 하는 일이 없다
        }
    }


    describe( 'Aop' , function(){
        describe( 'Aop.around( fnName , advice , targetObj )' , function(){
            it( '타깃 함수를 호출 시 어드바이스를 실행하도록 한다' , function(){
               var targetObj = { // 아 namespace 가 경로구만...
                   targetFn : function(){}
               };

               var executedAdvice = false; // 추가기능 실행?
               var advice = function(){
                   executedAdvice = true;
               };

               Aop.around( 'targetFn' , advice , targetObj );
               targetObj.targetFn();
               expect( executedAdvice ).toBe( true );
            } );
        } )
    } );
}
/**
 *  - 당연히 테스트 실패
 *    Aop.around 가 비어있자네...
 */