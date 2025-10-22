import type { TimelineEvent, BandMember, TourLocation } from './types';

// General Site Configuration
export const config = {
  header: {
    title: 'KALEO',
    subtitle: 'Ministério de Louvor da IBPAZ',
    bgImageUrl: 'https://images.weserv.nl/?url=https%3A%2F%2Fscontent-for2-2.cdninstagram.com%2Fv%2Ft51.82787-15%2F554982451_18304620994216915_7180656637068907892_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26_nc_cat%3D103%26ig_cache_key%3DMzczMTg4ODQ4ODIxNzIzMzI2NQ%253D%253D.3-ccb1-7%26ccb%3D1-7%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4OTU5LnNkci5DMyJ9%26_nc_ohc%3Dzv9s8PrPbeQQ7kNvwGwDeDG%26_nc_oc%3DAdkRYEbabgUBzqoUvYv7MLS_aD3pfDtKbxCQCb5MqetA-CyUFDRcYlusMf1NgcSTMVURPTIZlhRVerRDl9Apf7nW%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-for2-2.cdninstagram.com%26_nc_gid%3DQklDljX4OXSEqESEZeiMxQ%26oh%3D00_AfcWWbXXYOqD8NdMb00sLOLkyNVmK94yyMk1GS9j0y375g%26oe%3D68FCAC47&output=jpg',
  },
about: {
  title: 'Nossa História',
  paragraphs: [
    ' o ministério surgiu com o desejo de usar a música como instrumento de transformação, proclamando o Evangelho através do som, da arte e da paixão por Jesus.',
    'Idealizada para o rock cristão, a banda começou lançando canções como “Te Buscar” e “Meu Bem Maior”, que rapidamente tocaram corações. No ano seguinte, impulsionados pelo pastor Esdras Antunes, líder da rede jovem da época, o grupo lançou outras músicas marcantes, como “Mais que Palavras”, “Apascenta-me”, “Céu na Terra” e “Prosseguir” — canções que firmaram a identidade da banda e culminaram no lançamento do álbum Prosseguir, durante a conferência de jovens Somos o Povo da Cruz.',
    'Desde então, o KALEO tem caminhado firme, participando de eventos dentro e fora das igrejas, ministrando em conferências, marchas e encontros pelo estado do Maranhão e em outras regiões. Ao longo dos anos, muitas formações se revezaram, mas o coração do ministério permanece o mesmo: servir com sede e favor no Reino de Deus.',
    'Hoje, após 11 anos de história, o KALEO segue sendo uma voz viva que inspira fé, unidade e adoração genuína — proclamando que vale a pena prosseguir quando o foco é Cristo.'
  ],
},
  instagram: {
      embedUrl: 'https://www.instagram.com/ministeriokaleooficial/embed/',
      profileUrl: 'https://www.instagram.com/ministeriokaleooficial/',
  },
  footer: {
      copyright: `KALEO Ministério de Louvor. Todos os direitos reservados.`,
      ministryInfo: 'Ministério IBPAZ - Apóstolos Paulo Jorge Tavares e Sílvia Tavares.'
  }
};

