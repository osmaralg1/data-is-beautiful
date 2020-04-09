import React from "react";

import LanguageToggle from '../LanguageToggle/LanguageToggle';

import {withLocalize} from "react-localize-redux";

function AdminNavbarLinks() {

  return (
    <div>
      <LanguageToggle/>
    </div>
  );
}

export default withLocalize(AdminNavbarLinks);
