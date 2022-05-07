/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - JS 는 예기치 않는 콘텍스트에서 함수를 실행하게 될 가능성이 매우 크다
 *        ( 내가 원하는 환경이 아닌, 다른환경에서 함수가 실행될수도 있다는 이야기... )
 *
 *      --> 따라서 콘텍스트까지 고려한 테스트를 작성해야 한다
 */
title( '값을 잘 반환하는지 테스트' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            var originalFn = fnObj[ fnName ]; // 원본함수 설정
            fnObj[ fnName ] = function(){
                var targetContext = {}; // 잘못된 코드라는 것은 알고있음, 나중에 설명
                return advice.call( targetContext , { fn : originalFn , args: arguments } ); // 아하, 원본코드를 파라미터로 넘겨버리는군
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

            it( '타깃 함수를 해당 객체의 콘텍스트에서 실행한다' , function(){
                var Target = function(){
                    var self = this;
                    this.targetFn = function(){
                        expect( this ).toBe( self );
                    };
                };

                var targetInstance = new Target();
                // spyOn 으로 targetInstance 함수안 targetFn 의 실행여부를 확인함
                var spyOnInstance = spyOn( targetInstance , 'targetFn' ).and.callThrough();
                Aop.around( 'targetFn' , argPassingAdvice , targetInstance );
                /**
                 *  - 그치 보통 targetInstance.targetFn() 이렇게 실행하면
                 *    this 가 targetInstance 를 참조한다고 생각하기 쉽지...
                 *    그치만 여기서 this 는 targetContext 를 참조하는걸...
                 */
                targetInstance.targetFn();
                expect( spyOnInstance ).toHaveBeenCalled();
            } );

            it( '어드바이스를 타깃의 콘텍스트에서 실행한다' , function(){
                var advice = function(){
                    expect( this ).toBe( targetObj );
                };
                /**
                 *  - 여기의 advice 또한
                 *    advice.call( targetContext , { fn : originalFn , args: arguments } );
                 *    때문에 this 가 targetContext 를 참조하는걸...
                 */
                Aop.around( 'targetFn' , advice , targetObj );
                targetObj.targetFn();
            });
        } )
    } );
};