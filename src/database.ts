import { Context, Random, Logger, Time } from 'koishi'
import {LevelInfo, levelInfos} from './index/level';
import {godJson} from "./index/god";
import {raceJson} from "./index/race";
import {skillJson} from "./index/skills";
import {professionJson} from "./index/profession";
import {prefixLibraryJson} from "./index/prefixlibrary";
import {interlocutorylibraryJson} from "./index/interlocutorylibrary";
import {suffixlibraryJson} from "./index/suffixlibrary";
import {arsenalJson} from "./index/arsenal";
import {armourJson} from "./index/armour";


declare module 'koishi' {
  interface Tables {
    role_playing_game: Role_playing_game;
    role_playing_game_attach:Role_playing_game_attach;
    role_playing_game_cd:Role_playing_game_cd;
  }
}

export interface Role_playing_game{
  id: string //id
  name: string //名字
  level: number //等级
  status: number //状态
  healthpoint: number //生命值
  maxhealthpoint: number //最大生命值
  healthpointEnd: number //最终生命值
  magicpoint: number //魔力值
  maxmagicpoint: number //最大魔力值
  magicpointEnd: number //最终魔力值
  sturdypoint: number //体质
  stamina: number //耐力
  dexterity: number //敏捷
  spiritualintuition: number //灵性直觉
  luckyvalue: number //幸运值
  intelligence: number //智力
  faith: number //信仰
  attack: number //力量
  armourclass: number //护甲值
  physicaldefense: number //物理防御力
  magicdefense: number //魔法防御力
  killnumber: number //击杀统计
  coins: number //硬币
  kudos: number //声望
  experiencepoint: number //经验值
}

export interface Role_playing_game_attach {
  id: string //id
  status: number //状态
  prefix: number //前缀称号
  interlocutory: number //中心称号
  suffix: number //后缀称号
  skillpoint: number //技能点
  duels: number //对战次数
  resetproperties: number //重置属性次数
  skill1: number
  skill2: number
  skill3: number
  primaryweapon: number //主武器
  secondaryweapon: number //副武器
  armour: number //盔甲
  racist: number //种族
  faith: number //信仰
  profession: number //职业
  itembar: number[] //武器库
  armourbar: number[] //盔甲库
  skillbar: number[] //技能栏
  prefixlibrary: number[] //前缀库
  interlocutorylibrary: number[] //称号库
  suffixlibrary: number[] //后缀库
}

export interface Role_playing_game_cd{
  id: string //id
  status: number //状态
  statuscd: number //状态cd
  attackcd: number //攻击cd
  duelscd: number //决斗cd
  skillcd: number //技能cd
  attackerstorage: string[] //攻击者存储
}

// export const inject = ['database']
const logger = new Logger('[AXLMLYRPG]>> ');

// export const levels = levelInfos

