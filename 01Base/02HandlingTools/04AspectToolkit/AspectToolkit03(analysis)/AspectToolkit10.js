/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - 와 모든 테스트가 여기서 결정되네...
 *
 *      --> 참고 ret :: return 의 줄임말
 *
 */
title( 'Aop.next 의 테스트' );
{

    var Aop = {
        around : function( fnName , advice , fnObj ){
            var originalFn = fnObj[ fnName ]; // 원본함수 설정
            fnObj[ fnName ] = function(){
                return advice.call( this , { fn : originalFn , args: arguments } ); // 아하, 원본코드를 파라미터로 넘겨버리는군
            };
        },
        next : function( targetInfo ){
            return targetInfo.fn.apply( this , targetInfo.args );
        }
    };

    var targetObj,
        executionPoints, // 실행 이벤트가 담긴 배열
        argPassingAdvice, // 타깃에 인자를 전달할 어드바이스
        argsToTarget,     // targetObj.targetFn 에 전달할 인자들
        targetFnReturn;   // targetObj.targetFn 에서 반환하는 값

        targetObj = {
            targetFn : function(){
                executionPoints.push( 'targetFn' );
                // 객체를 Array 로 복사하기위해 slice 를 사용한건가...?
                argsToTarget = Array.prototype.slice.call( arguments , 0 );
                return targetFnReturn = argsToTarget.join( '' );
            },
        };

        executionPoints = [];
        argPassingAdvice = function( targetInfo ){
            targetInfo.fn.apply( this , targetInfo.args );
        };

        argsToTarget = [];
    var Target = function(){
        var self = this;
        this.targetFn = function(){
            expect( this ).toBe( self );
        };
    };

    /**
     *  --------------------------------------------
     *              여기서부터 새로운 로직
     *  --------------------------------------------
     */
    describe('Aop.next( context , targetInfo )', function () {
        var advice = function( targetInfo ){
            return Aop.next.call( this , targetInfo );
        };
        var originalFn;
        beforeEach( function(){
            originalFn = targetObj.targetFn;
            Aop.around( 'targetFn' , advice , targetObj );
        } );

        it( 'targetInfo.fn에 있는 함수를 호출한다' , function(){
            targetObj.targetFn();
            expect( executionPoints ).toEqual( [ 'targetFn' ] );
        } );

        it( 'targetInfo.args 에 인자를 전달한다' , function(){
            targetObj.targetFn( 'a' , 'b' );
            expect( argsToTarget ).toEqual( [ 'a' , 'b' ]);
        } );

        it( 'targetInfo 함수에서 받은 값을 반환한다' , function(){
            var ret = targetObj.targetFn();
            expect( ret ).toBe( targetFnReturn );
        } );

        it( '주어진 콘텍스트에서 타깃 함수를 실행한다' , function(){
            var targetInstance = new Target();
            var spyOnInstance = spyOn( targetInstance , 'targetFn' ).and.callThrough();
            Aop.around( 'targetFn' , advice , targetInstance );
            targetInstance.targetFn();
            expect( spyOnInstance ).toHaveBeenCalled();
        } );
    });
};

/**
 *      - 테스트를 모아놓고 보니 깔끔하네...
 *
 *      --> 여기에서 AspectToolkit( main )을 한번다시 재탐색해보자
 *
 */