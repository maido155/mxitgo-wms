/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { formatMessage} from 'umi-plugin-react/locale';

/*
const codeMessage = {
  200:'The server successfully returned the requested data.',
  201:'New or modified data is successful.',
  202:'A request has been queued in the background (asynchronous task).',
  204:'The data was deleted successfully.',
  400:'There was an error in the request issued, and the server did not create or modify data.',
  401:'The user does not have permission (token, user name, wrong password).',
  403:'The user is authorized, but access is prohibited.',
  404:'The request issued was for a non-existent record, and the server did not operate.',
  406:'The requested format is not available.',
  410:'The requested resource is permanently deleted and will no longer be available.',
  422:'When creating an object, a validation error occurred.',
  500:'An error occurred on the server, please check the server.',
  502:'Gateway error.',
  503:'The service is unavailable, the server is temporarily overloaded or maintained.',
  504:'Gateway timeout.'
};
*/
/**
 * 异常处理程序
 */
 
const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    //const errorText = codeMessage[response.status] || response.statusText;
    const errorText= formatMessage({
      id: `request.error.${response.status}`,
    });
    const { status, url } = response;
    notification.error({
      message: `${formatMessage({
        id: 'request.error.notification.title',
      })} ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
     description:  formatMessage({
        id: 'request.error.notification.description',
      }) ,
      message:  formatMessage({
        id: 'request.error.notification.message',
      }) ,
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
