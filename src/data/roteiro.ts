export interface Attraction {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  time: string;
  duration: string;
  price: string;
  priceValue: 0 | 1 | 2 | 3;
  hours: string;
  category: 'nature' | 'culture' | 'food' | 'attraction' | 'shopping' | 'experience';
  tips?: string;
  mapsUrl: string;
  emoji: string;
  primeGourmet: boolean;
  primeNote?: string;
  open: boolean;
  openNote?: string;
}

export interface Day {
  day: number;
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  accentColor: string;
  nabs?: boolean;
  halfDay?: boolean;
  attractions: Attraction[];
}

export const CATEGORY_COLORS: Record<string, string> = {
  nature:     '#2e7d32',
  culture:    '#6a1b9a',
  food:       '#bf360c',
  attraction: '#1565c0',
  shopping:   '#e65100',
  experience: '#00796b',
};

export const CATEGORY_LABELS: Record<string, string> = {
  nature:     'Natureza',
  culture:    'Cultura',
  food:       'Gastronomia',
  attraction: 'Atração',
  shopping:   'Compras',
  experience: 'Experiência',
};

// ─── CALENDÁRIO ──────────────────────────────────────────────────────────────
// Dia 1 · Sáb 19/07 · Chegada (tarde) → Centro: Lago Negro, Rua Torta,
//                                        Rua Coberta, Igreja São Pedro,
//                                        Fonte do Amor Eterno
//
// Dia 2 · Dom 20/07 → Mini Mundo · Museu de Cera · Lumni (noite)
//
// Dia 3 · Seg 21/07 → ⚠️ Parque do Caracol FECHADO · Garden Park FECHADO
//                     Snowland (manhã) · Mundo Gelado · Alice e o Chapeleiro
//
// Dia 4 · Ter 22/07 · nabs não vem → Parque do Caracol · Garden Park
//                                     Hard Café (noite)
//
// Dia 5 · Qua 23/07 · nabs não vem → Space Adventure · Alpen Park · Skyglass
//                                     Jolimont · Bento Gonçalves (alternativa)
//
// Dia 6 · Qui 24/07 · Meio dia (saída) → Museu Festival Cinema · Estação Canela
//                                         Planeta Chocolate · Casa Lugano
//                                         (chocolaterias no último dia)
// ─────────────────────────────────────────────────────────────────────────────

