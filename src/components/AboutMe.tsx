import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/avatar.jpeg";

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

const Text = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  padding: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    text-decoration: none;

    & > div {
      background: rgba(255, 255, 255, 0.25);
    }
  }
`;

const AboutCardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const AboutCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const AvatarCard = styled(AboutCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Avatar = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 1.8rem;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarName = styled.h2`
  font-size: 2rem;
  color: #ffffff;
  margin: 0.5rem 0;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AvatarTitle = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  margin: 0;
  font-weight: 500;
`;

const AboutInfoCard = styled(AboutCard)`
  flex: 2;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const SocialCard = styled(AboutCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <Page
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <Title>{t("contactUs")}</Title>
      <AboutCardsContainer>
        <AvatarCard>
          <Avatar>
            <img src={avatar} alt="个人头像" />
          </Avatar>
          <AvatarTitle>{t("about.jobTitle")}</AvatarTitle>
        </AvatarCard>

        <AboutInfoCard>
          <Text style={{ textAlign: "left", marginBottom: "1rem" }}>
            {t("about.intro")}
          </Text>

          <Text style={{ textAlign: "left", marginBottom: "1rem" }}>
            {t("about.skills")}
          </Text>

          <Text style={{ textAlign: "left" }}>{t("about.philosophy")}</Text>
        </AboutInfoCard>

        <SocialCard>
          <SocialLinks>
            <SocialLink
              href="https://github.com/jiangfengwhu"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>GitHub图标</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </SocialIcon>
              <span>{t("social.github")}</span>
            </SocialLink>

            <SocialLink
              href="https://x.com/jiangfengwhu202"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Twitter图标</title>
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </SocialIcon>
              <span>{t("social.twitter")}</span>
            </SocialLink>

            <SocialLink
              href="mailto:yangy0324@hotmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>邮件图标</title>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </SocialIcon>
              <span>{t("social.email")}</span>
            </SocialLink>
          </SocialLinks>
        </SocialCard>
      </AboutCardsContainer>
    </Page>
  );
};

export default AboutMe;
