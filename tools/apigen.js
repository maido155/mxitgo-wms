"use strict";


/// input parameters
// var functionName = "wms-lambda-generated";
// var functionDescription = "Generated lambda";
// var method = "POST";
// var path = "/generatedLambda";

if(process.argv.length < 5){

    console.log("\n usage: node apigen.js object action httpMethod /path \n");
    return;

}


var sObject = process.argv[2];
var sAction =  process.argv[3];
var sMethod  = process.argv[4];
var sPath  = process.argv[5];

var sResponse = "";


if(sMethod.toUpperCase() == "GET"){


  sResponse = 

  '   ---Call---	  \n'  + 
  '     \n'  + 
  '   this.props.dispatch({  \n'  + 
  '               type: \''+ sObject +'/' + sAction +'\',  \n'  + 
  '               payload: {}  \n'  + 
  '           })  \n'  + 
  '     \n'  + 
  '\n   ---API Call---  services/api.js\n'  + 
  '     \n'  + 
  '   export async function ' + sAction + '(payload) {  \n'  + 
  '       return request(`${ANT_DESIGN_PRO_TARGET}'  + sPath +'?payload=${JSON.stringify(payload)}`, {  \n'  + 
  '           method: \''  + sMethod.toUpperCase() +'\',  \n'  + 
  '           headers: { \'Authorization\': payload.Authorization }  \n'  + 
  '           \n'  + 
  '       });  \n'  + 
  '  }  ' +
  '      \n'  + 
  ' \n  ---Effect---  models/' + sObject + '.js \n\n'  + 
  
  'import {' + sAction + '} from \'../services/api\'\n' +
  
  '      \n'  + 
  '          * ' + sAction + '({ payload }, { call, put }) {  \n'  + 
  '               const response = yield call(' + sAction + ', payload);  \n'  + 
  '               console.log(response);  \n'  + 
  '               yield put({  \n'  + 
  '                   type: \'' + sAction + 'Reducer\',  \n'  + 
  '                   payload: response,  \n'  + 
  '               });  \n'  + 
  '           }  \n'  + 
  '     \n'  + 
  ' \n  ---Reducer---  models/' + sObject + '.js\n'  + 
  '     \n'  + 
  '   ' + sAction + 'Reducer(state, action) {  \n'  + 
  '               return {  \n'  + 
  '                   ...state  \n'  + 
  '               }  \n'  + 
  '           }  \n'  + 
  '     \n' ;
  }




else{

 sResponse = 

'   ---Call---	  \n'  + 
'     \n'  + 
'   this.props.dispatch({  \n'  + 
'               type: \''+ sObject +'/' + sAction +'\',  \n'  + 
'               payload: {}  \n'  + 
'           })  \n'  + 
'     \n'  + 
'\n   ---API Call---  services/api.js\n'  + 
'     \n'  + 
'   export async function ' + sAction + '(payload) {  \n'  + 
'       return request(`${ANT_DESIGN_PRO_TARGET}'  + sPath +'`, {  \n'  + 
'           method: \''  + sMethod.toUpperCase() +'\',  \n'  + 
'           headers: { \'Authorization\': payload.Authorization },  \n'  + 
'           body: JSON.stringify(payload)  \n'  + 
'       });  \n'  + 
'  }  ' +
'      \n'  + 
' \n  ---Effect---  models/' + sObject + '.js \n\n'  + 

'import {' + sAction + '} from \'../services/api\'\n' +

'      \n'  + 
'          * ' + sAction + '({ payload }, { call, put }) {  \n'  + 
'               const response = yield call(' + sAction + ', payload);  \n'  + 
'               console.log(response);  \n'  + 
'               yield put({  \n'  + 
'                   type: \'' + sAction + 'Reducer\',  \n'  + 
'                   payload: response,  \n'  + 
'               });  \n'  + 
'           }  \n'  + 
'     \n'  + 
' \n  ---Reducer---  models/' + sObject + '.js\n'  + 
'     \n'  + 
'   ' + sAction + 'Reducer(state, action) {  \n'  + 
'               return {  \n'  + 
'                   ...state  \n'  + 
'               }  \n'  + 
'           }  \n'  + 
'     \n' ;
}

console.log(
  sResponse
   );