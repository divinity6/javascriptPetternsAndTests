/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - 실행 환경( 콘텍스트 : this )까지도 호출한 곳을 참조하도록
 *        신경써줘야 하네...
 */
title( '올바른 콘텍스트에서 타깃을 실행' );
{
    var Aop = {
        around : function( fnName , advice , fnObj ){
            var originalFn = fnObj[ fnName ]; // 원본함수 설정
            fnObj[ fnName ] = function(){
                /**
                 *  - 여기에서 this 는 호출한 곳의 객체를 참조하니깐...
                 *    fnObj[ fnName ] 를 호출한곳의 상위를 호출하면,
                 *    그 this 를 타고타고 내부에다 전달해서 사용하게 하려하는거구나.
                 */
                return advice.call( this , { fn : originalFn , args: arguments } ); // 아하, 원본코드를 파라미터로 넘겨버리는군
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
                targetInstance.targetFn();
                expect( spyOnInstance ).toHaveBeenCalled();
            } );

            it( '어드바이스를 타깃의 콘텍스트에서 실행한다' , function(){
                var advice = function(){
                    expect( this ).toBe( targetObj );
                };
                Aop.around( 'targetFn' , advice , targetObj );
                targetObj.targetFn();
            });
        } )
    } );
};
/**
 *      - 아니...ㅋㅋ 이구조도 최선이 아니라고?? 나는 겁나 머리잘쓴거같은데 이게 최선의 구조가아니래...
 *        ( 49번째 줄 ) targetInfo.fn.apply( this , targetInfo.args ); 이게문제래...
 *
 *      --> 최선의 코드가 아닌 이유 : targetInfo 의 구조를 Aop 사용자에게 보여주는 꼴이므로
 *                               함수안에 캡슐화를 해야한다.
 *
 *      --> 이럴때 도우미 함수( Aop.next )를 맨들어 체인의 다음 타깃을 호출할 수 있도록 한다고함...
 *          targetInfo.fn.apply( this , targetInfo.args ) 처럼 직접적으로 부르는게 아니라...
 */