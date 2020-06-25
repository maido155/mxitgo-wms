/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { FormattedMessage} from 'umi-plugin-react/locale';

const codeMessage = {
  200: <FormattedMessage id="utils.request.200"/>,
  201: <FormattedMessage id="utils.request.201"/>,
  202: <FormattedMessage id="utils.request.202"/>,
  204: <FormattedMessage id="utils.request.204"/>,
  400: <FormattedMessage id="utils.request.400"/>,
  401: <FormattedMessage id="utils.request.401"/>,
  403: <FormattedMessage id="utils.request.403"/>,
  404: <FormattedMessage id="utils.request.404"/>,
  406: <FormattedMessage id="utils.request.406"/>,
  410: <FormattedMessage id="utils.request.410"/>,
  422: <FormattedMessage id="utils.request.422"/>,
  500: <FormattedMessage id="utils.request.500"/>,
  502: <FormattedMessage id="utils.request.502"/>,
  503: <FormattedMessage id="utils.request.503"/>,
  504: <FormattedMessage id="utils.request.504"/>,
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
export default request;
