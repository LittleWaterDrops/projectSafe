export const dataSchema = {
    name: 'data',
    properties:{
        appID: 'int', 
        appName: 'string', 
        authority: 'bool', 
        appFunction: {type:'list',objectType:'appFunc'},
    }

}

export const appFuncSchema = {
    name: 'appFunc',
    properties:{
        funcID:'int',
        funcName: "string",
    }
}