export const ROTEIRO: Day[] = [

  {
    day: 1, date: '19 Jul', weekday: 'Sábado',
    title: 'Chegada', subtitle: 'Centro a pé · Tarde',
    accentColor: '#2e7d32',
    attractions: [
      {
        id: 'd1-1', name: 'Lago Negro', emoji: '🦢', category: 'nature',
        description: 'Lago artificial com águas escuras, pinheiros e flores. Cartão-postal romântico de Gramado. Pedalinho em forma de cisne.',
        address: 'R. Vinte e Cinco de Julho, 439, Gramado - RS',
        lat: -29.3944, lng: -50.8778,
        time: '15:00', duration: '1h30',
        price: 'Gratuito (caminhar) · Pedalinho cisne: R$ 50/casal',
        priceValue: 0,
        hours: 'Parque: 24h · Pedalinhos: 8h30–18h (todo dia)',
        tips: 'Chegue com a névoa da tarde de julho. Sábado pode ter fila no pedalinho — aproveite a caminhada ao redor antes.',
        mapsUrl: 'https://www.google.com/maps/search/q=Lago+Negro+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd1-2', name: 'Rua Torta', emoji: '🏘️', category: 'culture',
        description: 'A rua mais fotogênica de Gramado: arquitetura bávara, flores coloridas e casas charmosas com luzes no inverno.',
        address: 'Rua Torta, Centro, Gramado - RS',
        lat: -29.3825, lng: -50.8722,
        time: '16:30', duration: '30min',
        price: 'Gratuito', priceValue: 0,
        hours: 'Aberto 24h',
        tips: 'No frio de julho as janelas iluminadas ao entardecer ficam perfeitas para foto.',
        mapsUrl: 'https://www.google.com/maps/search/q=Rua+Torta+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd1-3', name: 'Rua Coberta', emoji: '🛍️', category: 'shopping',
        description: 'Galeria coberta com lojas de souvenirs, roupas e artesanato. Principal corredor de compras do centro.',
        address: 'Av. Borges de Medeiros, Centro, Gramado - RS',
        lat: -29.3800, lng: -50.8738,
        time: '17:00', duration: '45min',
        price: 'Gratuito (compras à parte)', priceValue: 0,
        hours: 'Seg–Dom: 9h–22h (alta temporada)',
        tips: 'Dê uma primeira olhada. Compras de chocolates ficam para o dia 24.',
        mapsUrl: 'https://www.google.com/maps/search/q=Rua+Coberta+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd1-4', name: 'Igreja de São Pedro', emoji: '⛪', category: 'culture',
        description: 'Marco arquitetônico germânico no coração de Gramado, construída em 1942.',
        address: 'R. São Pedro, Centro, Gramado - RS',
        lat: -29.3803, lng: -50.8750,
        time: '17:45', duration: '20min',
        price: 'Gratuito', priceValue: 0,
        hours: 'Visitação: 8h–20h',
        tips: 'A 2 minutos da Rua Coberta. Combine no mesmo passeio a pé.',
        mapsUrl: 'https://www.google.com/maps/search/q=Igreja+São+Pedro+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd1-5', name: 'Fonte do Amor Eterno', emoji: '💕', category: 'attraction',
        description: 'Ponto romântico icônico onde casais colocam cadeados e jogam moedas. Símbolo de amor eterno de Gramado.',
        address: 'Av. Borges de Medeiros, Centro, Gramado - RS',
        lat: -29.3794, lng: -50.8742,
        time: '18:10', duration: '20min',
        price: 'Gratuito · Cadeado: ~R$ 30 nas lojas ao redor',
        priceValue: 0,
        hours: 'Aberto 24h',
        tips: 'Jogue uma moeda: a lenda diz que você voltará a Gramado!',
        mapsUrl: 'https://www.google.com/maps/search/q=Fonte+do+Amor+Eterno+Gramado+RS',
        primeGourmet: false, open: true,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    day: 2, date: '20 Jul', weekday: 'Domingo',
    title: 'Canela', subtitle: 'Space Adventure · Alpen Park · Skyglass · Jolimont',
    accentColor: '#6a1b9a',
    attractions: [
      {
        id: 'd2-1', name: 'Space Adventure', emoji: '🚀', category: 'attraction',
        description: '+270 artefatos originais da NASA. Simulador de decolagem, cápsula Apollo 11, Saturno V e planetário 4K.',
        address: 'Av. Dom Luiz Guanella, 960, Canela - RS',
        lat: -29.3630, lng: -50.8603,
        time: '09:00', duration: '2h',
        price: 'A partir de R$ 80/adulto · Planetário 4K: +R$ 50',
        priceValue: 2,
        hours: 'Julho: todos os dias 9h–19h (bilheteria até 18h)',
        tips: 'O planetário 4K vale muito — sessões a cada 20min. Uma das atrações mais impressionantes da Serra.',
        mapsUrl: 'https://www.google.com/maps/search/q=Space+Adventure+Canela+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd2-2', name: 'Alpen Park', emoji: '🎢', category: 'attraction',
        description: 'Trenó alpino importado da Alemanha, montanha-russa, tirolesas, arvorismo e cinema 4D.',
        address: 'Rodovia Arnaldo Oppitz, s/n, Canela - RS',
        lat: -29.3557, lng: -50.8299,
        time: '11:30', duration: '2h',
        price: 'Sem ingresso de entrada · Passaporte (6 atrações): ~R$ 120–180/adulto',
        priceValue: 2,
        hours: 'Todos os dias: 9h–18h',
        tips: '🏷️ PRIME GOURMET: aceita no Trenó Alpino! Estacionamento gratuito.',
        mapsUrl: 'https://www.google.com/maps/search/q=Alpen+Park+Canela+RS',
        primeGourmet: true, primeNote: 'Aceita Prime Gourmet no Trenó Alpino', open: true,
      },
      {
        id: 'd2-3', name: 'Skyglass Canela', emoji: '🌉', category: 'attraction',
        description: 'Maior plataforma de vidro e aço do mundo a 360m sobre o Vale da Ferradura. Monotrilho "Abusado" com cadeiras suspensas.',
        address: 'Estrada Municipal CNL 350, 9800, Canela - RS',
        lat: -29.3185, lng: -50.9137,
        time: '14:00', duration: '1h30',
        price: 'Plataforma: R$ 99/adulto · Com Abusado: R$ 159 · Meia: R$ 65',
        priceValue: 2,
        hours: 'Todos os dias: 9h–18h',
        tips: '🏷️ PRIME GOURMET: confirmar no app. Estacionamento: R$ 20/3h. Saia direto do Alpen Park.',
        mapsUrl: 'https://www.google.com/maps/search/q=Skyglass+Canela+RS',
        primeGourmet: true, primeNote: 'Aceita Prime Gourmet — confirmar no app', open: true,
      },
      {
        id: 'd2-4', name: 'Vinícola Jolimont', emoji: '🍷', category: 'experience',
        description: 'Tour completo com degustação de vinhos, espumantes e charcutaria. Uma das melhores experiências enológicas da Serra.',
        address: 'Estrada Morro Calçado, 1420, Canela - RS',
        lat: -29.3710, lng: -50.8480,
        time: '16:00', duration: '1h30',
        price: '~R$ 80–100/adulto (degustação + taça inclusa)',
        priceValue: 2,
        hours: 'Todos os dias: 9h–16h30 · Último acesso às 16h45',
        tips: '🏷️ PRIME GOURMET: aceita! Funciona até em dias de chuva. Cupom GRAMADOBLOG: 5% off online.',
        mapsUrl: 'https://www.google.com/maps/search/q=Vinicola+Jolimont+Canela+RS',
        primeGourmet: true, primeNote: 'Aceita Prime Gourmet', open: true,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    day: 3, date: '21 Jul', weekday: 'Segunda',
    title: 'Neve & Gelo', subtitle: 'Snowland · Mundo Gelado · Alice · ⚠️ Caracol/Garden fechados hoje',
    accentColor: '#0288d1',
    attractions: [
      {
        id: 'd3-1', name: 'Snowland ❄️', emoji: '🏔️', category: 'attraction',
        description: 'Único parque de neve indoor das Américas. Neve de verdade a -5 / -10°C. Ski, snowboard, tubing, patinação no gelo.',
        address: 'RS-235, 9009, Gramado - RS',
        lat: -29.3938, lng: -50.922,
        time: '10:00', duration: '4h',
        price: 'A partir de R$ 199,90/adulto · Com Prime Gourmet: R$ 259 para 2!',
        priceValue: 3,
        hours: 'Diariamente: 10h–17h (em julho aberto também às segundas)',
        tips: '🏷️ PRIME GOURMET: R$ 259 para o casal (pague 1, leve 2)! Só pode usar após 12h — entre às 10h sem Prime e use o benefício em outro item do parque. Kit de roupas incluso.',
        mapsUrl: 'https://www.google.com/maps/search/q=Snowland+Gramado+RS',
        primeGourmet: true, primeNote: 'R$ 259 para 2 adultos (pague 1 leve 2) — somente após 12h', open: true,
      },
      {
        id: 'd3-2', name: 'Mundo Gelado', emoji: '🧊', category: 'attraction',
        description: 'Esculturas de gelo temáticas em ambiente a -10°C. Slides de gelo e cenários iluminados para fotos incríveis.',
        address: 'Av. das Hortênsias, 3830, Gramado - RS',
        lat: -29.3780, lng: -50.8690,
        time: '15:00', duration: '1h',
        price: '~R$ 60–80/adulto · Kit de roupas frias incluso',
        priceValue: 2,
        hours: 'Todos os dias: 9h–18h',
        tips: 'Aberto às segundas — boa opção de complemento pós-Snowland. As fotos no gelo ficam incríveis.',
        mapsUrl: 'https://www.google.com/maps/search/q=Mundo+Gelado+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd3-3', name: 'Alice e o Chapeleiro', emoji: '🎩', category: 'food',
        description: 'Restaurante temático inspirado em Alice no País das Maravilhas. Ambiente único, super fotogênico e pratos criativos.',
        address: 'Av. Borges de Medeiros, 3166, Gramado - RS',
        lat: -29.381, lng: -50.8702,
        time: '19:00', duration: '1h30',
        price: '~R$ 60–100/pessoa',
        priceValue: 2,
        hours: 'Todos os dias: 12h–23h',
        tips: '⭐ 4.8 — Reserve com antecedência, especialmente em julho. O ambiente é o grande diferencial.',
        mapsUrl: 'https://www.google.com/maps/search/q=Alice+e+o+Chapeleiro+Gramado+RS',
        primeGourmet: false, open: true,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    day: 4, date: '22 Jul', weekday: 'Terça',
    title: 'Natureza', subtitle: '⚠️ nabs não vem · Caracol · Garden Park · Hard Café',
    accentColor: '#558b2f',
    nabs: true,
    attractions: [
      {
        id: 'd4-1', name: 'Parque do Caracol', emoji: '🌊', category: 'nature',
        description: 'Cascata do Caracol com 131m de queda livre. Trilhas na mata nativa, bondinho aéreo e mirante. Fechado às segundas — por isso é hoje.',
        address: 'RS-466, Canela - RS',
        lat: -29.313, lng: -50.852,
        time: '09:00', duration: '3h',
        price: '~R$ 35–50/adulto · Bondinho Aéreo: ~R$ 80–100 (separado)',
        priceValue: 1,
        hours: 'Ter–Dom: 8h30–17h30 · Fechado às segundas',
        tips: '🏷️ PRIME GOURMET: aceita nos Bondinhos Aéreos! Terça com menos fila que fim de semana.',
        mapsUrl: 'https://www.google.com/maps/search/q=Parque+Estadual+do+Caracol+Canela+RS',
        primeGourmet: true, primeNote: 'Prime Gourmet aceito nos Bondinhos Aéreos', open: true,
      },
      {
        id: 'd4-2', name: 'Garden Park', emoji: '🌸', category: 'nature',
        description: '150 mil m² de jardins com 50 mil flores, trilhas na mata nativa, pontes suspensas e araucárias centenárias.',
        address: 'Av. das Hortênsias, 4902, Gramado - RS',
        lat: -29.3737, lng: -50.8528,
        time: '13:00', duration: '2h',
        price: '~R$ 70–90/adulto · Ingresso válido por 7 dias!',
        priceValue: 2,
        hours: 'Ter–Dom: 9h–18h · Fechado às segundas',
        tips: 'Ingresso válido por 7 dias — pode sair e voltar. Compre antecipado com cupom GRAMADOBLOG.',
        mapsUrl: 'https://www.google.com/maps/search/q=Garden+Park+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd4-3', name: 'Hard Café', emoji: '🎸', category: 'food',
        description: 'Hard Rock Café de Gramado: ambiente temático de rock, show ao vivo, hamburgers e drinques. Ótima noite solo.',
        address: 'Av. Borges de Medeiros, Gramado - RS',
        lat: -29.3810, lng: -50.8720,
        time: '20:00', duration: '2h',
        price: '~R$ 80–150/pessoa (jantar + entrada)',
        priceValue: 3,
        hours: 'A partir das 19h (consultar shows)',
        tips: '🏷️ PRIME GOURMET: aceita! Ótima pedida para a noite solo de terça.',
        mapsUrl: 'https://www.google.com/maps/search/q=Hard+Rock+Cafe+Gramado+RS',
        primeGourmet: true, primeNote: 'Aceita Prime Gourmet', open: true,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    day: 5, date: '23 Jul', weekday: 'Quarta',
    title: 'Último Dia', subtitle: '⚠️ nabs não vem · 🕛 Até meio-dia · Chocolaterias',
    accentColor: '#e65100',
    nabs: true,
    halfDay: true,
    attractions: [
      {
        id: 'd5-1', name: 'Museu Festival de Cinema', emoji: '🎬', category: 'culture',
        description: 'Museu do famoso Festival de Cinema de Gramado: troféus Kikito, fotos históricas e exposições interativas.',
        address: 'Av. Borges de Medeiros, 631, Gramado - RS',
        lat: -29.3790, lng: -50.8742,
        time: '09:00', duration: '1h',
        price: '~R$ 15–20/adulto',
        priceValue: 0,
        hours: 'Ter–Dom: 10h–18h · Confirmar horário às quintas',
        tips: 'Entrada simbólica e ótima janela cultural. Fica no centro — a caminho das chocolaterias.',
        mapsUrl: 'https://www.google.com/maps/search/q=Museu+Festival+Cinema+Gramado+RS',
        primeGourmet: false, open: true,
        openNote: 'Confirmar abertura às quintas-feiras',
      },
      {
        id: 'd5-2', name: 'Estação Campos de Canela', emoji: '🚂', category: 'experience',
        description: 'Histórica estação com a Maria Fumaça percorrendo a Serra Gaúcha entre araucárias. Alternativa rápida de manhã.',
        address: 'R. Felisberto Soares, Canela - RS',
        lat: -29.3580, lng: -50.8152,
        time: '08:30', duration: '1h30',
        price: 'Visita à estação: gratuito · Maria Fumaça: ~R$ 60–100/adulto',
        priceValue: 1,
        hours: 'Confirmar horários no site do Trem das Araucárias',
        tips: 'Se o horário do trem não encaixar até meio-dia, visite só a estação (gratuita) e siga para as chocolaterias.',
        mapsUrl: 'https://www.google.com/maps/search/q=Estacao+Ferroviaria+Canela+RS',
        primeGourmet: false, open: true,
        openNote: 'Confirmar horário da Maria Fumaça — saída até meio-dia',
      },
      {
        id: 'd5-3', name: 'Planeta Chocolate 🍫', emoji: '🍫', category: 'shopping',
        description: 'Museu interativo do chocolate com demonstrações, degustações e loja completa. Perfeito para comprar lembranças.',
        address: 'Av. das Hortênsias, 4100, Gramado - RS',
        lat: -29.3755, lng: -50.8665,
        time: '10:00', duration: '45min',
        price: '~R$ 40–60/adulto (inclui degustação) · Loja: gratuita',
        priceValue: 1,
        hours: 'Seg–Dom: 9h–19h',
        tips: 'Último dia — compre os chocolates para levar! A loja de venda é separada e gratuita.',
        mapsUrl: 'https://www.google.com/maps/search/q=Planeta+Chocolate+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd5-4', name: 'Casa Lugano', emoji: '🍕', category: 'shopping',
        description: 'Chocolates artesanais Lugano, sorvete na casca de chocolate viral, pizzas napoletanas. Última parada antes de ir.',
        address: 'Av. Borges de Medeiros, 152, Gramado - RS',
        lat: -29.3779, lng: -50.8739,
        time: '11:00', duration: '1h',
        price: 'Chocolates: a partir de R$ 20 · Sorvete na casca: ~R$ 30',
        priceValue: 1,
        hours: 'Todos os dias: 11h–23h',
        tips: '🏷️ PRIME GOURMET: aceita! Experimente o sorvete na casca e leve caixas de presente. Saída depois daqui!',
        mapsUrl: 'https://www.google.com/maps/search/q=Casa+Lugano+Gramado+RS',
        primeGourmet: true, primeNote: 'Aceita Prime Gourmet', open: true,
      },
      {
        id: 'd5-5', name: 'Bento Gonçalves (alternativa)', emoji: '🍇', category: 'experience',
        description: 'Capital gaúcha do vinho a ~1h20 de Gramado. Se preferirem trocar o dia 24 por um passeio de dia inteiro anterior.',
        address: 'Bento Gonçalves - RS (70km de Gramado)',
        lat: -29.1700, lng: -51.5190,
        time: '—', duration: 'Dia inteiro',
        price: 'Tour com transporte: ~R$ 150–250/pessoa · Vinícolas: ~R$ 50–100 por local',
        priceValue: 2,
        hours: 'Vinícolas geralmente 9h–17h',
        tips: '💡 Opção alternativa: encaixe em um dos dias sem nabs (22 ou 23) como passeio de dia inteiro, no lugar de algumas atrações de Canela.',
        mapsUrl: 'https://www.google.com/maps/search/q=Bento+Goncalves+RS',
        primeGourmet: false, open: true,
      },
    ],
  },


  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    day: 6, date: '24 Jul', weekday: 'Quinta',
    title: 'Parques', subtitle: 'Mini Mundo · Museu de Cera · Lumni à noite',
    accentColor: '#1565c0',
    attractions: [
      {
        id: 'd6-1', name: 'Mini Mundo', emoji: '🏰', category: 'attraction',
        description: 'Réplicas em escala 1:24 de monumentos do mundo inteiro, com mini-personagens escondidos e detalhes incríveis.',
        address: 'Av. das Hortênsias, 4100, Gramado - RS',
        lat: -29.3843, lng: -50.8758,
        time: '09:00', duration: '1h30',
        price: '~R$ 85–100/adulto (alta temporada) · Compre online.',
        priceValue: 2,
        hours: 'Todos os dias: 9h–17h',
        tips: '⭐ 4.8 — Procure os mini-personagens escondidos nas maquetes. Chegue cedo: domingo é movimentado.',
        mapsUrl: 'https://www.google.com/maps/search/q=Mini+Mundo+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd6-2', name: 'Museu de Cera Dreamland', emoji: '🎭', category: 'culture',
        description: 'Primeiro museu de cera para entretenimento da América Latina. +100 figuras de celebridades em tamanho real.',
        address: 'Av. das Hortênsias, 5507, Gramado - RS',
        lat: -29.361, lng: -50.8487,
        time: '11:30', duration: '1h',
        price: 'Individual: ~R$ 90–155/adulto · Passaporte Dreams (7 atrações): R$ 289,90',
        priceValue: 2,
        hours: 'Todos os dias: 8h–19h',
        tips: 'O Passaporte Dreams inclui Super Carros, Harley Show e mais — vale se quiser outras atrações do grupo.',
        mapsUrl: 'https://www.google.com/maps/search/q=Dreamland+Museu+de+Cera+Gramado+RS',
        primeGourmet: false, open: true,
      },
      {
        id: 'd6-3', name: 'Lumni Experience', emoji: '✨', category: 'experience',
        description: 'Parque de luzes noturno com instalações imersivas: Árvore da Vida, Túnel de Luzes, Jardim das Tulipas e campo iluminado.',
        address: 'Estr. da Tapera, 2900, Gramado - RS',
        lat: -29.3965, lng: -50.8690,
        time: '18:30', duration: '2h',
        price: '~R$ 60–90/adulto',
        priceValue: 2,
        hours: 'Todos os dias: 18h–00h · Campo iluminado encerra às 22h',
        tips: '🏷️ PRIME GOURMET: aceita! Atração noturna — ideal no inverno de julho. Leve casaco pesado.',
        mapsUrl: 'https://www.google.com/maps/search/q=Lumni+Experience+Gramado+RS',
        primeGourmet: true, primeNote: 'Aceita Prime Gourmet (2 por 1)', open: true,
      },
    ],
  },
];
