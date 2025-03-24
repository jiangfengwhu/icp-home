import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useState } from 'react';
import './App.css';

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

const Page = styled(motion.div)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  padding-top: 120px; // 为顶部指示器留出空间
  padding-bottom: 60px; // 为底部备案信息留出空间
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const Text = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const AppGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1300px;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
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
  align-self: flex-start;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
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

// 添加时间线样式组件
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
`;

// 修改 TimelineItem 样式，添加 section 名称
const TimelineItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 20px;
  background: ${(props) => (props.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent')};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TimelineDot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.3)')};
  box-shadow: ${(props) => (props.active ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none')};
`;

const TimelineLabel = styled.span<{ active: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};
`;

// 添加导航按钮
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  color: white;
  font-size: 24px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavButton)`
  left: -25px;
`;

const NextButton = styled(NavButton)`
  right: -25px;
`;

// 添加分页指示器
const PaginationIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
`;

const PageIndicator = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.3)')};
  transition: all 0.3s ease;
`;

interface AppInfo {
  id: string;
  name: string;
  description: string;
  platform: 'iOS' | 'Android' | 'Both';
  storeUrl: string;
  icon: string; // 图标URL或图标SVG ID
}

const apps: AppInfo[] = [
  {
    id: 'app1',
    name: '智能助手',
    description:
      '一款基于 AI 的个人助手应用，可以帮助用户管理日程、回答问题、提供建议等。',
    platform: 'Both',
    storeUrl: 'https://example.com/app1',
    icon: 'assistant',
  },
  {
    id: 'app2',
    name: '健康追踪',
    description:
      '专业的健康数据追踪应用，支持运动记录、饮食管理、睡眠分析等功能。',
    platform: 'iOS',
    storeUrl: 'https://example.com/app2',
    icon: 'health',
  },
  {
    id: 'app3',
    name: '学习助手',
    description:
      '针对学生的智能学习工具，提供笔记管理、复习计划、知识点总结等功能。',
    platform: 'Android',
    storeUrl: 'https://example.com/app3',
    icon: 'study',
  },
  {
    id: 'app4',
    name: '财务管理',
    description:
      '个人财务管理工具，帮助用户追踪收支、制定预算、分析消费习惯，实现理财目标。',
    platform: 'Both',
    storeUrl: 'https://example.com/app4',
    icon: 'finance',
  },
  {
    id: 'app5',
    name: '旅行规划',
    description:
      '全方位旅行助手，提供目的地推荐、行程规划、住宿预订、当地美食探索等功能。',
    platform: 'iOS',
    storeUrl: 'https://example.com/app5',
    icon: 'travel',
  },
  {
    id: 'app6',
    name: '阅读笔记',
    description:
      '智能阅读工具，支持电子书管理、笔记整理、重点标记、阅读进度追踪等功能。',
    platform: 'Android',
    storeUrl: 'https://example.com/app6',
    icon: 'reading',
  },
  {
    id: 'app7',
    name: '音乐创作',
    description:
      '专业音乐创作平台，提供乐器模拟、编曲工具、音效库、录音分享等功能。',
    platform: 'Both',
    storeUrl: 'https://example.com/app7',
    icon: 'music',
  },
  {
    id: 'app8',
    name: '冥想放松',
    description:
      '心理健康应用，包含引导冥想、呼吸训练、睡眠故事、放松音乐等功能。',
    platform: 'iOS',
    storeUrl: 'https://example.com/app8',
    icon: 'meditation',
  },
  {
    id: 'app9',
    name: '社区交流',
    description:
      '兴趣社区平台，用户可以发现志同道合的朋友，分享经验，参与线上线下活动。',
    platform: 'Android',
    storeUrl: 'https://example.com/app9',
    icon: 'community',
  },
  {
    id: 'app10',
    name: '便捷翻译',
    description:
      '多语言翻译工具，支持文本、语音和图像翻译，离线使用，适合旅行和学习场景。',
    platform: 'Both',
    storeUrl: 'https://example.com/app10',
    icon: 'translate',
  },
];

// 获取应用图标的函数
const getAppIcon = (iconName: string) => {
  // 这里可以根据iconName返回不同的SVG图标
  const icons: { [key: string]: JSX.Element } = {
    assistant: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>智能助手图标</title>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    health: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>健康追踪图标</title>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    study: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>学习助手图标</title>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    finance: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>财务管理图标</title>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    travel: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>旅行规划图标</title>
        <path d="M3 17h18M3 7h18M7 17v-6M7 7v2M11 17v-4M11 7v4M15 17v-6M15 7v2M19 17v-2M19 7v8" />
      </svg>
    ),
    reading: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>阅读笔记图标</title>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    music: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>音乐创作图标</title>
        <circle cx="5.5" cy="17.5" r="2.5" />
        <circle cx="18.5" cy="15.5" r="2.5" />
        <path d="M5.5 17.5V6" />
        <path d="M18.5 15.5V4" />
        <line x1="5.5" y1="6" x2="18.5" y2="4" />
      </svg>
    ),
    meditation: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>冥想放松图标</title>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
    community: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>社区交流图标</title>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    translate: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>便捷翻译图标</title>
        <path d="M5 8l6 6" />
        <path d="M4 14l6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="M22 22l-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
    ),
  };

  return (
    icons[iconName] || (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>应用图标</title>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    )
  );
};

// 应用展示组件
const AppShowcase = () => {
  return (
    <AppSlider>
      <AppGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {apps.map((app) => (
          <AppItem
            key={app.id}
            onClick={() => window.open(app.storeUrl, '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AppIcon>{getAppIcon(app.icon)}</AppIcon>
            <AppName>{app.name}</AppName>
            <AppDescription>{app.description}</AppDescription>
            <AppPlatform>
              {app.platform === 'Both' ? 'iOS & Android' : app.platform}
            </AppPlatform>
          </AppItem>
        ))}
      </AppGrid>
    </AppSlider>
  );
};

// 添加社交媒体链接样式
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
  
  @media (max-width: 768px) {
    flex-direction: column;
  },
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
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
`;

