interface Player {
  name: string;
  hp: number;
  mp: number
  avatarUrl: string;
  attack: number;
  sturdypoint:number
  dexterity:number
  luckyvalue:number
  spiritualintuition:number
  stamina:number
  intelligence:number
  faith:number
  armourclass:number
  physicaldefense:number
  magicaldefense:number
  criticalhit:number
  Skillid1:number
  Skillname1:string
  Skillharm1:number
  Skilltypes1:number
  Skillskillinfo1:string
  Skillattckinfo1:string
  Skillendinfo1:string
  getSkill1consumptionofmagic:number
  Skillid2:number
  Skillname2:string
  Skillharm2:number
  Skilltypes2:number
  Skillskillinfo2:string
  Skillattckinfo2:string
  Skillendinfo2:string
  getSkill2consumptionofmagic:number
  Skillid3:number
  Skillname3:string
  Skillharm3:number
  Skilltypes3:number
  Skillskillinfo3:string
  Skillattckinfo3:string
  Skillendinfo3:string
  getSkill3consumptionofmagic:number
  getPrimaryweaponname:string
  getPrimaryweaponharm:number
  getPrimaryweapontypes:number
  getPrimaryweaponfightkirelease:number
  getPrimaryweaponmagicrelease:number
  getSecondaryweaponname:string
  getSecondaryweaponharm:number
  getSecondaryweapontypes:number
  getSecondaryweaponfightkirelease:number
  getSecondaryweaponmagicrelease:number
}

interface BattleLog {
  player1: Player;
  player2: Player;
  action: string;
  result: string;
  player1Hp: number;
  player1Mp: number;
  player2Hp: number;
  player2Mp: number;
}

// 初始玩家数据
function createPlayer(name: string,
                      avatarUrl: string,
                      hp: number,
                      mp:number,
                      attack: number,
                      sturdypoint:number,
                      dexterity:number,
                      luckyvalue:number,
                      spiritualintuition:number,
                      stamina:number,
                      intelligence:number,
                      faith:number,
                      armourclass:number,
                      physicaldefense:number,
                      magicaldefense:number,
                      criticalhit:number,
                      Skillid1:number,
                      Skillname1:string,
                      Skillharm1:number,
                      Skilltypes1:number,
                      Skillskillinfo1:string,
                      Skillattckinfo1:string,
                      Skillendinfo1:string,
                      getSkill1consumptionofmagic:number,
                      Skillid2:number,
                      Skillname2:string,
                      Skillharm2:number,
                      Skilltypes2:number,
                      Skillskillinfo2:string,
                      Skillattckinfo2:string,
                      Skillendinfo2:string,
                      getSkill2consumptionofmagic:number,
                      Skillid3:number,
                      Skillname3:string,
                      Skillharm3:number,
                      Skilltypes3:number,
                      Skillskillinfo3:string,
                      Skillattckinfo3:string,
                      Skillendinfo3:string,
                      getSkill3consumptionofmagic:number,
                      getPrimaryweaponname1:string,
                      getPrimaryweaponharm1:number,
                      getPrimaryweapontypes1:number,
                      getPrimaryweaponfightkirelease1:number,
                      getPrimaryweaponmagicrelease1:number,
                      getSecondaryweaponname1:string,
                      getSecondaryweaponharm1:number,
                      getSecondaryweapontypes1:number,
                      getSecondaryweaponfightkirelease1:number,
                      getSecondaryweaponmagicrelease1:number, ): Player {
  return { name: name,
    hp: hp,
    mp:mp,
    avatarUrl: avatarUrl,
    attack: attack ,
    sturdypoint:sturdypoint,
    dexterity:dexterity,
    luckyvalue:luckyvalue,
    spiritualintuition:spiritualintuition,
    stamina:stamina,
    intelligence:intelligence,
    faith:faith,
    armourclass:armourclass,
    physicaldefense:physicaldefense,
    magicaldefense:magicaldefense,
    criticalhit:criticalhit,
    Skillid1:Skillid1,
    Skillname1:Skillname1,
    Skillharm1:Skillharm1,
    Skilltypes1:Skilltypes1,
    Skillskillinfo1:Skillskillinfo1,
    Skillattckinfo1:Skillattckinfo1,
    Skillendinfo1:Skillendinfo1,
    getSkill1consumptionofmagic:getSkill1consumptionofmagic,
    Skillid2:Skillid2,
    Skillname2:Skillname2,
    Skillharm2:Skillharm2,
    Skilltypes2:Skilltypes2,
    Skillskillinfo2:Skillskillinfo2,
    Skillattckinfo2:Skillattckinfo2,
    Skillendinfo2:Skillendinfo2,
    getSkill2consumptionofmagic:getSkill2consumptionofmagic,
    Skillid3:Skillid3,
    Skillname3:Skillname3,
    Skillharm3:Skillharm3,
    Skilltypes3:Skilltypes3,
    Skillskillinfo3:Skillskillinfo3,
    Skillattckinfo3:Skillattckinfo3,
    Skillendinfo3:Skillendinfo3,
    getSkill3consumptionofmagic:getSkill3consumptionofmagic,
    getPrimaryweaponname:getPrimaryweaponname1,
    getPrimaryweaponharm:getPrimaryweaponharm1,
    getPrimaryweapontypes:getPrimaryweapontypes1,
    getPrimaryweaponfightkirelease:getPrimaryweaponfightkirelease1,
    getPrimaryweaponmagicrelease:getPrimaryweaponmagicrelease1,
    getSecondaryweaponname:getSecondaryweaponname1,
    getSecondaryweaponharm:getSecondaryweaponharm1,
    getSecondaryweapontypes:getSecondaryweapontypes1,
    getSecondaryweaponfightkirelease:getSecondaryweaponfightkirelease1,
    getSecondaryweaponmagicrelease:getSecondaryweaponmagicrelease1 };
}

function getRandomAction(): string {
  // 定义动作及其对应的权重
  const actions = [
    // { action: '近身攻击', weight: 0.05 }, // 10% 概率
    { action: '武器攻击', weight: 0.4 }, // 60% 概率
    { action: '技能攻击', weight: 0.6 }  // 40% 概率
  ];

  // 计算总权重
  const totalWeight = actions.reduce((sum, action) => sum + action.weight, 0);

  // 生成一个介于 0 和 totalWeight 之间的随机数
  let random = Math.random() * totalWeight;

  // 根据权重选择动作
  for (const action of actions) {
    if (random < action.weight) {
      return action.action;
    }
    random -= action.weight;
  }

  // 默认返回第一个动作（理论上不会执行到这里）
  return actions[0].action;
}

