// DOM Elements - Will be initialized on DOMContentLoaded
let sidebar, navLinks, sections, progressFill, themeToggle, themeIcon, searchInput, searchClear, searchNavigation, searchCounter, searchPrev, searchNext;
let tipModal, tipModalTitle, tipModalText, tipModalClose, tipModalOverlay;
let exampleModal, exampleModalTitle, exampleModalClose, exampleModalOverlay;
let mobileMenuToggle, mobileOverlay;
let modalTabs, tabPanels, traditionalPanel, contextPanel, traditionalContent, contextContent, implementationInfo;

// Prompt Builder Elements
let promptRole, promptPurpose, promptFormat, promptContext, generatePromptBtn, clearBuilderBtn;
let builderOutput, generatedPromptElement, copyPromptBtn, launchChatGPTBtn, launchClaudeBtn;

// State Management
let currentTheme = 'light';
let searchTerm = '';
let searchResults = [];
let currentSearchIndex = -1;
let isMobileMenuOpen = false;
let isInitialized = false;

// Enhanced Quick Tips Data with Context Engineering
const quickTipsData = [
    {
        title: "🏗️ 컨텍스트부터 시작하기",
        detail: "컨텍스트 엔지니어링은 명령이 아닌 정보 환경을 먼저 설계하는 것에서 시작합니다. '보고서를 작성해줘'라고 요청하기 전에, '어떤 데이터 소스, 형식 요구사항, 대상 독자 고려사항, 비즈니스 맥락이 이 보고서에 필요한가?'를 먼저 고려하세요.<br><br><strong>실제 적용 예시:</strong><br>❌ 기존: \"매출 보고서 작성해줘\"<br>✅ 컨텍스트 엔지니어링: \"Q3 매출 보고서를 작성해줘. 데이터 소스는 CRM과 ERP, 대상 독자는 임원진, 전년 동기 대비 분석 포함, 시각화 차트 3개 이상, A4 2페이지 분량으로.\""
    },
    {
        title: "🔄 동적 컨텍스트 업데이트",
        detail: "현대적인 AI 시스템은 사용자 상호작용과 실시간 데이터에 따라 컨텍스트를 진화시켜야 합니다. 정적인 프롬프트가 아닌, 변화하는 상황에 맞춰 적응하는 시스템을 구축하세요.<br><br><strong>구현 방법:</strong><br>• 사용자 행동 패턴 학습<br>• 외부 데이터 변화 감지<br>• 비즈니스 요구사항 진화 반영<br>• 실시간 피드백 루프 구축<br><br><strong>예시:</strong> 고객 서비스 AI가 고객의 감정 변화, 구매 이력, 현재 프로모션에 따라 실시간으로 응답 톤과 제안을 조정"
    },
    {
        title: "📚 다층 데이터 소스 통합",
        detail: "단일 데이터 소스에 의존하지 말고, 여러 유형의 데이터를 통합하여 풍부한 정보 환경을 조성하세요.<br><br><strong>데이터 유형별 활용:</strong><br>📊 <strong>구조화 데이터:</strong> 데이터베이스, 스프레드시트<br>📄 <strong>비구조화 데이터:</strong> 문서, 이메일, 리뷰<br>🔄 <strong>실시간 데이터:</strong> API, 스트리밍 데이터<br>👤 <strong>행동 데이터:</strong> 사용자 로그, 클릭스트림<br>📈 <strong>외부 데이터:</strong> 시장 동향, 뉴스, 소셜 미디어<br><br>이러한 다층 접근법으로 AI가 보다 정확하고 맥락에 맞는 인사이트를 생성할 수 있습니다."
    },
    {
        title: "🎯 명확한 역할 정의",
        detail: "AI에게 구체적이고 전문적인 역할을 부여하면 답변의 품질이 크게 향상됩니다. 단순한 '도우미'가 아닌 '전문가 페르소나'를 제공하세요.<br><br><strong>효과적인 역할 정의 요소:</strong><br>• 전문 분야와 경험 년수<br>• 구체적인 업무 범위<br>• 사고 방식과 접근법<br>• 커뮤니케이션 스타일<br><br><strong>예시:</strong><br>❌ \"마케팅 도움을 줘\"<br>✅ \"당신은 B2B SaaS 마케팅 전문가로 10년간 스타트업에서 시리즈 A 조달까지 경험한 CMO입니다. 데이터 기반 의사결정을 선호하고, 실용적이면서도 창의적인 솔루션을 제시하는 스타일입니다.\""
    },
    {
        title: "📝 구체적인 예시 제공",
        detail: "추상적인 설명보다는 구체적인 예시를 3-5개 제공하여 AI가 패턴을 학습하도록 하세요. Few-shot learning의 핵심은 다양성과 품질입니다.<br><br><strong>효과적인 예시 구성:</strong><br>• 다양한 시나리오 커버<br>• 명확한 입력-출력 관계<br>• 일관된 형식과 품질<br>• 엣지 케이스 포함<br><br><strong>실제 적용:</strong><br>고객 피드백 분류 시 긍정/부정/중립 각각 2-3개씩, 다양한 길이와 표현의 예시를 제공하면 AI가 미묘한 감정 뉘앙스까지 파악할 수 있습니다."
    },
    {
        title: "🏷️ XML 태그 구조화",
        detail: "복잡한 프롬프트는 XML 태그를 사용하여 각 부분의 역할을 명확히 구분하세요. 이는 특히 긴 프롬프트나 여러 종류의 정보가 포함된 경우 필수입니다.<br><br><strong>주요 태그 활용:</strong><br>• &lt;instructions&gt;: 수행할 작업<br>• &lt;context&gt;: 배경 정보<br>• &lt;examples&gt;: 참고 예시<br>• &lt;constraints&gt;: 제약 사항<br>• &lt;output_format&gt;: 출력 형식<br><br><strong>장점:</strong><br>✓ AI의 이해도 향상<br>✓ 일관된 출력 보장<br>✓ 디버깅 용이<br>✓ 재사용성 증대"
    }
];

