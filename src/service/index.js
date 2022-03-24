import {url} from './api';
import {userList} from './user';

export default {
    userList
}
const AUTH_TOKEN = 'MTU5Mjg1MDg3NDcwNw==';

export function get(api) {
    return params=>fetch(buildParams(url+api,params),
        {
            headers:{
                'auth-token':AUTH_TOKEN
            }
        }
        )
}

function buildParams(url,params={}) {
    let newUrl = new URL(url);
    Object.keys(params).forEach(key=>{
        newUrl.searchParams.append(key,params[key]);
    });
    return newUrl.toString();
}