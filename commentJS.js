/**
 * 프로그람 설명문서 주석
 *
 * - 코멘트에 주석을 구분하기 위해 만든 프로그람
 *   ( ES5 로 작성 )
 */

( function( factory ){
    window.title = window.title || factory;
}( function(){

   var title = /* pure */function(){

       var decorator = function( data ){
            return '---------- ' +  data + ' ----------';
           },
           log = function( data ){
            console.log( data );
           };

       function Title( data ){
           var _data = decorator.call( this , data );
           log( _data );
           return _data;
       }

       Title.setDecorator = function setDecorator(){
           if ( !arguments.length ){
               return decorator;
           }
           decorator = arguments[ 0 ];
           return Title;
       }

       Title.setLog = function setLog(){
           if ( !arguments.length ){
               return log;
           }
           log = arguments[ 0 ];
           return Title;
       }

       return Title;
   }();
   return title;
}() ) );