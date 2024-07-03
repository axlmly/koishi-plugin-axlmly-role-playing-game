import { Random } from 'koishi'
import { Rpgdata } from './database'
import { menuHtml } from './menuhtml'
import path from 'path'
import { generateBattleLogsHtml } from './battle';

export class duelsHtml {
  async getDuelsHtml(session, config, ctx) {
    const menu = new menuHtml()
    const getdatarpg = new Rpgdata(ctx, config)
    // const getrpgjson = await getdatarpg.userdata(session, ctx)

    const img = path.join(__dirname, '/img/img2.png').replace(/\\/g, '/');
    const getMenu1 = await menu.menuimg(session.quote,config,ctx)
    const getMenu2 = await menu.menuimg(session,config,ctx)
    const getrpgjson1 = await getdatarpg.userdata(session.quote, ctx)
    const getrpgjson2 = await getdatarpg.userdata(session, ctx)


    // 获取玩家数据
    const avatarUrl1 = session.platform == 'qq'? `http://q.qlogo.cn/qqapp/${session.bot.config.id}/${session.event.user?.id}/640`:session.quote.member?.user.avatar

    const avatarUrl2 = session.platform == 'qq'? `http://q.qlogo.cn/qqapp/${session.bot.config.id}/${session.event.user?.id}/640`:session.author.avatar

    let name1 = session.quote.member.nick;
    if(name1.length <= 0){
      name1 = session.quote.member.user.name;
    }
    name1 = name1.length>8? name1.substring(0, 8 - 1) + '…' : name1;
    let name2 = session.username;
    if(name2 === undefined){
      name2 = session.user.name
    }
    name2 = name2.length>8? name2.substring(0, 8 - 1) + '…' : name2;

    // 获取玩家的健康点数（hp）
    // const player1Data = await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) });
    // const player2Data = await ctx.database.get('role_playing_game', { id: String(session.userId) });

    const hp1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.healthpoint; //生命值
    const mp1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.magicpoint; //魔力值
    // const hp1 = 50
    const hp2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.healthpoint; //生命值
    const mp2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.magicpoint; //魔力值

    // const getdexterity1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.dexterity; //敏捷
    // const getdexterity2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.dexterity; //敏捷
    // const getluckyvalue1 = (await ctx.database.get('role_playing_game', { id: String(session.quote.user.id) }))[0]?.luckyvalue; //幸运
    // const getluckyvalue2 = (await ctx.database.get('role_playing_game', { id: String(session.userId) }))[0]?.luckyvalue; //幸运
    const primaryweapon1  = getrpgjson1.primaryweapon //主武器
    const secondaryweapon1  = getrpgjson1.secondaryweapon //副武器
    const primaryweapon2  = getrpgjson2.primaryweapon //主武器
    const secondaryweapon2  = getrpgjson2.secondaryweapon //副武器

    const getPrimaryweapon1 = getdatarpg.getArsenalId(Number(primaryweapon1)) //主武器
    const getSecondaryweapon1 = getdatarpg.getArsenalId(Number(secondaryweapon1)) //副武器
    const getPrimaryweapon2 = getdatarpg.getArsenalId(Number(primaryweapon2)) //主武器
    const getSecondaryweapon2 = getdatarpg.getArsenalId(Number(secondaryweapon2)) //副武器
    // const getArmour = getdatarpg.getArmourId(Number(armour)) //衣物

    const attack1 = getMenu1.attackEnd //力量
    const attack2 = getMenu2.attackEnd
    const sturdypoint1 = getMenu1.sturdypointEnd //体质
    const sturdypoint2 = getMenu2.sturdypointEnd
    const dexterity1 = getMenu1.dexterityEnd //敏捷
    const dexterity2 = getMenu2.dexterityEnd
    const luckyvalue1 = getMenu1.luckyvalueEnd //幸运
    const luckyvalue2 = getMenu2.luckyvalueEnd
    const spiritualintuition1 = getMenu1.spiritualintuitionEnd //灵性直觉
    const spiritualintuition2 = getMenu2.spiritualintuitionEnd
    const stamina1 = getMenu1.staminaEnd //耐力
    const stamina2 = getMenu2.staminaEnd
    const intelligence1 = getMenu1.intelligenceEnd //智力
    const intelligence2 = getMenu2.intelligenceEnd
    const faith1= getMenu1.faithEnd //信念
    const faith2 = getMenu2.faithEnd
    const armourclass1 = getMenu1.armourclassEnd //护甲
    const armourclass2 = getMenu2.armourclassEnd
    const physicaldefense1 = getMenu1.physicaldefenseEnd //物理防御
    const physicaldefense2 = getMenu2.physicaldefenseEnd
    const magicaldefense1 = getMenu1.magicdefenseEnd //魔法防御
    const magicaldefense2 = getMenu2.magicdefenseEnd

    const skill1  = getrpgjson1.skill1 //技能1
    const skill2  = getrpgjson1.skill2 //技能2
    const skill3  = getrpgjson1.skill3 //技能3
    const skill4  = getrpgjson2.skill1 //技能1
    const skill5  = getrpgjson2.skill2 //技能2
    const skill6  = getrpgjson2.skill3 //技能3
    const getSkill1 = getdatarpg.getSkillId(Number(skill1)) //技能
    const getSkill2 = getdatarpg.getSkillId(Number(skill2))
    const getSkill3 = getdatarpg.getSkillId(Number(skill3))
    const getSkill4 = getdatarpg.getSkillId(Number(skill4)) //技能
    const getSkill5 = getdatarpg.getSkillId(Number(skill5))
    const getSkill6 = getdatarpg.getSkillId(Number(skill6))

    const getPrimaryweaponname1 = getPrimaryweapon1.name
    const getPrimaryweaponharm1 = getPrimaryweapon1.harm
    const getPrimaryweapontypes1 = getPrimaryweapon1.types
    const getPrimaryweaponfightkirelease1 = getPrimaryweapon1.fightkirelease
    const getPrimaryweaponmagicrelease1 = getPrimaryweapon1.magicrelease
    const getPrimaryweaponname2 = getPrimaryweapon2.name
    const getPrimaryweaponharm2 = getPrimaryweapon2.harm
    const getPrimaryweapontypes2 = getPrimaryweapon2.types
    const getPrimaryweaponfightkirelease2 = getPrimaryweapon2.fightkirelease
    const getPrimaryweaponmagicrelease2 = getPrimaryweapon2.magicrelease
    //
    const getSecondaryweaponname1 = getSecondaryweapon1.name
    const getSecondaryweaponharm1 = getSecondaryweapon1.harm
    const getSecondaryweapontypes1 = getSecondaryweapon1.types
    const getSecondaryweaponfightkirelease1 = getSecondaryweapon1.fightkirelease
    const getSecondaryweaponmagicrelease1 = getSecondaryweapon1.magicrelease
    const getSecondaryweaponname2 = getSecondaryweapon2.name
    const getSecondaryweaponharm2 = getSecondaryweapon2.harm
    const getSecondaryweapontypes2 = getSecondaryweapon2.types
    const getSecondaryweaponfightkirelease2 = getSecondaryweapon2.fightkirelease
    const getSecondaryweaponmagicrelease2 = getSecondaryweapon2.magicrelease

    // 生成战斗日志 HTML
    const battleLogsHtml = generateBattleLogsHtml(avatarUrl1, avatarUrl2, name1, hp1, mp1, attack1, sturdypoint1, dexterity1, luckyvalue1, spiritualintuition1, stamina1, intelligence1, faith1, armourclass1, physicaldefense1, magicaldefense1, name2, hp2, mp2, attack2, sturdypoint2, dexterity2, luckyvalue2, spiritualintuition2, stamina2, intelligence2, faith2, armourclass2, physicaldefense2, magicaldefense2, config.criticalhit, getSkill1.id, getSkill1.name, getSkill1.harm, getSkill1.types, getSkill1.skillinfo, getSkill1.attckinfo, getSkill1.endinfo,getSkill1.consumptionofmagic, getSkill2.id, getSkill2.name, getSkill2.harm, getSkill2.types, getSkill2.skillinfo, getSkill2.attckinfo, getSkill2.endinfo, getSkill2.consumptionofmagic, getSkill3.id, getSkill3.name, getSkill3.harm, getSkill3.types, getSkill3.skillinfo, getSkill3.attckinfo, getSkill3.endinfo, getSkill3.consumptionofmagic, getSkill4.id, getSkill4.name, getSkill4.harm, getSkill4.types, getSkill4.skillinfo, getSkill4.attckinfo, getSkill4.endinfo, getSkill4.consumptionofmagic, getSkill5.id, getSkill5.name, getSkill5.harm, getSkill5.types, getSkill5.skillinfo, getSkill5.attckinfo, getSkill5.endinfo, getSkill5.consumptionofmagic, getSkill6.id, getSkill6.name, getSkill6.harm, getSkill6.types, getSkill6.skillinfo, getSkill6.attckinfo, getSkill6.endinfo, getSkill6.consumptionofmagic, getPrimaryweaponname1, getPrimaryweaponharm1,  getPrimaryweapontypes1,getPrimaryweaponfightkirelease1, getPrimaryweaponmagicrelease1, getSecondaryweaponname1, getSecondaryweaponharm1, getSecondaryweapontypes1, getSecondaryweaponfightkirelease1, getSecondaryweaponmagicrelease1, getPrimaryweaponname2, getPrimaryweaponharm2, getPrimaryweapontypes2, getPrimaryweaponfightkirelease2, getPrimaryweaponmagicrelease2, getSecondaryweaponname2, getSecondaryweaponharm2, getSecondaryweapontypes2, getSecondaryweaponfightkirelease2,getSecondaryweaponmagicrelease2);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-cn">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>决斗日志</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            background-color: #ffffff;
            background-image: url('${img}'); /* 设置背景图片 */
            background-size: cover;  /* 图片覆盖整个背景区域 */
            /*background-repeat: no-repeat; !* 不重复图片 *!*/
            background-position: center center; /* 居中对齐图片 */
          }
          .container {
            padding: 20px;
          }
          .profile-card {
            border-radius: 50px;
            position: relative;
            max-width: 100%;
            max-height: 100%;
            background-color: rgba(61, 58, 58, 0.2);
            margin: 10px;
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .battle-log {
            margin-bottom: 5px;
          }
          .game-over {
            color: red;
            font-weight: bold;
          }
          .caption1 {
            border-radius: 20px;
            margin: auto;
            width: 90%;
            height: 5px;
            background-color: rgba(54,52,52,0.6);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .title-word1 {
            font-size: 50px;
            text-align: center;
            color: rgb(0,0,0);
          }
          .avatar {
            max-width: 262px;
            max-height: 262px;
            border-radius: 5px;
            border: 5px solid #fff;
            background: #fff;
          }
          .center {
            font-size: 20px;
            text-align: center;
            color: rgb(0,0,0);
          }
          .group {
            max-width: 100%; /* 适当的宽度 */
            max-height: 60%; /* 适当的高度 */
            background-color: rgba(236,230,233,0.21); /* 背景颜色 */
            border-radius: 15px;
            /*padding: 0 20px 0 20px;*/
            display: flex;
            /*align-items: center;*/
            flex-direction: column;
            margin: 0 10px 0 10px;
          }
          .group1 {
            max-width: 95%; /* 适当的宽度 */
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            padding: 10px 20px 10px 20px;
            margin: 2px 10px 2px 10px;
            background-color: rgba(65,60,62,0.21); /* 背景颜色 */
            border-radius: 15px;
            gap: 10px;
          }
          .group2 {
            max-width: 95%; /* 适当的宽度 */
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
            padding: 10px 20px 10px 20px;
            margin: 2px 10px 2px 10px;
            background-color: rgba(65,60,62,0.21); /* 背景颜色 */
            border-radius: 15px;
            gap: 10px;
          }
          .group4 {
            max-width: 20%; /* 适当的宽度 */
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 10px 20px 10px 20px;
            margin: 0 0 10px 0;
            background-color: rgba(236,230,233,0.21); /* 背景颜色 */
            border-radius: 10px;
            white-space: nowrap; /* 添加这行，如果你希望不换行 */
          }
          .group5 {
            max-width: 20%; /* 适当的宽度 */
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 20px 10px 20px;
            margin: 0 0 10px 0;
            background-color: rgba(236,230,233,0.21); /* 背景颜色 */
            border-radius: 10px;
            white-space: nowrap; /* 添加这行，如果你希望不换行 */
          }
          .group6 {
            max-width: 70%; /* 适当的宽度 */
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 20px 10px 20px;
            margin: 0 auto;
            background-color: rgba(236,230,233,0.21); /* 背景颜色 */
            border-radius: 10px;
            word-wrap: break-word; /* 添加这行 */
            word-break: break-all; /* 添加这行 */
          }
          .group7 {
            max-width: 70%; /* 适当的宽度 */
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 20px 10px 20px;
            margin: 0 auto;
            background-color: rgba(236,230,233,0.21); /* 背景颜色 */
            border-radius: 10px;
          }
          .avatar {
            /*margin: 20px 0 0 20px;*/
            width: 60px;
            height: 60px;
            border-radius: 10px;
            border: 10px solid #fff;
            background: #fff;
        }
        .credit {
            text-align: center;
            color: #171515;
            font-size: 20px;
            padding: 10px;
        }
        </style>
      </head>
      <body id="body">
        <div class="container">
          <div class="profile-card">
            <div class="title-word1"><strong>战斗日志栏</strong></div>
            <div class="caption1"></div>
            <div id="container">${battleLogsHtml.html}</div>
          </div>
        </div>
        <footer class="credit">AXLMLYRPG / AXLMLY</footer>
      </body>
      </html>
    `
    console.log(battleLogsHtml.player1hp)
    console.log(battleLogsHtml.player2hp)
    return {
      "htmlContent": htmlContent,
      "player1hp": battleLogsHtml.player1hp,
      "player1mp": battleLogsHtml.player1mp,
      "player2hp": battleLogsHtml.player2hp,
      "player2mp": battleLogsHtml.player2mp,
    };
  }
}

