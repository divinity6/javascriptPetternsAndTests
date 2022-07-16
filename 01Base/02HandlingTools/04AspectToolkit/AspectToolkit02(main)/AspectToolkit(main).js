/**
 *            ===== AOP 모듈 개발 =====
 *
 *      - Aop.js 프레임 워크의 핵심 코드
 *
 *      - Aop 용어 정리
 *
 *      --> 타겟( Target )
 *      ----> 핵심 기능을 담고 있는 모듈로 타겟은 부가기능을 부여할 대상이 된다
 *
 *      --> 어드바이스( Advice )
 *      ----> 어드바이스는 타겟에 제공할 부가기능을 담고있는 모듈
 *
 *      --> 조인포인트( Join Point )
 *      ----> 어드바이스가 적용될 수 있는 위치를 말함
 *      ----> 타겟 객체가 구현한 인터페이스의 모든 메서드는 조인 포인트가 나온다
 *
 *      --> 포인트 컷( PointCut )
 *      ----> 어드바이스를 적용할 타겟의 메서드를 선별하는 정규표현식이다
 *      ----> 포인트컷 표현식은 execution 으로 시작하고 메서드의 Signature 를 비교하는 방법을
 *            주로 이용한다
 *
 *      --> 애스펙트( Aspect )
 *      ----> 애스펙트는 AOP 의 기본 모듈이다
 *      ----> 애스펙트 = 어드바이스 + 포인트컷
 *      ----> 애스펙트는 싱글톤 형태의 객체로 존재한다
 *
 *      --> 어드바이저( Advisor )
 *      ----> 어드바이저 = 어드바이스 + 포인트컷
 *      ----> 어드바이저는 Spring AOP 에서만 사용되는 특별한 용어
 *
 *      --> 위빙( Weaving )
 *      ----> 위빙은 포인트컷에 의해서 결정된 타겟의 조인 포인트에 부가기능( 어드바이스 )를 삽입
 *            하는 과정을 뜻함
 *      ----> 위빙은 AOP 가 핵심기능( 타겟 )의 코드에 영향을 주지 않으면서 필요한 부가기능
 *            ( 어드바이스 )를 추가할 수 있도록 해주는 핵심적인 처리과정이다
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
                namespaces = [ ( function(){
                    return this;
                }.call() ) ];
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
         * --> 정답 : 어떻게 호출하느냐에 따라 f 가 기존 객체가 될 수도있고,
         *           wrapper 객체가 될 수도있음 --> 매우 유동적이라는 것임
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
 *  - 아, 이제야 이해되네... wrapper( 래퍼 ) 함수로 감싸서 바로 호출하는게 아니라
 *    이전 함수들이 동작 후 호출하거나, 동작 전 호출하게 하는 함수 묶음이구나
 *
 *  --> next()를 이용해 캡슐화 은닉화를 한거구나
 *
 *
 *             ===== AOP 모듈 핵심 =====
 *
 *      - Aop.around( pointcut , advice , namespace );
 *      --> pointcut( 포인트컷 ) : 애스팩트가 끼어들어 어떤일을 수행하는 지점( point )
 *                               Aop.js --> 정규표현식으로 포인트컷 구현
 *
 *      --> js 의 namespace 는 다른 객체를 프로퍼티로 소유한 단순한 객체
 *
 */