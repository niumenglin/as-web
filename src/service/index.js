import {url} from './api';
import {userList,updateUser} from './user';

export default {
    userList,
    updateUser
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
export function put(api) {
    /**
     * 第一个参数为body参数，第二个参数为URL path或查询参数
     */
    return params=>{
        const formData = new FormData();
        Object.entries(params).forEach(([k,v])=>{
            formData.append(k,v);
        });
        return queryParams=>fetch(buildParams(url+api,queryParams),
            {
                method:'PUT',
                body:formData,
                headers:{
                    'auth-token':AUTH_TOKEN
                }
            });
    }
}
function buildParams(url,params={}) {
    let newUrl = new URL(url);
    if (typeof params==='object'){
        Object.keys(params).forEach(key=>{
            newUrl.searchParams.append(key,params[key]);
        });
        return newUrl.toString();
    }else{
        //适配path参数
        return url.endsWith("/")?url+params:url+"/"+params;
    }

}