// Enhanced Example Data with Traditional vs Context Engineering approaches
const exampleData = {
    'business-1': {
        title: '고객 서비스 AI 에이전트',
        traditional: '프롬프트: "고객의 배송 문의에 답변하세요"\n\n한계:\n- 실시간 주문 정보 없음\n- 개별 고객 히스토리 미반영\n- 정적인 일반적 답변만 가능\n- 복잡한 문제 해결 불가',
        contextEngineering: '통합 시스템:\n- 주문 데이터베이스 실시간 연결\n- 배송 추적 API 통합\n- 고객 구매/문의 히스토리 접근\n- 고객 등급별 맞춤 응답\n- 배송 업체 상황 실시간 반영\n- 에스컬레이션 룰 자동 적용',
        implementation: 'RAG + Function Calling + 실시간 데이터 통합',
        category: '비즈니스 & 마케팅'
    },
    'business-2': {
        title: '판매 리드 분석',
        traditional: '기본 리드 스코링:\n"이 리드의 구매 가능성을 평가하세요"\n\n제한사항:\n- 단순 인구통계학적 정보만 활용\n- 시장 동향 미반영\n- 경쟁사 활동 고려 없음',
        contextEngineering: '포괄적 리드 인텔리전스:\n- CRM 데이터 + 웹 행동 분석\n- 시장 인텔리전스 플랫폼 연동\n- 소셜 미디어 활동 분석\n- 경쟁사 가격/제품 비교\n- 업계 뉴스 및 트렌드 반영\n- 예측 분석 모델 적용',
        implementation: '벡터 DB + 외부 API + 동적 컨텍스트 구성',
        category: '비즈니스 & 마케팅'
    },
    'business-3': {
        title: '마케팅 캠페인 최적화',
        traditional: '기본 캠페인 기획:\n"소셜 미디어 마케팅 전략을 수립하세요"\n\n한계:\n- 일반적인 모범 사례만 제시\n- 타겟 오디언스 분석 부족\n- 성과 예측 불가',
        contextEngineering: '데이터 기반 캠페인 설계:\n- 고객 세그먼트별 행동 분석\n- 채널별 성과 히스토리 반영\n- 경쟁사 캠페인 모니터링\n- A/B 테스트 결과 학습\n- 실시간 성과 조정\n- 개인화 메시지 생성',
        implementation: '다채널 데이터 통합 + 예측 분석',
        category: '비즈니스 & 마케팅'
    },
    'business-4': {
        title: '고객 세분화 분석',
        traditional: '정적 세분화:\n"고객을 연령대별로 분류하세요"\n\n한계:\n- 단순 인구통계학적 기준\n- 행동 패턴 미반영\n- 동적 변화 추적 불가',
        contextEngineering: '동적 고객 세그먼테이션:\n- 구매 행동 패턴 분석\n- 라이프사이클 단계 추적\n- 채널 선호도 분석\n- 실시간 관심사 변화 감지\n- 예측적 세그먼트 이동\n- 개인화 마케팅 자동화',
        implementation: '머신러닝 + 실시간 행동 분석',
        category: '비즈니스 & 마케팅'
    },
    'business-5': {
        title: '경쟁사 모니터링',
        traditional: '수동 분석:\n"주요 경쟁사를 분석하세요"\n\n제한:\n- 정적인 일회성 분석\n- 수동 데이터 수집\n- 실시간 변화 추적 불가',
        contextEngineering: '자동화 모니터링 시스템:\n- 웹 스크래핑으로 가격/제품 추적\n- 소셜 미디어 멘션 모니터링\n- 뉴스 및 보도자료 분석\n- 특허/기술 동향 추적\n- 시장 점유율 변화 감지\n- 실시간 알림 및 인사이트',
        implementation: 'Function Calling + 웹 API + 스케줄링',
        category: '비즈니스 & 마케팅'
    },
    'dev-1': {
        title: '코드 리뷰 어시스턴트',
        traditional: '단순 코드 분석:\n"이 코드를 리뷰하세요"\n\n한계:\n- 프로젝트 컨텍스트 부족\n- 팀 코딩 스타일 미반영\n- 비즈니스 로직 이해 부족',
        contextEngineering: '컨텍스트 인식 리뷰:\n- 프로젝트 아키텍처 이해\n- 팀 코딩 표준 적용\n- 비즈니스 요구사항 연결\n- 성능 및 보안 가이드라인\n- 기존 코드베이스와 일관성\n- 테스트 커버리지 분석',
        implementation: '저장소 분석 + 표준 데이터베이스 + AST 파싱',
        category: '개발 & 기술'
    },
    'dev-2': {
        title: '자동 테스트 생성',
        traditional: '기본 테스트:\n"이 함수의 테스트를 작성하세요"\n\n한계:\n- 기본적인 케이스만 커버\n- 비즈니스 로직 미이해\n- 엣지 케이스 누락',
        contextEngineering: '지능형 테스트 생성:\n- 코드 흐름 분석\n- 비즈니스 요구사항 반영\n- 엣지 케이스 자동 식별\n- 모의 객체 생성\n- 성능 테스트 포함\n- 회귀 테스트 우선순위',
        implementation: '정적 분석 + 요구사항 추적 + 코드 커버리지',
        category: '개발 & 기술'
    },
    'dev-3': {
        title: '시스템 아키텍처 분석',
        traditional: '표면적 분석:\n"이 시스템을 분석하세요"\n\n제한:\n- 정적 구조만 파악\n- 성능 메트릭 부족\n- 확장성 고려 부족',
        contextEngineering: '종합적 아키텍처 평가:\n- 런타임 성능 분석\n- 병목지점 식별\n- 확장성 시뮬레이션\n- 보안 취약점 스캔\n- 비용 최적화 제안\n- 마이그레이션 전략',
        implementation: 'APM 도구 + 성능 프로파일링 + 클라우드 메트릭',
        category: '개발 & 기술'
    },
    'content-1': {
        title: '브랜드 맞춤형 콘텐츠 생성',
        traditional: '일반적 콘텐츠:\n"브랜드 소개 글을 작성하세요"\n\n한계:\n- 일반적이고 추상적\n- 브랜드 차별화 부족\n- 타겟 고객 미고려',
        contextEngineering: '브랜드 인텔리전스 콘텐츠:\n- 브랜드 가이드라인 준수\n- 타겟 페르소나 분석\n- 경쟁사 포지셔닝 고려\n- 브랜드 보이스 톤 적용\n- 채널별 최적화\n- 성과 예측 및 A/B 테스트',
        implementation: '브랜드 데이터베이스 + 고객 분석 + 톤 분석',
        category: '콘텐츠 & 창작'
    },
    'content-2': {
        title: 'SEO 최적화 글쓰기',
        traditional: '키워드 삽입:\n"SEO 글을 작성하세요"\n\n문제:\n- 키워드 무작정 삽입\n- 사용자 의도 미파악\n- 검색 트렌드 무시',
        contextEngineering: '검색 인텐트 기반 콘텐츠:\n- 키워드 리서치 통합\n- 사용자 검색 의도 분석\n- 경쟁사 콘텐츠 갭 분석\n- 시맨틱 키워드 활용\n- 구조화된 데이터 마크업\n- 성과 예측 및 최적화',
        implementation: 'SEO 도구 API + 검색 트렌드 + SERP 분석',
        category: '콘텐츠 & 창작'
    },
    'content-3': {
        title: '소셜미디어 콘텐츠 자동화',
        traditional: '일괄 포스팅:\n"SNS 콘텐츠를 만드세요"\n\n한계:\n- 플랫폼 특성 무시\n- 타이밍 최적화 부족\n- 트렌드 반영 부족',
        contextEngineering: '플랫폼 최적화 콘텐츠:\n- 플랫폼별 알고리즘 분석\n- 최적 포스팅 시간 계산\n- 트렌딩 해시태그 활용\n- 시각적 요소 최적화\n- 참여율 예측\n- 자동 스케줄링',
        implementation: '소셜 API + 트렌드 분석 + 참여율 예측',
        category: '콘텐츠 & 창작'
    }
};

