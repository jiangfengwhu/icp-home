import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(5px);
  z-index: 0;
`;

// 修改 Timeline 样式组件，增加宽度
const Timeline = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: 15px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.25);
  padding: 12px 24px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 90%;
  width: auto;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 10px 16px;
    gap: 20px;
    width: 85%;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    gap: 18px;
    width: 90%;
    top: 15px;
  }
`;

// 修改 TimelineItem 样式，增加最小宽度
const TimelineItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 12px;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.15)" : "transparent"};
  min-width: 60px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 480px) {
    min-width: auto;
    padding: 5px 8px;
  }
`;

const TimelineDot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "#ffffff" : "rgba(255, 255, 255, 0.3)"};
  box-shadow: ${(props) =>
    props.active ? "0 0 10px rgba(255, 255, 255, 0.5)" : "none"};
`;

// 修改 TimelineLabel 样式
const TimelineLabel = styled.span<{ active: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => (props.active ? "#ffffff" : "rgba(255, 255, 255, 0.6)")};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

// 添加悬浮菜单样式
const LanguageMenu = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  gap: 8px;
  z-index: 200;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 100px;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: rgba(0, 0, 0, 0.8);
    transform: translateX(-50%) rotate(45deg);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const LanguageMenuItem = styled.button<{ active: boolean }>`
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

// 添加备案信息组件
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  z-index: 10;
  padding: 15px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.7rem;
  }
`;

// 添加页面接口类型定义
interface PageInfo {
  id: string;
  path: string;
  title: string;
  isLanguageSwitcher?: boolean;
}

// 布局组件 - 包含导航栏和页脚
const Layout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

  // 切换语言
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setLanguageMenuVisible(false);
  };

  // 切换语言菜单显示状态
  const toggleLanguageMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageMenuVisible(!languageMenuVisible);
  };

  // 点击外部关闭语言菜单
  useEffect(() => {
    const handleClickOutside = () => {
      if (languageMenuVisible) {
        setLanguageMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [languageMenuVisible]);

  // 页面路由配置
  const pages: PageInfo[] = [
    {
      id: "apps",
      path: "/",
      title: t("apps"),
    },
    {
      id: "about",
      path: "/about",
      title: t("contactUs"),
    },
    {
      id: "language",
      path: "#",
      title: currentLang === "zh-CN" ? "中文" : "English",
      isLanguageSwitcher: true, // 标记这是语言切换项
    },
  ];

  // 获取当前页面索引
  const getCurrentPageIndex = () => {
    const path = location.pathname;
    const index = pages.findIndex((page) => page.path === path);
    return index >= 0 ? index : 0;
  };

  const currentPageIndex = getCurrentPageIndex();

  return (
    <Container>
      <FloatingShape
        style={{
          top: "10%",
          left: "10%",
        }}
        animate={{
          y: [0, 100, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <FloatingShape
        style={{
          top: "60%",
          right: "10%",
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 头部导航 */}
      <Timeline>
        {pages.map((page, index) =>
          page.isLanguageSwitcher ? (
            <TimelineItem
              key={page.id}
              active={currentPageIndex === index}
              onClick={(e) => {
                e.stopPropagation();
                toggleLanguageMenu(e);
              }}
              style={{ position: "relative" }}
            >
              <TimelineDot active={currentPageIndex === index} />
              <TimelineLabel active={currentPageIndex === index}>
                {page.title}
              </TimelineLabel>

              <LanguageMenu
                visible={languageMenuVisible}
                onClick={(e) => e.stopPropagation()}
              >
                <LanguageMenuItem
                  active={currentLang === "zh-CN"}
                  onClick={() => changeLanguage("zh-CN")}
                >
                  中文
                </LanguageMenuItem>
                <LanguageMenuItem
                  active={currentLang === "en-US"}
                  onClick={() => changeLanguage("en-US")}
                >
                  English
                </LanguageMenuItem>
              </LanguageMenu>
            </TimelineItem>
          ) : (
            <TimelineItem
              key={page.id}
              active={currentPageIndex === index}
              onClick={() => navigate(page.path)}
            >
              <TimelineDot active={currentPageIndex === index} />
              <TimelineLabel active={currentPageIndex === index}>
                {page.title}
              </TimelineLabel>
            </TimelineItem>
          )
        )}
      </Timeline>

      {/* 页面内容 */}
      <Outlet />

      {/* 页脚 */}
      <Footer>{t("footer")}</Footer>
    </Container>
  );
};

// 将App作为默认导出，但它现在是一个布局组件
export default Layout;
