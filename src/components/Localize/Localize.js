import {useEffect}  from "react";
import {withLocalize } from "react-localize-redux";

import {usePrevious} from "utils/misc";



function Localize(props) {
  const addTranslationsForActiveLanguage = () => {
    const {activeLanguage} = props

    if (!activeLanguage) {
      return
    }

    if (props.getTranslations === null || props.getTranslations === undefined) {
        return
    }
    
    props.getTranslations(activeLanguage.code)
      .then(translations => {
        if (props.extendTranslation !== null && props.extendTranslation !== undefined ) {
            props.extendTranslation(translations)
        }
        props.addTranslationForLanguage(translations, activeLanguage.code)
      })
  }


  addTranslationsForActiveLanguage()

  const prevProps = usePrevious(props)
  
  useEffect(() => {
    let hasActiveLanguageChanged = true
    if (prevProps !== null && prevProps !== undefined)
      hasActiveLanguageChanged = prevProps.activeLanguage !== props.activeLanguage

    if (hasActiveLanguageChanged) {
      addTranslationsForActiveLanguage()
    }
  })

  return (
     null
  )
}

export default withLocalize(Localize);