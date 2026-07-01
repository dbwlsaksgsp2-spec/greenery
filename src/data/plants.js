export const plantsData = [
  {
    id: 1,
    name: "몬스테라",
    scientificName: "Monstera deliciosa",
    price: 25000,
    image: "/images/monstera.jpg",
    difficulty: "easy",
    category: ["interior", "air-purifying"],
    description: "구멍 뚫린 독특한 잎사귀로 큰 사랑을 받는 대표적인 인테리어 식물입니다. 생명력이 강해 초보 식집사도 키우기 좋습니다.",
    care: {
      sunlight: "반양지 (창가 안쪽, 밝은 간접광)",
      watering: "봄~가을엔 겉흙이 3cm 정도 마르면 듬뿍, 겨울엔 흙 전체가 마르면 듬뿍",
      temperature: "18~27°C (최저 10°C 이상 유지)",
      wateringInterval: 7,
      humidity: "보통~높음 (50~70%, 건조하면 공중 분무)",
      tip: "잎에 먼지가 쌓이면 광합성을 방해하므로 물수건으로 부드럽게 닦아주세요."
    },
    tags: ["인기", "인테리어", "초보추천"]
  },
  {
    id: 2,
    name: "스투키",
    scientificName: "Sansevieria stuckyi",
    price: 15000,
    image: "/images/stuckyi.jpg",
    difficulty: "easy",
    category: ["air-purifying", "beginner"],
    description: "음이온 방출량 and 공기정화 능력이 탁월하며, 밤에 산소를 배출하여 침실에 두기 가장 좋은 다육식물입니다.",
    care: {
      sunlight: "반음지~반양지 (빛이 적은 곳에서도 잘 버팀)",
      watering: "한 달에 한 번 정도 흙이 바짝 말랐을 때 통통한 줄기가 살짝 쭈글거릴 때 듬뿍",
      temperature: "15~30°C (겨울철 추위에 약함, 실내 보관 필수)",
      wateringInterval: 30,
      humidity: "건조함 선호 (습도가 높으면 무름병 발생 위험)",
      tip: "물을 너무 자주 주면 뿌리가 썩어 죽을 수 있으니 무관심이 약입니다."
    },
    tags: ["공기정화", "물적게", "선물용"]
  },
  {
    id: 3,
    name: "산세베리아",
    scientificName: "Sansevieria trifasciata",
    price: 12000,
    image: "/images/sansevieria.jpg",
    difficulty: "easy",
    category: ["air-purifying", "beginner"],
    description: "스투키와 함께 게으른 식집사에게 최고의 선택입니다. 병충해에 강하고 건조한 실내 환경에서도 꿋꿋하게 자랍니다.",
    care: {
      sunlight: "반양지~음지 (어디서나 잘 적응함)",
      watering: "봄~가을엔 3주에 1회, 겨울엔 4~5주에 1회 (속흙까지 마르면)",
      temperature: "15~25°C (겨울철 13°C 이상 유지)",
      wateringInterval: 21,
      humidity: "건조함 선호",
      tip: "잎 중앙에 물이 고이지 않도록 화분 흙 가장자리로 물을 주세요."
    },
    tags: ["공기정화", "초보추천", "키우기쉬움"]
  },
  {
    id: 4,
    name: "아레카야자",
    scientificName: "Dypsis lutescens",
    price: 35000,
    image: "/images/areca_palm.jpg",
    difficulty: "medium",
    category: ["air-purifying", "interior"],
    description: "미국 NASA에서 선정한 공기정화 식물 1위입니다. 천연 가습기라 불릴 만큼 하루 동안 엄청난 양의 수분을 뿜어냅니다.",
    care: {
      sunlight: "반양지 (직사광선은 잎을 타게 만드니 간접광이 좋음)",
      watering: "봄~가을엔 겉흙이 마르면 듬뿍, 겨울엔 속흙이 마르면 듬뿍",
      temperature: "18~24°C (겨울철 10°C 이상 유지)",
      wateringInterval: 5,
      humidity: "높음 (60% 이상, 잎에 자주 분무해 주는 것이 좋음)",
      tip: "수돗물의 염소 성분에 예민하므로, 하루 정도 받아둔 물을 사용하시는 것이 좋습니다."
    },
    tags: ["NASA 1위", "천연가습", "시원한무드"]
  },
  {
    id: 5,
    name: "피쉬본 선인장",
    scientificName: "Epiphyllum anguliger",
    price: 18000,
    image: "/images/fishbone.jpg",
    difficulty: "medium",
    category: ["interior"],
    description: "생선 뼈를 닮은 독특하고 귀여운 외형의 선인장입니다. 독특한 리듬감의 모양 덕분에 감성적인 플랜테리어에 제격입니다.",
    care: {
      sunlight: "밝은 반양지 (충분한 간접광을 받아야 지그재그 모양이 예쁘게 자람)",
      watering: "줄기가 얇아지거나 쪼글거릴 때 듬뿍 (보통 2~3주에 1회)",
      temperature: "15~28°C (겨울철 10°C 이상)",
      wateringInterval: 14,
      humidity: "보통 (일반적인 선인장보다 건조에 조금 더 약함)",
      tip: "봄과 여름철 생장기에는 흙이 마르면 물을 넉넉히 주는 것이 좋습니다."
    },
    tags: ["독특한외관", "플랜테리어", "선인장"]
  },
  {
    id: 6,
    name: "칼라데아 오르비폴리아",
    scientificName: "Calathea orbifolia",
    price: 32000,
    image: "/images/orbifolia.jpg",
    difficulty: "hard",
    category: ["interior"],
    description: "둥글고 커다란 부채 모양의 잎에 붓으로 그린 듯한 은빛 줄무늬가 매력적이지만, 습도와 수질 관리가 매우 까다로운 고급 식물입니다.",
    care: {
      sunlight: "반양지~반음지 (직사광선에 노출되면 잎이 쉽게 타고 말라 죽음)",
      watering: "흙이 마르지 않게 촉촉하게 유지하되, 과습은 주의 (겉흙이 살짝 마르면 바로 급수)",
      temperature: "18~25°C (추위에 매우 취약, 겨울철 15°C 이상 필수)",
      wateringInterval: 4,
      humidity: "매우 높음 (70% 이상 필수, 가습기 사용 권장)",
      tip: "습도가 낮으면 잎 테두리가 갈색으로 타들어 가니 공중 가습을 신경 써주세요."
    },
    tags: ["화려한잎", "난이도상", "수집가용"]
  },
  {
    id: 7,
    name: "필로덴드론 핑크 프린세스",
    scientificName: "Philodendron erubescens 'Pink Princess'",
    price: 55000,
    image: "/images/pink_princess.jpg",
    difficulty: "hard",
    category: ["interior"],
    description: "짙은 녹색과 어우러지는 파스텔 핑크색 무늬가 매혹적인 희귀 식물입니다. 빛의 양에 따라 핑크 무늬의 발색이 결정됩니다.",
    care: {
      sunlight: "밝은 반양지 (충분한 간접광을 받아야 핑크 무늬가 많이 나옴)",
      watering: "속흙이 절반 정도 말랐을 때 통풍이 잘되는 날 아침에 듬뿍",
      temperature: "18~28°C (겨울철 15°C 이상 실내 관리)",
      wateringInterval: 6,
      humidity: "높음 (60~80%, 너무 건조하면 새 잎이 잘 나오지 못함)",
      tip: "새 잎이 펴질 때 가습을 해주면 잎이 찢어지거나 다치는 것을 막을 수 있습니다."
    },
    tags: ["희귀식물", "핑크무늬", "매니아층"]
  },
  {
    id: 8,
    name: "스킨답서스",
    scientificName: "Epipremnum aureum",
    price: 10000,
    image: "/images/scindapsus.jpg",
    difficulty: "easy",
    category: ["beginner", "air-purifying"],
    description: "일산화탄소 제거 능력이 탁월하여 주방에 두기 가장 좋은 식물입니다. 수경재배로도 잘 자라며 물에서도 생명력이 강합니다.",
    care: {
      sunlight: "반양지~음지 (빛이 적은 주방이나 욕실에서도 잘 자람)",
      watering: "흙이 대부분 말랐을 때 듬뿍 (수경재배는 주기적인 물 갈아주기)",
      temperature: "16~24°C (최저 10°C 이상)",
      wateringInterval: 10,
      humidity: "보통 (실내 습도에 무난하게 적응)",
      tip: "덩굴성으로 아래로 늘어지며 자라므로 걸이 화분(행잉 플랜트)으로 키워도 매우 예쁩니다."
    },
    tags: ["일산화탄소제거", "수경재배", "초보추천"]
  }
];
