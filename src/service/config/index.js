import {get} from '../index';
import * as api from '../../service/api';
export function getConfig(params) {
    return get(api.api.config)(params);
}