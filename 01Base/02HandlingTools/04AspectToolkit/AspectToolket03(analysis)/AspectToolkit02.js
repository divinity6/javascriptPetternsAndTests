/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - 테스트를 성공시킬만큼만 코딩
 */
title( 'Aop.around 가 advice 를 실행' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            fnObj[ fnName ] = advice;
        }
    }


    describe( 'Aop' , function(){
        describe( 'Aop.around( fnName , advice , targetObj )' , function(){
            // 그치 이렇게할려면 targetFn 를 advice 로 바꿔치기해야지...
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