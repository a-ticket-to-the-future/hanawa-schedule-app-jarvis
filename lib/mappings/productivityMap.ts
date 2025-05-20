// lib/mappings/productivityMap.ts

export const productivityMap: Record<string, Record<string, number>> = {
  MAS: {
    賞味: 450,
    菓子: 600,
    靴: 210,
    子供肌着: 250,
    ベビー衣料: 250,
    調乳: 330,
    玩具: 235,
    バストイレ: 310,
    靴下: 385,
    パジャマ: 310,
    新生児: 290,
  },
  DAS: {
    男児: 400,
    女児: 400,
    ベビー肌着: 380,
    ベビー衣料: 380,
    菓子: 800,
    MA: 210,
    不定形: 180,
    レインランチ: 230,
  },
  WDA: {
    男児: 120,
    女児: 120,
    前半不定形: 100,
    後半不定形: 85,
  }
};