export class Rpgdata {
  public ctx:Context;
  public cfg:any;
  private arsenals: any[];
  private armour: any[];
  private skill: any[];
  private store: { arsenals: any[], armour: any[], skill: any[] };
  // public logger:Logger;
  constructor(context:Context, config:any) {
    this.ctx = context;
    this.cfg = config;
    this.arsenals = arsenalJson
    this.armour = armourJson
    this.skill = skillJson
    this.store = { arsenals: [], armour: [], skill: [] };
    this.updateShopList();
    setInterval(() => this.updateShopList(), 24 * 60 * 60 * 1000); // 每天更新一次
    this.ctx.database.extend("role_playing_game", {
      id: "string", //id
      name: "string", //名字
      level: "unsigned", //等级
      status: "unsigned", //状态
      healthpoint: "unsigned", //生命值
      maxhealthpoint: "unsigned", //最大生命值
      healthpointEnd: "unsigned", //最终生命值
      magicpoint: "unsigned", //魔力值
      maxmagicpoint: "unsigned", //最大魔力值
      magicpointEnd: "unsigned", //最终魔力值
      sturdypoint: "unsigned", //体质
      stamina: "unsigned", //耐力
      dexterity: "unsigned", //敏捷
      spiritualintuition: "unsigned", //灵性直觉
      luckyvalue: "unsigned", //幸运值
      intelligence: "unsigned", //智力
      faith: "unsigned", //信仰
      attack: "unsigned", //力量
      armourclass: "unsigned", //护甲值
      physicaldefense: "unsigned", //物理防御力
      magicdefense: "unsigned", //魔法防御力
      killnumber: "unsigned", //击杀统计
      coins: "unsigned", //硬币
      kudos: "integer", //声望
      experiencepoint: "unsigned", //经验值
    })
    this.ctx.database.extend("role_playing_game_attach", {
      id: "string",
      status: "unsigned", //状态
      prefix: "unsigned", //前缀称号
      interlocutory: "unsigned", //中间称号
      suffix: "unsigned", //后缀称号
      skillpoint: "unsigned", //技能点数
      duels: "unsigned", //对战次数
      resetproperties: "unsigned", //重置属性次数
      skill1: "unsigned",
      skill2: "unsigned",
      skill3: "unsigned",
      primaryweapon: "unsigned", //主武器
      secondaryweapon: "unsigned", //副武器
      armour: "unsigned", //盔甲
      racist: "unsigned", //种族
      faith: "unsigned", //信仰
      profession: "unsigned", //职业
      itembar: "list", //武器库
      armourbar: "list", //盔甲库
      skillbar: "list", //技能栏
      prefixlibrary: "list",//前缀库
      interlocutorylibrary: "list",//称号库
      suffixlibrary: "list" //后缀库
    })
    this.ctx.database.extend("role_playing_game_cd", {
      id: "string",
      status: "unsigned", //状态
      statuscd: "unsigned", //状态cd
      attackcd: "unsigned",
      duelscd: "unsigned",
      skillcd: "unsigned",
      attackerstorage: "list" //攻击者存储
    })
  }
  //处理数据库异步
  async userdata(session, ctx){
    let name:any;
    if (ctx.database ){
      name = session.username ?? session.member?.nick
      if(name.length <= 0){
        name = session.user.name
      }else if(name === undefined){
        name = session.user.name
      }
    }
    if (!name ) {
      name = session.author?.name ?? session.member?.nick
      if(name.length <= 0){
        name = session.user.name
      }else if(name === undefined){
        name = session.user.name
      }
    } else {
      name = session.username ?? session.member?.nick
      if(name.length <= 0){
        name = session.user.name
      }else if(name === undefined){
        name = session.user.name
      }
    }
    name = name.length>12? name.substring(0,12):name;

    let time =  Time.template('yyyy-MM-dd hh:mm:ss', new Date());
    let dbname = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.name; //名称
    let level = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.level //等级
    let status = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.status //状态
    let healthpoint = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.healthpoint; //生命值
    let maxhealthpoint = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.maxhealthpoint; //最大生命值
    let healthpointEnd = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.healthpointEnd; //最终生命值
    let magicpoint = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.magicpoint; //魔力值
    let maxmagicpoint = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.maxmagicpoint; //最大魔力值
    let magicpointEnd = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.magicpointEnd; //最终魔力值
    let sturdypoint = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.sturdypoint; //体质
    let stamina = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.stamina; //耐力
    let dexterity = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.dexterity; //敏捷
    let spiritualintuition = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.spiritualintuition; //灵性直觉
    let luckyvalue = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.luckyvalue; //幸运值
    let intelligence = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.intelligence; //智力
    let faith = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.faith; //信仰
    let attack = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.attack; //力量
    let armourclass = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.armourclass; //护甲值
    let physicaldefense = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.physicaldefense; //物理防御力
    let magicdefense = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.magicdefense; //魔法防御力
    let killnumber = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.killnumber; //击杀统计
    let coins = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.coins; //硬币
    let kudos = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.kudos; //声望
    let experiencepoint = (await ctx.database.get('role_playing_game', { id: String(session.userId ?? session.member.user.id) }))[0]?.experiencepoint; //经验值
    let prefix = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.prefix; //前缀称号
    let interlocutory = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.interlocutory; //中间称号
    let suffix = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.suffix; //后缀称号
    let skillpoint = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.skillpoint; //属性点数
    let duels = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.duels; //决斗限制次数
    let skill1 = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.skill1;
    let skill2 = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.skill2;
    let skill3 = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.skill3;
    let primaryweapon = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.primaryweapon; //主武器
    let secondaryweapon = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.secondaryweapon; //副武器
    let armour = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.armour; //盔甲
    let racist = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.racist; //种族
    let faiths = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.faith; //信仰
    let profession = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.profession; //职业
    let itembar = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.itembar; //武器库
    let armourbar = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.armourbar; //盔甲库
    let skillbar = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.skillbar; //技能栏
    let prefixlibrary = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.prefixlibrary; //前缀库
    let interlocutorylibrary = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.interlocutorylibrary; //称号库
    let suffixlibrary = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId ?? session.member.user.id) }))[0]?.suffixlibrary; //后缀库
    let statuscd = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId ?? session.member.user.id) }))[0]?.status //止战开战状态
    let attackcd = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId ?? session.member.user.id) }))[0]?.attackcd //给一拳的攻击cd
    let duelscd = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId ?? session.member.user.id) }))[0]?.duelscd //决斗cd

    const total = this.cfg.resetpropertiestotal; // 总数值
    const n = 9;       // 常量数量
    const minValue = this.cfg.resetpropertiesminValue < this.cfg.resetpropertiesmaxValue? this.cfg.resetpropertiesminValue : 10 // 每个常量的最低值
    const maxValue = this.cfg.resetpropertiesmaxValue > this.cfg.resetpropertiesmaxValue? this.cfg.resetpropertiesmaxValue : 38 // 每个常量的上限值
    const distributedValues = this.distributeValues(total, n, minValue,maxValue);

    let randomSturdypoint = distributedValues[0]; //随机体质
    let randomStamina = distributedValues[1]; //随机耐力
    let randomDexterity = distributedValues[2]; //随机敏捷
    let randomSpiritualintuition = distributedValues[3]; //随机灵性直觉
    let randomLuckyvalue = distributedValues[4]; //随机幸运值
    let randomIntelligence = distributedValues[5]; //随机智力
    let randomFaith = distributedValues[6]; //随机信仰
    let randomAttack = distributedValues[7]; //随机力量
    let randomArmourclass = distributedValues[8]; //随机护甲值
    let randomFaiths = Random.pick(godJson) //随机信仰
    let randomRacist = Random.pick(raceJson) //随机种族

    if (!dbname){
      await ctx.database.upsert('role_playing_game', [{
        id: (String(session.userId ?? session.member.user.id)),
        name: name}])
    }

    if (!armourclass){
      await ctx.database.upsert('role_playing_game', [
        {
        id: (String(session.userId ?? session.member.user.id)),
        name: name, //名称
        level: 0, //等级
        status: 1, //状态
        healthpoint: 1000, //生命值
        maxhealthpoint: 1000, //最大生命值
        magicpoint: 100, //魔力值
        maxmagicpoint: 100, //最大魔力值
        sturdypoint: Number(randomSturdypoint), //体质
        stamina: Number(randomStamina), //耐力
        dexterity: Number(randomDexterity), //敏捷
        spiritualintuition: Number(randomSpiritualintuition), //灵性直觉
        luckyvalue: Number(randomLuckyvalue), //幸运值
        intelligence: Number(randomIntelligence), //智力
        faith: Number(randomFaith), //信仰
        attack: Number(randomAttack), //力量
        armourclass: Number(randomArmourclass), //护甲值
        physicaldefense: 0, //物理防御力
        magicdefense: 0, //魔法防御力
        killnumber: 0, //击杀统计
        // coins: 0, //硬币
        kudos: 0, //声望
        experiencepoint:0, //经验值
      }])
      await ctx.database.upsert('role_playing_game_attach', [{
        id: (String(session.userId ?? session.member.user.id)),
        status: 1, //状态
        prefix: 0,
        interlocutory: 0,
        suffix: 0,
        skillpoint: 0,
        duels: this.cfg.duels,
        resetproperties: 1,
        skill1: 0,
        skill2: 0,
        skill3: 0,
        primaryweapon: 0,
        secondaryweapon: 0,
        armour: 0,
        racist: Number(randomRacist.id), //种族
        faith: Number(randomFaiths.id), //信仰
        profession: 0,
        itembar: [], // 初始化为空数组
        armourbar: [],
        skillbar: [], // 初始化为空数组
        prefixlibrary: [] // 初始化为空数组
      }])
      await ctx.database.upsert('role_playing_game_cd', [{
        id: (String(session.userId ?? session.member.user.id)),
        status: 0, //状态
        statuscd: this.dateToTimestamp(time) - 100000,
        attackcd: this.dateToTimestamp(time) - 100000,
        duelscd: this.dateToTimestamp(time) - 100000,
        skillcd: this.dateToTimestamp(time) - 100000,
        attackerstorage: []
      }])
      console.log(parseInt(time, 10))
      logger.info(`${name}(${session.userId ?? session.member.user.id}) 首次使用，写入数据库！`)
      return {
        "level": level, //等级
        "status": status, //状态"
        "healthpoint": healthpoint, //生命值
        "maxhealthpoint": maxhealthpoint, //最大生命值"
        "healthpointEnd": healthpointEnd, //最终生命值"
        "magicpoint": magicpoint, //魔力值
        "maxmagicpoint": maxmagicpoint, //最大魔力值
        "magicpointEnd": magicpointEnd, //最终魔力值"
        "sturdypoint": sturdypoint, //体质
        "stamina": stamina, //耐力
        "dexterity": dexterity, //敏捷
        "spiritualintuition": spiritualintuition, //灵性直觉
        "luckyvalue": luckyvalue, //幸运值
        "intelligence": intelligence, //智力
        "faith": faith, //信仰
        "profession": profession, //职业
        "attack": attack, //力量
        "armourclass": armourclass, //护甲值
        "physicaldefense": physicaldefense, //物理防御力
        "magicdefense": magicdefense, //魔法防御力
        "killnumber": killnumber, //击杀统计
        "coins": coins, //硬币
        "kudos": kudos, //声望
        "experiencepoint": experiencepoint, //经验值
        "prefix": prefix, //前缀
        "interlocutory": interlocutory, //中间
        "suffix": suffix, //后缀
        "skillpoint": skillpoint, //属性点
        "duels": duels,
        "skill1": skill1,
        "skill2": skill2,
        "skill3": skill3,
        "primaryweapon": primaryweapon, //主武器
        "secondaryweapon": secondaryweapon, //副武器
        "armour": armour, //盔甲
        "racist": racist, //种族
        "faiths": faiths, //信仰
        "itembar": itembar, //物品栏
        "armourbar": armourbar, //盔甲库
        "skillbar": skillbar, //技能栏
        "prefixlibrary": prefixlibrary, //前缀库
        "interlocutorylibrary": interlocutorylibrary, //称号库
        "suffixlibrary": suffixlibrary, //后缀库
        "attackcd": attackcd, //攻击冷却
        "duelscd": duelscd //决斗冷却
      }
    }

    return {
      "level": level, //等级
      "status": status, //状态"
      "healthpoint": healthpoint, //生命值
      "maxhealthpoint": maxhealthpoint, //最大生命值"
      "healthpointEnd": healthpointEnd, //最终生命值"
      "magicpoint": magicpoint, //魔力值
      "maxmagicpoint": maxmagicpoint, //最大魔力值
      "magicpointEnd": magicpointEnd, //最终魔力值"
      "sturdypoint": sturdypoint, //体质
      "stamina": stamina, //耐力
      "dexterity": dexterity, //敏捷
      "spiritualintuition": spiritualintuition, //灵性直觉
      "luckyvalue": luckyvalue, //幸运值
      "intelligence": intelligence, //智力
      "faith": faith, //信仰
      "profession": profession, //职业
      "attack": attack, //力量
      "armourclass": armourclass, //护甲值
      "physicaldefense": physicaldefense, //物理防御力
      "magicdefense": magicdefense, //魔法防御力
      "killnumber": killnumber, //击杀统计
      "coins": coins, //硬币
      "kudos": kudos, //声望
      "experiencepoint": experiencepoint, //经验值
      "prefix": prefix, //前缀
      "interlocutory": interlocutory, //中间
      "suffix": suffix, //后缀
      "skillpoint": skillpoint, //属性点
      "duels": duels,
      "skill1": skill1,
      "skill2": skill2,
      "skill3": skill3,
      "primaryweapon": primaryweapon, //主武器
      "secondaryweapon": secondaryweapon, //副武器
      "armour": armour, //盔甲
      "racist": racist, //种族
      "faiths": faiths, //信仰
      "itembar": itembar, //物品栏
      "armourbar": armourbar, //盔甲库
      "skillbar": skillbar, //技能栏
      "prefixlibrary": prefixlibrary, //前缀库
      "interlocutorylibrary": interlocutorylibrary, //称号库
      "suffixlibrary": suffixlibrary, //后缀库
      "attackcd": attackcd, //攻击冷却
      "duelscd": duelscd //决斗冷却
    }
  }

  levelJudge(experiencepoint: number): LevelInfo {
    for (const levelInfo of levelInfos) {
      if (experiencepoint <= levelInfo.level_line) {
        return levelInfo;
      }}
    return levelInfos[levelInfos.length - 1]; // Default to the last level
  }

  getGodId(id: number) {
    // 使用 find 方法在数组中查找对象
    const god = godJson.find(g => g.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return god || null;
  }

  getRaceId(id: number) {
    // 使用 find 方法在数组中查找对象
    const race = raceJson.find(r => r.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return race || null;
  }

  getSkillsByIds(ids) {
    // 使用 filter 方法在数组中查找匹配的对象
    const skills = skillJson.filter(skill => ids.includes(skill.id));
    // 返回所有匹配的对象
    return skills;
  }

  getSkillId(id: number) {
    // 使用 find 方法在数组中查找对象
    const skill = skillJson.find(s => s.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return skill || null;
  }

  getProfessionId(id: number) {
    // 使用 find 方法在数组中查找对象
    const profession = professionJson.find(p => p.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return profession || null;
  }

  getPrefixLibraryId(id: number) {
    // 使用 find 方法在数组中查找对象
    const profession = prefixLibraryJson.find(p => p.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return profession || null;
  }

  getInterlocutorylibraryId(id: number) {
    // 使用 find 方法在数组中查找对象
    const profession = interlocutorylibraryJson.find(i => i.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return profession || null;
  }

  getSuffixlibraryId(id: number) {
    // 使用 find 方法在数组中查找对象
    const profession = suffixlibraryJson.find(s => s.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return profession || null;
  }

  getArsenalId(id: number) {
    // 使用 find 方法在数组中查找对象
    const arsenal = arsenalJson.find(a => a.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return arsenal || null;
  }

  getArmourId(id: number) {
    // 使用 find 方法在数组中查找对象
    const armour = armourJson.find(a => a.id === id);
    // 如果找到对象，返回对象，否则返回 null
    return armour || null;
  }

  seededRandom(seed: number) {
    let state = seed;
    return function() {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  }
  getRandomItems(items: any[], count: number, random: () => number, exclude: any[] = []) {
    const filteredItems = items.filter(item => item.id !== 0 && !exclude.includes(item.id));
    const shuffled = filteredItems.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }
  updateShopList() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const seed = Number(currentDate.split('-').join(''));
    const random = this.seededRandom(seed);

    this.store.arsenals = this.getRandomItems(this.arsenals, 10, random);
    this.store.armour = this.getRandomItems(this.armour, 10, random);
    this.store.skill = this.getRandomItems(this.skill, 10, random);
  }

  getShopList() {
    return this.store;
  }

  dateToTimestamp(dateString) {
    // 将日期字符串转换为 Date 对象
    let date = new Date(dateString);
    // 获取时间戳（以毫秒为单位）
    let timestamp = date.getTime();
    return timestamp;
  }
  distributeValues(total, n, minValue, maxValue) {
    // 初始化常量数组
    const values = Array(n).fill(minValue);

    // 计算剩余值
    let remaining = total - n * minValue;

    // 随机打乱顺序
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    // 随机分配剩余值
    while (remaining > 0) {
      // 随机选择一个常量
      const index = Math.floor(Math.random() * n);

      // 计算当前常量到达上限还需要的值
      const maxIncrement = maxValue - values[index];

      // 如果已经达到上限，跳过
      if (maxIncrement <= 0) continue;

      // 随机增加一个值（这里确保不会超过剩余值或超过上限）
      const increment = Math.min(Math.floor(Math.random() * remaining) + 1, maxIncrement);

      values[index] += increment;
      remaining -= increment;
    }

    return values;
  }
}
export class FixedArrayService {
  private maxSize: number
  private ctx: Context
  // private tableName: string

  constructor(ctx: Context, maxSize: number) {
    this.ctx = ctx
    this.maxSize = maxSize
    // this.tableName = tableName
  }

  // 从数据库中获取数组
  async getArray(session) {
    const result = await this.ctx.database.get('role_playing_game_cd', { id: String(session.member.user.id) })

    if (result.length > 0 && result[0].attackerstorage) {
      try {
        return result[0].attackerstorage
      } catch (error) {
        console.error('Failed to parse attackerstorage:', error)
        return []
      }
    }
    return []
  }

  // 向数组中添加新元素，并保持数组总数为maxSize
  async addElement(element,session) {
    let array = await this.getArray(session)
    array.push(element)

    if (array.length > this.maxSize) {
      array.shift()
    }

    await this.ctx.database.upsert('role_playing_game_cd', [{
      id: String(session.member.user.id),
      attackerstorage: array
    }])
  }
}
