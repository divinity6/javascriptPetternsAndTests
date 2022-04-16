
const list = [ 1 , { test : 1 , item : 2 } , { test : 1 , item : 2 } , false , { test : 2 } , 1 , 1 ,3 , { test : 4 } , { test : 4} ];
const valueList = list.map( item => JSON.stringify( item ) );
const newList = [];
const inputSet = () => {
    let combineList = [];
    let prevValue = '';
    valueList.forEach( ( value , index) => {
        if ( prevValue === '' ){
            prevValue = value;
            combineList.push( value );
        }
        else {

            if ( value === prevValue ){
                combineList.push( value );
            }
            else {
                if ( combineList.length !== 0 ){
                    // 여기에서만 새로운 로직으로 변경해주면 되네
                    newList.push( combineList[ 0 ] );
                    combineList = [];
                    prevValue = '';
                }
                combineList.push( value );
                prevValue = value;
            }
        }

        if ( index === valueList.length - 1 ){
            // 여기에서만 새로운 로직으로 변경해주면 되네
            newList.push( combineList[ 0 ] );
            combineList = [];
            prevValue = '';
        }
    } );
    debugger;
}

inputSet();