// Prompt templates for the builder
const promptTemplates = {
    expert: {
        analyze: "전문가로서 제공된 {context}를 체계적으로 분석하고, {format} 형식으로 다음을 포함하여 결과를 제시해주세요:\n1. 주요 발견사항\n2. 근거와 데이터\n3. 시사점\n4. 권장사항",
        create: "해당 분야 전문가로서 {context}에 기반하여 창의적이고 실용적인 솔루션을 {format} 형식으로 제시해주세요. 업계 모범사례와 최신 동향을 반영하여 구체적인 실행 방안을 포함해주세요.",
        summarize: "전문가 관점에서 {context}의 핵심 내용을 {format} 형식으로 요약해주세요. 중요도에 따라 우선순위를 매기고, 실무진이 즉시 활용할 수 있는 액션 아이템을 포함해주세요.",
        translate: "해당 분야 전문가로서 {context}를 {format} 형식으로 번역/변환해주세요. 전문 용어는 정확히 번역하고, 맥락에 맞는 설명을 추가해주세요.",
        improve: "전문가로서 {context}를 분석하고 {format} 형식으로 개선방안을 제시해주세요. 현재 상태의 문제점, 개선 목표, 단계별 실행계획을 포함해주세요."
    },
    teacher: {
        analyze: "교육자로서 {context}를 학습자가 이해하기 쉽게 단계별로 분석하고, {format} 형식으로 설명해주세요. 복잡한 개념은 간단한 예시와 함께 설명해주세요.",
        create: "교육 전문가로서 {context}에 기반하여 학습 효과가 높은 교육 콘텐츠를 {format} 형식으로 만들어주세요. 학습 목표, 핵심 내용, 실습 과제를 포함해주세요.",
        summarize: "교육자 관점에서 {context}의 핵심 학습 내용을 {format} 형식으로 정리해주세요. 중요한 개념은 강조하고, 기억하기 쉬운 방법을 제안해주세요.",
        translate: "교육자로서 {context}를 학습자 수준에 맞게 {format} 형식으로 번역/설명해주세요. 어려운 용어는 쉬운 말로 풀어서 설명해주세요.",
        improve: "교육 전문가로서 {context}의 학습 효과를 높이는 개선방안을 {format} 형식으로 제시해주세요. 학습자 참여도와 이해도를 높이는 구체적인 방법을 포함해주세요."
    },
    analyst: {
        analyze: "데이터 분석가로서 {context}를 객관적으로 분석하고, {format} 형식으로 통계적 근거와 함께 인사이트를 제시해주세요. 데이터의 패턴, 트렌드, 이상치를 식별해주세요.",
        create: "분석가로서 {context}에 기반하여 데이터 기반의 전략이나 솔루션을 {format} 형식으로 개발해주세요. 정량적 근거와 예측 모델을 포함해주세요.",
        summarize: "데이터 분석가 관점에서 {context}의 핵심 지표와 인사이트를 {format} 형식으로 요약해주세요. 주요 수치와 그 의미를 명확히 제시해주세요.",
        translate: "분석가로서 {context}를 비전문가가 이해할 수 있도록 {format} 형식으로 해석해주세요. 복잡한 데이터를 시각적이고 직관적으로 설명해주세요.",
        improve: "데이터 분석가로서 {context}의 성과를 개선하기 위한 방안을 {format} 형식으로 제시해주세요. 측정 가능한 목표와 KPI를 포함한 실행 계획을 제안해주세요."
    },
    creator: {
        analyze: "크리에이티브 전문가로서 {context}를 창의적 관점에서 분석하고, {format} 형식으로 혁신적인 아이디어와 개선점을 제시해주세요.",
        create: "창작 전문가로서 {context}를 바탕으로 참신하고 매력적인 콘텐츠를 {format} 형식으로 창작해주세요. 창의성과 실용성을 모두 고려해주세요.",
        summarize: "크리에이터 관점에서 {context}의 핵심을 창의적이고 기억에 남는 방식으로 {format} 형식으로 요약해주세요. 스토리텔링 기법을 활용해주세요.",
        translate: "창작자로서 {context}를 대상 독자에게 맞는 톤과 스타일로 {format} 형식으로 재창조해주세요. 감정적 연결과 몰입감을 높여주세요.",
        improve: "크리에이티브 디렉터로서 {context}를 더 매력적이고 효과적으로 만드는 방안을 {format} 형식으로 제안해주세요. 사용자 경험과 감정적 임팩트를 고려해주세요."
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing AI Guide App...');
    
    try {
        initializeDOMElements();
        
        if (!validateRequiredElements()) {
            console.error('❌ Required DOM elements not found - App initialization failed');
            return;
        }
        
        // Initialize all components
        initializeTheme();
        initializeNavigation();
        initializeSearch();
        initializeScrollProgress();
        initializeModals();
        initializeTipCards();
        initializeExampleCards();
        initializeMobileMenu();
        initializePromptBuilder();
        initializeCopyButtons();
        initializeTouchSupport();
        
        // Set initial state
        setTimeout(() => {
            updateActiveSection();
            isInitialized = true;
            console.log('✅ AI Guide App initialized successfully');
        }, 100);
        
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        showNotification('앱 초기화 중 오류가 발생했습니다.', 'error');
    }
});

