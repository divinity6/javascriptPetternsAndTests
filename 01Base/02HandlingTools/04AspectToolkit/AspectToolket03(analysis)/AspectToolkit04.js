/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - originalFn 에 원본 fnObj[ fnName ] 함수를 저장해두고,
 *        새로운 advice 함수에 이전 함수를 파라미터로 넘겨버리는 구만...
 */
title( '애스팩트가 타깃을 호출' );
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
            it( '어드바이스가 타깃 호출을 래핑한다' , function(){
                var wrappingAdvice = function( targetInfo ){
                    executionPoints.push( 'wrappingAdvice - 처음' );
                    targetInfo.fn(); // 저장해둔 원본코드 실행
                    executionPoints.push( 'wrappingAdvice - 끝' );
                };

                // wrappingAdvice 객체를 여기서 바인딩만 시켜놓는구나...
                Aop.around( 'targetFn' , wrappingAdvice , targetObj );
                targetObj.targetFn();
                console.log( executionPoints );
                expect( executionPoints ).toEqual(
                    [ 'wrappingAdvice - 처음' , 'targetFn' , 'wrappingAdvice - 끝' ] );
            } );
        } )
    } );
}