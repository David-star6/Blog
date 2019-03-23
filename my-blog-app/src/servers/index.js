import * as config from './config';

import { get, post } from './tools';

export const getArticleList = () => get(config.GIT_ARTICLE_LIST)

export const getArticleDetail = (param) => post(config.GIT_ARTICLE_DETAIL,param)