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
`;

const Page = styled(motion.div)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  padding-top: 100px; // 为顶部指示器留出空间
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
  margin-bottom: 2rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem; // 添加底部间距
`;

const AppSlider = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
`;

const AppItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`;

const AppName = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const AppDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const AppPlatform = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
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
  gap: 12px;
  z-index: 100; // 提高层级确保始终显示在顶部
  background: rgba(0, 0, 0, 0.2); // 添加半透明背景
  padding: 10px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

// 修改 TimelineItem 样式，添加 section 名称
const TimelineItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TimelineDot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.3)')};
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
}

const apps: AppInfo[] = [
  {
    id: 'app1',
    name: '智能助手',
    description:
      '一款基于 AI 的个人助手应用，可以帮助用户管理日程、回答问题、提供建议等。',
    platform: 'Both',
    storeUrl: 'https://example.com/app1',
  },
  {
    id: 'app2',
    name: '健康追踪',
    description:
      '专业的健康数据追踪应用，支持运动记录、饮食管理、睡眠分析等功能。',
    platform: 'iOS',
    storeUrl: 'https://example.com/app2',
  },
  {
    id: 'app3',
    name: '学习助手',
    description:
      '针对学生的智能学习工具，提供笔记管理、复习计划、知识点总结等功能。',
    platform: 'Android',
    storeUrl: 'https://example.com/app3',
  },
  {
    id: 'app4',
    name: '财务管理',
    description:
      '个人财务管理工具，帮助用户追踪收支、制定预算、分析消费习惯，实现理财目标。',
    platform: 'Both',
    storeUrl: 'https://example.com/app4',
  },
  {
    id: 'app5',
    name: '旅行规划',
    description:
      '全方位旅行助手，提供目的地推荐、行程规划、住宿预订、当地美食探索等功能。',
    platform: 'iOS',
    storeUrl: 'https://example.com/app5',
  },
  {
    id: 'app6',
    name: '阅读笔记',
    description:
      '智能阅读工具，支持电子书管理、笔记整理、重点标记、阅读进度追踪等功能。',
    platform: 'Android',
    storeUrl: 'https://example.com/app6',
  },
  {
    id: 'app7',
    name: '音乐创作',
    description:
      '专业音乐创作平台，提供乐器模拟、编曲工具、音效库、录音分享等功能。',
    platform: 'Both',
    storeUrl: 'https://example.com/app7',
  },
  {
    id: 'app8',
    name: '冥想放松',
    description:
      '心理健康应用，包含引导冥想、呼吸训练、睡眠故事、放松音乐等功能。',
    platform: 'iOS',
    storeUrl: 'https://example.com/app8',
  },
  {
    id: 'app9',
    name: '社区交流',
    description:
      '兴趣社区平台，用户可以发现志同道合的朋友，分享经验，参与线上线下活动。',
    platform: 'Android',
    storeUrl: 'https://example.com/app9',
  },
  {
    id: 'app10',
    name: '便捷翻译',
    description:
      '多语言翻译工具，支持文本、语音和图像翻译，离线使用，适合旅行和学习场景。',
    platform: 'Both',
    storeUrl: 'https://example.com/app10',
  },
];

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
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

// 关于我组件
const AboutMe = () => {
  return (
    <div className="glass-card" style={{ maxWidth: '800px', padding: '2rem' }}>
      <Text>
        我是一名充满热情的全栈开发者，专注于创建优雅且高效的解决方案。在过去的几年里，我参与了多个重要项目的开发，积累了丰富的实践经验。
      </Text>

      <Text>
        技术栈：React、TypeScript、Node.js、Python、Flutter、SwiftUI
        等。热爱尝试新技术，不断探索前沿开发方向。
      </Text>

      <Text>
        我的职业理念是用技术解决实际问题，创造真正有价值的产品。无论是Web应用、移动端还是跨平台开发，我都致力于打造用户体验出色、性能优异的应用。
      </Text>

      <SocialLinks>
        <SocialLink
          href="https://github.com/yourusername"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>GitHub</span>
        </SocialLink>

        <SocialLink
          href="https://twitter.com/yourusername"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Twitter</span>
        </SocialLink>

        <SocialLink
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>LinkedIn</span>
        </SocialLink>
      </SocialLinks>
    </div>
  );
};

const pages = [
  {
    id: 'apps',
    title: '已上架应用',
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
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  z-index: 10;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
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