const SocialCard = styled(AboutCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 关于我组件
const AboutMe = () => {
  return (
    <AboutCardsContainer>
      <AvatarCard>
        <Avatar>
          <img src="/avatar-placeholder.jpg" alt="个人头像" />
        </Avatar>
        <AvatarName>你的名字</AvatarName>
        <AvatarTitle>前端开发工程师</AvatarTitle>
      </AvatarCard>

      <AboutInfoCard>
        <Text style={{ textAlign: 'left', marginBottom: '1rem' }}>
          我是一名充满热情的前端开发者，曾就职于小米、快手等知名企业。专注于创建优雅且高效的用户界面，打造流畅的用户体验。
        </Text>

        <Text style={{ textAlign: 'left', marginBottom: '1rem' }}>
          技术栈：React、React
          Native、Swift、Golang/Gin、TypeScript、Node.js等。
        </Text>

        <Text style={{ textAlign: 'left' }}>
          我的职业理念是用技术解决实际问题，创造真正有价值的产品。无论是Web应用、移动端还是跨平台开发，我都致力于打造用户体验出色、性能优异的应用。
        </Text>
      </AboutInfoCard>

      <SocialCard>
        <SocialLinks>
          <SocialLink
            href="https://github.com/yourusername"
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
            <span>GitHub</span>
          </SocialLink>

          <SocialLink
            href="https://twitter.com/yourusername"
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
            <span>Twitter</span>
          </SocialLink>

          <SocialLink
            href="https://linkedin.com/in/yourusername"
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
                <title>LinkedIn图标</title>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialIcon>
            <span>LinkedIn</span>
          </SocialLink>
        </SocialLinks>
      </SocialCard>
    </AboutCardsContainer>
  );
};

const pages = [
  {
    id: 'apps',
    title: '应用',
    content: <AppShowcase />,
  },
  {
    id: 'about',
    title: '关于我',
    content: <AboutMe />,
  },
];

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
`;

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Container>
      <FloatingShape
        style={{
          top: '10%',
          left: '10%',
        }}
        animate={{
          y: [0, 100, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
      <FloatingShape
        style={{
          top: '60%',
          right: '10%',
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />

      <AnimatePresence mode="wait">
        <Page
          key={currentPage}
          data-page
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Title>{pages[currentPage].title}</Title>
          {typeof pages[currentPage].content === 'string' ? (
            <Text className="glass-card">{pages[currentPage].content}</Text>
          ) : (
            pages[currentPage].content
          )}
        </Page>
      </AnimatePresence>

      <Timeline>
        {pages.map((page, index) => (
          <TimelineItem
            key={page.id}
            active={currentPage === index}
            onClick={() => setCurrentPage(index)}
          >
            <TimelineDot active={currentPage === index} />
            <TimelineLabel active={currentPage === index}>
              {page.title}
            </TimelineLabel>
          </TimelineItem>
        ))}
      </Timeline>

      <Footer>© 2023 版权所有 | 粤ICP备XXXXXXXX号</Footer>
    </Container>
  );
};

export default App;
