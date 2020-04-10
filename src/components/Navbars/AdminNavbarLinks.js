import React from "react";

import LanguageToggle from '../LanguageToggle/LanguageToggle';

import {withLocalize} from "react-localize-redux";

function AdminNavbarLinks(props) {

  return (
    <div>
      <LanguageToggle {...props} />
    </div>
  );
}

export default withLocalize(AdminNavbarLinks);
