// import React from 'react';
// import {  injectIntl } from 'react-intl';

// export default injectGetMessage = (fn: any) =>
//   React.createElement(injectIntl(({ intl }) => fn(intl.formatMessage)));

function intl() {
  return CurrentLocale.instance.props.intl;
}
