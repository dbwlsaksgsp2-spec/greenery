export const mbtiQuestions = [
  {
    id: 1,
    question: "나의 방에 하나만 놓을 수 있다면 어떤 식물을 선택하시겠어요?",
    options: [
      { text: "싱그럽고 시원한 잎사귀가 가득한 식물", type: "G" },
      { text: "아기자기하고 단단한 다육 식물과 선인장", type: "S" }
    ]
  },
  {
    id: 2,
    question: "식물이 주로 놓이게 될 공간의 채광 상태는 어떤가요?",
    options: [
      { text: "하루 종일 햇빛이 따스하게 들어오는 밝은 창가", type: "L" },
      { text: "형광등 불빛 위주의 다소 은은한 조명의 실내", type: "D" }
    ]
  },
  {
    id: 3,
    question: "평소 나의 성향과 더 가까운 식물 케어 방식은 무엇인가요?",
    options: [
      { text: "매일 상태를 살펴보고 분무해주며 애정 어리게 키우고 싶다", type: "P" },
      { text: "가끔 생각날 때 물만 주며 조용히 알아서 자라게 두고 싶다", type: "M" }
    ]
  },
  {
    id: 4,
    question: "집안에 배치할 화분의 원하는 크기는 어느 정도인가요?",
    options: [
      { text: "공간을 가득 채우는 존재감 넘치는 대형 식물", type: "B" },
      { text: "선반이나 책상 위를 꾸며주는 아담한 미니 화분", type: "S" }
    ]
  }
];

export const mbtiResults = {
  // G (Greenery) / L (Light) / P (Patient) / B (Big)
  "GLPB": {
    title: "초록 숲의 든든한 수호자",
    description: "당신은 아침 햇살을 맞으며 식물을 정성껏 보살피는 다정한 가드너입니다. 거실 한편을 울창한 숲처럼 가꿔줄 존재감 있는 관엽식물이 최고의 짝꿍입니다.",
    recommendedPlantIds: [4, 1] // 아레카야자, 몬스테라
  },
  "GLPS": {
    title: "햇살 가득 초록 정원사",
    description: "매일 자라는 새 잎을 보며 힐링하는 당신! 풍성한 햇빛을 즐기며 아기자기하게 돌볼 수 있는 싱그러운 소형 잎식물이 딱 어울립니다.",
    recommendedPlantIds: [1, 8] // 몬스테라, 스킨답서스
  },
  "GLMB": {
    title: "바쁜 도시 속 초록 동반자",
    description: "밝은 거실을 화사하게 채우고 싶지만 손이 덜 가는 식물을 찾는 당신에게는 환경 적응력이 뛰어나면서 크기가 큰 야자류 식물을 추천합니다.",
    recommendedPlantIds: [4] // 아레카야자
  },
  "GLMS": {
    title: "창가의 햇살 메이트",
    description: "따스한 창가 선반을 초록빛으로 채워줄 귀엽고 무난한 동반자. 가끔의 관심만으로도 건강하게 쑥쑥 자라줄 식물이 최적입니다.",
    recommendedPlantIds: [8, 3] // 스킨답서스, 산세베리아
  },
  "GDPB": {
    title: "숲속의 깊은 음이온 가디언",
    description: "비교적 그늘진 방에서도 매일 아침 분무를 해주며 식물을 애지중지 아끼는 당신. 반음지에서도 늠름한 자태를 뽐내는 대형 식물이 어울립니다.",
    recommendedPlantIds: [1, 4] // 몬스테라, 아레카야자
  },
  "GDPS": {
    title: "그늘 속 싱그러운 요정",
    description: "은은한 실내 조명 아래서도 매일 눈맞춤을 나누며 잎을 닦아줄 수 있는 꼼꼼한 당신. 작지만 강하고 싱그러움을 잃지 않는 잎식물이 맞춤입니다.",
    recommendedPlantIds: [8, 1] // 스킨답서스, 몬스테라
  },
  "GDMB": {
    title: "침묵 속의 든든한 잎새",
    description: "빛이 적은 실내에서도 거의 신경 쓰지 않아도 묵묵히 튼튼하게 자라주는 큰 덩치의 식물. 공간의 공기 정화까지 깔끔하게 해결해 줄 동반자입니다.",
    recommendedPlantIds: [3, 4] // 산세베리아, 아레카야자 (산세베리아 대형 포함)
  },
  "GDMS": {
    title: "그늘 속의 소소한 행복",
    description: "빛이 잘 들지 않는 방 한구석, 바쁜 일상 속 가끔의 물주기만으로도 방 전체를 정화해주는 작고 강인한 식물과 케미가 좋습니다.",
    recommendedPlantIds: [8, 3] // 스킨답서스, 산세베리아
  },
  "SLPB": {
    title: "사막 위의 감성 가드너",
    description: "햇빛이 잘 드는 곳에서 독특한 실루엣의 선인장을 관찰하며, 아주 가끔이지만 필요할 때 세심히 상태를 확인하는 미니멀리스트 가드너입니다.",
    recommendedPlantIds: [5] // 피쉬본 선인장
  },
  "SLPS": {
    title: "미니어처 사막의 창조자",
    description: "햇볕이 잘 드는 방 책상 위에 귀엽고 아기자기한 다육이와 선인장 컬렉션을 정성스레 늘어놓고 돌보는 아기자기한 매력의 소유자입니다.",
    recommendedPlantIds: [5, 2] // 피쉬본 선인장, 스투키
  },
  "SLMB": {
    title: "모던 시크 선인장 콜렉터",
    description: "디자인 가구 같은 독창적인 형태의 대형 선인장을 밝은 공간에 두고, 물주기는 잊은 채 감상 위주로 깔끔하게 플랜테리어를 즐기는 타입입니다.",
    recommendedPlantIds: [5] // 피쉬본 선인장
  },
  "SLMS": {
    title: "책상 위의 든든한 수호신",
    description: "하루 종일 해가 잘 드는 책상 위, 귀찮은 관리는 싫지만 멋스러운 선인장이나 다육식물로 초록 기운을 얻고 싶어 하는 실속파입니다.",
    recommendedPlantIds: [2, 3] // 스투키, 산세베리아
  },
  "SDPB": {
    title: "그늘 속 수줍은 오아시스",
    description: "다소 그늘진 방에서도 선인장류를 귀여워하며 과습이 오지 않는지 세심하게 살피고 지켜보는 감성적인 집사입니다.",
    recommendedPlantIds: [5, 2] // 피쉬본, 스투키
  },
  "SDPS": {
    title: "은은한 빛 속의 다육 메이트",
    description: "해가 강하지 않은 실내 책상 위에서 수시로 식물 상태를 관찰하며 알맞은 공기 정화를 꿈꾸는 귀여운 다육 집사입니다.",
    recommendedPlantIds: [2, 3] // 스투키, 산세베리아
  },
  "SDMB": {
    title: "방치형 모던 플랜테리어",
    description: "빛도 적고 관리할 시간도 없지만, 공간에 세련된 초록빛 포인트를 주고 싶어 하는 진정한 미니멀리스트입니다.",
    recommendedPlantIds: [2] // 스투키
  },
  "SDMS": {
    title: "귀차니스트의 영원한 초록 친구",
    description: "빛도 안 들고 물주기는 까먹기 일쑤인 당신! 어두운 실내에서 최악의 방치 상태도 가뿐히 견뎌내는 가장 순하고 귀여운 다육 식물이 제격입니다.",
    recommendedPlantIds: [2, 3] // 스투키, 산세베리아
  }
};
