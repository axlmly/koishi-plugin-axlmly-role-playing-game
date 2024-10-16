import {Context, Logger, Schema, h, Random, Service, Time} from 'koishi'
import puppeteer from "koishi-plugin-puppeteer";
import { Page } from "puppeteer-core";
import {Rpgdata,FixedArrayService} from './database'
import * as fs from 'fs'
import path, {resolve} from 'path'
import {menuHtml} from './menuhtml'
import * as http from 'http';
import {duelsHtml} from './duelshtml'
import { } from 'koishi-plugin-jrys-max'
import {godJson} from "./index/god";
import {raceJson} from "./index/race";


export const name = 'axlmly-role-playing-game'

export interface Config {
  criticalhit: number,
  logger: boolean,
  recoverytime: number,
  duels: number,
  attackcd: number,
  duelscd: number,
  statuscd: number,
  signincoins: number,
  signinexp: number,
  resetpropertiestotal: number,
  resetpropertiesminValue: number,
  resetpropertiesmaxValue: number,
  resetproperties: number,
  battlestatecd: number,
  skillcd: number,
  maxSize: number,
  gradegap: number,
}

export const Config: Schema<Config> = Schema.object({

  resetpropertiestotal: Schema.number().role('')
    .min(1).max(99999).step(1).default(270)
    .description('重置总值'),
  resetpropertiesminValue: Schema.number().role('')
    .min(1).max(99999).step(1).default(10)
    .description('重置单属性下限,如果大于上限就默认为10'),
  resetpropertiesmaxValue: Schema.number().role('')
    .min(1).max(99999).step(1).default(38)
    .description('重置属性上限,如果小于下限默认为38'),
  resetproperties: Schema.number().role('')
    .min(1).max(99999).step(1).default(1000)
    .description('重置属性&&种族&&信仰的花费'),
  criticalhit: Schema.number().role('slider')
    .min(5).max(100).step(1).default(30)
    .description('暴击概率'),
  recoverytime: Schema.number().role('')
    .min(1).max(60).step(1).default(6)
    .description('每隔一段时间回复全部未死亡的玩家的血量五分之一与魔力十分之一'),
  duels: Schema.number().role('')
    .min(1).max(9999).step(1).default(5)
    .description('决斗次数限制'),
  duelscd: Schema.number().role('')
    .min(1).max(9999).step(1).default(90)
    .description('决斗结束后的保护期(秒)'),
  attackcd: Schema.number().role('')
    .min(1).max(60).step(1).default(2)
    .description('使用给你一拳之类的交互时的冷却时间(分钟)'),
  statuscd: Schema.number().role('')
    .min(1).max(60).step(1).default(5)
    .description('切换止战状态的cd(分钟)'),
  battlestatecd: Schema.number().role('')
    .min(1).max(9999).step(1).default(30)
    .description('脱离战斗进入止战状态的cd(秒)'),
  skillcd: Schema.number().role('')
    .min(1).max(60).step(1).default(1)
    .description('使用技能的冷却cd(分钟)'),
  maxSize: Schema.number().role('slider')
    .min(1).max(20).step(1).default(5)
    .description('造成伤害人存储最大次数'),
  signincoins: Schema.number().role('')
    .min(1).max(9999).step(1).default(200)
    .description('签到获得的硬币数量最低浮动上限'),
  signinexp: Schema.number().role('')
    .min(1).max(9999).step(1).default(200)
    .description('签到获得的经验数量最低浮动上限'),
  gradegap: Schema.number().role('')
    .min(1).max(100).step(1).default(5)
    .description('最低等级差距'),
  logger: Schema.boolean().default(false)
    .description('是否开启日志'),
})
export const usage = `
<h2>如遇使用问题请在koishi非官方交流群公屏提问,或直接at AXLMLY,或爱发电私信<h2>
<div class="container">
  <p>如果您喜欢我的内容，请不妨通过爱发电支持我,您的发电就是我继续开发的动力</p>
  <a href="https://afdian.net/a/axlmly" class="styled-button">爱发电<br></a>
</div>
<div>使用方面:<br>--大部分的指令都不需要回复,只有指定对战类的指令需要,使用回复来进行对战是为了不将战斗波及到从来没有发言的人,避免造成不必要的麻烦,请谅解.<br>--如果有更好的建议请您提出,如果有益插件的发展我会考虑加入内容<br>--目前的复活机制是每日0点自动复活与回复主动决斗次数至设定的上限,自动回血回魔是根据配置的时间每次回复五分之一.<br>--止战状态能够使用给你一拳不是bug<br>--获取硬币的方式目前有签到(jrys-max)和击杀,头衔称号还在todo,如果有数值上的建议请告诉我<br>--装备栏界面是白色的很正常,因为也还在做,后续会加入武器装备图标,天赋描述只是描述,目前没有实际效果(但我是看着描述填数值的)</div>
`

declare module 'koishi' {
  interface Context  {
    axlmlyrpg: axlmlyrpg
  }
}

export class axlmlyrpg extends Service {
  constructor(ctx: Context) {
    // 这样写你就不需要手动给 ctx 赋值了
    super(ctx, 'axlmlyrpg', true);
  }
  async getdata(session, config, ctx) {
    const rpgdata = new Rpgdata(ctx,config);
    const menu = new menuHtml()
    await rpgdata.userdata(session,ctx)
    await menu.menuimg(session,config,ctx)
  }
  async updataconis(ctx,session,config,jrysData){
    let jrysluck:number
    if(jrysData <= 10){
      jrysluck = 1
    }else if(jrysData <= 100){
      jrysluck = 15
    }else if(jrysData <= 200){
      jrysluck = 50
    }else if(jrysData <= 300){
      jrysluck = 100
    }else if(jrysData <= 400){
      jrysluck = 200
    }else if(jrysData <= 500){
      jrysluck = 300
    }else if(jrysData <= 510){
      jrysluck = 350
    }else if(jrysData <= 512){
      jrysluck = 500
    }
    console.log(jrysluck)
    const signincoinsrandom = Random.int(100,config.signincoins + jrysluck)
    const signinexprandom = Random.int(100,config.signinexp + jrysluck)
    const coins = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
    const experiencepoint = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.experiencepoint; //经验
    await ctx.database.upsert('role_playing_game',[{
      id: String(session.userId),
      coins: coins + signincoinsrandom,
      experiencepoint: experiencepoint + signinexprandom,
    }])
    await ctx.database.upsert('jrys_max',[{
      id: String(session.userId),
      coins: signincoinsrandom,
      exp: signinexprandom
    }])
    console.log(signincoinsrandom,signinexprandom)
  }
}
export const inject = ['database','puppeteer','jrysmaxs']

const logger = new Logger('[AXLMLYRPG]>> ');
//定时器
const scheduleDailyTask = (task, hour, minute) => {
  const now = new Date();
  const firstRun = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);

  // 如果当前时间已经超过了目标时间，则设置为明天的目标时间
  if (now.getTime() > firstRun.getTime()) {
    firstRun.setDate(firstRun.getDate() + 1);
  }

  // 计算第一次执行的延迟时间
  const delay = firstRun.getTime() - now.getTime();

  // 设置第一个定时器
  setTimeout(() => {
    // 执行任务
    task();

    // 设置每天的定时器
    setInterval(task, 24 * 60 * 60 * 1000); // 24小时的间隔
  }, delay);
};

