/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - 타깃 호출을 어드바이스로 감싸는 일.
 *      --> 일부 타깃 정보를 어드바이스에 전달
 *      ----> 원래 모듈의 정보를 새로운 기능에 전달하는 것 같음.
 *          ( 내부에 원본 타깃 함수를 저장한 객체 생성 후 어드바이스에 넘기면 됨 )
 *
 *      ----> 왜 감쌀려고하는거지...? 쥰내 궁금한걸?
 *      ------> 아, 이해했어!! 원본코드 함수를 바로 실행시키지 않기 위해서 감싸는구나...
 *              원본코드덩어리를 바로 실행시키는게 아니라 한번 감싸서
 *              원본 함수 이전에 실행시킬 함수 -> 원본코드 -> 다음에 실행시킬 함수
 *              이 순으로 실행시킬려고 감싸둔거구나...
 */
title( 'Aop.around 가 advice 를 실행' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            fnObj[ fnName ] = advice;
        }
    }


    describe( 'Aop' , function(){
        var targetObj,
            executionPoints; // 실행 이벤트가 담긴 배열

        beforeEach( function(){
            targetObj = {
                targetFn : function(){
                    executionPoints.push( 'targetFn' );
                },
            };
            executionPoints = [];
        });

        describe( 'Aop.around( fnName , advice , targetObj )' , function(){
            it( '어드바이스가 타깃 호출을 래핑한다' , function(){

                var wrappingAdvice = function( targetInfo ){
                    executionPoints.push( 'wrappingAdvice - 처음' );
                    targetInfo.fn();
                    executionPoints.push( 'wrappingAdvice - 끝' );
                };

                Aop.around( 'targetFn' , wrappingAdvice , targetObj );

                targetObj.targetFn();

                expect( executionPoints ).toEqual(
                    [ 'wrappingAdvice - 처음' , 'targetFn' , 'wrappingAdvice - 끝' ] );
            } );
        } )
    } );
}
/**
 *  - targetInfo.fn() 를 제공하는 로직이 없으므로 당연히 테스트 실패
 */