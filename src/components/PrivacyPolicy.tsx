import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Page = styled(motion.div)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
  padding-top: 120px;
  padding-bottom: 60px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const Dates = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Content = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ffffff;
  max-width: 900px;
  width: 100%;
  margin: 1rem auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 2.5rem;
  text-align: left;

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #ffffff;
    font-weight: 600;
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  p {
    margin-bottom: 1.5rem;
  }

  .app-id {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-family: monospace;
    margin: 0.5rem 0;
  }
`;

const PrivacyPolicy = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <Container>
      <Page
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>{t(`${id}.privacyPolicy.title`)}</Title>
        <Dates>
          <span>{t(`${id}.privacyPolicy.updateDate`)}</span>
          <span>{t(`${id}.privacyPolicy.effectiveDate`)}</span>
        </Dates>
        <Content>
          <p className="app-id">App ID: {t(`${id}.name`)}</p>
          <p>{t(`${id}.privacyPolicy.intro`)}</p>
          <p>{t(`${id}.privacyPolicy.consent`)}</p>
          <p>{t(`${id}.privacyPolicy.contact`)}</p>

          <h2>{t(`${id}.privacyPolicy.section1`)}</h2>
          <p>{t(`${id}.privacyPolicy.section1Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section2`)}</h2>
          <h3>{t(`${id}.privacyPolicy.section2_1`)}</h3>
          <p>{t(`${id}.privacyPolicy.section2_1Content`)}</p>

          <h3>{t(`${id}.privacyPolicy.section2_2`)}</h3>
          <p>{t(`${id}.privacyPolicy.section2_2Content`)}</p>

          <h3>{t(`${id}.privacyPolicy.section2_3`)}</h3>
          <p>{t(`${id}.privacyPolicy.section2_3Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section3`)}</h2>
          <p>{t(`${id}.privacyPolicy.section3Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section4`)}</h2>
          <p>{t(`${id}.privacyPolicy.section4Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section5`)}</h2>
          <p>{t(`${id}.privacyPolicy.section5Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section6`)}</h2>
          <p>{t(`${id}.privacyPolicy.section6Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section7`)}</h2>
          <p>{t(`${id}.privacyPolicy.section7Content`)}</p>

          <h2>{t(`${id}.privacyPolicy.section8`)}</h2>
          <p>{t(`${id}.privacyPolicy.section8Content`)}</p>
        </Content>
      </Page>
    </Container>
  );
};

export default PrivacyPolicy;
