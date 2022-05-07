/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - 아, 중간에 추가로 인자를 넣어서 실행하려고 이렇게 짯구나...
 */
title( '인자가 타깃에 잘 전달되는지 테스트' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            var originalFn = fnObj[ fnName ]; // 원본함수 설정
            fnObj[ fnName ] = function(){
                var targetContext = {}; // 잘못된 코드라는 것은 알고있음, 나중에 설명
                advice.call( targetContext , { fn : originalFn , args: arguments } ); // 아하, 원본코드를 파라미터로 넘겨버리는군
            };
        }
    }


    describe( 'Aop' , function(){
        var targetObj,
            executionPoints, // 실행 이벤트가 담긴 배열
            argPassingAdvice, // 타깃에 인자를 전달할 어드바이스
            argsToTarget;     // targetObj.targetFn 에 전달할 인자들

        beforeEach( function(){
            targetObj = {
                /**
                 *  - 여기에서 인자를 전달 받을 수 있도록
                 *    arguments 들을 전달해줬구나...
                 */
                targetFn : function(){
                    executionPoints.push( 'targetFn' );
                    // 객체를 Array 로 복사하기위해 slice 를 사용한건가...?
                    argsToTarget = Array.prototype.slice.call( arguments , 0 );
                },
            };

            executionPoints = [];

            /**
             *  - arguments 를 전달하는 Advice 라는 시멘틱이구나
             */
            argPassingAdvice = function( targetInfo ){
               targetInfo.fn.apply( this , targetInfo.args );
            };

            argsToTarget = [];
        });

        describe( 'Aop.around( fnName , advice , targetObj )' , function(){

            it( '어드바이스에서 타깃으로 일반 인자를 넘길 수 있다' , function(){
                Aop.around( 'targetFn' , argPassingAdvice , targetObj );
                targetObj.targetFn( 'a' , 'b' );
                expect( argsToTarget ).toEqual( [ 'a' , 'b' ] );
            });
        } )
    } );
};
/**
 *            ===== TDD =====
 *
 *      - 이상적인 TDD 는 전 기능을 아우르는 테스트가 아니라, 테스트를 작성하기전,
 *        코드는 한줄도 나오지 않게 테스트 주도 개발을 작성하는 것이다
 */