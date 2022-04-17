/**
 *          ===== 테스트 하기 쉬운 코드로 다듬기 =====
 *
 *      - 테스트하기 쉬운 코드로 다듬으려면 관심사를 분리하는 일이 필요
 */
{
    title('관심사를 적절히 분리');
    var Users = Users || {};
    // 등록
    Users.registration = function(){
        return {
            /**
             * - 많은 일을 하고 있는 함수.
             */
            validateAndRegisterUser : function validateAndRegisterUser( user ){
                if ( !user ||
                    user.name === '' ||
                    user.password === '' ||
                    user.password.length < 6
                ){
                    throw new Error( '사용자 인증이 실패했습니다.' );
                }

                $.post( 'http://yourapplication.com/user' , user );

                $( '#user-message').text( '가입해주셔서 감사합니다 , ' + user.name + '님');
            }
        }
    }
}
/**
 *      - 이 함수가 하는 일
 *      --> user 객체가 올바르게 채워졌는지 검증
 *      --> 검증을 마친 user 객체를 서버로 전송
 *      --> UI 에 메세지 표시
 *
 *      ----> 관심사
 *
 *      - 사용자 검증
 *      - 서버와 직접 통신
 *      - UI 직접 다루기
 *
 *
 *      - 위의 코드에서 테스트 검증 코드 :
 *      --> user 가 null 이면 에러를 낸다
 *      --> null 인 user 는 서버로 전송하지 않는다
 *      --> user 가 null 이면 UI를 업데이트 하지 않는다
 *      --> user 가 undefined 이면 에러를 낸다
 *      --> undefined 인 user 는 서버로 전송하지 않는다
 *      --> user 가 undefined 이면 UI 를 업데이트 하지 않는다
 *      --> user 의 name 프로퍼티가 빈 상태이면 에러를 낸다
 *      --> name 프로퍼티가 빈 user 는 서버로 전송하지 않는다
 *      --> user 의 name 프로퍼티가 비어있으면 UI를 업데이트하지 않는다
 *      --> ...( 생략 )
 *
 *      ----> 사실 user 가 비어있으면 에러를 내면되는데 왜이리 복잡하게
 *            테스트 코드를 작성하는가?
 *            ( 그러나 그것은 나혼자, 오늘 작성할때의 이야기 )
 *
 *      ----> 아래는 테스트가 빠졌을 때 , 다른 동료들이 할 수 있는 실수 예시
 */
{
    title( '테스트 코드를 작성해야하는 이유 2' );
    var Users = Users || {};
    Users.registration = function (){
        return {
            validateAndRegisterUser : function validateAndRegisterUser( user ){
                $.post( 'http://yourapplication.com/user' , user );

                $( '#user-message').text( '가입해주셔서 감사합니다 , ' + user.name + '님');
                if ( !user ||
                    user.name === '' ||
                    user.password === '' ||
                    user.password.length < 6
                ){
                    throw new Error( 'The user is not valid' );
                }
            }
        }
    }
}

/**
 *          ===== 따라서, 이코드들의 관심사를 분리하는 일이 필요! =====
 *
 *          - validateAndRegisterUser 함수에 맡기지말고 별개의 객체로
 *            관심사를 추출하여 단일 책임 부여
 *
 *          - 아래 코드에서 테스트 코드 예시 :
 *          --> user 가 잘못넘어오면 에러가 난다
 *          --> 잘못된 user 는 등록하지 않는다
 *          --> 잘못된 user 는 표시하지 않는다
 *          --> 올바른 user 를 인자로 userRegister.registerUser 함수를 실행한다
 *          --> userRegister.registerUser 에서 에러가 나면
 *              userDisplay.showRegistrationThankYou 함수는 실행하지 않는다
 *          --> user 가 성공적으로 등록되면 user 를 인자로
 *              userDisplay.showRegistrationThankYou 함수를 실행한다
 */
{
    title( '단일 책임을 가지는 코드' );
    var Users = Users || {};
    Users.registration = function ( userValidator , userRegister , userDisplay ){
        return {
            /**
             *  - 본질적으로 어떤일을 하는 함수에서 남이 한 일을 조정하는 함수로 탈바꿈함.
             */
            validateAndRegisterUser : function validateAndRegisterUser( user ){
                /**
                 *  - 세 개의 책임으로 분리
                 */
                if ( !userValidator.userIsValid( user ) ){
                    throw new Error( '사용자 인증이 실패했습니다.' );
                }

                userRegister.registerUser( user );

                userDisplay.showRegistrationThankYou( user );

            }
        }
    }

    debugger;

    /**
     *  - 즉, 서로 다른 관심사는 작고 간단한 모듈로 나누어 만들면 작성 및 테스트, 이해가 쉽다
     */
}
/**
 *
 *      - 느낀점.
 *      ----> 작은 함수로 쪼개는 건 항상해왔던 일이지만,
 *            작은 단위 함수로 쪼개는 게 아니라
 *
 *            이녀석을 감싸는 함수가 중요한 거네
 *            ( 감싸는 함수에서 책임으로 분리하게 맨들어야 함 )
 *
 *      ----> 반드시 코드를 먼저 작성하기전에 TDD 를 먼저 작성해야함.
 *
 *      ----> 반드시 모든 코드는 관심사 별로 쪼개야함..
 *            ( 근데이거 진짜 애매한 경우가 많던데 많은 생각이 필요할 거 같음... )
 */