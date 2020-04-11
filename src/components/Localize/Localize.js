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

    if (prevProps !== null && prevProps !== undefined && prevProps.activeLanguage !== null &&
      prevProps.activeLanguage !== undefined && props.activeLanguage !== null && props.activeLanguage !== undefined)
      hasActiveLanguageChanged = prevProps.activeLanguage.code !== props.activeLanguage.code

    if (hasActiveLanguageChanged) {
      addTranslationsForActiveLanguage()
    }
  }, [props.activeLanguage])

  return (
     null
  )
}

export default withLocalize(Localize);