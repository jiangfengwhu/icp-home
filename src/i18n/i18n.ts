import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhCN from "./locales/zh-CN";
import enUS from "./locales/en-US";

// 创建资源对象
const resources = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

// 获取系统语言
const getSystemLanguage = () => {
  const browserLang = navigator.language;
  // 支持简体中文和英文，如果系统是中文则使用中文，否则默认使用英文
  return browserLang.startsWith("zh") ? "zh-CN" : "en-US";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSystemLanguage(), // 使用系统语言
  fallbackLng: "en-US", // 回退语言
  interpolation: {
    escapeValue: false, // 不转义特殊字符
  },
  detection: {
    order: ["localStorage", "navigator"],
  },
});

export default i18n;
