import { Icon, Menu } from 'antd';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const SelectLang = props => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }) => setLocale(key);

  const locales = ['en-US', 'es-ES'];
  const languageLabels = {
    'en-US': 'English',
    'es-ES': 'Español',
  };
  const languageIcons = {
    'zh-CN': '🇨🇳',
    'zh-TW': '🇭🇰',
    'en-US': '🇺🇸',
    'pt-BR': '🇧🇷',
    'es-ES': '🇲🇽',
  };
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon
          type="global"
          title={formatMessage({
            id: 'navBar.lang',
          })}
        />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
