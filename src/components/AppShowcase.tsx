import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { apps } from "../AppInfos";
import { Link } from "react-router-dom";

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Page = styled(motion.div)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
  padding-top: 120px; // 为顶部指示器留出空间
  padding-bottom: 60px; // 为底部备案信息留出空间
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const AppGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 移动端单列显示
    padding: 0.5rem;
    gap: 1.5rem;
  }
`;

const AppSlider = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
`;

const AppItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 1.8rem 1.5rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const AppIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 40px;
    height: 40px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const AppName = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AppDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const AppPlatform = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const PrivacyLink = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const PlatformContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const AppShowcase = () => {
  const { t } = useTranslation();

  const localizedApps = apps.map((app) => ({
    ...app,
    name: t(app.nameKey),
    description: t(app.descriptionKey),
  }));

  return (
    <Page
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <Title>{t("apps")}</Title>
      <AppSlider>
        <AppGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {localizedApps.map((app) => (
            <AppItem
              key={app.id}
              onClick={() => window.open(app.storeUrl, "_blank")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AppIcon>
                {app.icon ? <img src={app.icon} alt={app.name} /> : null}
              </AppIcon>
              <AppName>{app.name}</AppName>
              <AppDescription>{app.description}</AppDescription>
              <PlatformContainer>
                <AppPlatform>
                  {app.platform === "Both"
                    ? t("appInfo.platform.both")
                    : app.platform}
                </AppPlatform>
                <PrivacyLink
                  to={`/${app.id}/privacy_policy`}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>隐私政策图标</title>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  {t("privacyPolicy")}
                </PrivacyLink>
              </PlatformContainer>
            </AppItem>
          ))}
        </AppGrid>
      </AppSlider>
    </Page>
  );
};

export default AppShowcase;