function simulateBattle(player1: Player, player2: Player): BattleLog[] {
  const battleLogs: BattleLog[] = [];
  let round = 0;
  const maxRounds = 50;

  // 计算伤害
  //挥拳伤害
  //py1挥拳
  const hurt101 = Math.round(0.7 * player1.sturdypoint) + player1.attack
  const hurt102 = hurt101 * 1.3
  //py2挥拳
  const hurt201 = Math.round(0.7 * player2.sturdypoint) + player2.attack
  const hurt202 = hurt201 * 1.3
  //技能伤害
  //py1
  const hurt103 = Math.round((player1.attack * 1.7) + (0.7 * player1.sturdypoint) + player1.Skillharm1)
  const hurt104 = hurt103 * 1.5
  const hurt105 = Math.round((player1.attack * 1.7) + (0.7 * player1.sturdypoint) + player1.Skillharm2)
  const hurt106 = hurt105 * 1.5
  const hurt107 = Math.round((player1.attack * 1.7) + (0.7 * player1.sturdypoint) + player1.Skillharm3)
  const hurt108 = hurt107 * 1.5
  const hurt109 = Math.round((player1.intelligence * 1.9) + (0.3 * player1.sturdypoint) + player1.Skillharm1)
  const hurt110 = hurt109 * 1.7
  const hurt111 = Math.round((player1.intelligence * 1.9) + (0.3 * player1.sturdypoint) + player1.Skillharm2)
  const hurt112 = hurt111 * 1.7
  const hurt113 = Math.round((player1.intelligence * 1.9) + (0.3 * player1.sturdypoint) + player1.Skillharm3)
  const hurt114 = hurt113 * 1.7
  //py2
  const hurt203 = Math.round((player2.attack * 1.7) + (0.7 * player2.sturdypoint) + player2.Skillharm1)
  const hurt204 = hurt203 * 1.5
  const hurt205 = Math.round((player2.attack * 1.7) + (0.7 * player2.sturdypoint) + player2.Skillharm2)
  const hurt206 = hurt205 * 1.5
  const hurt207 = Math.round((player2.attack * 1.7) + (0.7 * player2.sturdypoint) + player2.Skillharm3)
  const hurt208 = hurt207 * 1.5
  const hurt209 = Math.round((player2.intelligence * 1.9) + (0.3 * player2.sturdypoint) + player2.Skillharm1)
  const hurt210 = hurt209 * 1.7
  const hurt211 = Math.round((player2.intelligence * 1.9) + (0.3 * player2.sturdypoint) + player2.Skillharm2)
  const hurt212 = hurt211 * 1.7
  const hurt213 = Math.round((player2.intelligence * 1.9) + (0.3 * player2.sturdypoint) + player2.Skillharm3)
  const hurt214 = hurt213 * 1.7
  //武器伤害
  //py1
  const hurt151 = Math.round((player1.attack * 1.7 + player1.getSecondaryweaponharm * 0.7) + (0.9 * player1.sturdypoint) + player1.getPrimaryweaponharm)
  const hurt152 = hurt151 * 1.5
  const hurt153 = Math.round((player1.attack * 1.5) + (0.9 * player1.sturdypoint) + player1.getPrimaryweaponharm)
  const hurt154 = hurt153 * 1.5
  const hurt155 = Math.round((player1.attack * 1.5) + (0.9 * player1.sturdypoint) + player1.getSecondaryweaponharm)
  const hurt156 = hurt155 * 1.5
  const hurt157 = Math.round((player1.intelligence * 1.9 + player1.getSecondaryweaponharm * 0.7 + (0.3 * player1.sturdypoint) + player1.getPrimaryweaponharm))
  const hurt158 = hurt157 * 1.5
  const hurt159 = Math.round((player1.intelligence * 1.7 + (0.3 * player1.sturdypoint) + player1.getPrimaryweaponharm))
  const hurt160 = hurt159 * 1.5
  const hurt161 = Math.round((player1.intelligence * 1.7 + (0.3 * player1.sturdypoint) + player1.getSecondaryweaponharm))
  const hurt162 = hurt161 * 1.5
  //py2
  const hurt251 = Math.round((player2.attack * 1.7 + player2.getSecondaryweaponharm * 0.7) + (0.9 * player2.sturdypoint) + player2.getPrimaryweaponharm)
  const hurt252 = hurt251 * 1.5
  const hurt253 = Math.round((player2.attack * 1.5) + (0.9 * player2.sturdypoint) + player2.getPrimaryweaponharm)
  const hurt254 = hurt253 * 1.5
  const hurt255 = Math.round((player2.attack * 1.5) + (0.9 * player2.sturdypoint) + player2.getSecondaryweaponharm)
  const hurt256 = hurt255 * 1.5
  const hurt257 = Math.round((player2.intelligence * 1.9 + player2.getSecondaryweaponharm * 0.7 + (0.3 * player2.sturdypoint) + player2.getPrimaryweaponharm))
  const hurt258 = hurt257 * 1.5
  const hurt259 = Math.round((player2.intelligence * 1.7 + (0.3 * player2.sturdypoint) + player2.getPrimaryweaponharm))
  const hurt260 = hurt259 * 1.5
  const hurt261 = Math.round((player2.intelligence * 1.7 + (0.3 * player2.sturdypoint) + player2.getSecondaryweaponharm))
  const hurt262 = hurt261 * 1.5
  //治疗伤害
  //py1
  const treatment115 = Math.round((0.7 * player1.intelligence) + (2 * player1.faith) + player1.Skillharm1)
  const treatment116 = treatment115 * 2
  const treatment117 = Math.round((0.7 * player1.intelligence) + (2 * player1.faith) + player1.Skillharm2)
  const treatment118 = treatment117 * 2
  const treatment119 = Math.round((0.7 * player1.intelligence) + (2 * player1.faith) + player1.Skillharm3)
  const treatment120 = treatment119 * 2
  //py2
  const treatment215 = Math.round((0.7 * player2.intelligence) + (2 * player2.faith) + player2.Skillharm1)
  const treatment216 = treatment215 * 2
  const treatment217 = Math.round((0.7 * player2.intelligence) + (2 * player2.faith) + player2.Skillharm2)
  const treatment218 = treatment217 * 2
  const treatment219 = Math.round((0.7 * player2.intelligence) + (2 * player2.faith) + player2.Skillharm3)
  const treatment220 = treatment219 * 2

  //计算暴击率函数
  function calculateMaxCriticalHit(luckyValue: number): number {
    let maxCriticalHit = Math.round(100 - (luckyValue / 50));
    return Math.max(maxCriticalHit, 50);
  }

// 计算暴击率函数
  function calculateCriticalHitRandom(maxCriticalHit: number): number {
    return Math.floor(Math.random() * maxCriticalHit) + 1;
  }

// 计算随机伤害加成暴击函数
  function calculateHurtCriticalHitRandom(hurtMin: number, hurtMax: number, luckyValue: number): number {
    let hurtCriticalHitRandom = Math.round(Math.floor((Math.random() * (hurtMax - hurtMin + 1) + hurtMin)) + (0.7 * luckyValue));
    return Math.min(hurtCriticalHitRandom, hurtMax);
  }

  //计算治疗函数
  function calculateTheTreatment(randomValue,defense,release){
    let treatment = Math.round(randomValue * (1 - (defense / 100)) * release)
    if(treatment < 0){
      treatment = 1
    }
    return treatment
  }
  //计算治疗暴击函数
  function calculateCriticaTheTreatment(randomValue,defense,baseTreatment, multiplier = 1, release=1){
    let treatment = Math.round((randomValue * (1 - (defense / 100)) + (multiplier * baseTreatment))* release)
    if(treatment < 0){
      treatment = 1
    }
    return treatment
  }
  // 计算伤害函数
  function calculateDamage(randomValue, defense, armourClass, sturdyPoint, multiplier = 1, release=1) {
    let damage = Math.round((randomValue * (1 - (defense / 100)) - multiplier * (armourClass + 0.2 * sturdyPoint)) * release);
    if (damage < 0) {
      damage = 1;
    }
    return damage;
  }
// 计算暴击伤害函数
  function calculateCriticalDamage(randomValue, defense, armourClass, sturdyPoint, baseDamage, multiplier = 1, release=1) {
    let criticalDamage = Math.round((randomValue * (1 - (defense / 100)) - multiplier * (armourClass + 0.2 * sturdyPoint) + (0.5 * baseDamage)) * release);
    if (criticalDamage < 0) {
      criticalDamage = 1;
    }
    return criticalDamage;
  }

  while (player1.hp > 0 && player2.hp > 0 && round < maxRounds) {
    round++;
    const action = getRandomAction();
    let result = '';

// 玩家1的暴击上限和伤害计算
    let maxCriticalHitRandom101 = calculateMaxCriticalHit(player1.luckyvalue);
    let criticalHitRandom1 = calculateCriticalHitRandom(maxCriticalHitRandom101);
    let hurtCriticalHitRandom101 = calculateHurtCriticalHitRandom(hurt101, hurt102, player1.luckyvalue);

// 玩家1的武器伤害计算
    let hurtCriticalHitRandom151 = calculateHurtCriticalHitRandom(hurt151, hurt152, player1.luckyvalue);
    let hurtCriticalHitRandom152 = calculateHurtCriticalHitRandom(hurt153, hurt154, player1.luckyvalue);
    let hurtCriticalHitRandom153 = calculateHurtCriticalHitRandom(hurt155, hurt156, player1.luckyvalue);
    let hurtCriticalHitRandom154 = calculateHurtCriticalHitRandom(hurt157, hurt158, player1.luckyvalue);
    let hurtCriticalHitRandom155 = calculateHurtCriticalHitRandom(hurt159, hurt160, player1.luckyvalue);
    let hurtCriticalHitRandom156 = calculateHurtCriticalHitRandom(hurt161, hurt162, player1.luckyvalue);

// 玩家1的技能暴击伤害计算
    let hurtCriticalHitRandom103 = calculateHurtCriticalHitRandom(hurt103, hurt104, player1.luckyvalue);
    let hurtCriticalHitRandom104 = calculateHurtCriticalHitRandom(hurt105, hurt106, player1.luckyvalue);
    let hurtCriticalHitRandom105 = calculateHurtCriticalHitRandom(hurt107, hurt108, player1.luckyvalue);
    let hurtCriticalHitRandom106 = calculateHurtCriticalHitRandom(hurt109, hurt110, player1.luckyvalue);
    let hurtCriticalHitRandom107 = calculateHurtCriticalHitRandom(hurt111, hurt112, player1.luckyvalue);
    let hurtCriticalHitRandom108 = calculateHurtCriticalHitRandom(hurt113, hurt114, player1.luckyvalue);
    //治疗
    let theTreatmentRandom109 = calculateHurtCriticalHitRandom(treatment116, treatment115, player1.luckyvalue);
    let theTreatmentRandom110 = calculateHurtCriticalHitRandom(treatment118, treatment117, player1.luckyvalue);
    let theTreatmentRandom111 = calculateHurtCriticalHitRandom(treatment120, treatment119, player1.luckyvalue);


// 玩家2的暴击上限和伤害计算
    let maxCriticalHitRandom201 = calculateMaxCriticalHit(player2.luckyvalue);
    let criticalHitRandom2 = calculateCriticalHitRandom(maxCriticalHitRandom201);
    let hurtCriticalHitRandom201 = calculateHurtCriticalHitRandom(hurt201, hurt202, player2.luckyvalue);

// 玩家2的武器伤害计算
    let hurtCriticalHitRandom251 = calculateHurtCriticalHitRandom(hurt251, hurt252, player2.luckyvalue);
    let hurtCriticalHitRandom252 = calculateHurtCriticalHitRandom(hurt253, hurt254, player2.luckyvalue);
    let hurtCriticalHitRandom253 = calculateHurtCriticalHitRandom(hurt255, hurt256, player2.luckyvalue);
    let hurtCriticalHitRandom254 = calculateHurtCriticalHitRandom(hurt257, hurt258, player2.luckyvalue);
    let hurtCriticalHitRandom255 = calculateHurtCriticalHitRandom(hurt259, hurt260, player2.luckyvalue);
    let hurtCriticalHitRandom256 = calculateHurtCriticalHitRandom(hurt261, hurt262, player2.luckyvalue);

// 玩家2的技能暴击伤害计算
    let hurtCriticalHitRandom203 = calculateHurtCriticalHitRandom(hurt203, hurt204, player2.luckyvalue);
    let hurtCriticalHitRandom204 = calculateHurtCriticalHitRandom(hurt205, hurt206, player2.luckyvalue);
    let hurtCriticalHitRandom205 = calculateHurtCriticalHitRandom(hurt207, hurt208, player2.luckyvalue);
    let hurtCriticalHitRandom206 = calculateHurtCriticalHitRandom(hurt209, hurt210, player2.luckyvalue);
    let hurtCriticalHitRandom207 = calculateHurtCriticalHitRandom(hurt211, hurt212, player2.luckyvalue);
    let hurtCriticalHitRandom208 = calculateHurtCriticalHitRandom(hurt213, hurt214, player2.luckyvalue);
    //治疗
    let theTreatmentRandom209 = calculateHurtCriticalHitRandom(treatment216, treatment215, player2.luckyvalue);
    let theTreatmentRandom210 = calculateHurtCriticalHitRandom(treatment218, treatment217, player2.luckyvalue);
    let theTreatmentRandom211 = calculateHurtCriticalHitRandom(treatment220, treatment219, player2.luckyvalue);

// 计算伤害
    //拳击伤害
    //py1
    let hurtEnd101 = calculateDamage(hurtCriticalHitRandom101, player2.physicaldefense, player2.armourclass, player2.sturdypoint);
    let hurtCriticalhitEnd101 = calculateCriticalDamage(hurtCriticalHitRandom101, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd101);

    //py2
    let hurtEnd201 = calculateDamage(hurtCriticalHitRandom201, player1.physicaldefense, player1.armourclass, player1.sturdypoint);
    let hurtCriticalhitEnd201 = calculateCriticalDamage(hurtCriticalHitRandom201, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd201);

    //py1
    //物理武器
    //双手
    let hurtEnd151 = calculateDamage(hurtCriticalHitRandom151, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75);
    let hurtCriticalhitEnd151 = calculateCriticalDamage(hurtCriticalHitRandom151, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd151, 0.75);
    //主武器
    let hurtEnd152 = calculateDamage(hurtCriticalHitRandom152, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75);
    let hurtCriticalhitEnd152 = calculateCriticalDamage(hurtCriticalHitRandom152, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd152, 0.75);
    //副武器
    let hurtEnd153 = calculateDamage(hurtCriticalHitRandom153, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75);
    let hurtCriticalhitEnd153 = calculateCriticalDamage(hurtCriticalHitRandom153, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd153, 0.75);
    //法术武器
    //双手
    let hurtEnd154 = calculateDamage(hurtCriticalHitRandom154, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd154 = calculateCriticalDamage(hurtCriticalHitRandom154, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd154, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    //主武器
    let hurtEnd155 = calculateDamage(hurtCriticalHitRandom155, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd155 = calculateCriticalDamage(hurtCriticalHitRandom155, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd155, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    //副武器
    let hurtEnd156 = calculateDamage(hurtCriticalHitRandom156, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd156 = calculateCriticalDamage(hurtCriticalHitRandom156, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd156, 0.5, player1.getPrimaryweaponmagicrelease / 100);

    //技能
    //物理
    let hurtEnd102 = calculateDamage(hurtCriticalHitRandom103, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75, player1.getPrimaryweaponfightkirelease / 100);
    let hurtCriticalhitEnd102 = calculateCriticalDamage(hurtCriticalHitRandom103, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd102, 0.75, player1.getPrimaryweaponfightkirelease / 100);

    let hurtEnd103 = calculateDamage(hurtCriticalHitRandom104, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75, player1.getPrimaryweaponfightkirelease / 100);
    let hurtCriticalhitEnd103 = calculateCriticalDamage(hurtCriticalHitRandom104, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd103, 0.75, player1.getPrimaryweaponfightkirelease / 100);

    let hurtEnd104 = calculateDamage(hurtCriticalHitRandom105, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75, player1.getPrimaryweaponfightkirelease / 100);
    let hurtCriticalhitEnd104 = calculateCriticalDamage(hurtCriticalHitRandom105, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd104, 0.75, player1.getPrimaryweaponfightkirelease / 100);

    //魔力
    let hurtEnd105 = calculateDamage(hurtCriticalHitRandom106, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd105 = calculateCriticalDamage(hurtCriticalHitRandom106, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd105, 0.5, player1.getPrimaryweaponmagicrelease / 100);

    let hurtEnd106 = calculateDamage(hurtCriticalHitRandom107, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd106 = calculateCriticalDamage(hurtCriticalHitRandom107, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd106, 0.5, player1.getPrimaryweaponmagicrelease / 100);

    let hurtEnd107 = calculateDamage(hurtCriticalHitRandom108, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd107 = calculateCriticalDamage(hurtCriticalHitRandom108, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd107, 0.5, player1.getPrimaryweaponmagicrelease / 100);
    //治疗
    let theTreatmentEnd108 = calculateTheTreatment(theTreatmentRandom109, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentCriticalhitEnd108 = calculateCriticaTheTreatment(theTreatmentRandom109, player2.magicaldefense, theTreatmentEnd108, 0.5, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentEnd109 = calculateTheTreatment(theTreatmentRandom110, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentCriticalhitEnd109 = calculateCriticaTheTreatment(theTreatmentRandom110, player2.magicaldefense, theTreatmentEnd109, 0.5, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentEnd110 = calculateTheTreatment(theTreatmentRandom111, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentCriticalhitEnd110 = calculateCriticaTheTreatment(theTreatmentRandom111, player2.magicaldefense, theTreatmentEnd110, 0.5, player2.getPrimaryweaponmagicrelease / 100)

    //py2
    //物理武器
    //双手
    let hurtEnd251 = calculateDamage(hurtCriticalHitRandom251, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75);
    let hurtCriticalhitEnd251 = calculateCriticalDamage(hurtCriticalHitRandom251, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd251, 0.75);
    //主武器
    let hurtEnd252 = calculateDamage(hurtCriticalHitRandom252, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75);
    let hurtCriticalhitEnd252 = calculateCriticalDamage(hurtCriticalHitRandom252, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd252, 0.75);
    //副武器
    let hurtEnd253 = calculateDamage(hurtCriticalHitRandom253, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75);
    let hurtCriticalhitEnd253 = calculateCriticalDamage(hurtCriticalHitRandom253, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd253, 0.75);
    //法术武器
    //双手
    let hurtEnd254 = calculateDamage(hurtCriticalHitRandom254, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd254 = calculateCriticalDamage(hurtCriticalHitRandom254, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd254, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    //主武器
    let hurtEnd255 = calculateDamage(hurtCriticalHitRandom255, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd255 = calculateCriticalDamage(hurtCriticalHitRandom255, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd255, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    //副武器
    let hurtEnd256 = calculateDamage(hurtCriticalHitRandom256, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd256 = calculateCriticalDamage(hurtCriticalHitRandom256, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd256, 0.5, player2.getPrimaryweaponmagicrelease / 100);

    //技能
    //物理
    let hurtEnd202 = calculateDamage(hurtCriticalHitRandom203, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75, player2.getPrimaryweaponfightkirelease / 100);
    let hurtCriticalhitEnd202 = calculateCriticalDamage(hurtCriticalHitRandom203, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd202, 0.75, player2.getPrimaryweaponfightkirelease / 100);

    let hurtEnd203 = calculateDamage(hurtCriticalHitRandom204, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75, player2.getPrimaryweaponfightkirelease / 100);
    let hurtCriticalhitEnd203 = calculateCriticalDamage(hurtCriticalHitRandom204, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd203, 0.75, player2.getPrimaryweaponfightkirelease / 100);

    let hurtEnd204 = calculateDamage(hurtCriticalHitRandom205, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75, player2.getPrimaryweaponfightkirelease / 100);
    let hurtCriticalhitEnd204 = calculateCriticalDamage(hurtCriticalHitRandom205, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd204, 0.75, player2.getPrimaryweaponfightkirelease / 100);
    //魔力
    let hurtEnd205 = calculateDamage(hurtCriticalHitRandom206, player1.magicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd205 = calculateCriticalDamage(hurtCriticalHitRandom206, player1.magicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd205, 0.5, player2.getPrimaryweaponmagicrelease / 100);

    let hurtEnd206 = calculateDamage(hurtCriticalHitRandom207, player1.magicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd206 = calculateCriticalDamage(hurtCriticalHitRandom207, player1.magicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd206, 0.5, player2.getPrimaryweaponmagicrelease / 100);

    let hurtEnd207 = calculateDamage(hurtCriticalHitRandom208, player1.magicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    let hurtCriticalhitEnd207 = calculateCriticalDamage(hurtCriticalHitRandom208, player1.magicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd207, 0.5, player2.getPrimaryweaponmagicrelease / 100);
    //治疗
    let theTreatmentEnd208 = calculateTheTreatment(theTreatmentRandom209, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentCriticalhitEnd208 = calculateCriticaTheTreatment(theTreatmentRandom209, player2.magicaldefense, theTreatmentEnd208, 0.5, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentEnd209 = calculateTheTreatment(theTreatmentRandom210, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentCriticalhitEnd209 = calculateCriticaTheTreatment(theTreatmentRandom210, player2.magicaldefense, theTreatmentEnd209, 0.5, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentEnd210 = calculateTheTreatment(theTreatmentRandom211, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100)
    let theTreatmentCriticalhitEnd210 = calculateCriticaTheTreatment(theTreatmentRandom211, player2.magicaldefense, theTreatmentEnd210, 0.5, player2.getPrimaryweaponmagicrelease / 100)

    //计算闪避
    let sidestep1 = Math.round(player1.dexterity + 0.7 * player1.sturdypoint + 0.5 * player1.spiritualintuition + 0.5 * player1.stamina)
    let sidestep3 = Math.floor(Math.random() * ((sidestep1 * 2) - sidestep1 + 1)) + sidestep1
    let sidestep2 = Math.round(player2.dexterity + 0.7 * player2.sturdypoint + 0.5 * player2.spiritualintuition + 0.5 * player2.stamina)
    let sidestep4 = Math.floor(Math.random() * ((sidestep2 * 2) - sidestep2 + 1)) + sidestep2

    let maxsidestep3 = Math.round((Math.floor(Math.random() *(sidestep3 - sidestep1 +1)) + sidestep1) + (0.7 * player1.luckyvalue))
    if(maxsidestep3 > sidestep3){
      maxsidestep3 = sidestep3
    }
    let maxsidestep4 = Math.round((Math.floor(Math.random() *(sidestep4 - sidestep2 +1)) + sidestep2) + (0.7 * player2.luckyvalue))
    if(maxsidestep4 > sidestep4){
      maxsidestep4 = sidestep4
    }

    if (round % 2 !== 0) {
      // Player1's turn
      switch (action) {
        // case '近身攻击':
        //   if(maxsidestep3 * 3 > maxsidestep4){
        //     if (criticalHitRandom1 < player1.criticalhit){
        //       const damage = hurtCriticalhitEnd101
        //       player2.hp -= damage;
        //       result = `暴击!${player1.name}对${player2.name}挥拳,造成了${damage}点伤害;`
        //     } else{
        //     const damage = hurtEnd101
        //     player2.hp -= damage;
        //     result = `${player1.name}对${player2.name}挥拳,造成了${damage}点伤害;`;
        //   }}else{
        //     if((Math.floor(Math.random() * 2) + 1) === 1){
        //       result = `${player2.name}挡住了攻击`;
        //     }else {
        //       result = `${player2.name}躲过了攻击`;
        //     }
        //   }
        //   break;
          //py1
        case '武器攻击':{
          const skillEffect1 = Math.floor(Math.random() * 3) + 1;
          const primaryWeaponEquipped = player1.getPrimaryweapontypes !== 0;
          const secondaryWeaponEquipped = player1.getSecondaryweapontypes !== 0;
          const isCriticalHit = criticalHitRandom1 < player1.criticalhit;

          if (maxsidestep3 * 2.5 > maxsidestep4) {
            let weaponName, damage, text;

            if (!primaryWeaponEquipped && !secondaryWeaponEquipped) {
              // 无武器
              weaponName = "挥拳";
              text = "因未装备武器"
              damage = isCriticalHit ? hurtCriticalhitEnd101 : hurtEnd101;
            } else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
              // 仅主武器
              if(player1.getPrimaryweapontypes === 1){
                weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
              }else if(player1.getPrimaryweapontypes === 2){
                weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
              }else if(player1.getPrimaryweapontypes === 3){
                weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
              }else if(player1.getPrimaryweapontypes === 4){
                weaponName = `架起${player1.getPrimaryweaponname}进行冲锋`;
                damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
              }

            } else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
              // 仅副武器
              if(player1.getSecondaryweapontypes === 1){
                weaponName = `挥舞${player1.getSecondaryweaponname}进行斩击`;
                damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
              }else if(player1.getSecondaryweapontypes === 2){
                weaponName = `使用${player1.getSecondaryweaponname}释放咒语`;
                damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
              }else if(player1.getSecondaryweapontypes === 3){
                weaponName = `拉开${player1.getSecondaryweaponname}射出利箭`;
                damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
              }else if(player1.getSecondaryweapontypes === 4){
                weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
              }

            } else {
              // 双武器
              if (skillEffect1 === 1) {
                if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 1){
                  weaponName = `双手挥舞${player1.getPrimaryweaponname}与${player1.getSecondaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 2){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 3){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 4){
                  weaponName = `手持${player1.getSecondaryweaponname}挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 1){
                  weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 2){
                  weaponName = `双持${player1.getPrimaryweaponname}与${player1.getSecondaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd154 : hurtEnd154;
                }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 3){
                  weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 4){
                  weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 1){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 2){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 3){
                  weaponName = `双手使用${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 4){
                  weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 1){
                  weaponName = `手持${player1.getSecondaryweaponname}挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 2){
                  weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 3){
                  weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 4){
                  weaponName = `架起${player1.getSecondaryweaponname}与${player1.getPrimaryweaponname}冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }

              } else if (skillEffect1 === 2) {
                if(player1.getPrimaryweapontypes === 1){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 2){
                  weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                }else if(player1.getPrimaryweapontypes === 3){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 4){
                  weaponName = `架起${player1.getPrimaryweaponname}进行冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }
              } else if (skillEffect1 === 3) {
                if(player1.getSecondaryweapontypes === 1){
                  weaponName = `挥舞${player1.getSecondaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                }else if(player1.getSecondaryweapontypes === 2){
                  weaponName = `使用${player1.getSecondaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd156 : hurtEnd156;
                }else if(player1.getSecondaryweapontypes === 3){
                  weaponName = `拉开${player1.getSecondaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                }else if(player1.getSecondaryweapontypes === 4){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }
              }
            }
            if(text === undefined){
              text = ""
            }
            player2.hp -= damage;
            if(player1.getPrimaryweapontypes === 2){
              player1.mp -= 4;
            }
            player1.mp += 6;
            result = isCriticalHit
              ? `暴击!${text}${player1.name}对${player2.name}${weaponName},造成了${damage}点伤害`
              : `${text}${player1.name}对${player2.name}${weaponName},造成了${damage}点伤害`;
          } else {
            result = (Math.floor(Math.random() * 2) + 1) === 1
              ? `${player2.name}挡住了攻击`
              : `${player2.name}躲过了攻击`;
          }
        }
          break;
        //py1
        case '技能攻击':{
          const skillEffect = Math.floor(Math.random() * 3) + 1;
          const skillCriticalHit = criticalHitRandom1 < player1.criticalhit;
          const skillManaExhausted = (mpCost) => player1.mp < mpCost;
          const attackWithFist = (damage, reason) => {
            player2.hp -= damage;
            player1.mp += 6;
            result = skillCriticalHit
              ? `暴击!因${reason},${player1.name}对${player2.name}挥拳,造成了${damage}点伤害;`
              : `因${reason},${player1.name}对${player2.name}挥拳,造成了${damage}点伤害;`;
          };
          const weaponWithFist = (damage, reason, weaponname,mpCost = 0) => {
            player2.hp -= damage;
            player1.mp -= mpCost;
            player1.mp += 6;
            result = skillCriticalHit
              ? `暴击!因${reason},${player1.name}对${player2.name}${weaponname},造成了${damage}点伤害;`
              : `因${reason},${player1.name}对${player2.name}${weaponname},造成了${damage}点伤害;`;
          };
          const useSkill1 = (skillName, skillInfo, attackInfo, endInfo, damage, mpCost) => {
            player2.hp -= damage;
            player1.mp -= mpCost;
            player1.mp += 6;
            result = skillCriticalHit
              ? `暴击!${player1.name}对${player2.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},造成了${damage}点伤害`
              : `${player1.name}对${player2.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},造成了${damage}点伤害`;
          };
          const useSkill2 = (skillName, skillInfo, attackInfo, endInfo, treatment, mpCost) => {
            player1.hp += treatment;
            player1.mp -= mpCost;
            player1.mp += 6;
            result = skillCriticalHit
              ? `大祝福!${player1.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},恢复了${treatment}点HP`
              : `${player1.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},恢复了${treatment}点HP`;
          };

          const availableSkills = [
            { type: player1.Skilltypes1, name: player1.Skillname1, info: player1.Skillskillinfo1, attckInfo: player1.Skillattckinfo1, endInfo: player1.Skillendinfo1, mpCost: player1.getSkill1consumptionofmagic, hurt: [hurtEnd101, hurtEnd102, hurtEnd105, theTreatmentEnd108], hurtCritical: [hurtCriticalhitEnd101, hurtCriticalhitEnd102, hurtCriticalhitEnd105, theTreatmentCriticalhitEnd108] },
            { type: player1.Skilltypes2, name: player1.Skillname2, info: player1.Skillskillinfo2, attckInfo: player1.Skillattckinfo2, endInfo: player1.Skillendinfo2, mpCost: player1.getSkill2consumptionofmagic, hurt: [hurtEnd101, hurtEnd103, hurtEnd106, theTreatmentEnd109], hurtCritical: [hurtCriticalhitEnd101, hurtCriticalhitEnd103, hurtCriticalhitEnd106, theTreatmentCriticalhitEnd109] },
            { type: player1.Skilltypes3, name: player1.Skillname3, info: player1.Skillskillinfo3, attckInfo: player1.Skillattckinfo3, endInfo: player1.Skillendinfo3, mpCost: player1.getSkill3consumptionofmagic, hurt: [hurtEnd101, hurtEnd104, hurtEnd107, theTreatmentEnd110], hurtCritical: [hurtCriticalhitEnd101, hurtCriticalhitEnd104, hurtCriticalhitEnd107, theTreatmentCriticalhitEnd110] }
          ].filter(skill => skill.type !== 0);

          const handleSkillUsage = (skill) => {
            if (skillManaExhausted(skill.mpCost)) {
              const skillEffect1 = Math.floor(Math.random() * 2) + 1;
              const primaryWeaponEquipped = player1.getPrimaryweapontypes !== 0;
              const secondaryWeaponEquipped = player1.getSecondaryweapontypes !== 0;
              const isCriticalHit = criticalHitRandom1 < player1.criticalhit;
              let weaponName = '';
              let damage: number
              let mpCost = 0;
              if(!primaryWeaponEquipped && !secondaryWeaponEquipped){
                attackWithFist(skillCriticalHit ? skill.hurtCritical[0] : skill.hurt[0], '玛娜耗尽');
              }else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
                // 仅主武器
                if(player1.getPrimaryweapontypes === 1){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 2){
                  weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                  mpCost = 4;
                }else if(player1.getPrimaryweapontypes === 3){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 4){
                  weaponName = `架起${player1.getPrimaryweaponname}进行冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }
                weaponWithFist(damage, '玛娜耗尽',weaponName,mpCost)
              } else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
                // 仅副武器
                if(player1.getSecondaryweapontypes === 1){
                  weaponName = `挥舞${player1.getSecondaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                }else if(player1.getSecondaryweapontypes === 2){
                  weaponName = `使用${player1.getSecondaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                  mpCost = 4;
                }else if(player1.getSecondaryweapontypes === 3){
                  weaponName = `拉开${player1.getSecondaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                }else if(player1.getSecondaryweapontypes === 4){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }
                weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
              } else {
                // 双武器
                if (skillEffect1 === 1) {
                  if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 1){
                    weaponName = `双手挥舞${player1.getPrimaryweaponname}与${player1.getSecondaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                  }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 2){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 3){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 4){
                    weaponName = `手持${player1.getSecondaryweaponname}挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 1){
                    weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 2){
                    weaponName = `双持${player1.getPrimaryweaponname}与${player1.getSecondaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd154 : hurtEnd154;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 3){
                    weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 4){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 1){
                    weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 2){
                    weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 3){
                    weaponName = `双手使用${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 4){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 1){
                    weaponName = `手持${player1.getSecondaryweaponname}挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 2){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 3){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 4){
                    weaponName = `架起${player1.getSecondaryweaponname}与${player1.getPrimaryweaponname}冲锋`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }
                  weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
                } else if (skillEffect1 === 2) {
                  if(player1.getPrimaryweapontypes === 1){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 2){
                    weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 3){
                    weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4){
                    weaponName = `架起${player1.getPrimaryweaponname}进行冲锋`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }
                  weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
                } else if (skillEffect1 === 3) {
                  if(player1.getSecondaryweapontypes === 1){
                    weaponName = `挥舞${player1.getSecondaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                  }else if(player1.getSecondaryweapontypes === 2){
                    weaponName = `使用${player1.getSecondaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd156 : hurtEnd156;
                    mpCost = 4;
                  }else if(player1.getSecondaryweapontypes === 3){
                    weaponName = `拉开${player1.getSecondaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                  }else if(player1.getSecondaryweapontypes === 4){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }
                  weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
                }
              }

            } else {
              switch (skill.type) {
                case 1:
                  useSkill1(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit ? skill.hurtCritical[1] : skill.hurt[1], skill.mpCost);
                  break;
                case 2:
                  useSkill1(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit ? skill.hurtCritical[2] : skill.hurt[2], skill.mpCost);
                  break;
                case 3:
                  useSkill2(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit ? skill.hurtCritical[3] : skill.hurt[3], skill.mpCost);
                  break;
              }
            }
          };

          if (maxsidestep3 * 2 > maxsidestep4) {
            if (availableSkills.length > 0) {
              const skill = availableSkills.length === 1 ? availableSkills[0] : availableSkills[Math.floor(Math.random() * availableSkills.length)];
              handleSkillUsage(skill);
            } else {
              const skillEffect1 = Math.floor(Math.random() * 2) + 1;
              const primaryWeaponEquipped = player1.getPrimaryweapontypes !== 0;
              const secondaryWeaponEquipped = player1.getSecondaryweapontypes !== 0;
              const isCriticalHit = criticalHitRandom1 < player1.criticalhit;
              let weaponName = '';
              let damage: number
              let mpCost = 0
              if(!primaryWeaponEquipped && !secondaryWeaponEquipped){
                attackWithFist(skillCriticalHit ? hurtCriticalhitEnd101 : hurtEnd101, '玛娜耗尽');
              }else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
                // 仅主武器
                if(player1.getPrimaryweapontypes === 1){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 2){
                  weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                  mpCost = 4;
                }else if(player1.getPrimaryweapontypes === 3){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }else if(player1.getPrimaryweapontypes === 4){
                  weaponName = `架起${player1.getPrimaryweaponname}进行冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }
                weaponWithFist(damage, '玛娜耗尽',weaponName,mpCost)
              } else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
                // 仅副武器
                if(player1.getSecondaryweapontypes === 1){
                  weaponName = `挥舞${player1.getSecondaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                }else if(player1.getSecondaryweapontypes === 2){
                  weaponName = `使用${player1.getSecondaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                  mpCost = 4;
                }else if(player1.getSecondaryweapontypes === 3){
                  weaponName = `拉开${player1.getSecondaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                }else if(player1.getSecondaryweapontypes === 4){
                  weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                }
                weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
              } else {
                // 双武器
                if (skillEffect1 === 1) {
                  if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 1){
                    weaponName = `双手挥舞${player1.getPrimaryweaponname}与${player1.getSecondaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                  }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 2){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 3){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 4){
                    weaponName = `手持${player1.getSecondaryweaponname}挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 1){
                    weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 2){
                    weaponName = `双持${player1.getPrimaryweaponname}与${player1.getSecondaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd154 : hurtEnd154;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 3){
                    weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 4){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 1){
                    weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 2){
                    weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 3){
                    weaponName = `双手使用${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                  }else if(player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 4){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 1){
                    weaponName = `手持${player1.getSecondaryweaponname}挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 2){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 3){
                    weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 4){
                    weaponName = `架起${player1.getSecondaryweaponname}与${player1.getPrimaryweaponname}冲锋`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }
                  weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
                } else if (skillEffect1 === 2) {
                  if(player1.getPrimaryweapontypes === 1){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 2){
                    weaponName = `使用${player1.getPrimaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                    mpCost = 4;
                  }else if(player1.getPrimaryweapontypes === 3){
                    weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }else if(player1.getPrimaryweapontypes === 4){
                    weaponName = `架起${player1.getPrimaryweaponname}进行冲锋`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }
                  weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
                } else if (skillEffect1 === 3) {
                  if(player1.getSecondaryweapontypes === 1){
                    weaponName = `挥舞${player1.getSecondaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                  }else if(player1.getSecondaryweapontypes === 2){
                    weaponName = `使用${player1.getSecondaryweaponname}释放咒语`;
                    damage = isCriticalHit ? hurtCriticalhitEnd156 : hurtEnd156;
                    mpCost = 4;
                  }else if(player1.getSecondaryweapontypes === 3){
                    weaponName = `拉开${player1.getSecondaryweaponname}射出利箭`;
                    damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                  }else if(player1.getSecondaryweapontypes === 4){
                    weaponName = `挥舞${player1.getPrimaryweaponname}进行斩击`;
                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                  }
                  weaponWithFist(damage, '玛娜耗尽',weaponName, mpCost)
                }
              }
            }
          } else {
            if (availableSkills.length > 0) {
              const skill = availableSkills.length === 1 ? availableSkills[0] : availableSkills[Math.floor(Math.random() * availableSkills.length)];
              if (skill.type === 3 && !skillManaExhausted(skill.mpCost)) {
                useSkill2(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit ? skill.hurtCritical[3] : skill.hurt[3], skill.mpCost);
              } else {
                result = (Math.floor(Math.random() * 2) + 1) === 1
                  ? `${player2.name}挡住了攻击`
                  : `${player2.name}躲过了攻击`;
              }
            } else {
              result = (Math.floor(Math.random() * 2) + 1) === 1
                ? `${player2.name}挡住了攻击`
                : `${player2.name}躲过了攻击`;
            }
          }
        }
          break;

      }
    } else {
      // Player2's turn
      switch (action) {
        // case '近身攻击':
        //   if(maxsidestep4 * 2 > maxsidestep3){
        //     if (criticalHitRandom2 < player2.criticalhit){
        //       const damage = hurtCriticalhitEnd201
        //       player1.hp -= damage;
        //       result = `暴击!${player2.name}对${player1.name}挥拳,造成了${damage}点伤害`;
        //     } else{
        //     const damage = hurtEnd201
        //     player1.hp -= damage;
        //     result = `${player2.name}对${player1.name}挥拳,造成了${damage}点伤害`;
        //   }}else{
        //   result = `${player1.name}躲过了攻击`;
        // }
        //   break;
          //py2
        case '武器攻击':{
          const skillEffect1 = Math.floor(Math.random() * 3) + 1;
          const primaryWeaponEquipped = player2.getPrimaryweapontypes !== 0;
          const secondaryWeaponEquipped = player2.getSecondaryweapontypes !== 0;
          const isCriticalHit = criticalHitRandom1 < player2.criticalhit;

          if (maxsidestep3 * 2.5 > maxsidestep4) {
            let weaponName, damage, text;

            if (!primaryWeaponEquipped && !secondaryWeaponEquipped) {
              // 无武器
              weaponName = "挥拳";
              text = "因未装备武器"
              damage = isCriticalHit ? hurtCriticalhitEnd201 : hurtEnd201;
            } else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
              // 仅主武器
              if(player2.getPrimaryweapontypes === 1){
                weaponName = `挥舞${player2.getPrimaryweaponname}进行斩击`;
                damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
              }else if(player2.getPrimaryweapontypes === 2){
                weaponName = `使用${player2.getPrimaryweaponname}释放咒语`;
                damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
              }else if(player2.getPrimaryweapontypes === 3){
                weaponName = `拉开${player2.getPrimaryweaponname}射出利箭`;
                damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
              }else if(player2.getPrimaryweapontypes === 4){
                weaponName = `架起${player2.getPrimaryweaponname}进行冲锋`;
                damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
              }

            } else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
              // 仅副武器
              if(player2.getSecondaryweapontypes === 1){
                weaponName = `挥舞${player2.getSecondaryweaponname}进行斩击`;
                damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
              }else if(player2.getSecondaryweapontypes === 2){
                weaponName = `使用${player2.getSecondaryweaponname}释放咒语`;
                damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
              }else if(player2.getSecondaryweapontypes === 3){
                weaponName = `拉开${player2.getSecondaryweaponname}射出利箭`;
                damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
              }else if(player2.getSecondaryweapontypes === 4){
                weaponName = `挥舞${player2.getPrimaryweaponname}进行斩击`;
                damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
              }

            } else {
              // 双武器
              if (skillEffect1 === 1) {
                if(player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 1){
                  weaponName = `双手挥舞${player2.getPrimaryweaponname}与${player2.getSecondaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd251 : hurtEnd251;
                }else if(player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 2){
                  weaponName = `挥舞${player2.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 3){
                  weaponName = `挥舞${player2.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 4){
                  weaponName = `手持${player2.getSecondaryweaponname}挥舞${player2.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 1){
                  weaponName = `使用${player2.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                }else if(player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 2){
                  weaponName = `双持${player2.getPrimaryweaponname}与${player2.getSecondaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd254 : hurtEnd254;
                }else if(player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 3){
                  weaponName = `使用${player2.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                }else if(player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 4){
                  weaponName = `手持${player2.getSecondaryweaponname}使用${player2.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                }else if(player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 1){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 2){
                  weaponName = `拉开${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 3){
                  weaponName = `双手使用${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd251 : hurtEnd251;
                }else if(player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 4){
                  weaponName = `手持${player1.getSecondaryweaponname}使用${player1.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 1){
                  weaponName = `手持${player2.getSecondaryweaponname}挥舞${player2.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 2){
                  weaponName = `手持${player2.getSecondaryweaponname}使用${player2.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                }else if(player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 3){
                  weaponName = `手持${player2.getSecondaryweaponname}使用${player2.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 4){
                  weaponName = `架起${player2.getSecondaryweaponname}与${player2.getPrimaryweaponname}冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }

              } else if (skillEffect1 === 2) {
                if(player2.getPrimaryweapontypes === 1){
                  weaponName = `挥舞${player2.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 2){
                  weaponName = `使用${player2.getPrimaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                }else if(player2.getPrimaryweapontypes === 3){
                  weaponName = `拉开${player2.getPrimaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }else if(player2.getPrimaryweapontypes === 4){
                  weaponName = `架起${player2.getPrimaryweaponname}进行冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }
              } else if (skillEffect1 === 3) {
                if(player2.getSecondaryweapontypes === 1){
                  weaponName = `挥舞${player2.getSecondaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
                }else if(player2.getSecondaryweapontypes === 2){
                  weaponName = `使用${player2.getSecondaryweaponname}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd256 : hurtEnd256;
                }else if(player2.getSecondaryweapontypes === 3){
                  weaponName = `拉开${player2.getSecondaryweaponname}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
                }else if(player2.getSecondaryweapontypes === 4){
                  weaponName = `挥舞${player2.getPrimaryweaponname}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                }
              }
            }
            if(text === undefined){
              text = ""
            }
            player1.hp -= damage;
            if(player1.getPrimaryweapontypes === 2){
              player2.mp -= 4
            }
            player2.mp += 6
            result = isCriticalHit
              ? `暴击!${text}${player2.name}对${player1.name}${weaponName},造成了${damage}点伤害`
              : `${text}${player2.name}对${player1.name}${weaponName},造成了${damage}点伤害`;
          } else {
            result = (Math.floor(Math.random() * 2) + 1) === 1
              ? `${player1.name}挡住了攻击`
              : `${player1.name}躲过了攻击`;
          }
        }
          break;
        //py2
        case '技能攻击': {
          const skillEffect = Math.floor(Math.random() * 3) + 1;
          const weaponCriticalHit = criticalHitRandom1 < player2.criticalhit;
          const weaponCriticalHit2 = criticalHitRandom2 < player2.criticalhit;

          const attackWithSkill = (skillName, skillInfo, attackInfo, endInfo, mpConsumption, damage) => {
            player1.hp -= damage;
            player2.mp -= mpConsumption;
            player2.mp += 6;
            result = weaponCriticalHit
              ? `暴击!${player2.name}对${player1.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},造成了${damage}点伤害`
              : `${player2.name}对${player1.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},造成了${damage}点伤害`;
          };

          const treatmentWithSkill = (skillName, skillInfo, attackInfo, endInfo, mpConsumption, treatment) => {
            player2.hp += treatment;
            player2.mp -= mpConsumption;
            player2.mp += 6;
            result = weaponCriticalHit
              ? `大祝福! ${player2.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},恢复了${treatment}点HP`
              : `${player2.name}使用${skillName},${skillInfo}${attackInfo}${endInfo},恢复了${treatment}点HP`;
          };

          const basicAttack = (weaponName, text, damage, isCriticalHit) => {
            player1.hp -= damage;
            player2.mp += 6;
            result = isCriticalHit
              ? `暴击! ${text},造成了${damage}点伤害`
              : `${text},造成了${damage}点伤害`;
          };

          const weaponNameAndDamage = (weaponEquipped, weaponName, weaponType, isCriticalHit) => {
            let text = "因未装备武器";
            let damage = isCriticalHit ? hurtCriticalhitEnd201 : hurtEnd201;

            if (weaponEquipped) {
              switch (weaponType) {
                case 1:
                  text = `挥舞${weaponName}进行斩击`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                  break;
                case 2:
                  text = `使用${weaponName}释放咒语`;
                  damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                  break;
                case 3:
                  text = `拉开${weaponName}射出利箭`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                  break;
                case 4:
                  text = `架起${weaponName}进行冲锋`;
                  damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                  break;
              }
            }
            return { text, damage };
          };

          const attackWithWeapon = (primaryWeaponEquipped, secondaryWeaponEquipped, isCriticalHit) => {
            let weaponData = { text: "挥拳", damage: isCriticalHit ? hurtCriticalhitEnd201 : hurtEnd201 };

            if (primaryWeaponEquipped && secondaryWeaponEquipped) {
              const primary = weaponNameAndDamage(true, player2.getPrimaryweaponname, player2.getPrimaryweapontypes, isCriticalHit);
              const secondary = weaponNameAndDamage(true, player2.getSecondaryweaponname, player2.getSecondaryweapontypes, isCriticalHit);
              switch (skillEffect) {
                case 1:
                  weaponData = primary;
                  weaponData.text = `双手${primary.text}与${secondary.text}`;
                  break;
                case 2:
                  weaponData = primary;
                  break;
                case 3:
                  weaponData = secondary;
                  break;
              }
            } else if (primaryWeaponEquipped) {
              weaponData = weaponNameAndDamage(true, player2.getPrimaryweaponname, player2.getPrimaryweapontypes, isCriticalHit);
            } else if (secondaryWeaponEquipped) {
              weaponData = weaponNameAndDamage(true, player2.getSecondaryweaponname, player2.getSecondaryweapontypes, isCriticalHit);
            }
            basicAttack(weaponData.text, weaponData.text, weaponData.damage, isCriticalHit);
          };

          const skillData = [
            {
              skillName: player2.Skillname1,
              skillInfo: player2.Skillskillinfo1,
              attackInfo: player2.Skillattckinfo1,
              endInfo: player2.Skillendinfo1,
              mpConsumption: player2.getSkill1consumptionofmagic,
              skilldamage1: weaponCriticalHit ? hurtCriticalhitEnd202 : hurtEnd202,
              skilldamage2: weaponCriticalHit ? hurtCriticalhitEnd205 : hurtEnd205,
              skilldamage3: weaponCriticalHit ? theTreatmentCriticalhitEnd208 : theTreatmentEnd208,
              skillType: player2.Skilltypes1
            },
            {
              skillName: player2.Skillname2,
              skillInfo: player2.Skillskillinfo2,
              attackInfo: player2.Skillattckinfo2,
              endInfo: player2.Skillendinfo2,
              mpConsumption: player2.getSkill2consumptionofmagic,
              skilldamage1: weaponCriticalHit ? hurtCriticalhitEnd203 : hurtEnd203,
              skilldamage2: weaponCriticalHit ? hurtCriticalhitEnd206 : hurtEnd206,
              skilldamage3: weaponCriticalHit ? theTreatmentCriticalhitEnd209 : theTreatmentEnd209,
              skillType: player2.Skilltypes2
            },
            {
              skillName: player2.Skillname3,
              skillInfo: player2.Skillskillinfo3,
              attackInfo: player2.Skillattckinfo3,
              endInfo: player2.Skillendinfo3,
              mpConsumption: player2.getSkill3consumptionofmagic,
              skilldamage1: weaponCriticalHit ? hurtCriticalhitEnd204 : hurtEnd204,
              skilldamage2: weaponCriticalHit ? hurtCriticalhitEnd207 : hurtEnd207,
              skilldamage3: weaponCriticalHit ? theTreatmentCriticalhitEnd210 : theTreatmentEnd210,
              skillType: player2.Skilltypes3
            }
          ];

          const availableSkills = skillData.filter(skill => skill.skillType !== 0);

          if (maxsidestep4 * 2 > maxsidestep3) {
            if (availableSkills.length > 0) {
              let skill;
              if (availableSkills.length === 1) {
                skill = availableSkills[0];
              } else if (availableSkills.length === 2) {
                skill = availableSkills[Math.floor(Math.random() * 2)];
              } else if (availableSkills.length === 3) {
                skill = skillData[skillEffect - 1];
              }

              if (skill && player2.mp >= skill.mpConsumption) {
                switch (skill.skillType) {
                  case 1:
                    attackWithSkill(skill.skillName, skill.skillInfo, skill.attackInfo, skill.endInfo, skill.mpConsumption, skill.skilldamage1);
                    break;
                  case 2:
                    attackWithSkill(skill.skillName, skill.skillInfo, skill.attackInfo, skill.endInfo, skill.mpConsumption, skill.skilldamage2);
                    break;
                  case 3:
                    treatmentWithSkill(skill.skillName, skill.skillInfo, skill.attackInfo, skill.endInfo, skill.mpConsumption, skill.skilldamage3);
                    break;
                }
              } else {
                attackWithWeapon(player2.getPrimaryweapontypes !== 0, player2.getSecondaryweapontypes !== 0, weaponCriticalHit2);
              }
            } else {
              attackWithWeapon(player2.getPrimaryweapontypes !== 0, player2.getSecondaryweapontypes !== 0, weaponCriticalHit2);
            }
          } else {
            if (availableSkills.length > 0) {
              let skill;
              if (availableSkills.length === 1) {
                skill = availableSkills[0];
              } else if (availableSkills.length === 2) {
                skill = availableSkills[Math.floor(Math.random() * 2)];
              } else if (availableSkills.length === 3) {
                skill = skillData[skillEffect - 1];
              }

              if (skill && skill.skillType === 3 && player2.mp >= skill.mpConsumption) {
                treatmentWithSkill(skill.skillName, skill.skillInfo, skill.attackInfo, skill.endInfo, skill.mpConsumption, skill.skilldamage3);
              } else {
                result = (Math.floor(Math.random() * 2) + 1) === 1
                  ? `${player1.name}挡住了攻击`
                  : `${player1.name}躲过了攻击`;
              }
            } else {
              result = (Math.floor(Math.random() * 2) + 1) === 1
                ? `${player1.name}挡住了攻击`
                : `${player1.name}躲过了攻击`;
            }
          }
        }
          break;
      }
    }

    battleLogs.push({
      player1: { ...player1 }, // 使用深拷贝确保每回合记录的玩家对象独立
      player2: { ...player2 },
      action: action,
      result: result,
      player1Hp: player1.hp,
      player1Mp: player1.mp,
      player2Hp: player2.hp,
      player2Mp: player2.mp,
    });

    if (player1.hp <= 0 || player2.hp <= 0) {
      break;
    }
  }

  if (round >= maxRounds) {
    battleLogs.push({
      player1: { ...player1 },
      player2: { ...player2 },
      action: '回合结束',
      result: '达到最大回合数，战斗结束',
      player1Hp: player1.hp,
      player1Mp: player1.mp,
      player2Hp: player2.hp,
      player2Mp: player2.mp,
    });
  }

  return battleLogs;
}

function isEven(number: number): boolean {
  return number % 2 === 0;
}

export function generateBattleLogsHtml(avatarUrl1: string,
                                       avatarUrl2: string,
                                       name1: string,
                                       hp1: number,
                                       mp1:number,
                                       attack1: number,
                                       sturdypoint1:number,
                                       dexterity1:number,
                                       luckyvalue1:number,
                                       spiritualintuition1:number,
                                       stamina1:number,
                                       intelligence1:number,
                                       faith1:number,
                                       armourclass1:number,
                                       physicaldefense1:number,
                                       magicaldefense1:number,
                                       name2: string,
                                       hp2: number,
                                       mp2:number,
                                       attack2: number,
                                       sturdypoint2: number,
                                       dexterity2:number,
                                       luckyvalue2:number,
                                       spiritualintuition2:number,
                                       stamina2:number,
                                       intelligence2:number,
                                       faith2:number,
                                       armourclass2:number,
                                       physicaldefense2:number,
                                       magicaldefense2:number,
                                       criticalhit:number,
                                       getSkill1id:number,
                                       getSkill1name:string,
                                       getSkill1harm:number,
                                       getSkill1types:number,
                                       getSkill1skillinfo:string,
                                       getSkill1attckinfo:string,
                                       getSkill1endinfo:string,
                                       getSkill1consumptionofmagic:number,
                                       getSkill2id:number,
                                       getSkill2name:string,
                                       getSkill2harm:number,
                                       getSkill2types:number,
                                       getSkill2skillinfo:string,
                                       getSkill2attckinfo:string,
                                       getSkill2endinfo:string,
                                       getSkill2consumptionofmagic:number,
                                       getSkill3id:number,
                                       getSkill3name:string,
                                       getSkill3harm:number,
                                       getSkill3types:number,
                                       getSkill3skillinfo:string,
                                       getSkill3attckinfo:string,
                                       getSkill3endinfo:string,
                                       getSkill3consumptionofmagic:number,
                                       getSkill4id:number,
                                       getSkill4name:string,
                                       getSkill4harm:number,
                                       getSkill4types:number,
                                       getSkill4skillinfo:string,
                                       getSkill4attckinfo:string,
                                       getSkill4endinfo:string,
                                       getSkill4consumptionofmagic:number,
                                       getSkill5id:number,
                                       getSkill5name:string,
                                       getSkill5harm:number,
                                       getSkill5types:number,
                                       getSkill5skillinfo:string,
                                       getSkill5attckinfo:string,
                                       getSkill5endinfo:string,
                                       getSkill5consumptionofmagic:number,
                                       getSkill6id:number,
                                       getSkill6name:string,
                                       getSkill6harm:number,
                                       getSkill6types:number,
                                       getSkill6skillinfo:string,
                                       getSkill6attckinfo:string,
                                       getSkill6endinfo:string,
                                       getSkill6consumptionofmagic:number,
                                       getPrimaryweaponname1:string,
                                       getPrimaryweaponharm1:number,
                                       getPrimaryweapontypes1:number,
                                       getPrimaryweaponfightkirelease1:number,
                                       getPrimaryweaponmagicrelease1:number,
                                       getSecondaryweaponname1:string,
                                       getSecondaryweaponharm1:number,
                                       getSecondaryweapontypes1:number,
                                       getSecondaryweaponfightkirelease1:number,
                                       getSecondaryweaponmagicrelease1:number,
                                       getPrimaryweaponname2:string,
                                       getPrimaryweaponharm2:number,
                                       getPrimaryweapontypes2:number,
                                       getPrimaryweaponfightkirelease2:number,
                                       getPrimaryweaponmagicrelease2:number,
                                       getSecondaryweaponname2:string,
                                       getSecondaryweaponharm2:number,
                                       getSecondaryweapontypes2:number,
                                       getSecondaryweaponfightkirelease2:number,
                                       getSecondaryweaponmagicrelease2:number) {
  const playerA = createPlayer(name1,
    avatarUrl1,
    hp1,
    mp1,
    attack1,
    sturdypoint1,
    dexterity1,
    luckyvalue1,
    spiritualintuition1,
    stamina1,
    intelligence1,
    faith1,
    armourclass1,
    physicaldefense1,
    magicaldefense1,
    criticalhit,
    getSkill1id,
    getSkill1name,
    getSkill1harm,
    getSkill1types,
    getSkill1skillinfo,
    getSkill1attckinfo,
    getSkill1endinfo,
    getSkill1consumptionofmagic,
    getSkill2id,
    getSkill2name,
    getSkill2harm,
    getSkill2types,
    getSkill2skillinfo,
    getSkill2attckinfo,
    getSkill2endinfo,
    getSkill2consumptionofmagic,
    getSkill3id,
    getSkill3name,
    getSkill3harm,
    getSkill3types,
    getSkill3skillinfo,
    getSkill3attckinfo,
    getSkill3endinfo,
    getSkill3consumptionofmagic,
    getPrimaryweaponname1,
    getPrimaryweaponharm1,
    getPrimaryweapontypes1,
    getPrimaryweaponfightkirelease1,
    getPrimaryweaponmagicrelease1,
    getSecondaryweaponname1,
    getSecondaryweaponharm1,
    getSecondaryweapontypes1,
    getSecondaryweaponfightkirelease1,
    getSecondaryweaponmagicrelease1);
  const playerB = createPlayer(name2,
    avatarUrl2,
    hp2,
    mp2,
    attack2,
    sturdypoint2,
    dexterity2,
    luckyvalue2,
    spiritualintuition2,
    stamina2,
    intelligence2,
    faith2,
    armourclass2,
    physicaldefense2,
    magicaldefense2,
    criticalhit,
    getSkill4id,
    getSkill4name,
    getSkill4harm,
    getSkill4types,
    getSkill4skillinfo,
    getSkill4attckinfo,
    getSkill4endinfo,
    getSkill4consumptionofmagic,
    getSkill5id,
    getSkill5name,
    getSkill5harm,
    getSkill5types,
    getSkill5skillinfo,
    getSkill5attckinfo,
    getSkill5endinfo,
    getSkill5consumptionofmagic,
    getSkill6id,
    getSkill6name,
    getSkill6harm,
    getSkill6types,
    getSkill6skillinfo,
    getSkill6attckinfo,
    getSkill6endinfo,
    getSkill6consumptionofmagic,
    getPrimaryweaponname2,
    getPrimaryweaponharm2,
    getPrimaryweapontypes2,
    getPrimaryweaponfightkirelease2,
    getPrimaryweaponmagicrelease2,
    getSecondaryweaponname2,
    getSecondaryweaponharm2,
    getSecondaryweapontypes2,
    getSecondaryweaponfightkirelease2,
    getSecondaryweaponmagicrelease2);
  const battleLogs = simulateBattle(playerA, playerB);

  let html = '';
  for (let i = 0; i < battleLogs.length; i++) {
    const log = battleLogs[i];
    if (isEven(i)) {
      html += `
        <div class="battle-log">
          <div class="group">
            <div class="center"><strong>第 ${i + 1} 回合</strong></div>
            <div class="caption1"></div>
            <div class="group1">
              <img class="avatar" src="${log.player1.avatarUrl}" alt="${log.player1.name}">
              <div class="group5">
                <div>${log.player1.name}</div>
                <div>HP:${log.player1Hp}</div>
                <div>MP:${log.player1Mp}</div>
              </div>
              <div class="group7">${log.player1.name}选择使用 ${log.action}</div>
            </div>
            <div class="group2">
              <img class="avatar" src="${log.player2.avatarUrl}" alt="${log.player2.name}">
              <div class="group4">
                <div>${log.player2.name}</div>
                <div>HP:${log.player2Hp}</div>
                <div>MP:${log.player2Mp}</div>
              </div>
              <div class="group6">结果:${log.result}</div>
            </div>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="battle-log">
          <div class="group">
            <div class="center"><strong>第 ${i + 1} 回合</strong></div>
            <div class="caption1"></div>
            <div class="group1">
              <img class="avatar" src="${log.player2.avatarUrl}" alt="${log.player2.name}">
              <div class="group5">
                <div>${log.player2.name}</div>
                <div>HP:${log.player2Hp}</div>
                <div>MP:${log.player2Mp}</div>
              </div>
              <div class="group7">${log.player2.name}选择使用 ${log.action}</div>
            </div>
            <div class="group2">
              <img class="avatar" src="${log.player1.avatarUrl}" alt="${log.player1.name}">
              <div class="group4">
                <div>${log.player1.name}</div>
                <div>HP:${log.player1Hp}</div>
                <div>MP:${log.player1Mp}</div>
                </div class="group4">
                <div class="group6">结果:${log.result}</div>
            </div>
          </div>
        </div>
      `;
    }

    if (log.player1Hp <= 0) {
      html += `<div class="credit"><strong>${log.player1.name} 被击败了!</strong></div>`;
    }
    if (log.player2Hp <= 0) {
      html += `<div class="credit"><strong>${log.player2.name} 被击败了!</strong></div>`;
    }
    html += '<hr>';
  }

  // 添加回合数达到最大值的提示信息
  if (battleLogs.length >= 50) {
    html += '<div class="credit"><strong>达到最大回合数，战斗结束!</strong></div>';
  }
  const finalHpValues = {
    player1: {
      name: playerA.name,
      hp: battleLogs[battleLogs.length - 1].player1Hp
    },
    player2: {
      name: playerB.name,
      hp: battleLogs[battleLogs.length - 1].player2Hp
    }
  }
  const player1hp = battleLogs[battleLogs.length - 1].player1Hp
  const player1mp = battleLogs[battleLogs.length - 1].player1Mp
  const player2hp = battleLogs[battleLogs.length - 1].player2Hp
  const player2mp = battleLogs[battleLogs.length - 1].player2Mp
  return {
    "html":html,
    "player1hp": player1hp,
    "player1mp": player1mp,
    "player2hp": player2hp,
    "player2mp": player2mp,
  }
}
