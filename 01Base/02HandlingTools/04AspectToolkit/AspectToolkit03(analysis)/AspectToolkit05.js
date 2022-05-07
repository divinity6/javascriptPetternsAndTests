/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - 비슷한 애스펙트를 두개 만드는 것이 아니라
 *        이들을 찍어내는 factory 를 두는 것이 중요하다
 *        ( 이런 DRY 요소가 개발자의 일정을 당겨준다 )
 */
title( '애스팩트의 다계층 사용이 가능한지 확인' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            var originalFn = fnObj[ fnName ]; // 원본함수 설정
            fnObj[ fnName ] = function(){
                var targetContext = {}; // 잘못된 코드라는 것은 알고있음, 나중에 설명
                advice.call( targetContext , { fn : originalFn } ); // 아하, 원본코드를 파라미터로 넘겨버리는군
            };
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

            it( '마지막 어드바이스가 기존 어드바이스에 대해 실행되는 방식으로 체이닝할 수 있다' , function(){
                var adviceFactory = function( adviceID ){ // 이런식으로 팩토리함수로 감싸는게 핵심이네
                    return function( targetInfo ){ // 이함수객체가 위의 advice 파라미터에 매핑됨
                        executionPoints.push( 'wrappingAdvice - 처음 ' + adviceID );
                        /**
                         *  - 이게 함정이었네...
                         *  --> originalFn 가 adviceFactory() 로 바꿔치기되는구나...
                         */
                        targetInfo.fn();
                        executionPoints.push( 'wrappingAdvice - 끝 ' + adviceID );
                    };
                };

                // 아, adviceFactory() 를 여기서 실행시키는구나...
                Aop.around( 'targetFn' , adviceFactory( '안쪽' ) , targetObj );
                Aop.around( 'targetFn' , adviceFactory( '바깥쪽' ) , targetObj );
                targetObj.targetFn();
                expect( executionPoints ).toEqual([
                    'wrappingAdvice - 처음 바깥쪽',
                    'wrappingAdvice - 처음 안쪽',
                    'targetFn',
                    'wrappingAdvice - 끝 안쪽',
                    'wrappingAdvice - 끝 바깥쪽',
                ]);
            });
        } )
    } );

    /**
     *  - 와, 진짜 개천재다.... 클로저를 아주그냥 기가막히게 사용하네...
     *    ( 왜 이렇게 실행되는지 한참을 봐서 암... )
     *
     *  --> 위의 코드 실행 논리 정리 ::
     *
     *      1. Aop.around( 'targetFn' , adviceFactory( '안쪽' ) , targetObj ) 가 실행되며
     *         내부에서 return function( targetInfo ){ ... } 실행 결과를
     *         advice 함수로 사용한다.
     *
     *      1-1. 내부 프로퍼티인 originalFn 에
     *           ( 27번째 줄 ) targetObj.targetFn 를 할당한다.
     *
     *      1-2. targetObj.targetFn 에
     *           ( 13번째 줄 ) fnObj[ fnName ] = function(){ ... }를 할당한다.
     *
     *      2. Aop.around( 'targetFn' , adviceFactory( '바깥쪽' ) 가 실행되며
     *         내부에서 return function( targetInfo ){ ... } 실행 결과를
     *         advice 함수로 사용한다.
     *
     *      2-1. 내부 프로퍼티인 originalFn 에
     *           ( 13번째 줄 ) return function( targetInfo ){ ... }를 할당한다
     *
     *      2-2. targetObj.targetFn 에
     *           ( 13번째 줄 ) fnObj[ fnName ] = function(){ ... }를 할당한다.
     *
     *      3. targetObj.targetFn() 를 실행하면...
     *
     *      3-1. ( 13번째 줄 ) fnObj[ fnName ] = function(){ ... } 가 실행되며,
     *           advice 에 , 2. 에서 설정한 advice 함수를 실행한다
     *
     *      3-2. 이때,  advice 함수의 파라미터 targetInfo 는
     *           2-1. 에서 설정한 originalFn  이므로
     *           ( 13번째 줄 ) fnObj[ fnName ] = function(){ ... } 가 된다
     *
     *      3-2-1. 내부 코드인 executionPoints.push( 'wrappingAdvice - 처음 ' + '바깥쪽' );
     *             을 실행한다
     *             ( executionPoints : [ 'wrappingAdvice - 처음 바깥쪽' ] )
     *
     *      3-2-2. 내부 코드인 targetInfo.fn(); 을 실행한다
     *
     *      3-2-2-1. targetInfo.fn(); 는  2-1. 에서 설정한 originalFn 이므로
     *               ( 13번째 줄 ) fnObj[ fnName ] = function(){ ... } 가 되며
     *                           adviceID : '안쪽' 인 advice 함수가 실행된다
     *
     *      3-2-2-2. 내부 코드인 executionPoints.push( 'wrappingAdvice - 처음 ' + '안쪽' );
     *               을 실행한다
     *               ( executionPoints : [
     *                  'wrappingAdvice - 처음 바깥쪽',
     *                  'wrappingAdvice - 처음 안쪽', ] )
     *
     *      3-2-2-3. 내부 코드인 targetInfo.fn(); 가 실행되며, 이때 targetInfo 는
     *               1-1. 에 설정된
     *               ( 27번째 줄 ) targetObj.targetFn 이다. 따라서,
     *               ( 28번째 줄 ) executionPoints.push( 'targetFn' ); 가 실행된다
     *
     *               ( executionPoints : [
     *                  'wrappingAdvice - 처음 바깥쪽',
     *                  'wrappingAdvice - 처음 안쪽',
     *                  'targetFn',
     *                ] )
     *
     *      3-2-2-4. 내부 코드인 executionPoints.push( 'wrappingAdvice - 끝 ' + '안쪽' );
     *               을 실행한다
     *
     *               ( executionPoints : [
     *                  'wrappingAdvice - 처음 바깥쪽',
     *                  'wrappingAdvice - 처음 안쪽',
     *                  'targetFn',
     *                  'wrappingAdvice - 끝 안쪽',
     *                ] )
     *
     *                ---> 이시점에서 targetInfo.fn() 함수가 종료된다
     *
     *      3-2-3. 내부 코드인 executionPoints.push( 'wrappingAdvice - 끝 ' + '바깥쪽' );
     *             을 실행한다
     *
     *             --> 따라서, executionPoints 는 아래와 같은 결과가 나오게된다
     *
     *             ( executionPoints : [
     *                  'wrappingAdvice - 처음 바깥쪽',
     *                  'wrappingAdvice - 처음 안쪽',
     *                  'targetFn',
     *                  'wrappingAdvice - 끝 안쪽',
     *                  'wrappingAdvice - 끝 바깥쪽',
     *                ] )
     *
     *      - 진짜 한참을 봐야 알정도로 클로저를 잘활용했다...
     *        ( 천재인듯.... )
     */
}