// Timeline Data
export const timelineData: TimelineEvent[] = [
  { 
    id: 1, 
    year: '2014', 
    description: 'Fundação da banda Kaleo no segundo semestre.',
    imageUrl: 'https://images.weserv.nl/?url=https%3A%2F%2Fscontent-for2-1.cdninstagram.com%2Fv%2Ft51.2885-15%2F24175367_370353086725102_1907962500247191552_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjg2NHg4NjQuc2RyLmYyODg1LmRlZmF1bHRfaW1hZ2UuYzIifQ%26_nc_ht%3Dscontent-for2-1.cdninstagram.com%26_nc_cat%3D110%26_nc_oc%3DQ6cZ2QF2LjbCBG99nc6hYidqZ-9jTDu9d7zZR_rITsuIxV3BZ2MBVHLdh82utSU530kxQaGCtImvPtkVkBaqpqRxcOQd%26_nc_ohc%3Duz-FkPlFUccQ7kNvwEYPjmv%26_nc_gid%3DFMuobH5ap0Q654tX36X9TQ%26edm%3DAPoiHPcBAAAA%26ccb%3D7-5%26ig_cache_key%3DMTY1NDgwMTk1NTM0NTk3Mjc4NQ%253D%253D.3-ccb7-5%26oh%3D00_Afe3UAQ7NU54wiN_WN9QQ7K_S-MnUbo0G2O1__MJ85ndBQ%26oe%3D68FC9459%26_nc_sid%3D22de04&output=jpg'
  },
  { 
    id: 2, 
    year: '2015', 
    description: 'Lançamento do CD Prosseguir na conferência "Somos o povo da cruz".',
    imageUrl: 'https://i.imgur.com/fJCHdWb.jpeg'
  },
  { 
    id: 3, 
    year: '2018', 
    description: 'Participação na Marcha para Jesus.',
    imageUrl: 'https://images.weserv.nl/?url=https%3A%2F%2Fscontent-for2-1.cdninstagram.com%2Fv%2Ft51.2885-15%2F33567749_185174202141923_6140482943153340416_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNDB4NzgwLnNkci5mMjg4NS5kZWZhdWx0X2ltYWdlLmMyIn0%26_nc_ht%3Dscontent-for2-1.cdninstagram.com%26_nc_cat%3D111%26_nc_oc%3DQ6cZ2QFgr2IYx0x7T4p-hbYcenprX0KFSuTCjAi2mz3R8xkvO6DquAUb-Bi7ptkY-9V0-g1xtrU6kBikANJSm68FPQGo%26_nc_ohc%3De5CQRLeL-qEQ7kNvwHVp7mV%26_nc_gid%3DnP_IHN8NhgQygKAndifEYA%26edm%3DAPoiHPcBAAAA%26ccb%3D7-5%26ig_cache_key%3DMTc5MjI4Mjg4MDMzNzMxMDE4Mg%253D%253D.3-ccb7-5%26oh%3D00_Afe4PKjm4VJGc47mmVbiy7UCandlDV59sSug0B2d2NdiUQ%26oe%3D68FCBFBE%26_nc_sid%3D22de04&output=jpg'
  },
  { 
    id: 4, 
    year: '2024', 
    description: 'Participação na Marcha para Jesus em CAXIAS.',
    imageUrl: 'https://images.weserv.nl/?url=https%3A%2F%2Fscontent-for2-2.cdninstagram.com%2Fv%2Ft51.29350-15%2F456697441_734922595426484_1051321183568928338_n.webp%3Fstp%3Ddst-jpg_e35_p640x640_sh0.08_tt6%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ%26_nc_ht%3Dscontent-for2-2.cdninstagram.com%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QGoe3AxzO2qaHiXxZJ8HTJobEPXn7gCPW0mVHUULg9k3sKwsf4h0wMwNMe35rX68NNBlbffB-8SMudv_-6Y_EwI%26_nc_ohc%3DemXiteodDSYQ7kNvwEIlytG%26_nc_gid%3D-bhVv_x6MXF6XVzR_W_ChA%26edm%3DAP4sbd4BAAAA%26ccb%3D7-5%26ig_cache_key%3DMzQ0MjExNTg4NTg2NDk5NDg5NQ%253D%253D.3-ccb7-5%26oh%3D00_Affx8RMz2cWJlgSvSX5BG08cukfv4b1UzSVGVSzc-iMuow%26oe%3D68FCC353%26_nc_sid%3D7a9f4b&output=jpg'
  },
  { 
    id: 5, 
    year: '2025', 
    description: '11 anos de ministério, continuando com sede e favor pelo Reino de Deus.',
    imageUrl: 'https://images.weserv.nl/?url=https%3A%2F%2Fscontent-for2-2.cdninstagram.com%2Fv%2Ft51.82787-15%2F554982451_18304620994216915_7180656637068907892_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26_nc_cat%3D103%26ig_cache_key%3DMzczMTg4ODQ4ODIxNzIzMzI2NQ%253D%253D.3-ccb1-7%26ccb%3D1-7%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4OTU5LnNkci5DMyJ9%26_nc_ohc%3Dzv9s8PrPbeQQ7kNvwGwDeDG%26_nc_oc%3DAdkRYEbabgUBzqoUvYv7MLS_aD3pfDtKbxCQCb5MqetA-CyUFDRcYlusMf1NgcSTMVURPTIZlhRVerRDl9Apf7nW%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-for2-2.cdninstagram.com%26_nc_gid%3D-bhVv_x6MXF6XVzR_W_ChA%26oh%3D00_AfeY-ywlfutz2ZJZj8QQWAJqa2oaPobSXD3WnGm0Ek75Ug%26oe%3D68FCAC47&output=jpg'
  },
];

// Tour Locations Data
export const locationsData: TourLocation[] = [
    { id: 1, city: 'Barra do Corda', state: 'MA', local: 'Igreja Batista', date: '2023', description: 'Louvor especial Kaleo', latitude: -5.5067, longitude: -45.2409 },
    { id: 2, city: 'Itapecuru Mirim', state: 'MA', local: 'Igreja local', date: '2022', description: 'Noite de adoração', latitude: -3.3923, longitude: -44.358 },
    { id: 3, city: 'Coelho Neto', state: 'MA', local: 'IBPAZ Coelho Neto', date: '2021', description: 'Congresso Jovem', latitude: -4.2526, longitude: -43.0109 },
    { id: 4, city: 'São João do Sóter', state: 'MA', local: 'Igreja Batista', date: '2020', description: 'Louvor Kaleo', latitude: -5.1169, longitude: -43.8168 },
    { id: 5, city: 'Aldeias Altas', state: 'MA', local: 'Igreja local', date: '2019', description: 'Culto especial', latitude: -4.6253, longitude: -43.4708 },
    { id: 6, city: 'Teresina', state: 'PI', local: 'Marcha para Jesus', date: '2024', description: 'Grande participação Kaleo', latitude: -5.0919, longitude: -42.8034 },
];
