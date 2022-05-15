/**
 *           ===== new 객체 생성 =====
 *
 *      - new 객체 생성 패턴의 장점, 유의사항
 *        ( 어떻게 사용해야 SOLID/DRY 한 코드를 유지하는지... )
 *
 *      --> JS 에서 객체를 new 로 생성하는 패턴은
 *          고전( classical ) 언어와 모양새가 비슷함
 *
 *      - 아래의 Marsupial 함수는 new 객체 생성 패턴으로 자기 자신의 객체
 *        인스턴스를 생성함
 */
title( 'Marsupial 함수와 생성자 함수 사용법' );
{
    // nocturnal :: 야행성
    function Marsupial( name , nocturnal ){
        this.name = name;
        this.isNoctoural = nocturnal;
    }

    var maverick = new Marsupial( '매버릭' , true );
    var slider = new Marsupial( '슬라이더' , false );

    console.log( maverick.isNoctoural );
    // :: true
    console.log( maverick.name );
    // :: 매버릭
    debugger;
}
/**
 *
 *          ===== 나쁜일이 벌어질 가능성 =====
 *
 *      - JS 언어는 Marsupial 함수를 생성자 함수로 사용하라고 강요하지 않는다
 *      --> 즉, new 키워드 없이 생성자 함수를 사용해도 이를 못하게 막을
 *          보호 체계가 없다
 *      --> 그래서, 개발자들은 파스칼 표기법( PascalCase )으로 생성자 함수를
 *          따로 표기하여 구분한다
 *      --> 더글라스 크락포드 같은 사람은 함수 호출시 new 를 빠뜨리면 나쁜 일이
 *          생길 수 있으니 생성자 함수를 쓰지말라고도 권함
 *
 *      ----> 그러나 생성자 함수는 초기화 코드를 공유할때 유용.
 *            new 가 꼭 필요하다면 체크할 방법이 없는것도 아니기 때문에
 *            굳이 쓰지 않을 필요는 없음
 */