function initializeDOMElements() {
    console.log('🔍 Initializing DOM elements...');
    
    // Core elements
    sidebar = document.getElementById('sidebar');
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('.content-section, #hero');
    progressFill = document.getElementById('progressFill');
    
    // Theme elements
    themeToggle = document.getElementById('themeToggle');
    themeIcon = document.querySelector('.theme-icon');
    
    // Search elements
    searchInput = document.getElementById('searchInput');
    searchClear = document.getElementById('searchClear');
    searchNavigation = document.getElementById('searchNavigation');
    searchCounter = document.getElementById('searchCounter');
    searchPrev = document.getElementById('searchPrev');
    searchNext = document.getElementById('searchNext');
    
    // Mobile elements
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    mobileOverlay = document.getElementById('mobileOverlay');
    
    // Modal elements - Tips
    tipModal = document.getElementById('tipModal');
    tipModalTitle = document.getElementById('modalTitle');
    tipModalText = document.getElementById('modalText');
    tipModalClose = document.getElementById('modalClose');
    tipModalOverlay = document.getElementById('modalOverlay');
    
    // Modal elements - Examples
    exampleModal = document.getElementById('exampleModal');
    exampleModalTitle = document.getElementById('exampleModalTitle');
    exampleModalClose = document.getElementById('exampleModalClose');
    exampleModalOverlay = document.getElementById('exampleModalOverlay');
    
    // Tab elements
    modalTabs = document.querySelectorAll('.modal__tab');
    tabPanels = document.querySelectorAll('.tab-panel');
    traditionalPanel = document.getElementById('traditionalPanel');
    contextPanel = document.getElementById('contextPanel');
    traditionalContent = document.getElementById('traditionalContent');
    contextContent = document.getElementById('contextContent');
    implementationInfo = document.getElementById('implementationInfo');
    
    // Prompt Builder elements
    promptRole = document.getElementById('promptRole');
    promptPurpose = document.getElementById('promptPurpose');
    promptFormat = document.getElementById('promptFormat');
    promptContext = document.getElementById('promptContext');
    generatePromptBtn = document.getElementById('generatePrompt');
    clearBuilderBtn = document.getElementById('clearBuilder');
    builderOutput = document.getElementById('builderOutput');
    generatedPromptElement = document.getElementById('generatedPrompt');
    copyPromptBtn = document.getElementById('copyPrompt');
    launchChatGPTBtn = document.getElementById('launchChatGPT');
    launchClaudeBtn = document.getElementById('launchClaude');
    
    console.log('📊 DOM elements initialized:', {
        navLinks: navLinks.length,
        sections: sections.length,
        modals: {
            tip: !!tipModal,
            example: !!exampleModal
        },
        promptBuilder: !!generatePromptBtn,
        mobile: !!mobileMenuToggle
    });
}

function validateRequiredElements() {
    const required = [
        { element: navLinks, name: 'Navigation links', min: 1 },
        { element: sections, name: 'Sections', min: 1 },
        { element: themeToggle, name: 'Theme toggle' },
        { element: tipModal, name: 'Tip modal' },
        { element: exampleModal, name: 'Example modal' }
    ];
    
    for (const { element, name, min = 1 } of required) {
        if (!element || (element.length !== undefined && element.length < min)) {
            console.error(`❌ ${name} not found or insufficient count`);
            return false;
        }
    }
    return true;
}

// Enhanced Prompt Builder functionality
function initializePromptBuilder() {
    if (!generatePromptBtn) {
        console.log('ℹ️ Prompt builder elements not found');
        return;
    }
    
    console.log('🛠️ Initializing prompt builder...');
    
    // Generate prompt button
    generatePromptBtn.addEventListener('click', function(e) {
        e.preventDefault();
        generateCustomPrompt();
    });
    
    // Clear builder button
    if (clearBuilderBtn) {
        clearBuilderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearPromptBuilder();
        });
    }
    
    // Copy prompt button
    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const promptText = generatedPromptElement?.textContent;
            if (promptText) {
                copyToClipboard(promptText, '프롬프트가 클립보드에 복사되었습니다!');
            }
        });
    }
    
    // Launch buttons
    if (launchChatGPTBtn) {
        launchChatGPTBtn.addEventListener('click', function(e) {
            e.preventDefault();
            launchChatGPT();
        });
    }
    
    if (launchClaudeBtn) {
        launchClaudeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            launchClaude();
        });
    }
}

