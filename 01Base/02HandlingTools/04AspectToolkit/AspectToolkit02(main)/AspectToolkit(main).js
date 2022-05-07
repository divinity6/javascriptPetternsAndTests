/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - Aop.js 프레임 워크의 핵심 코드
 */
title( 'AOP.js' );
{
    // 작성자 : 프레드릭 아펠버그
    // http://fredrik.appelberg.me/2010/05/07/aop-js/html
    // 프로토타입을 지원할 수 있게 데이브 클레이턴이 수정함
    var Aop = {
        // 주어진 이름공간에 매칭되는 모든 함수 주변( around )에 어드바이스를 적용한다
        around : function( pointcut , advice , namespaces ){
            // 이름 공간이 없으면 전역 이름공간을 찾아내는 꼼수를 쓴다
            if ( namespaces === undefined || namespaces.length === 0 ){
                namespaces = [ ( function(){ return this; }.call() ) ];
            }
            // 이름 공간( namespace )을 전부 순회한다
            for ( var i in namespaces ){
                var ns = namespaces[ i ];

                for ( var member in ns ){
                    if ( typeof ns[ member ] === 'function' && member.match( pointcut ) ){
                        ( function( fn , fnName , ns ){
                            // member fn 슬롯을 'advice' 함수를 호출하는 래퍼로 교체한다
                            ns[ fnName ] = function(){
                                return advice.call( this , {
                                    fn : fn,
                                    fnName : fnName,
                                    arguments: arguments,
                                } );
                            }
                        } )( ns[ member ] , member , ns );
                    }
                }
            }
        },

        /**
         * - 여기의 arguments 즉, f 가, 기존 객체( 기존 모듈 )인가...
         */
        next : function( f ){
            return f.fn.apply( this , f.arguments );
        }

    };

    Aop.before = function( pointcut , advice , namespace ){
        Aop.around( pointcut , function( f ){
            advice.apply( this , f.arguments );
            return Aop.next.call( this , f );
        } , namespace );
    };

    Aop.after = function( pointcut , advice , namespace ){
        Aop.around( pointcut , function( f ){
            var ret = Aop.next.call( this , f );
            advice.apply( this , f.arguments );
            return ret;
        } , namespace );
    }
}
/**
 *  - 아, 이제야 조금 이해되네... wrapper( 래퍼 ) 함수로 감싸서 바로 호출하는게 아니라
 *    이전에 호출하거나, 다음에 호출하는거네...
 *
 */