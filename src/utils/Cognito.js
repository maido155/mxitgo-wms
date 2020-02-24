import * as AWS from 'aws-sdk';
import ConfigPool from './../../config/config';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const signUpCognito = (data) => {
    return new Promise((resolve, reject) => {
        var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool; //llamar libreria de cognito, conectar
        var poolData = { //valores desde conigto de aws
            UserPoolId: ConfigPool.poolData.UserPoolId, // Your user pool id here
            ClientId: ConfigPool.poolData.ClientId, // Your client id here
        };
        var userPool = new CognitoUserPool(poolData); //genara conexion
        var attributeList = []; //array meter valores de formulario

        var dataName = {Name: 'name',Value: data.name};
        var dataFamily = {Name: 'family_name',Value: data.family_name};
        var dataMiddle = {Name: 'middle_name',Value: data.middle_name};
        var dataPhone = {Name: 'phone_number',Value: data.phone_number};


        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributeFamily = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamily);
        var attributeMiddle= new AmazonCognitoIdentity.CognitoUserAttribute(dataMiddle);
        var attributePhone = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhone);


        attributeList.push(attributeName);
        attributeList.push(attributeFamily);
        attributeList.push(attributeMiddle);
        attributeList.push(attributePhone);


        userPool.signUp(data.email, data.password, attributeList, null, function(
            err,
            result
        ) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    })
}

export {
    signUpCognito
}