function generateCustomPrompt() {
    const role = promptRole?.value;
    const purpose = promptPurpose?.value;
    const format = promptFormat?.value;
    const context = promptContext?.value?.trim();
    
    // Validation
    if (!role || !purpose || !format) {
        showNotification('모든 필수 항목을 선택해주세요.', 'error');
        return;
    }
    
    if (!context) {
        showNotification('상세 컨텍스트를 입력해주세요.', 'error');
        return;
    }
    
    try {
        // Generate prompt using template
        const template = promptTemplates[role]?.[purpose];
        if (!template) {
            throw new Error('해당 조합의 템플릿을 찾을 수 없습니다.');
        }
        
        // Replace placeholders
        let generatedPrompt = template
            .replace(/{context}/g, context)
            .replace(/{format}/g, getFormatDescription(format));
        
        // Add role context
        const rolePrefix = getRolePrefix(role);
        generatedPrompt = `${rolePrefix}\n\n${generatedPrompt}`;
        
        // Display result
        if (generatedPromptElement && builderOutput) {
            generatedPromptElement.textContent = generatedPrompt;
            builderOutput.classList.remove('hidden');
            
            // Scroll to result
            builderOutput.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            
            showNotification('프롬프트가 성공적으로 생성되었습니다!', 'success');
        }
        
    } catch (error) {
        console.error('Error generating prompt:', error);
        showNotification('프롬프트 생성 중 오류가 발생했습니다.', 'error');
    }
}

function getRolePrefix(role) {
    const prefixes = {
        expert: '당신은 해당 분야의 경험이 풍부한 전문가입니다. 깊이 있는 지식과 실무 경험을 바탕으로 정확하고 실용적인 조언을 제공합니다.',
        teacher: '당신은 교육 전문가입니다. 복잡한 개념을 이해하기 쉽게 설명하고, 학습자의 수준에 맞춰 단계별로 가르치는 것을 전문으로 합니다.',
        analyst: '당신은 데이터 분석 전문가입니다. 객관적인 데이터와 근거를 바탕으로 논리적인 분석을 수행하고, 명확한 인사이트를 제공합니다.',
        creator: '당신은 창의적 사고의 전문가입니다. 혁신적인 아이디어를 생성하고, 기존의 것을 새로운 관점에서 재해석하여 매력적인 결과물을 만들어냅니다.'
    };
    return prefixes[role] || '';
}

function getFormatDescription(format) {
    const descriptions = {
        list: '번호나 불릿 포인트가 있는 명확한 목록',
        table: '행과 열로 구성된 구조화된 표',
        paragraph: '논리적 흐름이 있는 연속된 문단',
        json: '구조화된 JSON 데이터 형태'
    };
    return descriptions[format] || format;
}

function clearPromptBuilder() {
    if (promptRole) promptRole.value = '';
    if (promptPurpose) promptPurpose.value = '';
    if (promptFormat) promptFormat.value = '';
    if (promptContext) promptContext.value = '';
    
    if (builderOutput) {
        builderOutput.classList.add('hidden');
    }
    
    showNotification('프롬프트 빌더가 초기화되었습니다.', 'info');
}

function launchChatGPT() {
    const promptText = generatedPromptElement?.textContent;
    if (!promptText) {
        showNotification('먼저 프롬프트를 생성해주세요.', 'error');
        return;
    }
    
    const encodedPrompt = encodeURIComponent(promptText);
    const chatGPTUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
    
    window.open(chatGPTUrl, '_blank', 'noopener,noreferrer');
    showNotification('ChatGPT에서 프롬프트를 사용해보세요!', 'info');
}

function launchClaude() {
    const promptText = generatedPromptElement?.textContent;
    if (!promptText) {
        showNotification('먼저 프롬프트를 생성해주세요.', 'error');
        return;
    }
    
    // Copy to clipboard and provide instructions
    copyToClipboard(promptText, 'Claude용 프롬프트가 복사되었습니다!');
    
    // Open Claude
    const claudeUrl = 'https://claude.ai/chat';
    window.open(claudeUrl, '_blank', 'noopener,noreferrer');
    
    setTimeout(() => {
        showNotification('Claude에서 복사된 프롬프트를 붙여넣기하세요!', 'info');
    }, 1000);
}

// Enhanced Mobile Menu Management
function initializeMobileMenu() {
    if (!mobileMenuToggle || !sidebar) {
        console.log('ℹ️ Mobile menu elements not found');
        return;
    }
    
    console.log('📱 Initializing mobile menu...');
    
    // Menu toggle with touch support
    mobileMenuToggle.addEventListener('click', handleMobileMenuToggle);
    mobileMenuToggle.addEventListener('touchstart', handleMobileMenuToggle, { passive: true });
    
    // Overlay click to close
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('touchstart', closeMobileMenu, { passive: true });
    }
    
    // Close menu when clicking nav links on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                closeMobileMenu();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 1024 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }, 250));
    
    // Initialize mobile sidebar as hidden on mobile
    if (window.innerWidth <= 1024) {
        sidebar.classList.add('hidden-mobile');
    }
}

function handleMobileMenuToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    if (!sidebar || !mobileOverlay) return;
    
    isMobileMenuOpen = true;
    sidebar.classList.remove('hidden-mobile');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    if (mobileMenuToggle) {
        mobileMenuToggle.innerHTML = '<span>×</span>';
        mobileMenuToggle.setAttribute('aria-label', '메뉴 닫기');
    }
    
    // Focus management
    const firstNavLink = sidebar.querySelector('.nav-link');
    if (firstNavLink) {
        setTimeout(() => firstNavLink.focus(), 100);
    }
}

function closeMobileMenu() {
    if (!sidebar || !mobileOverlay) return;
    
    isMobileMenuOpen = false;
    sidebar.classList.add('hidden-mobile');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    
    if (mobileMenuToggle) {
        mobileMenuToggle.innerHTML = '<span>☰</span>';
        mobileMenuToggle.setAttribute('aria-label', '메뉴 열기');
        mobileMenuToggle.focus();
    }
}

// Enhanced Theme Management
function initializeTheme() {
    if (!themeToggle || !themeIcon) {
        console.log('ℹ️ Theme toggle elements not found');
        return;
    }
    
    console.log('🎨 Initializing theme...');
    
    // Get initial theme
    const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('ai-manual-theme-2025');
    currentTheme = savedTheme || (systemDarkMode ? 'dark' : 'light');
    
    applyTheme(currentTheme);
    
    // Theme toggle with touch support
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('touchstart', toggleTheme, { passive: true });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) {
            if (!localStorage.getItem('ai-manual-theme-2025')) {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(currentTheme);
            }
        });
    }
}