export function apply(ctx: Context, config: Config) {
  // write your plugin here
  const rpgdata = new Rpgdata(ctx, config);
  const sixedsrrayservice = new FixedArrayService(ctx, config.maxSize)
  const menu = new menuHtml()
  let cooldownTime = config.attackcd * 60 * 1000;
  let cooldownTime1 = config.duelscd * 1000
  let cooldownTime2 = config.attackcd * 60 * 1000;
  let cooldownTime3 = config.battlestatecd * 1000;
  let cooldownTime4 = config.skillcd * 60 * 1000;


  ctx.on("ready", async () => {
    // 定义一个函数来更新数据库中的所有用户血量与魔力值
    const updateHealth = async () => {
      try {
        // 获取所有用户数据
        const users = await ctx.database.get('role_playing_game', { status: 1 });

        // 遍历所有用户，更新其血量与魔力为其最大血量
        for (const user of users) {
          const maxHealth = user.healthpointEnd; // 最大生命值存储在 healthpointEnd 字段
          const maxMana = user.magicpointEnd; // 最大法力值存储在 magicpointEnd 字段
          const maxHealth1 = Math.round(maxHealth * 0.2)
          const maxMana1 = Math.floor(maxMana * 0.1)
          const health = user.healthpoint
          const mana = user.magicpoint
          if(maxHealth1 + health < maxHealth){
            await ctx.database.set('role_playing_game', { id: user.id }, { healthpoint: health + maxHealth1});
          }
          if(maxHealth1 + health > maxHealth){
            await ctx.database.set('role_playing_game', { id: user.id }, { healthpoint: maxHealth});
          }
          if(maxMana1 + mana < maxMana){
            await ctx.database.set('role_playing_game', { id: user.id }, {  magicpoint: mana + maxMana1});
          }
          if(maxMana1 + mana > maxMana){
            await ctx.database.set('role_playing_game', { id: user.id }, {  magicpoint: maxMana});
          }
        }
        if(config.logger){
          logger.info('所有未死亡的用户的血量与魔力已增加');
        }
      } catch (error) {
        logger.info('出现错误,请带上报错日志与操作截图留言作者' + error);
      }
    }
    const updatalife = async () => {
      try{
        const users = await ctx.database.get('role_playing_game', { status: 0 });
        for(const user of users){
          const maxHealth = user.healthpointEnd; // 假设每个用户的最大生命值存储在 healthpointEnd 字段
          const maxMana = user.magicpointEnd; // 假设每个用户的最大法力值存储在 magicpointEnd 字段
          await ctx.database.set('role_playing_game', { id: user.id }, { healthpoint: maxHealth, magicpoint: maxMana, status: 1 })
        }
        const users2 = await ctx.database.get('role_playing_game_attach', { status: 1 });
        for(const user of users2){
          await ctx.database.set('role_playing_game_attach',{ status: 1 }, { duels: config.duels , resetproperties: 1})
        }
        const users3 = await ctx.database.get('role_playing_game_attach', { status: 0 });
        for(const user of users3){
          await ctx.database.set('role_playing_game_attach',{ status: 0 }, { duels: config.duels,status: 1, resetproperties: 1 })
        }
        if(config.logger){
          logger.info('所有死亡的用户已经复活');
        }
      }catch(error){
        logger.info('出现错误,请带上报错日志与操作截图留言作者' + error)
      }
    }

    // 设置一个定时器，每6分钟执行一次更新
    ctx.setInterval(updateHealth, config.recoverytime * 60 * 1000)
    scheduleDailyTask(updatalife, 0, 0);
  });

  ctx.plugin(axlmlyrpg)
  ctx.inject(['axlmlyrpg'], (ctx) => {
  })
  const axlmlyrpgs = ctx.command('axlmlyrpg', 'AXLMLYRPG相关指令',{permissions:['authority:1']})
  axlmlyrpgs.subcommand("menu", "AXLMLYRPG菜单")
    .alias("菜单")
    .userFields(['name'])
    .usage('请在更新完数据后务必调用一次')
    .action(async ({session}) => {
      await rpgdata.userdata(session,ctx)
      // const jsonString = JSON.stringify(getrpgjson);
      // const path = require('path');
      const menuPath = path.join(__dirname, "menu.html");
      let page;
      const getMenu = await menu.menuimg(session,config,ctx)
      const getHttpContent = getMenu.httpContent
      fs.writeFileSync(menuPath, getHttpContent);
      page = await ctx.puppeteer.page()
      await page.setViewport({ width: 2600, height: 1080 * 2 });
      await page.goto(menuPath);
      // await page.waitForSelector("#body");
      const element = await page.$("#body");
      let msg;
      if (element) {
        const imgBuf = await element.screenshot({
          encoding: "binary"
        });
        msg = h.image(imgBuf, 'image/png');
      } else {
        msg = "Failed to capture screenshot.";
      }
      // 关闭页面
      await page.close();
      // 返回消息
      return msg;
})

  axlmlyrpgs.subcommand("punch", "给你一拳")
    .alias("给你一拳")
    .userFields(['name'])
    .usage(`请引用/回复使用,不要问为什么不能殴打死人了,当前给你一拳冷却时间为${config.attackcd}分钟`)
    .example('[引用]给你一拳')
    .action(async ({session}) => {
      //不是回复
      if(!session.quote){
        return
      }

      //攻击伯特
      if(session.quote.member.user.id === session.bot.userId){
        return
      }

      //攻击自己
      if(session.quote.member.user.id === session.userId){
        return
      }
      if(config.logger){
        logger.info(`${session.quote.member.nick}\n${session.quote.member.user.name}\n${session.username}\n${JSON.stringify(session.quote)}`)
      }
      let time =  Time.template('yyyy-MM-dd hh:mm:ss', new Date());
      let getnewtime = rpgdata.dateToTimestamp(time)
      let attackcd = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId) }))[0]?.attackcd //给一拳的攻击cd
      if(getnewtime - attackcd <= cooldownTime){
        return
      }else {
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.userId),
          attackcd: getnewtime
        }])
      }
      await rpgdata.userdata(session.quote,ctx)
      await rpgdata.userdata(session,ctx)

      try{
        const getMenu1 = await menu.menuimg(session.quote,config,ctx)
        const getMenu2 = await menu.menuimg(session,config,ctx)

        const getstatus1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.status; //状态
        const getstatus2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.status; //状态

        if(getstatus1 == 0){
          return
        }else if(getstatus2 == 0){
          return '你不能攻击死掉的人'
        }


        const hurt2 = getMenu2.sturdypointEnd + getMenu2.attackEnd
        const hurt1 = hurt2 * 1.5
        const hurt3 = getMenu1.sturdypointEnd + getMenu1.attackEnd
        const hurt4 = hurt3 * 1.5

        const getHealthpoint1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpoint; //生命值
        const getHealthpoint2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpoint; //生命值
        const getcoins2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
        const getcoins1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.coins; //硬币
        const getexperiencepoint2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.experiencepoint; //经验值
        const killnumber = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.killnumber; //击杀统计
        let coins1 = Math.floor(getcoins1 * 0.2)
        if(coins1 < 0){
          coins1 = 0
        }else if(coins1 >= 100){
          coins1 = 100
        }
        let coins2 = Math.floor(getcoins2 * 0.2)
        if(coins2 < 0){
          coins2 = 0
        }else if(coins2 >= 100){
          coins2 = 100
        }
        const experience1 = 100
        const experience2 = experience1 * 2
        const experience = Random.int(experience1,experience2)

        //计算闪避
        let sidestep1 = Math.round(getMenu1.dexterityEnd + 0.7 * getMenu1.sturdypointEnd + 0.5 * getMenu1.spiritualintuitionEnd + 0.5 * getMenu1.staminaEnd)
        let sidestep3 = Random.int(sidestep1,sidestep1 * 2)
        let sidestep2 = Math.round(getMenu2.dexterityEnd + 0.7 * getMenu2.sturdypointEnd + 0.5 * getMenu2.spiritualintuitionEnd + 0.5 * getMenu2.staminaEnd)
        let sidestep4 = Random.int(sidestep2,sidestep2 * 2)

        let maxsidestep3 = Math.round(Random.int(sidestep1,sidestep3) + (0.7 * getMenu1.luckyvalueEnd))
        if(maxsidestep3 > sidestep3){
          maxsidestep3 = sidestep3
        }
        let maxsidestep4 = Math.round(Random.int(sidestep2,sidestep4) + (0.7 * getMenu2.luckyvalueEnd))
        if(maxsidestep4 > sidestep4){
          maxsidestep4 = sidestep4
        }

        //计算暴击上限
        let maxcriticalhitRndom = Math.round(100 - (getMenu2.luckyvalueEnd / 50))
        if(maxcriticalhitRndom < 50){
          maxcriticalhitRndom = 50
        }
        let maxcriticalhitRndom1 = Math.round(100 - (getMenu1.luckyvalueEnd / 50))
        if(maxcriticalhitRndom1 < 50){
          maxcriticalhitRndom1 = 50
        }
        const criticalhitRndom = Random.int(1,maxcriticalhitRndom) //算上幸运值的暴击率
        const criticalhitRndom1 = Random.int(1,maxcriticalhitRndom1) //算上幸运值的暴击率

        let hurt = Math.round(Random.int(hurt1,hurt2) + (0.7 * getMenu2.luckyvalueEnd))
        if(hurt > hurt1){
          hurt = hurt1
        }
        let hurt5 = Math.round(Random.int(hurt3,hurt4) + (0.7 * getMenu1.luckyvalueEnd))
        if(hurt5 > hurt4){
          hurt5 = hurt4
        }

        let hurtEnd = Math.round((hurt * (1 - (getMenu1.physicaldefenseEnd / 100)) - getMenu1.armourclassEnd) * 0.05)
        if(hurtEnd<= 0){
          hurtEnd = 1
        }
        let hurtCriticalhitEnd = Math.round((hurt * (1 - (getMenu1.physicaldefenseEnd / 100)) - getMenu1.armourclassEnd + (0.5 * hurtEnd)) * 0.05)
        if(hurtCriticalhitEnd <= 0){
          hurtCriticalhitEnd = 1
        }
        let hurtEnd1 = Math.round((hurt5 * (1 - (getMenu2.physicaldefenseEnd / 100)) - getMenu2.armourclassEnd) * 0.05)
        if(hurtEnd1<= 0){
          hurtEnd1 = 1
        }
        let hurtCriticalhitEnd1 = Math.round((hurt5 * (1 - (getMenu2.physicaldefenseEnd / 100)) - getMenu2.armourclassEnd + (0.5 * hurtEnd1)) * 0.05)
        if(hurtCriticalhitEnd1 <= 0){
          hurtCriticalhitEnd1 = 1
        }
        let name = session.quote.member.nick
        if(name.length <= 0){
          name = session.quote.user.name
      }
        if(maxsidestep3 <= 3 * maxsidestep4) {
          if (getHealthpoint1 - hurtEnd > 0) {
            if (criticalhitRndom < config.criticalhit) {
              await ctx.database.upsert('role_playing_game', [{
                id: String(session.quote.user.id),
                healthpoint: getHealthpoint1 - hurtCriticalhitEnd,
              }])
              await sixedsrrayservice.addElement(session.userId, session.quote)
              return `${name}被${session.username}的拳头击中,出现暴击!造成了${hurtCriticalhitEnd}点伤害`
            } else {
              await ctx.database.upsert('role_playing_game', [{
                id: String(session.quote.user.id),
                healthpoint: getHealthpoint1 - hurtEnd,
              }])
              await sixedsrrayservice.addElement(session.userId, session.quote)
              return `${name}被${session.username}的拳头击中,造成了${hurtEnd}点伤害`
            }

          } else if (getHealthpoint1 - hurtEnd <= 0) {
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.quote.user.id),
              healthpoint: 0,
              status: 0,
              coins: getcoins1 - coins1
            }])
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.userId),
              coins: getcoins2 + 20 + coins1,
              experiencepoint: getexperiencepoint2 + experience,
              killnumber: killnumber + 1
            }])
            await sixedsrrayservice.addElement(session.userId, session.quote)
            return `精彩的偷袭!${name}被${session.username}击杀,${session.username}获得${30 + coins1}与${experience}经验值`
          }
        }else{
          if(Random.int(1,2) === 1){
            if (getHealthpoint2 - hurtEnd > 0) {
              if (criticalhitRndom1 < config.criticalhit) {
                await ctx.database.upsert('role_playing_game', [{
                  id: String(session.userId),
                  healthpoint: getHealthpoint1 - 2 * hurtCriticalhitEnd1,
                }])
                await sixedsrrayservice.addElement(session.userId, session.quote)
                return `${session.username}的攻击被${name}躲过并反击!出现暴击!造成了${2 * hurtCriticalhitEnd1}点伤害`
              } else {
                await ctx.database.upsert('role_playing_game', [{
                  id: String(session.userId),
                  healthpoint: getHealthpoint1 - 2 * hurtEnd1,
                }])
                await sixedsrrayservice.addElement(session.userId, session.quote)
                return `${session.username}被${name}躲过并反击!造成了${2 * hurtEnd1}点伤害`
              }
            }else if (getHealthpoint2 - 2 * hurtEnd1 <= 0) {
              await ctx.database.upsert('role_playing_game', [{
                id: String(session.userId),
                healthpoint: 0,
                status: 0,
                coins: getcoins2 - coins2
              }])
              await ctx.database.upsert('role_playing_game', [{
                id: String(session.quote.user.id),
                coins: getcoins2 + 20 + coins2,
                experiencepoint: getexperiencepoint2 + experience,
                killnumber: killnumber + 1
              }])
              await sixedsrrayservice.addElement(session.userId, session.quote)
              return `经典的偷袭失败案例!${session.username}被${name}反杀,${name}获得获得${30 + coins2}硬币与${experience}经验值`
            }
          }else{
            if(Random.int(1,10) <= 5){
              return `${name}挡住了${session.username}的攻击`
            }
            return `${name}躲开了${session.username}的攻击`
          }


        }}catch (err){
        logger.error(`[AXLMLYRPG Error]:\r\n`+err);
        return '炸了'
      }

    })

  axlmlyrpgs.subcommand("resurrect", "复活")
    .alias("复活")
    .userFields(['name'])
    .usage('只有死人和有硬币的人能使用复活功能,复活需要消耗100硬币,没有硬币去签到,没有签到插件找bot主下')
    .example('(在自身角色死亡时并且身上有一百硬币时)复活')
    .action(async ({session, options}) => {
      await rpgdata.userdata(session,ctx)
      const getMenu2 = await menu.menuimg(session,config,ctx)

      const getstatus2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.status; //状态
      const getcoins2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
      if(getstatus2 === 0 && getcoins2 >= 100) {
        await ctx.database.upsert('role_playing_game', [{
          id: String(session.userId),
          coins: getcoins2 - 100,
          healthpoint: getMenu2.healthpointEnd,
          magicpoint: getMenu2.maxmagicpointEnd,
          status: 1,
        }])
        return `${session.username}复活成功`
      }else if(getstatus2 !== 0){
        return
      }else if(getcoins2 < 100){
        return `没有硬币的人不能复活哦`
      }})

  ctx.command("duels", "决斗")
    .alias("决斗")
    .userFields(['name'])
    .usage(`对着死人和自己决斗是无效的,发起者死了无法决斗.当前决斗保护时间为${config.duelscd}秒,主动的决斗次数为${config.duels}`)
    .example('[引用]决斗')
    .action(async ({session}) => {
      if(!session.quote){
        return
      }

      if(config.logger){
        logger.info(`${session.quote.member.nick}\n${session.quote.member.user.name}\n${session.username}\n${JSON.stringify(session.quote)}`)
      }

      //对bot
      if(session.quote.member.user.id === session.bot.userId){
        return
      }

      //对自己
      if(session.quote.member.user.id === session.userId){
        return
      }

      const getstatus1 = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId) }))[0]?.status; //止战状态
      const getstatus2 = (await ctx.database.get('role_playing_game_cd', { id: String(session.quote.user.id) }))[0]?.status; //止战状态
      let level1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.level //等级
      let level2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.level //等级

      if(getstatus1 === 1){
        return `你处于止战状态`
      }
      // if(getstatus1 === 0 && getstatus2 === 1){
      //   return
      // }
      if(getstatus2 === 1){
        return `对方处于止战状态`
      }
      const duels = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId) }))[0]?.duels; //决斗限制次数

      if(duels === 0){
        return `无主动决斗次数`
      }
      if(level1 - level2 > config.gradegap){
        return `对方等级过低`
      }
      let time =  Time.template('yyyy-MM-dd hh:mm:ss', new Date());
      let getnewtime = rpgdata.dateToTimestamp(time)
      let duelscd = (await ctx.database.get('role_playing_game_cd', { id: String(session.quote.user.id) }))[0]?.duelscd //决斗cd
      let skillcd = (await ctx.database.get('role_playing_game_cd', { id: String(session.quote.user.id) }))[0]?.skillcd //施法cd
      let getkudos1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.kudos; //声望

      const duelshtml = new duelsHtml()
      await rpgdata.userdata(session.quote,ctx)
      await rpgdata.userdata(session,ctx)
      await menu.menuimg(session,config,ctx)
      await menu.menuimg(session.quote,config,ctx)
      const getstatus3 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.status; //状态
      const getstatus4 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.status; //状态

      //死亡
      if(getstatus3 == 0){
        return
      }else if(getstatus4 == 0){
        return '你不能攻击死掉的人'
      }
      if(getnewtime - duelscd <= cooldownTime1){
        return `对方处于决斗保护状态`
      }else {
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.quote.user.id),
          duelscd: getnewtime
        }])
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.userId),
          duelscd: getnewtime
        }])
      }
      if(getnewtime - skillcd <= cooldownTime4){
        await ctx.database.upsert('role_playing_game',[{
          id: String(session.userId),
          kudos: getkudos1 - 5
        }])
      }

      if(duels >= 1){
        await ctx.database.upsert('role_playing_game_attach',[{
          id: String(session.userId),
          duels: duels - 1
        }])
      }
      let name = session.quote.member.nick
      if(name.length <= 0){
        name = session.quote.user.name
      }
      const duelsPath = path.join(__dirname, "duelshtml.html");
      let page;
      const getduelshtml = await duelshtml.getDuelsHtml(session,config,ctx)
      const getHttpContent = getduelshtml.htmlContent
      fs.writeFileSync(duelsPath, getHttpContent);
      page = await ctx.puppeteer.page()
      await page.setViewport({ width: 880, height: 1080 * 2 });
      await page.goto(duelsPath);
      // await page.waitForSelector("#body");
      const element = await page.$("#body");
      let msg;
      if (element) {
        const imgBuf = await element.screenshot({
          encoding: "binary"
        });
        msg = h.image(imgBuf, 'image/png');
      } else {
        msg = "截图失败.";
      }
      // 关闭页面
      await page.close();
      // 返回消息
      if(config.logger){
        logger.info(`${getduelshtml.player1hp}\n${getduelshtml.player2hp}`)
      }
      let gethp1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpoint; //生命值
      let gethp2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpoint; //生命值
      let gethpend1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpointEnd; //最终生命值
      let gethpend2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpointEnd; //最终生命值
      const getcs1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.coins; //硬币
      const getcs2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
      const hppercent1 = Math.round(gethp1 / gethpend1) * 100
      const hppercent2 = Math.round(gethp2 / gethpend2) * 100

      // const experience1 = 100
      let coins1:number
      let coins2:number
      let experience2: number
      let experience3: number
      let experience4: number
      let experience5: number
      let cs1: number
      let cs2: number
      //lv2 getcs1 是被回复者
      //lv1 getcs2 是回复者
      if(level2 < 10){
        experience2 = 200
        cs1 = 30
        coins1 = Math.floor(getcs1 * 0.05)
      }else if(level2 < 20){
        experience2 = 400
        cs1 = 35
        coins1 = Math.floor(getcs1 * 0.1)
      }else if(level2 < 30){
        experience2 = 800
        cs1 = 40
        coins1 = Math.floor(getcs1 * 0.13)
      }else if(level2 < 40){
        experience2 = 1600
        cs1 = 45
        coins1 = Math.floor(getcs1 * 0.15)
      }else if(level2 < 50){
        experience2 = 3200
        cs1 = 50
        coins1 = Math.floor(getcs1 * 0.17)
      }else if(level2 < 60){
        experience2 = 6400
        cs1 = 55
        coins1 = Math.floor(getcs1 * 0.2)
      }else if(level2 < 70){
        experience2 = 12800
        cs1 = 60
        coins1 = Math.floor(getcs1 * 0.23)
      }else if(level2 < 80){
        experience2 = 23600
        cs1 = 65
        coins1 = Math.floor(getcs1 * 0.25)
      }else if(level2 < 90){
        experience2 = 47200
        cs1 = 70
        coins1 = Math.floor(getcs1 * 0.27)
      }else if(level2 < 100){
        experience2 = 94400
        cs1 = 75
        coins1 = Math.floor(getcs1 * 0.3)
      }else{
        experience2 = 0
        cs1 = 0
        coins1 = 0
      }

      if(hppercent1 === 1){
        experience4 = Math.round(experience2 * 0.01)
      }else if(hppercent1 <= 10){
         experience4 = Math.round(experience2 * 0.1)
      }else if(hppercent1 <= 20){
        experience4 = Math.round(experience2 * 0.2)
      }else if(hppercent1 <= 30){
        experience4 = Math.round(experience2 * 0.3)
      }else if(hppercent1 <= 40){
        experience4 = Math.round(experience2 * 0.4)
      }else if(hppercent1 <= 50){
        experience4 = Math.round(experience2 * 0.5)
      }else if(hppercent1 <= 60){
        experience4 = Math.round(experience2 * 0.6)
      }else if(hppercent1 <= 70){
        experience4 = Math.round(experience2 * 0.7)
      }else if(hppercent1 <= 80){
        experience4 = Math.round(experience2 * 0.8)
      }else{
        experience4 = experience2
      }

      //lv2 getcs1 是被回复者
      //lv1 getcs2 是回复者
      if(level1 < 10){
        experience3 = 200
        cs2 = 30
        coins2 = Math.floor(getcs2 * 0.05)
      }else if(level1 < 20){
        experience3 = 400
        cs2 = 35
        coins2 = Math.floor(getcs2 * 0.1)
      }else if(level1 < 30){
        experience3 = 800
        cs2 = 40
        coins2 = Math.floor(getcs2 * 0.13)
      }else if(level1 < 40){
        experience3 = 1600
        cs2 = 45
        coins2 = Math.floor(getcs2 * 0.15)
      }else if(level1 < 50){
        experience3 = 3200
        cs2 = 50
        coins2 = Math.floor(getcs2 * 0.17)
      }else if(level1 < 60){
        experience3 = 6400
        cs2 = 55
        coins2 = Math.floor(getcs2 * 0.2)
      }else if(level1 < 70){
        experience3 = 12800
        cs2 = 60
        coins2 = Math.floor(getcs2 * 0.23)
      }else if(level1 < 80){
        experience3 = 23600
        cs2 = 65
        coins2 = Math.floor(getcs2 * 0.25)
      }else if(level1 < 90){
        experience3 = 47200
        cs2 = 70
        coins2 = Math.floor(getcs2 * 0.27)
      }else if(level1 < 100){
        experience3 = 94400
        cs2 = 75
        coins2 = Math.floor(getcs2 * 0.3)
      }else{
        experience3 = 0
        cs2 = 0
        coins2 = 0
      }

      if(hppercent2 === 1){
        experience5 = Math.round(experience3 * 0.01)
      }else if(hppercent2 <= 10){
        experience5 = Math.round(experience3 * 0.1)
      }else if(hppercent2 <= 20){
        experience5 = Math.round(experience3 * 0.2)
      }else if(hppercent2 <= 30){
        experience5 = Math.round(experience3 * 0.3)
      }else if(hppercent2 <= 40){
        experience5 = Math.round(experience3 * 0.4)
      }else if(hppercent2 <= 50){
        experience5 = Math.round(experience3 * 0.5)
      }else if(hppercent2 <= 60){
        experience5 = Math.round(experience3 * 0.6)
      }else if(hppercent2 <= 70){
        experience5 = Math.round(experience3 * 0.7)
      }else if(hppercent2 <= 80){
        experience5 = Math.round(experience3 * 0.8)
      }else{
        experience5 = experience3
      }

      // const experience = Random.int(experience1,experience2)
      if(getduelshtml.player1hp <= 0){
        const getcoins1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.coins; //硬币
        const getcoins2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
        const getexperiencepoint2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.experiencepoint; //经验值
        // const getHealthpoint1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpoint; //生命值
        let getmagicpointEnd1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.magicpointEnd; //最终魔力值
        let healthpointEnd1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpointEnd; //最终生命值

        const killnumber = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.killnumber; //击杀统计
        // let coins1 = Math.floor(getcoins1 * 0.2)
        if(getcoins1 - coins1 <= 0){
          coins1 = 0
        }else if(getcoins1 - coins1 >= 200){
          coins1 = 200
        }
        await ctx.database.upsert('role_playing_game', [{
          id: String(session.quote.user.id),
          healthpoint: 0,
          magicpoint: 0,
          status: 0,
          coins: getcoins1 - coins1,
        }])
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.quote.user.id),
          status: 1
        }])
        if(getduelshtml.player2hp >= healthpointEnd1 || getduelshtml.player2mp >= getmagicpointEnd1){
          if(getduelshtml.player2hp >= healthpointEnd1 && getduelshtml.player2mp <= getmagicpointEnd1){
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.userId),
              healthpoint: healthpointEnd1,
              magicpoint: getduelshtml.player2mp,
              coins: getcoins2 + cs1 + coins1,
              experiencepoint: getexperiencepoint2 + experience5,
              killnumber: killnumber + 1
            }])
          }else if(getduelshtml.player2mp >= getmagicpointEnd1 && getduelshtml.player2hp <= healthpointEnd1){
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.userId),
              healthpoint: getduelshtml.player2hp,
              magicpoint: getmagicpointEnd1,
              coins: getcoins2 + cs1 + coins1,
              experiencepoint: getexperiencepoint2 + experience5,
              killnumber: killnumber + 1
            }])
          }else{
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.userId),
              healthpoint: healthpointEnd1,
              magicpoint: getmagicpointEnd1,
              coins: getcoins2 + cs1 + coins1,
              experiencepoint: getexperiencepoint2 + experience5,
              killnumber: killnumber + 1
            }])
          }
        }else{
          await ctx.database.upsert('role_playing_game', [{
            id: String(session.userId),
            healthpoint: getduelshtml.player2hp,
            magicpoint: getduelshtml.player2mp,
            coins: getcoins2 + cs1 + coins1,
            experiencepoint: getexperiencepoint2 + experience5,
            killnumber: killnumber + 1
          }])
        }
        await sixedsrrayservice.addElement(session.userId, session.quote)
        session.send(`这场战斗中,${name}被${session.username}击杀,${session.username}获得${30 + coins1}硬币与${experience5}经验值.`)
        return msg;
      }else if(getduelshtml.player2hp <= 0){
        const getcoins2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.coins; //硬币
        const getcoins1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
        const getexperiencepoint2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.experiencepoint; //经验值
        // const getHealthpoint1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpoint; //生命值
        const killnumber = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.killnumber; //击杀统计
        let getmagicpointEnd2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.magicpointEnd; //最终魔力值
        let healthpointEnd2 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpointEnd; //最终生命值
        // let coins1 = Math.floor(getcoins1*0.2)
        if(getcoins1 - coins2 <= 0){
          coins2 = 0
        }else if(getcoins1 - coins2 >= 200){
          coins2 = 200
        }
        await ctx.database.upsert('role_playing_game', [{
          id: String(session.userId),
          healthpoint: 0,
          magicpoint: 0,
          status: 0,
          coins: getcoins1 - coins2
        }])
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.userId),
          status: 1
        }])
        if(getduelshtml.player1hp >= healthpointEnd2 && getduelshtml.player1mp >= getmagicpointEnd2){
          if(getduelshtml.player1hp >= healthpointEnd2 && getduelshtml.player1mp <= getmagicpointEnd2){
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.quote.user.id),
              healthpoint: healthpointEnd2,
              magicpoint: getduelshtml.player1mp,
              coins: getcoins2 + cs2 + coins2,
              experiencepoint: getexperiencepoint2 + experience4,
              killnumber: killnumber + 1
            }])
          }else if(getduelshtml.player1mp >= getmagicpointEnd2 && getduelshtml.player1hp <= healthpointEnd2){
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.quote.user.id),
              healthpoint: getduelshtml.player1hp,
              magicpoint: getmagicpointEnd2,
              coins: getcoins2 + cs2 + coins2,
              experiencepoint: getexperiencepoint2 + experience4,
              killnumber: killnumber + 1
            }])
          }else{
            await ctx.database.upsert('role_playing_game', [{
              id: String(session.quote.user.id),
              healthpoint: healthpointEnd2,
              magicpoint: getmagicpointEnd2,
              coins: getcoins2 + cs2 + coins2,
              experiencepoint: getexperiencepoint2 + experience4,
              killnumber: killnumber + 1
            }])
          }
        }else{
          await ctx.database.upsert('role_playing_game', [{
            id: String(session.quote.user.id),
            healthpoint: getduelshtml.player1hp,
            magicpoint: getduelshtml.player1mp,
            coins: getcoins2 + cs2 + coins2,
            experiencepoint: getexperiencepoint2 + experience4,
            killnumber: killnumber + 1
          }])
        }
        await sixedsrrayservice.addElement(session.userId, session.quote)
        session.send(`这场战斗中,${session.username}被${name}击杀,${name}获得${30 + coins2}硬币与${experience4}经验值.`)
        return msg;
      }else{
        const getHealthpoint1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpoint; //生命值
        // let magicpoint1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.magicpoint; //魔力值
        const getHealthpoint2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpoint; //生命值
        // let magicpoint2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.magicpoint; //魔力值
        const getcoins1 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
        if(getduelshtml.player1hp >= getHealthpoint1){
          await ctx.database.upsert('role_playing_game', [{
            id: String(session.quote.user.id),
            // healthpoint: getduelshtml.player1hp,
            magicpoint: getduelshtml.player1mp,
          }])
        }else{
          await ctx.database.upsert('role_playing_game', [{
            id: String(session.quote.user.id),
            healthpoint: getduelshtml.player1hp,
            magicpoint: getduelshtml.player1mp,
          }])
        }
        if(getduelshtml.player2hp >= getHealthpoint2){
          await ctx.database.upsert('role_playing_game', [{
            id: String(session.userId),
            // healthpoint: getduelshtml.player2hp,
            magicpoint: getduelshtml.player2mp,
            // coins: getcoins1
          }])
        }else{
          await ctx.database.upsert('role_playing_game', [{
            id: String(session.userId),
            healthpoint: getduelshtml.player2hp,
            magicpoint: getduelshtml.player2mp,
            // coins: getcoins1
          }])
        }
        await sixedsrrayservice.addElement(session.userId, session.quote)
        session.send(`落叶传来讯息,这是一场枯燥的对决`)
        return msg;
      }
    })

  axlmlyrpgs.subcommand("viewbackpack", "查看背包")
    .alias("查看背包")
    .example('查看背包 -w/-a/-s')
    .option('w', '-w 查看武器')
    .option('a', '-a 查看盔甲')
    .option('s', '-s 查看技能')
    .action(async ({ session, options }) => {
      await rpgdata.userdata(session, ctx);
      const getdatarpg = new Rpgdata(ctx, config);
      const userId = String(session.userId);
      const userAttach = (await ctx.database.get('role_playing_game_attach', { id: userId }))[0];

      const messages = [];

      const viewItems = (itemType, inventory, getItemFn) => {
        if (inventory.length <= 0) {
          return `背包是空的`;
        }
        messages.push(`${itemType}:`);
        inventory.forEach(id => {
          const obj = getItemFn(Number(id));
          let types: string
          if(obj.types === 1){
            types = "近战"
          }else if(obj.types === 2){
            types = "法杖"
          }else if(obj.types === 3){
            types = "弓箭"
          }else if(obj.types === 3){
            types = "盾牌"
          }else {
            types = "暂无"
          }
          let level: string
          if(obj.level === 1){
            level = '灰'
          }else if(obj.level === 2){
            level = '白'
          }else if(obj.level === 3){
            level = '绿'
          }else if(obj.level === 4){
            level = '蓝'
          }else if(obj.level === 5){
            level = '红'
          }else if(obj.level === 5){
            level = '紫'
          }else if(obj.level === 6){
            level = '黑'
          }else{
            level = '暂无'
          }
          if (obj) {
            messages.push(`id | ${obj.id}, 品质 | ${level}, 类型 | ${types}, 名称 | ${obj.name}, 伤害 | ${obj.harm}, 斗气传导 | ${obj.fightkirelease}, 魔力传导 | ${obj.magicrelease}\n体质需求 | ${obj.needsturdypoint}, 力量需求 | ${obj.needattack}, 敏捷需求 | ${obj.needdexterity}, 耐力需求 | ${obj.needstamina}, 灵性直觉需求 | ${obj.needspiritualintuition}, 智力需求 | ${obj.needintelligence}, 幸运需求 | ${obj.needluckyvalue}, 信仰需求 | ${obj.needfaith}\nHP | ${obj.healthpoint}, MP | ${obj.maxmagicpoint}, 力量加成 | ${obj.attack}, 体质加成 | ${obj.sturdypoint}, 敏捷加成 | ${obj.dexterity}, 耐力加成 | ${obj.stamina}, 灵性直觉加成 | ${obj.spiritualintuition}, 智力加成 | ${obj.intelligence}, 幸运加成 | ${obj.luckyvalue}, 信仰加成 | ${obj.faith}\n——————————`);
          } else {
            messages.push(`找不到 ID 为 ${id} 的对象.`);
          }
        });
      };

      const viewArmours = (inventory, getItemFn) => {
        if (inventory.length <= 0) {
          return `背包是空的`;
        }
        messages.push(`盔甲:`);
        inventory.forEach(id => {
          const obj = getItemFn(Number(id));
          let types: string
          if(obj.types === 1){
            types = "重装甲"
          }else if(obj.types === 2){
            types = "轻装甲"
          }else if(obj.types === 3){
            types = "法袍"
          }else {
            types = "暂无"
          }
          let level: string
          if(obj.level === 1){
            level = '普通'
          }else if(obj.level === 2){
            level = '稀有'
          }else if(obj.level === 3){
            level = '精良'
          }else if(obj.level === 4){
            level = '史诗'
          }else if(obj.level === 5){
            level = '传说'
          }else{
            level = '暂无'
          }
          if (obj) {
            messages.push(`id | ${obj.id}, 品质 | ${level}, 类型 | ${types}, 名称 | ${obj.name}\n体质需求 | ${obj.needsturdypoint}, 力量需求 | ${obj.needattack}, 敏捷需求 | ${obj.needdexterity}, 耐力需求 | ${obj.needstamina}, 灵性直觉需求 | ${obj.needspiritualintuition}, 智力需求 | ${obj.needintelligence}, 幸运需求 | ${obj.needluckyvalue}, 信仰需求 | ${obj.needfaith}\nHP | ${obj.healthpoint}, MP | ${obj.maxmagicpoint}, 力量加成 | ${obj.attack}, 体质加成 | ${obj.sturdypoint}, 敏捷加成 | ${obj.dexterity}, 耐力加成 | ${obj.stamina}, 灵性直觉加成 | ${obj.spiritualintuition}, 智力加成 | ${obj.intelligence}, 幸运加成 | ${obj.luckyvalue}, 信仰加成 | ${obj.faith}, 护甲加成 | ${obj.armourclass}, 物理抗性 | ${obj.physicaldefense}, 魔力抗性 | ${obj.magicdefense}\n——————————`);
          } else {
            messages.push(`找不到 ID 为 ${id} 的对象.`);
          }
        });
      };

      const viewSkills = (inventory, getItemFn) => {
        if (inventory.length <= 0) {
          return `背包是空的`;
        }
        messages.push(`技能:`);
        inventory.forEach(id => {
          const obj = getItemFn(Number(id));
          let types: string
          let level: string
          let name: string
          if(obj.types === 1){
            types = "斗气"
            name = "伤害"
            if(obj.level === 1){
              level = '见习'
            }else if(obj.level === 2){
              level = '老手'
            }else if(obj.level === 3){
              level = '精英'
            }else if(obj.level === 4){
              level = '大师'
            }else if(obj.level === 5){
              level = '宗师'
            }else if(obj.level === 6){
              level = '奥义'
            }else{
              level = '暂无'
            }
          }else if(obj.types === 2){
            types = "魔力"
            name = "伤害"
            if(obj.level === 1){
              level = '一阶'
            }else if(obj.level === 2){
              level = '二阶'
            }else if(obj.level === 3){
              level = '三阶'
            }else if(obj.level === 4){
              level = '四阶'
            }else if(obj.level === 5){
              level = '五阶'
            }else if(obj.level === 6){
              level = '禁忌'
            }else{
              level = '暂无'
            }
          }else if(obj.types === 3){
            types = "治疗"
            name = "治疗"
            if(obj.level === 1){
              level = '见习'
            }else if(obj.level === 2){
              level = '一阶'
            }else if(obj.level === 3){
              level = '二阶'
            }else if(obj.level === 4){
              level = '三阶'
            }else if(obj.level === 5){
              level = '四阶'
            }else if(obj.level === 6){
              level = '大祝福'
            }else{
              level = '暂无'
            }
          }else if(obj.types === 4){
            types = "复活"
            name = "治疗"
            if(obj.level === 1){
              level = '见习'
            }else if(obj.level === 2){
              level = '一阶'
            }else if(obj.level === 3){
              level = '二阶'
            }else if(obj.level === 4){
              level = '三阶'
            }else if(obj.level === 5){
              level = '四阶'
            }else if(obj.level === 6){
              level = '大祝福'
            }else{
              level = '暂无'
            }
          }else {
            types = "暂无"
          }

          if (obj) {
            messages.push(`id | ${obj.id}, 品质 | ${level}, 类型 | ${types}, 名称 | ${obj.name}, ${name} | ${obj.harm}, 消耗 | ${obj.consumptionofmagic}\n体质需求 | ${obj.needsturdypoint}, 力量需求 | ${obj.needattack}, 耐力需求 | ${obj.needstamina}, 灵性直觉需求 | ${obj.needspiritualintuition}, 智力需求 | ${obj.needintelligence}, 幸运需求 | ${obj.needluckyvalue}, 信仰需求 | ${obj.needfaith}\n——————————`);
          } else {
            messages.push(`找不到 ID 为 ${id} 的对象.`);
          }
        });
      };

      if (options.w) {
        const itembar = userAttach.itembar || [];
        viewItems('武器', itembar, getdatarpg.getArsenalId);
      } else if (options.a) {
        const armourbar = userAttach.armourbar || [];
        viewArmours(armourbar, getdatarpg.getArmourId);
      } else if (options.s) {
        const skillbar = userAttach.skillbar || [];
        viewSkills(skillbar, getdatarpg.getSkillId);
      } else {
        return '请提供有效的选项（-w 查看武器，-a 查看盔甲，-s 查看技能）';
      }

      // 将所有消息合并为一条并发送
      if (messages.length > 0) {
        session.send(messages.join('\n'));
      } else {
        session.send('背包是空的.');
      }
    });


  axlmlyrpgs.subcommand('equipwith <id:number>', '装备')
    .alias('装备')
    .option('p','-p 数字 装备对应的主武器')
    .option('s','-s 数字 装备对应副武器')
    .option('a','-a 数字 装备对应盔甲')
    .option('q','-q 数字 装备对应技能1')
    .option('w','-w 数字 装备对应技能2')
    .option('e','-e 数字 装备对应技能3')
    .action(async({session,options},id) =>{
      if (id === undefined) {
        return
      }
      if (isNaN(id) || id < 0) {
        return '请输入有效的ID';
      }

      await rpgdata.userdata(session, ctx);
      const getdatarpg = new Rpgdata(ctx, config);

      const userId = String(session.userId);
      const userAttach = (await ctx.database.get('role_playing_game_attach', { id: userId }))[0];
      let { armourbar, skillbar, itembar, primaryweapon, secondaryweapon, skill1, skill2, skill3 } = userAttach;

      const getskill = getdatarpg.getSkillId(Number(id));
      const armours = getdatarpg.getArmourId(Number(id));
      const weapon = getdatarpg.getArsenalId(Number(id));

      // 检索盔甲
      const armourExists = armourbar.some(item => Number(item) === id);

      // 检索武器
      const pweaponExists = itembar.some(item => Number(item) === id);
      const sweaponExists = itembar.some(item => Number(item) === id);

      // 检索技能
      const skillExists = skillbar.some(item => Number(item) === id);

      const equipItem = async (equipwith, value) => {
        await ctx.database.upsert('role_playing_game_attach', [{
          id: userId,
          [equipwith]: value
        }]);
      };

      const optionsMap = {
        p: { equipwith: 'primaryweapon', name: '主武器', exists: pweaponExists },
        s: { equipwith: 'secondaryweapon', name: '副武器', exists: sweaponExists },
        a: { equipwith: 'armour', name: '盔甲', exists: armourExists },
        q: { equipwith: 'skill1', name: '技能一', exists: skillExists },
        w: { equipwith: 'skill2', name: '技能二', exists: skillExists },
        e: { equipwith: 'skill3', name: '技能三', exists: skillExists },
      };

      if(options.q || options.w || options.e) {
        if(getskill.types === 4){
          return `无法装备特殊技能`
        }
      }

      for (const [key, { equipwith, name, exists }] of Object.entries(optionsMap)) {
        if (options[key]) {
          if (id === 0) {
            await equipItem(equipwith, 0);
            return `已卸下${name}`;
          }
          if (exists) {

            if (equipwith === 'primaryweapon' && id === secondaryweapon) {
              await equipItem('primaryweapon', id);
              await equipItem('secondaryweapon', 0);
              return `已将${weapon.name}从副武器移至主武器`;
            } else if(equipwith === 'secondaryweapon' && id === primaryweapon){
              await equipItem('secondaryweapon', id);
              await equipItem('primaryweapon', 0);
              return `已将${weapon.name}从主武器移至副武器`;
            }else if(equipwith === 'skill1 && (id === skill2 || id === skill3)'){
              // if(getskill.types === 4){
              //   return
              // }
              await equipItem('skill1', id);
              if (id === skill2) {
                await equipItem('skill2', 0);
              } else if (id === skill3) {
                await equipItem('skill3', 0);
              }
              return `装备${getskill.name}至技能一`;
            }else if(equipwith === 'skill2 && (id === skill1 || id === skill3)'){
              if(getskill.types === 4){
                return
              }
              await equipItem('skill2', id);
              if (id === skill2) {
                await equipItem('skill1', 0);
              } else if (id === skill3) {
                await equipItem('skill3', 0);
              }
              return `装备${getskill.name}至技能二`;
            }else if(equipwith === 'skill3 && (id === skill1 || id === skill2)'){
              if(getskill.types === 4){
                return
              }
              await equipItem('skill3', id);
              if (id === skill2) {
                await equipItem('skill1', 0);
              } else if (id === skill3) {
                await equipItem('skill2', 0);
              }
              return `装备${getskill.name}至技能三`;
            }else {
              await equipItem(equipwith, id);
              if(equipwith === 'primaryweapon' || equipwith === 'secondaryweapon'){
                return `装备${weapon.name}至${name}`
              }else if(equipwith === 'skill1' || equipwith === 'skill2' || equipwith === 'skill3'){
                // if(getskill.types === 4){
                //   return
                // }
                return `装备${getskill.name}至${name}`
              }else if(equipwith === 'armour'){
                return `装备${armours.name}至${name}`
              }
              // return `装备${weapon.name || getskill.name || armours.name}至${name}`;
            }
          } else {
            return `背包里没有这个${name}`;
          }
        }
      }
    })

  axlmlyrpgs.subcommand('shoplist', '商店列表')
    .alias('商店列表')
    .example('商店列表')
    .action(async ({ session }, id) => {
      // const currentDate = new Date().toLocaleDateString();
      const getdatarpg = new Rpgdata(ctx, config)
      const store = getdatarpg.getShopList();
      let kudos = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.kudos; //声望

      let price: number
      if(kudos < -300){
        price = 3
      }else if(kudos < -100){
        price = 2
      }else if(kudos < -50){
        price = 1.5
      }else if(kudos < 0){
        price = 1.15
      }else if(kudos >= 0 && kudos <= 10){
        price = 1
      }else if(kudos < 50){
        price = 0.95
      }else if(kudos < 100){
        price = 0.90
      }else if(kudos < 300){
        price = 0.85
      }else if(kudos < 600){
        price = 0.80
      }else if(kudos < 1200){
        price = 0.75
      }else if(kudos < 2400){
        price = 0.70
      }else if(kudos < 4800){
        price = 0.65
      }else if(kudos < 9600){
        price = 0.60
      }else if(kudos < 19200){
        price = 0.55
      }else {
        price = 0.50
      }

      // 构建回复消息
      let message = `${session.username} | 今天的商店物品列表：`;
      message += '武器：\n';
      store.arsenals.forEach(item => {
        let types: string
        if(item.types === 1){
          types = "近战"
        }else if(item.types === 2){
          types = "法杖"
        }else if(item.types === 3){
          types = "弓箭"
        }else if(item.types === 4){
          types = "盾牌"
        }else {
          types = "暂无"
        }
        let level: string
        if(item.level === 1){
          level = '灰'
        }else if(item.level === 2){
          level = '白'
        }else if(item.level === 3){
          level = '绿'
        }else if(item.level === 4){
          level = '蓝'
        }else if(item.level === 5){
          level = '红'
        }else if(item.level === 5){
          level = '紫'
        }else if(item.level === 6){
          level = '黑'
        }else{
          level = '暂无'
        }
        let itemPrice = Math.round(item.price * price)
        message += `${item.id} | ${item.name} - ${itemPrice}硬币\n品质 | ${level}, 类型 | ${types}, 伤害 | ${item.harm}, 斗气传导 | ${item.fightkirelease}, 魔力传导 | ${item.magicrelease}\n`;
        message += `——————————\n`
      });
      // message += `——————————\n`
      message += '盔甲：\n';
      store.armour.forEach(item => {
        let types: string
        if(item.types === 1){
          types = "重装甲"
        }else if(item.types === 2){
          types = "轻装甲"
        }else if(item.types === 3){
          types = "法袍"
        }else {
          types = "暂无"
        }
        let level: string
        if(item.level === 1){
          level = '普通'
        }else if(item.level === 2){
          level = '稀有'
        }else if(item.level === 3){
          level = '精良'
        }else if(item.level === 4){
          level = '史诗'
        }else if(item.level === 5){
          level = '传说'
        }else{
          level = '暂无'
        }
        let itemPrice = Math.round(item.price * price)
        message += `${item.id} | ${item.name} - ${itemPrice}硬币\n品质 | ${level}, 类型 | ${types}, HP | ${item.healthpoint}, MP | ${item.maxmagicpoint}, 护甲 | ${item.armourclass}, 物理抗性 | ${item.physicaldefense}, 魔力抗性:${item.magicdefense}\n`;
        message += `——————————\n`
      });
      // message += `——————————\n`
      message += '技能：\n';
      store.skill.forEach(item => {
        let types: string
        let level: string
        if(item.types === 1){
          types = "斗气"
          if(item.level === 1){
            level = '见习'
          }else if(item.level === 2){
            level = '老手'
          }else if(item.level === 3){
            level = '精英'
          }else if(item.level === 4){
            level = '大师'
          }else if(item.level === 5){
            level = '宗师'
          }else if(item.level === 6){
            level = '奥义'
          }else{
            level = '暂无'
          }
        }else if(item.types === 2){
          types = "魔力"
          if(item.level === 1){
            level = '一阶'
          }else if(item.level === 2){
            level = '二阶'
          }else if(item.level === 3){
            level = '三阶'
          }else if(item.level === 4){
            level = '四阶'
          }else if(item.level === 5){
            level = '五阶'
          }else if(item.level === 6){
            level = '禁忌'
          }else{
            level = '暂无'
          }
        }else if(item.types === 3){
          types = "治疗"
          if(item.level === 1){
            level = '见习'
          }else if(item.level === 2){
            level = '一阶'
          }else if(item.level === 3){
            level = '二阶'
          }else if(item.level === 4){
            level = '三阶'
          }else if(item.level === 5){
            level = '四阶'
          }else if(item.level === 6){
            level = '大祝福'
          }else{
            level = '暂无'
          }
        }else if(item.types === 4){
          types = "复活"
          if(item.level === 1){
            level = '见习'
          }else if(item.level === 2){
            level = '一阶'
          }else if(item.level === 3){
            level = '二阶'
          }else if(item.level === 4){
            level = '三阶'
          }else if(item.level === 5){
            level = '四阶'
          }else if(item.level === 6){
            level = '大祝福'
          }else{
            level = '暂无'
          }
        }else {
          types = "暂无"
        }
        let itemPrice = Math.round(item.price * price)
        message += `${item.id} | ${item.name} - ${itemPrice}硬币\n品质 | ${level}, 类型 | ${types}, 伤害 | ${item.harm}, 消耗 | ${item.consumptionofmagic}\n`;
        message += `——————————\n`
      });

      return message;
    })

  axlmlyrpgs.subcommand('shop <id:number>', '购买商店列表里的武器/盔甲/技能')
    .alias('购买')
    .option('w', '-w 购买武器')
    .option('a', '-a 购买盔甲')
    .option('s', '-s 购买技能')
    .example('购买 -w/-a/-s id')
    .action(async ({ session, options }, id) => {
      if (!id) {
        return '请不要什么都不输入';
      }
      if (isNaN(Number(id))) {
        return '请输入有效的物品ID';
      }

      await rpgdata.userdata(session, ctx);
      const getdatarpg = new Rpgdata(ctx, config);
      const store = getdatarpg.getShopList();
      const userId = String(session.userId);
      const userAttach = (await ctx.database.get('role_playing_game_attach', { id: userId }))[0];
      const getcoins = (await ctx.database.get('role_playing_game', { id: userId }))[0]?.coins;
      let kudos = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.kudos; //声望

      let price: number
      if(kudos < -300){
        price = 3
      }else if(kudos < -100){
        price = 2
      }else if(kudos < -50){
        price = 1.5
      }else if(kudos < 0){
        price = 1.15
      }else if(kudos >= 0 && kudos <= 10){
        price = 1
      }else if(kudos < 50){
        price = 0.95
      }else if(kudos < 100){
        price = 0.90
      }else if(kudos < 300){
        price = 0.85
      }else if(kudos < 600){
        price = 0.80
      }else if(kudos < 1200){
        price = 0.75
      }else if(kudos < 2400){
        price = 0.70
      }else if(kudos < 4800){
        price = 0.65
      }else if(kudos < 9600){
        price = 0.60
      }else if(kudos < 19200){
        price = 0.55
      }else {
        price = 0.50
      }
      const purchaseItem = async (itemType, inventory, storeItems, itembarKey, itemKey) => {
        const item = storeItems.find(i => Number(i.id) === Number(id));
        let itemExists = false;
        for (let invItem of inventory) {
          if (Number(invItem) === id) {
            itemExists = true;
            break;
          }
        }

        if (item) {
          if (itemExists) {
            return `背包里已经有了这个${itemType}`;
          } else {
            let itemPrice = Math.round(item.price * price)
            if (getcoins >= itemPrice) {
              await ctx.database.upsert('role_playing_game_attach', [{
                id: userId,
                [itembarKey]: [...inventory, id]
              }]);
              await ctx.database.upsert('role_playing_game', [{
                id: userId,
                coins: getcoins - itemPrice
              }]);
              return `${session.username}成功购买${item.name}`;
            } else {
              return '硬币不足，请攒攒再来吧';
            }
          }
        } else {
          return `商店里没有这个${itemType}，请检查ID`;
        }
      };

      if (options.w) {
        const itembar = userAttach.itembar || [];
        return purchaseItem('武器', itembar, store.arsenals, 'itembar', 'arsenal');
      } else if (options.a) {
        const armourbar = userAttach.armourbar || [];
        return purchaseItem('盔甲', armourbar, store.armour, 'armourbar', 'armour');
      } else if (options.s) {
        const skillbar = userAttach.skillbar || [];
        return purchaseItem('技能', skillbar, store.skill, 'skillbar', 'skill');
      } else {
        return '请提供有效的选项（-w 购买武器，-a 购买盔甲，-s 购买技能）';
      }
    });

  axlmlyrpgs.subcommand('increasepnpttributepoints <id:number>', '增加属性点')
    .alias('加点')
    .option('a', '-a  力量') //力量
    .option('s', '-s  体质') //体质
    .option('d', '-d  敏捷') //敏捷
    .option('i', '-i  智力') //智力
    .option('w', '-w  灵性直觉') //灵性直觉
    .option('l', '-l  幸运') //幸运
    .option('f', '-f  信仰') //信仰
    .option('b', '-b  耐力') //耐力
    .example('加点 -a <id:number>')
    .action(async ({ session, options }, id) => {
      if (!id) {
        return `选项 -a+id(力量)/-s+id(体质)/-d+id(敏捷)/-i+id(智力)/-w+id(灵性直觉)/-l+id(幸运)/-f+id(信仰)/-b+id(耐力)`;
      }
      if (isNaN(id) || id <= 0) {
        return "请输入有效的属性点数值";
      }

      const getAttribute = async (attribute: string) => {
        return (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.[attribute];
      };

      const updateAttribute = async (attribute: string, value: number) => {
        await ctx.database.upsert('role_playing_game', [{
          id: String(session.userId),
          [attribute]: value
        }]);
        await ctx.database.upsert('role_playing_game_attach', [{
          id: String(session.userId),
          skillpoint: skillpoint - id
        }]);
      };

      const skillpoint = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId) }))[0]?.skillpoint; //属性点数

      if (config.logger) {
        logger.info(`当前技能点有${skillpoint},输入值${id}`);
      }

      const optionsMap = {
        a: { attribute: 'attack', name: '力量' },
        s: { attribute: 'sturdypoint', name: '体质' },
        d: { attribute: 'dexterity', name: '敏捷' },
        i: { attribute: 'intelligence', name: '智力' },
        w: { attribute: 'spiritualintuition', name: '灵性直觉' },
        l: { attribute: 'luckyvalue', name: '幸运' },
        f: { attribute: 'faith', name: '信仰' },
        b: { attribute: 'stamina', name: '耐力' }
      };

      for (const [key, { attribute, name }] of Object.entries(optionsMap)) {
        if (options[key]) {
          if (skillpoint >= id) {
            const currentValue = await getAttribute(attribute);
            await updateAttribute(attribute, currentValue + id);
            return `叮~使用属性点${id}, ${name}加 ${id}`;
          } else {
            return `属性点不足`;
          }
        }
      }
      return `请详细阅读或询问该如何加点`;
    });

  axlmlyrpgs.subcommand('battlestate', '战斗状态')
    .alias('战斗状态')
    .option('a','-a 决斗状态')
    .option('s','-s 止战状态')
    .usage(`-a是决斗状态,决斗状态的意思是可以被决斗，-s是止战状态,止战状态是别人不能决斗你,你也不能决斗别人,当前切换时间为 | ${config.statuscd}分钟,脱离战斗状态cd为 | ${config.battlestatecd}`)
    .example('战斗状态 -a')
    .action(async ({ session, options }) => {
      let time =  Time.template('yyyy-MM-dd hh:mm:ss', new Date());
      let getnewtime = rpgdata.dateToTimestamp(time)
      let statuscd = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId) }))[0]?.statuscd //战斗状态cd
      let duelscd = (await ctx.database.get('role_playing_game_cd', { id: String(session.userId) }))[0]?.duelscd //决斗cd
      if(getnewtime - duelscd <= cooldownTime3){
        return `还处于决斗状态`
      }
      if(getnewtime - statuscd <= cooldownTime2){
        return `切换冷却中`
      }else {
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.userId),
          statuscd: getnewtime
        }])
      }
      if(options.a){
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.userId),
          status: 0
        }])
        return `切换战斗状态成功`
      }
      if(options.s){
        await ctx.database.upsert('role_playing_game_cd',[{
          id: String(session.userId),
          status: 1
        }])
        return `切换止战状态成功`
      }
    })

  axlmlyrpgs.subcommand('reset', '重置属性/种族/信仰')
    .alias('重置')
    .option('p', '-p 重置属性')
    .option('r', '-r 重置种族')
    .option('f', '-f 重置信仰')
    .usage(`重置花费${config.resetproperties}硬币,且过程不可逆`)
    .example('重置 -p')
    .action(async ({ session,options }) => {
      const resetproperties = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId) }))[0]?.resetproperties; //重置属性次数
      const getcoins = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.coins; //硬币
      const level = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.level //等级
      // const skillpoint = (await ctx.database.get('role_playing_game_attach', { id: String(session.userId) }))[0]?.skillpoint; //属性点数

      const getdatarpg = new Rpgdata(ctx, config)
      const total = config.resetpropertiestotal; // 总数值
      const n = 9;       // 常量数量
      const minValue = config.resetpropertiesminValue <= config.resetpropertiesmaxValue? config.resetpropertiesminValue : 10 // 每个常量的最低值
      const maxValue = config.resetpropertiesmaxValue >= config.resetpropertiesmaxValue? config.resetpropertiesmaxValue : 38 // 每个常量的上限值
      const distributedValues = getdatarpg.distributeValues(total,n,minValue,maxValue)
      const randomSturdypoint = distributedValues[0]; //随机体质
      const randomStamina = distributedValues[1]; //随机耐力
      const randomDexterity = distributedValues[2]; //随机敏捷
      const randomSpiritualintuition = distributedValues[3]; //随机灵性直觉
      const randomLuckyvalue = distributedValues[4]; //随机幸运值
      const randomIntelligence = distributedValues[5]; //随机智力
      const randomFaith = distributedValues[6]; //随机信仰
      const randomAttack = distributedValues[7]; //随机力量
      const randomArmourclass = distributedValues[8]; //随机护甲值
      const randomFaiths = Random.pick(godJson) //随机信仰
      const randomRacist = Random.pick(raceJson) //随机种族
      if(options.p){
        if(resetproperties <= 0){
          if(getcoins < config.resetproperties){
            return `硬币不足`
          }
          if(getcoins > config.resetproperties){
            await ctx.database.upsert('role_playing_game',[{
              id: String(session.userId),
              sturdypoint: Number(randomSturdypoint), //体质
              stamina: Number(randomStamina), //耐力
              dexterity: Number(randomDexterity), //敏捷
              spiritualintuition: Number(randomSpiritualintuition), //灵性直觉
              luckyvalue: Number(randomLuckyvalue), //幸运值
              intelligence: Number(randomIntelligence), //智力
              faith: Number(randomFaith), //信仰
              attack: Number(randomAttack), //力量
              armourclass: Number(randomArmourclass), //护甲值
              coins: getcoins - config.resetproperties, //硬币
            }])
            await ctx.database.upsert('role_playing_game_attach',[{
              id: String(session.userId),
              skillpoint: level * 5
            }])
            return `重置成功`
          }
        }else{
          await ctx.database.upsert('role_playing_game',[{
            id: String(session.userId),
            sturdypoint: Number(randomSturdypoint), //体质
            stamina: Number(randomStamina), //耐力
            dexterity: Number(randomDexterity), //敏捷
            spiritualintuition: Number(randomSpiritualintuition), //灵性直觉
            luckyvalue: Number(randomLuckyvalue), //幸运值
            intelligence: Number(randomIntelligence), //智力
            faith: Number(randomFaith), //信仰
            attack: Number(randomAttack), //力量
            armourclass: Number(randomArmourclass), //护甲值
          }])
          await ctx.database.upsert('role_playing_game_attach',[{
            id: String(session.userId),
            skillpoint: level * 5,
            resetproperties: resetproperties - 1
          }])
          return `重置成功`
        }
      }else if(options.r){
          if (getcoins < config.resetproperties) {
            return `硬币不足`
          }
        await ctx.database.upsert('role_playing_game_attach',[{
          id: String(session.userId),
          racist: Number(randomRacist.id)
        }])
        await ctx.database.upsert('role_playing_game',[{
          id: String(session.userId),
          coins: getcoins - config.resetproperties, //硬币
        }])
        return `重置成功`
      }else if(options.f){
            if(getcoins < config.resetproperties){
              return `硬币不足`
            }
        await ctx.database.upsert('role_playing_game_attach',[{
          id: String(session.userId),
          faith: Number(randomFaiths.id), //信仰
        }])
        await ctx.database.upsert('role_playing_game',[{
          id: String(session.userId),
          coins: getcoins - config.resetproperties, //硬币
        }])
        return `重置成功`
      }
    })

  axlmlyrpgs.subcommand('skill <id:number>', '使用技能')
    .alias('技能')
    .option('t', '-t 治疗被回复的冒险者')
    .option('r', '-r 使被回复的冒险者复活')
    .usage(`注意:治疗费用只有魔力值.复活的费用却有1/2MP、1/5HP、60硬币.当前冷却时间为 | ${config.skillcd}分钟`)
    .action(async ({ session, options },id) => {
      if(!session.quote){
        return
      }
      if (!id) {
        return `选项 -t+id(治疗)/-r+id(复活)`;
      }
      if (isNaN(id) || id <= 0) {
        return "请输入有效的技能ID";
      }
      let time =  Time.template('yyyy-MM-dd hh:mm:ss', new Date());
      let getnewtime = rpgdata.dateToTimestamp(time)
      const userId = String(session.userId);
      const userquoteId = String(session.quote.user.id)
      const usercd = (await ctx.database.get('role_playing_game_cd', { id: userId }))[0];
      const userquotecd = (await ctx.database.get('role_playing_game_cd', { id: userquoteId }))[0];
      const userattackerstorage = userquotecd.attackerstorage
      const found = userattackerstorage.find(id => id === userId)
      if(getnewtime - usercd.skillcd <= cooldownTime4){
        return `请等待施法冷却`
      }
      if(usercd.status === 1){
        return `处于止战状态无法使用技能`
      }
      if(found !== undefined){
        return `还处于敌对状态`
      }
      console.log(found)

      await rpgdata.userdata(session, ctx);
      const getdatarpg = new Rpgdata(ctx, config);
      let name = session.quote.member.nick
      if(name.length <= 0){
        name = session.quote.user.name
      }

      let target = (await ctx.database.get('role_playing_game', { id: String(session.quote.member.user.id) }))[0];
      let status1 = target?.status; // 状态
      let healthpoint1 = target?.healthpoint; // 目标的生命值
      let magicdefense = target?.magicdefense; // 魔防

      const user = (await ctx.database.get('role_playing_game', { id: userId }))[0];
      const userAttach = (await ctx.database.get('role_playing_game_attach', { id: userId }))[0];
      let {magicpoint, magicpointEnd,healthpoint, healthpointEnd, coins, intelligence, faith, luckyvalue, kudos} = user
      let { skillbar, primaryweapon } = userAttach;
      const getskill = getdatarpg.getSkillId(Number(id));
      const weapon = getdatarpg.getArsenalId(Number(primaryweapon));

      let maxCriticalHit = Math.round(100 - (luckyvalue / 50));
      if(maxCriticalHit > 50){
        maxCriticalHit = 50
      }
      let calculateCriticalHitRandom = Random.int(1,maxCriticalHit)
      let cost1 = Math.round(getskill.consumptionofmagic + magicpointEnd * 0.5)
      let hpCost = Math.round(healthpointEnd * 0.2)
      const treatment1 = Math.round(0.7 * intelligence + 2 * faith + getskill.harm)
      const treatment2 = treatment1 * 2
      // let hurtCriticalHitRandom = Math.round(Math.floor((Math.random() * (treatment2 - treatment1 + 1) + treatment1)) + (0.7 * luckyvalue));
      let hurtCriticalHitRandom = Math.round(Random.int(treatment1,treatment2 + 0.7 * luckyvalue));
      if(hurtCriticalHitRandom > treatment2){
        hurtCriticalHitRandom = treatment2
      }
      let calculateTheTreatment = Math.round(hurtCriticalHitRandom * (1 - (target.magicdefense / 100)) * (weapon.magicrelease / 100))
      let calculateCriticaTheTreatment = Math.round((hurtCriticalHitRandom * (1 - (target.magicdefense / 100)) + (0.5 * calculateTheTreatment)) * (weapon.magicrelease / 100))

      // 检索技能
      const skillExists = skillbar.some(item => Number(item) === id);
      const optionsMap = {
        t: { name: '治疗', hurt: calculateCriticalHitRandom < config.criticalhit ? calculateCriticaTheTreatment : calculateTheTreatment, cost: getskill.consumptionofmagic, types:getskill.types, coins: 0, healthpoint: 0, exists:skillExists, skillinfo: getskill.skillinfo, attckinfo: getskill.attckinfo, endinfo: getskill.endinfo},
        r: { name: '复活', hurt: calculateCriticalHitRandom < config.criticalhit ? calculateCriticaTheTreatment : calculateTheTreatment, cost: cost1, types:getskill.types, coins: 60, healthpoint: hpCost, exists:skillExists, skillinfo: getskill.skillinfo, attckinfo: getskill.attckinfo, endinfo: getskill.endinfo },
      }
      if (options.t) {
        const option = optionsMap.t;
        if (!option.exists) {
          return `你没有ID为${id}的技能`;
        }
        if(option.types !== 3){
          return `该技能不属于治疗术种类`
        }
        if(status1 === 0){
          return `复活赛功能暂时未开放`
        }
        if(target.healthpointEnd === healthpoint1){
          return `目标HP已满`
        }
        if (magicpoint < option.cost) {
          return `你的MP不足以使用${option.name}`;
        }
        if (healthpoint1 === null || healthpoint1 === undefined) {
          return `无法找到目标角色的信息`;
        }
        let treatmentEnd = Math.round(option.hurt * (1 - magicdefense / 100))
        magicpoint -= option.cost;
        healthpoint1 += treatmentEnd;
        kudos += 3
        if (healthpoint1 > target.healthpointEnd) {
          healthpoint1 = target.healthpointEnd;
        }

        await ctx.database.set('role_playing_game', { id: String(session.quote.member.user.id) }, { healthpoint: healthpoint1 });
        if(session.quote.user.id === session.userId){
          await ctx.database.set('role_playing_game', { id: userId }, { magicpoint: magicpoint });
        }else{
          await ctx.database.set('role_playing_game', { id: userId }, { magicpoint: magicpoint, kudos: kudos });
        }
        await ctx.database.set('role_playing_game_cd', { id: userId }, { skillcd: getnewtime });

        if(session.quote.user.id === session.userId){
          if(calculateCriticalHitRandom < config.criticalhit){
            return `大祝福! ${session.username}对自己使用了${option.name},${option.skillinfo}${option.attckinfo}${option.endinfo},恢复了${treatmentEnd}点HP。`;
          }else{
            return `${session.username}对自己使用了${option.name},${option.skillinfo}${option.attckinfo}${option.endinfo},恢复了${treatmentEnd}点HP。`;
          }
        }else{
          if(calculateCriticalHitRandom < config.criticalhit){
            return `大祝福! ${session.username}对${name}使用了${option.name},${option.skillinfo}${option.attckinfo}${option.endinfo},恢复了${treatmentEnd}点HP。`
          }else{
            return `${session.username}对${name}使用了${option.name},${option.skillinfo}${option.attckinfo}${option.endinfo},恢复了${treatmentEnd}点HP。`
          }
        }

      }

      if (options.r) {
        const option = optionsMap.r;
        if (!option.exists) {
          return `你没有ID为${id}的技能`;
        }
        if(status1 === 1){
          return `对方还未死亡`
        }
        if(option.types !== 4){
          return `该技能不属于复活术种类`
        }
        if(option.healthpoint>healthpoint){
          return `你的HP不足以使用${option.name}`;
        }
        if (magicpoint < option.cost) {
          return `你的MP不足以使用${option.name}`;
        }
        if (coins < option.coins) {
          return `你的硬币不足以使用${option.name}`;
        }
        let treatmentEnd = Math.round(option.hurt * (1 - magicdefense / 100))
        magicpoint -= option.cost;
        coins -= option.coins;
        healthpoint1 = treatmentEnd;
        healthpoint -= option.healthpoint;
        status1 = 1;
        kudos += 10
        if (healthpoint1 > target.healthpointEnd) {
          healthpoint1 = target.healthpointEnd;
        }
        await ctx.database.set('role_playing_game', { id: String(session.quote.member.user.id) }, { healthpoint: healthpoint1, status: status1 });
        await ctx.database.set('role_playing_game', { id: userId }, { magicpoint: magicpoint, coins: coins, healthpoint: healthpoint, kudos: kudos });
        await ctx.database.set('role_playing_game_cd', { id: userId }, { skillcd: getnewtime });

        if(calculateCriticalHitRandom < config.criticalhit){
          return `大祝福! ${session.username}对${name}使用了${option.name},${option.skillinfo}${option.attckinfo}${option.endinfo},${name}复活并恢复了${treatmentEnd}点HP。`;
        }else{
          return `${session.username}对${name}使用了${option.name},${option.skillinfo}${option.attckinfo}${option.endinfo},${name}复活并恢复了${treatmentEnd}点HP。`;
        }
      }

    })

}
