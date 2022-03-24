import {get} from '../index';
import * as api from '../../service/api';
export function userList(params){
    return get(api.api.userList)(params);
}