function toggleTheme(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    
    try {
        localStorage.setItem('ai-manual-theme-2025', currentTheme);
    } catch (e) {
        console.warn('Could not save theme preference:', e);
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', 
            theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'
        );
    }
}

// Enhanced Navigation Management
function initializeNavigation() {
    if (!navLinks.length) return;
    
    console.log('🧭 Initializing navigation...');
    
    navLinks.forEach((link, index) => {
        // Click and touch events
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleNavClick(this);
        });
        
        // Keyboard support
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick(this);
            }
        });
        
        // Accessibility
        link.setAttribute('role', 'button');
        link.setAttribute('tabindex', '0');
    });
    
    // Scroll event with throttling
    window.addEventListener('scroll', throttle(updateActiveSection, 100), { passive: true });
}

function handleNavClick(link) {
    const targetId = link.getAttribute('href')?.substring(1) || link.getAttribute('data-section');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const offsetTop = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
        });
        
        updateActiveNavLink(link);
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            setTimeout(closeMobileMenu, 300);
        }
    }
}

function updateActiveSection() {
    if (!sections.length || !navLinks.length) return;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    // Find current section
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
            break;
        }
    }
    
    // Default to first section
    if (!currentSection && sections.length > 0) {
        currentSection = sections[0].id;
    }
    
    // Update active nav link
    if (currentSection) {
        const activeLink = document.querySelector(`[data-section="${currentSection}"], [href="#${currentSection}"]`);
        if (activeLink) {
            updateActiveNavLink(activeLink);
        }
    }
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-current', 'false');
    });
    
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
}

// Enhanced Search Functionality
function initializeSearch() {
    if (!searchInput) return;
    
    console.log('🔍 Initializing search...');
    
    // Search input events
    searchInput.addEventListener('input', debounce(function(e) {
        handleSearch(e.target.value);
    }, 300));
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchResults.length > 0) {
                navigateToNextResult();
            }
        } else if (e.key === 'Escape') {
            clearSearch();
        }
    });
    
    // Search control events
    if (searchClear) {
        searchClear.addEventListener('click', clearSearch);
        searchClear.addEventListener('touchstart', clearSearch, { passive: true });
    }
    
    if (searchPrev) {
        searchPrev.addEventListener('click', navigateToPrevResult);
        searchPrev.addEventListener('touchstart', navigateToPrevResult, { passive: true });
    }
    
    if (searchNext) {
        searchNext.addEventListener('click', navigateToNextResult);
        searchNext.addEventListener('touchstart', navigateToNextResult, { passive: true });
    }
    
    // Accessibility
    if (searchInput) {
        searchInput.setAttribute('aria-label', '페이지 내 검색');
        searchInput.setAttribute('role', 'searchbox');
    }
}

function handleSearch(value) {
    searchTerm = value.toLowerCase().trim();
    
    if (searchTerm.length > 0) {
        if (searchClear) searchClear.classList.remove('hidden');
        performEnhancedSearch();
    } else {
        if (searchClear) searchClear.classList.add('hidden');
        if (searchNavigation) searchNavigation.classList.add('hidden');
        clearSearchHighlights();
        showAllContent();
        searchResults = [];
        currentSearchIndex = -1;
    }
}

function performEnhancedSearch() {
    if (!sections.length) return;
    
    clearSearchHighlights();
    searchResults = [];
    let hasResults = false;
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const hasMatch = content.includes(searchTerm);
        
        if (hasMatch) {
            section.style.display = 'block';
            section.classList.remove('fade-out');
            const highlights = highlightSearchTerms(section, searchTerm);
            searchResults = searchResults.concat(highlights);
            hasResults = true;
        } else {
            section.classList.add('fade-out');
        }
    });
    
    // Update navigation links
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('data-section') || link.getAttribute('href')?.substring(1);
        if (sectionId) {
            const section = document.getElementById(sectionId);
            if (section && section.textContent.toLowerCase().includes(searchTerm)) {
                link.classList.remove('fade-out');
            } else {
                link.classList.add('fade-out');
            }
        }
    });
    
    // Update search navigation
    if (searchResults.length > 0) {
        if (searchNavigation) searchNavigation.classList.remove('hidden');
        updateSearchCounter();
        currentSearchIndex = -1;
    } else {
        if (searchNavigation) searchNavigation.classList.add('hidden');
        if (hasResults === false) {
            showNotification('검색 결과가 없습니다.', 'info');
        }
    }
}

function highlightSearchTerms(element, term) {
    const highlights = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (node.parentElement.tagName === 'SCRIPT' || 
                    node.parentElement.tagName === 'STYLE' ||
                    node.parentElement.classList.contains('search-highlight')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return node.nodeValue.toLowerCase().includes(term) ? 
                    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        }
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.nodeValue;
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        
        if (regex.test(text)) {
            const parent = textNode.parentElement;
            const highlightedHTML = text.replace(regex, '<span class="search-highlight">$1</span>');
            const wrapper = document.createElement('div');
            wrapper.innerHTML = highlightedHTML;
            
            const fragment = document.createDocumentFragment();
            while (wrapper.firstChild) {
                if (wrapper.firstChild.classList && wrapper.firstChild.classList.contains('search-highlight')) {
                    highlights.push(wrapper.firstChild);
                }
                fragment.appendChild(wrapper.firstChild);
            }
            parent.replaceChild(fragment, textNode);
        }
    });
    
    return highlights;
}

function navigateToNextResult() {
    if (searchResults.length === 0) return;
    
    // Remove current highlight
    if (currentSearchIndex >= 0 && currentSearchIndex < searchResults.length) {
        searchResults[currentSearchIndex].classList.remove('current');
    }
    
    currentSearchIndex = (currentSearchIndex + 1) % searchResults.length;
    
    // Add current highlight and scroll to it
    const currentHighlight = searchResults[currentSearchIndex];
    currentHighlight.classList.add('current');
    
    // Smooth scroll with proper offset
    const rect = currentHighlight.getBoundingClientRect();
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    const scrollTop = window.pageYOffset + rect.top - headerHeight - 100;
    
    window.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
    });
    
    updateSearchCounter();
}

function navigateToPrevResult() {
    if (searchResults.length === 0) return;
    
    // Remove current highlight
    if (currentSearchIndex >= 0 && currentSearchIndex < searchResults.length) {
        searchResults[currentSearchIndex].classList.remove('current');
    }
    
    currentSearchIndex = currentSearchIndex <= 0 ? searchResults.length - 1 : currentSearchIndex - 1;
    
    // Add current highlight and scroll to it
    const currentHighlight = searchResults[currentSearchIndex];
    currentHighlight.classList.add('current');
    
    // Smooth scroll with proper offset
    const rect = currentHighlight.getBoundingClientRect();
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    const scrollTop = window.pageYOffset + rect.top - headerHeight - 100;
    
    window.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
    });
    
    updateSearchCounter();
}

function updateSearchCounter() {
    if (searchCounter) {
        if (searchResults.length > 0) {
            searchCounter.textContent = `${currentSearchIndex + 1}/${searchResults.length}`;
        } else {
            searchCounter.textContent = '0/0';
        }
    }
    
    // Update button states
    if (searchPrev) {
        searchPrev.disabled = searchResults.length === 0;
    }
    if (searchNext) {
        searchNext.disabled = searchResults.length === 0;
    }
}

function clearSearch() {
    if (searchInput) searchInput.value = '';
    searchTerm = '';
    if (searchClear) searchClear.classList.add('hidden');
    if (searchNavigation) searchNavigation.classList.add('hidden');
    clearSearchHighlights();
    showAllContent();
    searchResults = [];
    currentSearchIndex = -1;
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentElement;
        if (parent) {
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        }
    });
}

function showAllContent() {
    sections.forEach(section => {
        section.style.display = 'block';
        section.classList.remove('fade-out');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('fade-out');
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Enhanced Modal Management
function initializeModals() {
    console.log('🔲 Initializing modals...');
    
    // Tip Modal events
    if (tipModalClose) {
        tipModalClose.addEventListener('click', closeTipModal);
        tipModalClose.addEventListener('touchstart', closeTipModal, { passive: true });
    }
    if (tipModalOverlay) {
        tipModalOverlay.addEventListener('click', closeTipModal);
        tipModalOverlay.addEventListener('touchstart', closeTipModal, { passive: true });
    }
    
    // Example Modal events
    if (exampleModalClose) {
        exampleModalClose.addEventListener('click', closeExampleModal);
        exampleModalClose.addEventListener('touchstart', closeExampleModal, { passive: true });
    }
    if (exampleModalOverlay) {
        exampleModalOverlay.addEventListener('click', closeExampleModal);
        exampleModalOverlay.addEventListener('touchstart', closeExampleModal, { passive: true });
    }
    
    // Tab functionality
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchModalTab(tabName);
        });
        
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabName = this.getAttribute('data-tab');
                switchModalTab(tabName);
            }
        });
    });
    
    // Escape key and focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!tipModal?.classList.contains('hidden')) {
                closeTipModal();
            } else if (!exampleModal?.classList.contains('hidden')) {
                closeExampleModal();
            } else if (isMobileMenuOpen) {
                closeMobileMenu();
            }
        }
    });
}

function showTipModal(tipIndex) {
    const tip = quickTipsData[tipIndex];
    if (!tip || !tipModal || !tipModalTitle || !tipModalText) {
        console.error('Tip modal error: missing elements or invalid index');
        return;
    }
    
    tipModalTitle.textContent = tip.title;
    tipModalText.innerHTML = tip.detail;
    
    tipModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => {
        if (tipModalClose) tipModalClose.focus();
    }, 100);
    
    // Force reflow for animation
    tipModal.offsetHeight;
}

function closeTipModal() {
    if (tipModal) {
        tipModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function showExampleModal(exampleKey) {
    const example = exampleData[exampleKey];
    
    if (!example || !exampleModal || !exampleModalTitle) {
        console.error('Example modal error: missing elements or invalid key');
        return;
    }
    
    exampleModalTitle.textContent = example.title;
    
    // Set content for both tabs
    if (traditionalContent) {
        traditionalContent.textContent = example.traditional;
    }
    
    if (contextContent) {
        contextContent.textContent = example.contextEngineering;
    }
    
    if (implementationInfo) {
        implementationInfo.textContent = `구현 방법: ${example.implementation}`;
    }
    
    // Set category
    const categoryElement = document.getElementById('exampleModalCategory');
    if (categoryElement) {
        categoryElement.textContent = `카테고리: ${example.category}`;
    }
    
    // Reset to first tab
    switchModalTab('traditional');
    
    exampleModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => {
        if (exampleModalClose) exampleModalClose.focus();
    }, 100);
    
    // Force reflow for animation
    exampleModal.offsetHeight;
}

function closeExampleModal() {
    if (exampleModal) {
        exampleModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function switchModalTab(tabName) {
    // Update tab buttons
    modalTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        }
    });
    
    // Update tab panels
    tabPanels.forEach(panel => {
        if (panel.id === tabName + 'Panel') {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// Enhanced Tip Cards Interaction
function initializeTipCards() {
    const tipCards = document.querySelectorAll('.tip-card.clickable');
    console.log('💡 Initializing tip cards:', tipCards.length);
    
    tipCards.forEach((card, index) => {
        const tipIndex = parseInt(card.getAttribute('data-tip-index'));
        
        // Click and touch events
        card.addEventListener('click', function(e) {
            e.preventDefault();
            showTipModal(tipIndex);
        });
        
        card.addEventListener('touchstart', function(e) {
            // Add visual feedback for touch
            this.style.transform = 'translateY(-1px)';
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            this.style.transform = '';
        }, { passive: true });
        
        // Keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showTipModal(tipIndex);
            }
        });
    });
}

// Enhanced Example Cards Interaction
function initializeExampleCards() {
    const exampleCards = document.querySelectorAll('.example-card');
    console.log('📋 Initializing example cards:', exampleCards.length);
    
    exampleCards.forEach((card, index) => {
        const exampleKey = card.getAttribute('data-example');
        
        // Click and touch events
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Don't trigger if clicking on copy button
            if (e.target.closest('.copy-btn')) {
                return;
            }
            
            showExampleModal(exampleKey);
        });
        
        card.addEventListener('touchstart', function(e) {
            // Add visual feedback for touch
            this.style.transform = 'translateY(-2px)';
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            this.style.transform = '';
        }, { passive: true });
        
        // Keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showExampleModal(exampleKey);
            }
        });
    });
}

// Global function for inline onclick handlers
function openExampleModal(exampleKey) {
    showExampleModal(exampleKey);
}

// Enhanced Copy Functionality
function initializeCopyButtons() {
    console.log('📋 Initializing copy buttons...');
    
    // Use event delegation for copy buttons
    document.addEventListener('click', function(e) {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const copyText = copyBtn.getAttribute('data-copy');
            if (copyText) {
                copyToClipboard(copyText, '프롬프트가 복사되었습니다!');
            }
        }
    });
    
    // Touch support for copy buttons
    document.addEventListener('touchstart', function(e) {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            copyBtn.style.transform = 'scale(0.95)';
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            copyBtn.style.transform = '';
        }
    }, { passive: true });
}

function copyToClipboard(text, successMessage = '클립보드에 복사되었습니다!') {
    if (!text) {
        showNotification('복사할 내용이 없습니다.', 'error');
        return;
    }
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(successMessage, 'success');
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            fallbackCopyText(text, successMessage);
        });
    } else {
        fallbackCopyText(text, successMessage);
    }
}

function fallbackCopyText(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const result = document.execCommand('copy');
        if (result) {
            showNotification(successMessage, 'success');
        } else {
            showNotification('복사에 실패했습니다.', 'error');
        }
    } catch (err) {
        console.error('Fallback 복사 실패:', err);
        showNotification('복사에 실패했습니다.', 'error');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Enhanced Touch Support
function initializeTouchSupport() {
    if (!('ontouchstart' in window)) return;
    
    console.log('👆 Initializing touch support...');
    
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll(
        '.btn, .nav-link, .example-card, .tip-card, .modal__tab, .theme-toggle'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
}

// Scroll Progress
function initializeScrollProgress() {
    if (!progressFill) return;
    
    window.addEventListener('scroll', throttle(updateScrollProgress, 16), { passive: true });
    updateScrollProgress();
}

function updateScrollProgress() {
    if (!progressFill) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    progressFill.style.width = Math.min(Math.max(scrolled, 0), 100) + '%';
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Apply styles based on type
    const styles = {
        success: { bg: 'var(--color-success)', color: 'var(--color-btn-primary-text)' },
        error: { bg: 'var(--color-error)', color: 'var(--color-btn-primary-text)' },
        warning: { bg: 'var(--color-warning)', color: 'var(--color-btn-primary-text)' },
        info: { bg: 'var(--color-primary)', color: 'var(--color-btn-primary-text)' }
    };
    
    const style = styles[type] || styles.info;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: style.bg,
        color: style.color,
        padding: '12px 20px',
        borderRadius: '8px',
        zIndex: '10000',
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-sm)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '300px',
        wordWrap: 'break-word',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Global keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (!isInitialized) return;
    
    // Don't trigger if user is typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    if ((e.ctrlKey || e.metaKey)) {
        switch(e.key) {
            case 'k':
            case '/':
                e.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
                break;
        }
    }
    
    // Theme toggle with 't' key
    if (e.key === 't' || e.key === 'T') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            toggleTheme();
        }
    }
});

// Error handling and recovery
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('앱에서 오류가 발생했습니다. 페이지를 새로고침해주세요.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('처리되지 않은 오류가 발생했습니다.', 'error');
});

// Performance monitoring
if ('performance' in window && 'measure' in performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            try {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`📊 Page load time: ${loadTime}ms`);
            } catch (e) {
                console.log('Performance measurement not available');
            }
        }, 0);
    });
}

// Print functionality
window.addEventListener('beforeprint', function() {
    // Show all content when printing
    showAllContent();
    clearSearchHighlights();
});

// Export for debugging and testing
window.AIGuideApp = {
    // State getters
    getCurrentTheme: () => currentTheme,
    getSearchTerm: () => searchTerm,
    getSearchResultsCount: () => searchResults.length,
    isMobileMenuOpen: () => isMobileMenuOpen,
    isInitialized: () => isInitialized,
    
    // Functions
    toggleTheme,
    clearSearch,
    updateActiveSection,
    showTipModal,
    showExampleModal,
    openExampleModal,
    navigateToNextResult,
    navigateToPrevResult,
    toggleMobileMenu: handleMobileMenuToggle,
    copyToClipboard,
    showNotification,
    generateCustomPrompt,
    clearPromptBuilder,
    launchChatGPT,
    launchClaude,
    
    // Debug functions
    testTipModal: () => showTipModal(0),
    testExampleModal: () => showExampleModal('business-1'),
    testNotifications: () => {
        showNotification('정보 메시지입니다', 'info');
        setTimeout(() => showNotification('성공 메시지입니다', 'success'), 500);
        setTimeout(() => showNotification('경고 메시지입니다', 'warning'), 1000);
        setTimeout(() => showNotification('오류 메시지입니다', 'error'), 1500);
    },
    checkElements: () => {
        console.log('🔍 Element Check:', {
            tipModal: !!tipModal,
            exampleModal: !!exampleModal,
            themeToggle: !!themeToggle,
            mobileMenuToggle: !!mobileMenuToggle,
            promptBuilder: !!generatePromptBtn,
            tipCards: document.querySelectorAll('.tip-card.clickable').length,
            exampleCards: document.querySelectorAll('.example-card').length,
            copyButtons: document.querySelectorAll('.copy-btn').length,
            navLinks: navLinks?.length || 0,
            sections: sections?.length || 0
        });
    }
};