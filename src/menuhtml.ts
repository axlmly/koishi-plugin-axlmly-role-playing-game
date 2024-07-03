// import {Context} from 'koishi'
import {Rpgdata} from './database'
import path from 'path'

export const inject = ['database']

export class menuHtml{
  async menuimg(sessions,config, ctx) {
    const getdatarpg = new Rpgdata(ctx, config)
    const getrpgjson = await getdatarpg.userdata(sessions, ctx)

    let avatarUrl = sessions.platform == 'qq'? `http://q.qlogo.cn/qqapp/${sessions.bot.config.id}/${sessions.event.user?.id}/640`:sessions.member?.user.avatar ?? sessions.author.avatar
    // console.log(avatarUrl)
    const img = path.join(__dirname, '/img/img.jpg').replace(/\\/g, '/');
    const textfont = path.join(__dirname, '/font/pixel.ttf').replace(/\\/g, '/');

    const healthpoint = getrpgjson.healthpoint //生命值
    const magicpoint = getrpgjson.magicpoint //魔力值
    const maxmagicpoint = getrpgjson.maxmagicpoint //最大魔力值
    const sturdypoint = getrpgjson.sturdypoint //体质
    const stamina = getrpgjson.stamina //耐力
    const dexterity = getrpgjson.dexterity //敏捷
    const spiritualintuition = getrpgjson.spiritualintuition //灵性直觉
    const luckyvalue = getrpgjson.luckyvalue //幸运值
    const intelligence = getrpgjson.intelligence //智力
    const faith = getrpgjson.faith //信仰
    const attack = getrpgjson.attack //力量
    const armourclass  = getrpgjson.armourclass //护甲值
    const physicaldefense  = getrpgjson.physicaldefense //物理抗性
    const magicdefense  = getrpgjson.magicdefense //魔法抗性
    const killnumber = getrpgjson.killnumber //击杀统计
    const coins = getrpgjson.coins //硬币
    const kudos = getrpgjson.kudos //声望
    const experiencepoint  = getrpgjson.experiencepoint //经验值

    const prefix  = getrpgjson.prefix //前缀
    const interlocutory  = getrpgjson.interlocutory //中间
    const suffix  = getrpgjson.suffix //后缀
    const skillpoint  = getrpgjson.skillpoint //技能点
    const skill1  = getrpgjson.skill1 //技能点
    const skill2  = getrpgjson.skill2 //技能点
    const skill3  = getrpgjson.skill3 //技能点
    const primaryweapon  = getrpgjson.primaryweapon //主武器
    const secondaryweapon  = getrpgjson.secondaryweapon //副武器
    const armour  = getrpgjson.armour //盔甲
    const racist  = getrpgjson.racist //种族
    const faiths  = getrpgjson.faiths //信仰
    const profession = getrpgjson.profession //职业
    const itembar  = getrpgjson.itembar //物品栏
    const skillbar  = getrpgjson.skillbar //技能栏

    // let faithsn : string

    const levelold = getrpgjson.level //旧数据库等级
    const lvline = getdatarpg.levelJudge(Number(experiencepoint)).level_line
    const level = (getdatarpg.levelJudge(Number(experiencepoint))).level //遍历得出的升级

    //获取种族
    const getRace = getdatarpg.getRaceId(Number(racist)) //种族
    const getRaceName = getRace.name

    let getRaceInnateskill1 = `${getRace.innateskill1}:<br>${getRace.innateskill1info1}`
    let getRaceInnateskill2 = `${getRace.innateskill2}:<br>${getRace.innateskill1info2}`
    let getRaceInnateskill3 = `${getRace.innateskill3}:<br>${getRace.innateskill1info3}`

    //获取技能
    const getSkill1 = getdatarpg.getSkillId(Number(skill1)) //技能
    const getSkill2 = getdatarpg.getSkillId(Number(skill2))
    const getSkill3 = getdatarpg.getSkillId(Number(skill3))


    let getSkill1Name1: string = `${getSkill1.name}:<br>${getSkill1.skillinfo}${getSkill1.attckinfo},${getSkill1.endinfo}`
    if(skill1 === 0){
      getSkill1Name1 = "无技能"
    }
    let getSkill2Name1: string = `${getSkill2.name}:<br>${getSkill2.skillinfo}${getSkill2.attckinfo},${getSkill2.endinfo}`
    if(skill2 === 0){
      getSkill2Name1 = "无技能"
    }
    let getSkill3Name1: string = `${getSkill3.name}:<br>${getSkill3.skillinfo}${getSkill3.attckinfo},${getSkill3.endinfo}`
    if(skill3 === 0){
      getSkill3Name1 = "无技能"
    }

    //获取前缀
    const getPrefix = getdatarpg.getPrefixLibraryId(Number(prefix)) //前缀
    let getPrefixName: string
    if(getPrefix.id === 0){
      getPrefixName = ""
    }else{
      getPrefixName = getPrefix.name + "•"
    }

    //获取中间
    const getinterlocutory = getdatarpg.getInterlocutorylibraryId(Number(interlocutory)) //中心
    let getinterlocutoryName: string
    if(getinterlocutory.id === 0){
      getinterlocutoryName = ""
    }else{
      getinterlocutoryName = getinterlocutory.name
    }
    //获取后缀
    const getSuffix = getdatarpg.getSuffixlibraryId(Number(suffix)) //后缀
    let getSuffixName: string
    if(getSuffix.id === 0){
      getSuffixName = ""
    }else{
      getSuffixName = "&#x2020;" + getSuffix.name + "&#x2020;"
    }

    //获取主武器
    const getPrimaryweapon = getdatarpg.getArsenalId(Number(primaryweapon)) //主武器
    let getPrimaryweaponName
    let getPrimaryweaponPath
    if(getPrimaryweapon.id === 0){
      getPrimaryweaponName = "未装备武器"
      getPrimaryweaponPath = path.join(__dirname, getPrimaryweapon.path).replace(/\\/g, '/');
    }else {
      getPrimaryweaponName = getPrimaryweapon.name
      getPrimaryweaponPath = path.join(__dirname, getPrimaryweapon.path).replace(/\\/g, '/');
    }

    //获取副武器
    const getSecondaryweapon = getdatarpg.getArsenalId(Number(secondaryweapon)) //副武器
    let getSecondaryweaponName
    let getSecondaryweaponPath
    if(getSecondaryweapon.id === 0){
      getSecondaryweaponName = "未装备武器"
      getSecondaryweaponPath = path.join(__dirname, getSecondaryweapon.path).replace(/\\/g, '/');
    }else {
      getSecondaryweaponName = getSecondaryweapon.name
      getSecondaryweaponPath = path.join(__dirname, getSecondaryweapon.path).replace(/\\/g, '/');
    }

    //获取衣物
    const getArmour = getdatarpg.getArmourId(Number(armour)) //衣物
    let getArmourName
    let getArmourPath
    if(getArmour.id === 0){
      getArmourName = "未装备衣物"
      getArmourPath = path.join(__dirname, getArmour.path).replace(/\\/g, '/');
    }else {
      getArmourName = getArmour.name
      getArmourPath = path.join(__dirname, getArmour.path).replace(/\\/g, '/');
    }

    //获取职业
    const getProfession = getdatarpg.getProfessionId(Number(profession)) //职业
    let getProfessionName = getProfession.name

    //获取信仰对象
    const getGod = getdatarpg.getGodId(Number(faiths)) //信仰
    let getGodHead = getGod.godhead
    let getGodName = getGod.name

    //最终数值加成
    let staminaEnd = getrpgjson.stamina + getRace.stamina + getPrimaryweapon.stamina + (Math.round(getSecondaryweapon.stamina / 2)) + getArmour.stamina + getGod.stamina + getProfession.stamina + getPrefix.stamina + getinterlocutory.stamina + getSuffix.stamina //最终耐力
    if(staminaEnd < 0){
      staminaEnd = 0
    }
    let physicaldefenseEnd  = getrpgjson.physicaldefense + getRace.physicaldefense + getPrimaryweapon.physicaldefense + (Math.round(getSecondaryweapon.physicaldefense / 2)) + getArmour.physicaldefense + getGod.physicaldefense + getProfession.physicaldefense + getPrefix.physicaldefense + getinterlocutory.physicaldefense + getSuffix.physicaldefense + (Math.round(staminaEnd * 0.5))//最终物理抗性

    let magicdefenseEnd  = getrpgjson.magicdefense + getRace.magicdefense + getPrimaryweapon.magicdefense + (Math.round(getSecondaryweapon.magicdefense / 2)) + getArmour.magicdefense + getGod.magicdefense + getProfession.magicdefense + getPrefix.magicdefense + getinterlocutory.magicdefense + getSuffix.magicdefense + (Math.round(staminaEnd * 0.3))//最终魔法抗性

    //避免抗性太高没伤害
    if(physicaldefenseEnd > 70){
      physicaldefenseEnd = 70
    }else if(physicaldefenseEnd < 0){
      physicaldefenseEnd = 0
    }
    if(magicdefenseEnd > 70){
      magicdefenseEnd = 70
    }else if(magicdefenseEnd < 0){
      magicdefenseEnd = 0
    }

    let sturdypointEnd = getrpgjson.sturdypoint + getRace.sturdypoint + getPrimaryweapon.sturdypoint + (Math.round(getSecondaryweapon.sturdypoint / 2)) + getArmour.sturdypoint + getGod.sturdypoint + getProfession.sturdypoint + getPrefix.sturdypoint + getinterlocutory.sturdypoint + getSuffix.sturdypoint //最终体质
    if(sturdypointEnd < 0){
      sturdypointEnd = 0
    }

    let dexterityEnd = getrpgjson.dexterity + getRace.dexterity + getPrimaryweapon.dexterity + (Math.round(getSecondaryweapon.dexterity / 2)) + getArmour.dexterity + getGod.dexterity + getProfession.dexterity + getPrefix.dexterity + getinterlocutory.dexterity + getSuffix.dexterity //最终敏捷
    if(dexterityEnd < 0){
      dexterityEnd = 0
    }
    let spiritualintuitionEnd = getrpgjson.spiritualintuition + getRace.spiritualintuition + getPrimaryweapon.spiritualintuition + (Math.round(getSecondaryweapon.spiritualintuition / 2)) + getArmour.spiritualintuition + getGod.spiritualintuition + getProfession.spiritualintuition + getPrefix.spiritualintuition + getinterlocutory.spiritualintuition + getSuffix.spiritualintuition //最终灵性直觉
    if(spiritualintuitionEnd < 0){
      spiritualintuitionEnd = 0
    }
    let luckyvalueEnd = getrpgjson.luckyvalue + getRace.luckyvalue + getPrimaryweapon.luckyvalue + (Math.round(getSecondaryweapon.luckyvalue / 2)) + getArmour.luckyvalue + getGod.luckyvalue + getProfession.luckyvalue + getPrefix.luckyvalue + getinterlocutory.luckyvalue + getSuffix.luckyvalue //最终幸运值
    if(luckyvalueEnd < 0){
      luckyvalueEnd = 0
    }
    let intelligenceEnd = getrpgjson.intelligence + getRace.intelligence + getPrimaryweapon.intelligence + (Math.round(getSecondaryweapon.intelligence / 2)) + getArmour.intelligence + getGod.intelligence + getProfession.intelligence + getPrefix.intelligence + getinterlocutory.intelligence + getSuffix.intelligence //最终智力
    if(intelligenceEnd < 0){
      intelligenceEnd = 0
    }
    let faithEnd = getrpgjson.faith + getRace.faith + getPrimaryweapon.faith + (Math.round(getSecondaryweapon.faith / 2)) + getArmour.faith + getGod.faith + getProfession.faith + getPrefix.faith + getinterlocutory.faith + getSuffix.faith //最终信仰
    if(faithEnd < 0){
      faithEnd = 0
    }
    let attackEnd = getrpgjson.attack + getRace.attack + getPrimaryweapon.attack + (Math.round(getSecondaryweapon.attack / 2)) + getArmour.attack + getGod.attack + getProfession.attack + getPrefix.attack + getinterlocutory.attack + getSuffix.attack //最终力量
    if(attackEnd < 0){
      attackEnd = 0
    }
    let armourclassEnd  = getrpgjson.armourclass + getRace.armourclass + getPrimaryweapon.armourclass + (Math.round(getSecondaryweapon.armourclass / 2)) + getArmour.armourclass + getGod.armourclass + getProfession.armourclass + getPrefix.armourclass + getinterlocutory.armourclass + getSuffix.armourclass //最终护甲值
    if(armourclassEnd < 0){
      armourclassEnd = 0
    }


    //生命和魔力放后面
    const healthpointEnd = getrpgjson.maxhealthpoint + getRace.healthpoint + getPrimaryweapon.healthpoint + (Math.round(getSecondaryweapon.healthpoint / 2)) + getArmour.healthpoint + getGod.healthpoint + getProfession.healthpoint + getPrefix.healthpoint + getinterlocutory.healthpoint + getSuffix.healthpoint + (sturdypointEnd * 10) //最终生命值
    const maxmagicpointEnd = getrpgjson.maxmagicpoint + getRace.maxmagicpoint + getPrimaryweapon.maxmagicpoint + (Math.round(getSecondaryweapon.maxmagicpoint / 2)) + getArmour.maxmagicpoint + getGod.maxmagicpoint + getProfession.maxmagicpoint + getPrefix.maxmagicpoint + getinterlocutory.maxmagicpoint + getSuffix.maxmagicpoint + (intelligenceEnd * 5)//最终最大魔力值

    let newskillpoint =(Number((level - levelold)*5)) //升级技能点
    let exppoint = (Number(experiencepoint)/lvline*100).toFixed(3).toString() //经验条
    const lifepoint = (Number(healthpoint)/healthpointEnd*100).toFixed(3).toString() //血条
    const molizi = (Number(magicpoint)/(maxmagicpointEnd)*100).toFixed(3).toString() //蓝条

    await ctx.database.upsert('role_playing_game_attach',[{
      id: String(sessions.userId ?? sessions.member.user.id),
      skillpoint: skillpoint + newskillpoint
    }])
    await ctx.database.upsert('role_playing_game', [{
      id: String(sessions.userId ?? sessions.member.user.id),
      level: level,
      healthpointEnd: healthpointEnd,
      magicpointEnd: maxmagicpointEnd
    }])

    let newskillpoints = (await ctx.database.get('role_playing_game_attach', { id: String(sessions.userId ?? sessions.member.user.id) }))[0]?.skillpoint;

    let name:any;
    if (ctx.database){
      name = sessions.username ?? sessions.member?.nick
      if(name.length <= 0){
        name = sessions.user.name
      }
      if(name === undefined){
        name = sessions.user.name
      }
    }
    if (!name){
      name = sessions.author?.name ?? sessions.member?.nick
      if(name.length <= 0){
        name = sessions.user.name
      }
      if(name === undefined){
        name = sessions.user.name
      }
    }
    name = name.length>8? name.substring(0, 8 - 1) + '…' : name;
    let statuscd = (await ctx.database.get('role_playing_game_cd', { id: String(sessions.userId) }))[0]?.status //决斗cd
    let status
    if(getrpgjson.status === 1){
      status = `☺`
    }else{
      status = `☹`
    }
    if(statuscd === 1){
      status = `☼`
    }
    const httpContent = `
        <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>角色面板</title>
    <style>
    @font-face {
        font-family: "pixel";
        src: url("${textfont}") format("truetype");
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            background-color: #ffffff;
            background-image: url('${img}'); /* 设置背景图片 */
            background-size: cover;  /* 图片覆盖整个背景区域 */
            background-repeat: no-repeat; /* 不重复图片 */
            background-position: center center; /* 居中对齐图片 */
        }
        .container {
            padding: 20px; /* 父元素的内边距 */
        }
        .profile-card {
            border-radius: 50px;
            position: relative;
            /*width: 100%; !* 适当的宽度 *!*/
            max-height: 2000px; /* 适当的高度 */
            background-color: rgba(61, 58, 58, 0.2); /* 背景颜色 */
            margin: 50px 20px 10px 20px; /* 居中 */
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
        }
        .title-word {
            font-size: 80px;
            text-align: center;
            color: rgb(0,0,0);
        }
        .caption {
            border-radius: 20px;
            margin: auto;
            width: 70%;
            height: 20px;
            background-color: rgba(0,0,0,0.8);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .flex-container {
            display: flex; /* 使用 Flexbox 布局 */
            justify-content: space-between; /* 在主轴上均匀分布 */
            align-items: flex-start; /* 在交叉轴上从顶部对齐 */
            margin-top: 20px; /* 额外的顶部外边距，确保从顶部开始排列 */
        }
        .profile-backcard {
            /*display: flex; !* 使用 Flexbox 布局 *!*/
            /*justify-content: space-between; !* 在主轴上均匀分布 *!*/
            align-items: flex-start; /* 在交叉轴上从顶部对齐 */
            margin: 20px; /* 额外的顶部外边距，确保从顶部开始排列 */
            padding: 10px;
            border-radius: 50px;
            width: 60%; /* 设置不同的宽度，例如 60% */
            max-height: 900px; /* 适当的高度 */
            background-color: rgba(255,255,255,0.2); /* 背景颜色 */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .profile-rightbackcard {
            /*display: flex; !* 使用 Flexbox 布局 *!*/
            /*justify-content: space-between; !* 在主轴上均匀分布 *!*/
            /*align-items: flex-start; !* 在交叉轴上从顶部对齐 *!*/
            margin: 20px;
            padding: 10px;
            border-radius: 50px;
            width: 35%; /* 设置不同的宽度，例如 35% */
            max-height: 600px; /* 适当的高度 */
            background-color: rgba(236, 230, 233, 0.2); /* 背景颜色 */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .profile-card img {
            width: 100%;
        }
        .avatar {
            /*margin: 20px 0 0 20px;*/
            max-width: 262px;
            max-height: 262px;
            border-radius: 10px;
            border: 10px solid #fff;
            background: #fff;
        }
        .level-bar {
            padding: 40px 0 0 40px;
            display: flex;
            align-items: flex-start;
            gap: 20px; /* 增加图片和进度条之间的间距 */
        }
        .level-bar .bar-container {
            width: 100%;
            background: rgba(79,76,76,0.23);
            border-radius: 15px;
            overflow: hidden;
            position: static;
            margin: 10px auto;
        }
        .group {
            width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            background-color: rgba(236,230,233,0.21); /* 背景颜色 */
            border-radius: 15px;
            padding: 0 20px 0 20px;
            display: flex;
            /*align-items: center;*/
            flex-direction: column;
            margin: 0 20px 0 0;
        }
        .group2 {
            width: 60%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            background-color: rgba(236,230,233,0.21);
            border-radius: 15px;
            padding: 10px 20px 0 0;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            /*margin: 0 20px 20px 0;*/
        }
        .group7{
            max-width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            /*padding: 0 20px 0 0;*/
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            /*gap: 80px; !* 增加图片和进度条之间的间距 *!*/
        }
        .group .group7{
            max-width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            padding: 0 20px 0 0;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            gap: 80px; /* 增加图片和进度条之间的间距 */
        }
        .group7 .text2{
            /*max-width: 100%; !* 适当的宽度 *!*/
            color: #000000;
            font-size: 40px;
            gap: 80px; /* 增加图片间距 */
            padding: 0 0 0 0;
        }
        .group3 {
            max-width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            background-color: rgba(236,230,233,0.21);
            border-radius: 15px;
            padding: 5px 0 5px 20px;
            margin-top: 10px;
            margin-bottom: 22px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        .group5 {
            max-width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            background-color: rgba(236,230,233,0.21);
            border-radius: 15px;
            padding: 5px 0 5px 20px;
            margin-top: 10px;
            margin-bottom: 22px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        .group4 {
            width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            padding: 0 20px 0 10px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        .group2 .group3 {
            width: 100%; /* 适当的宽度 */
            height: 60%; /* 适当的高度 */
            background-color: rgba(236,230,233,0);
            border-radius: 15px;
            padding: 20px 0 0 10px;
            margin-bottom: 10px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        .text-container {
            padding: 0 20px 0 20px;
            display: flex;
            justify-content: center;
            gap: 5px; /* 增加图片和进度条之间的间距 */
        }
        .text {
            /*text-align: center;*/
            font-family:'pixel';
            color: #000000;
            font-size: 45px;
            padding: 5px;
            margin: 4px;
        }
        .text2 {
            color: #000000;
            font-size: 40px;
            padding: 0 10px 0 0;
        }
        .text3 {
            /*text-align: center;*/
            width: 100%;
            height: auto;
            color: #000000;
            font-size: 30px;
            padding: 10px;
            /*margin: 10px auto;*/
            overflow: hidden; /* 隐藏溢出内容 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
            /*border: 1px solid #000; !* 可选：添加边框以便更容易看到效果 *!*/
        }
        .text4 {
            color: rgba(0,0,0,0.6);
            font-size: 24px;
            padding: 0 10px 0 0;
            display: flex;
            flex-direction: row-reverse;
        }
        .text5 {
            /*text-align: center;*/
            font-family:'pixel',serif;
            width: 100%;
            height: auto;
            color: #000000;
            font-size: 40px;
            text-align: center;
            padding: 10px;
            /*margin: 10px auto;*/
            overflow: hidden; /* 隐藏溢出内容 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
            /*border: 1px solid #000; !* 可选：添加边框以便更容易看到效果 *!*/
        }
        .level-bar .progress {
            width: calc(${lifepoint}%);
            height: 30px;
            font-size: 20px;
            background-color: rgba(255,0,0,0.6);
            border-radius: 15px;
            border: 1px solid rgb(255,115,115);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            transition: width 0.3s;
        }
        .level-bar .magicpoint {
            width: calc(${molizi}%);
            height: 30px;
            font-size: 20px;
            background-color: rgba(0,153,153,0.6);
            border-radius: 15px;
            border: 1px solid rgb(92,204,204);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            transition: width 0.3s;
        }
        .level-bar .exp {
            width: calc(${exppoint}%);
            height: 30px;
            font-size: 20px;
            /*margin-bottom: 10px;*/
            background: rgba(0,193,43,0.6);
            border-radius: 15px;
            border: 1px solid rgb(101,224,128);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            transition: width 0.3s;
        }
        .name-container {
            /*padding: 40px 40px 0 40px;*/
            width: 100%; /* 适当的宽度 */
            display: flex;
            align-items: flex-start;
            gap: 10px; /* 增加图片和进度条之间的间距 */
        }
        .name {
            color: #000000;
            max-width: 100%; /* 适当的宽度 */
            font-size: 40px;
            font-weight: bold;
            padding: 10px;
            margin: 0 0 0 40px;
        }
        .name2 {
            color: #000000;
            max-width: 100%; /* 适当的宽度 */
            font-size: 40px;
            font-weight: bold;
            padding: 10px;
            margin: 0 0 0 10px;
        }
        .kill {
            color: #000000;
            font-size: 45px;
            /*padding: 10px;*/
            margin: 0 0 0 10%;
            /*text-align: center;*/
        }
        .title {
            color: #000000;
            font-size: 40px;
            padding: 0 0 10px 0;
            margin: 10px 0 0 0;
            /*display: flex;*/
            /*align-items: center;*/
            text-align: center;
        }
        .flex-container1 {
            display: flex; /* 使用 Flexbox 布局 */
            justify-content: space-between; /* 在主轴上均匀分布 */
            align-items: flex-start; /* 在交叉轴上从顶部对齐 */
            margin: 0 20px 20px 20px;
        }
        .profile-card1 {
            align-items: flex-start; /* 在交叉轴上从顶部对齐 */
            margin: 0 20px 20px 0; /* 额外的顶部外边距，确保从顶部开始排列 */
            padding: 10px;
            border-radius: 50px;
            width: 60%; /* 设置不同的宽度，例如 60% */
            max-height: 900px; /* 适当的高度 */
            background-color: rgba(255,255,255,0.2); /* 背景颜色 */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .profile-card1 .group7{
            width: 100%; /* 适当的宽度 */
            height: 30%; /* 适当的高度 */
            background-color: rgba(82,80,80,0.3); /* 背景颜色 */
            border-radius: 15px;
            padding: 0 0 0 0;
            display: flex;
            align-items: center;
            flex-direction: column;
            margin: 10px 20px 0 20px;
        }
        .profile-card1 .text3 {
            text-align: center;
            /*width: 100%;*/
            height: auto;
            color: #000000;
            font-size: 25px;
            padding: 5px;
            margin-bottom: 5px;
            /*overflow: hidden; !* 隐藏溢出内容 *!*/
            /*text-overflow: ellipsis; !* 使用省略号表示溢出部分 *!*/
            /*border: 1px solid #000; !* 可选：添加边框以便更容易看到效果 *!*/
        }
        .profile-card1 .avatar {
            /*margin: 20px 0 0 20px;*/
            width: 250px;
            height: 250px;
            border-radius: 10px;
            border: 10px solid #fff;
            background: #fff;
        }
        .profile-card2 {
            margin: 0 20px 20px 20px;
            padding: 10px;
            border-radius: 50px;
            width: 35%; /* 设置不同的宽度，例如 35% */
            max-height: 800px; /* 适当的高度 */
            background-color: rgba(236, 230, 233, 0.2); /* 背景颜色 */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .profile-card3 {
            margin: 0 0 20px 20px;
            padding: 10px;
            border-radius: 50px;
            width: 35%; /* 设置不同的宽度，例如 35% */
            max-height: 600px; /* 适当的高度 */
            background-color: rgba(236, 230, 233, 0.2); /* 背景颜色 */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .group6 {
            /*width: 100%; !* 适当的宽度 *!*/
            max-height: 50%; /* 适当的高度 */
            background-color: rgba(82,80,80,0.3); /* 背景颜色 */
            border-radius: 15px;
            padding: 0 10px 0 10px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            margin: 10px 20px 0 20px;
        }
        .profile-card3 .text {
            /*text-align: center;*/
            color: #000000;
            font-size: 40px;
            padding: 2px;
        }
        .profile-card3 .text-container {
            padding: 0 20px 0 20px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            /*gap: 20px; !* 增加图片和进度条之间的间距 *!*/
        }
        .title-word1 {
            font-size: 50px;
            text-align: center;
            color: rgb(0,0,0);
        }
        .caption1 {
            border-radius: 20px;
            margin: auto;
            width: 90%;
            height: 5px;
            background-color: rgba(54,52,52,0.6);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
        }
        .credit {
            text-align: center;
            color: #999;
            font-size: 40px;
            padding: 10px;
        }
    </style>
</head>
<body id="body">
    <div class="container">
        <div class="profile-card">
            <div class="title-word"><strong>♦Menu♦</strong></div>
            <div class="caption"></div>
            <div class="flex-container">
                <div class="profile-backcard">
                    <div class="title-word1"><strong>角色状态栏𖨠</strong></div>
                    <div class="caption1"></div>
                    <div class="level-bar">
                        <img class="avatar" src="${avatarUrl}" alt="Avatar">
                        <div class="group2">
                        <div class="group4">
                        <div class="text2"><span style="font-family: pixel,serif"><strong>⚬信仰所属⚬<br>${getGodHead}${getGodName}</strong></span></div>
                        </div>
                        <div class="group3">
                        <div class="text2">HP❤:<span style="font-family: pixel,serif"><strong>${healthpoint}/${healthpointEnd}</strong></span></div>
                        <div class="text2">MP◆:<span style="font-family: pixel,serif"><strong>${magicpoint}/${maxmagicpointEnd}</strong></span></div>
                        <div class="text2">AP⬤:<span style="font-family: pixel,serif"><strong>${newskillpoints}</strong></span></div>
                        </div>
                        </div>
                        <div class="group">
                        <div class="title">${getPrefixName}${getinterlocutoryName}${getSuffixName}</div>
                        <div class="group7">
                        <div class="text2"><span style="font-family: pixel,serif"><strong>Lv▸${level}</strong></span></div>
                        <div class="text2"><span style="font-family: pixel,serif"><strong>种族◉:${getRaceName}</strong></span></div>
                        </div>
                        <div class="bar-container">
                            <div class="progress"></div>
                        </div>
                        <div class="bar-container">
                            <div class="magicpoint"></div>
                        </div>
                        <div class="bar-container">
                            <div class="exp"></div>
                        </div>
                        <div class="text4"><span style="font-family: pixel,serif"><strong>${experiencepoint}/${lvline}✦</strong></span></div>
                        </div>
                    </div>
                    <div class="name-container">
                    <div class="name">冒险铭牌⛉:<span style="font-family: pixel,serif"><strong>${name} 『${status}』</strong></span></div>
                    <div class="name2">硬币数✾:<span style="font-family: pixel,serif"><strong>${coins}</strong></span></div>
                    <div class="name2">声望值❁:<span style="font-family: pixel,serif"><strong>${kudos}</strong></span></div>
                    <div class="name2">职业🌒:<span style="font-family: pixel,serif"><strong>${getProfessionName}</strong></span></div>
                    </div>
                </div>
                <div class="profile-rightbackcard">
                    <div class="title-word1"><strong>属性栏⚅</strong></div>
                    <div class="caption1"></div>
                    <div class="text-container">
                        <div class="group3">
                            <div class="text"><strong>力量:${attackEnd}『${attack}』</strong></div>
                            <div class="text"><strong>护甲:${armourclassEnd}『${armourclass}』</strong></div>
                            <div class="text"><strong>体质:${sturdypointEnd}『${sturdypoint}』</strong></div>
                            <div class="text"><strong>耐力:${staminaEnd}『${stamina}』</strong></div>
                            <div class="text"><strong>智力:${intelligenceEnd}『${intelligence}』</strong></div>
                            <div class="text"><strong>敏捷:${dexterityEnd}『${dexterity}』</strong></div>
                        </div>
                        <div class="group5">
                            <div class="text"><strong>幸运:${luckyvalueEnd}『${luckyvalue}』</strong></div>
                            <div class="text"><strong>信仰:${faithEnd}『${faith}』</strong></div>
                            <div class="text"><strong>灵性直觉:${spiritualintuitionEnd}『${spiritualintuition}』</strong></div>
                            <div class="text"><strong>物理抗性:${physicaldefenseEnd}</strong></div>
                            <div class="text"><strong>魔法抗性:${magicdefenseEnd}</strong></div>
                            <div class="text"><strong>击杀数:${killnumber}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-container1">
            <div class="profile-card1">
            <div class="title-word1"><strong>装备栏⛊</strong></div>
            <div class="caption1"></div>
            <div class="text-container">
                <div class="group7">
                <div class="text5"><strong>主手武器</strong></div>
                <img class="avatar" src="${getPrimaryweaponPath}" alt="Avatar">
                <div class="text5">【${getPrimaryweaponName}】</div>
                </div>
                <div class="group7">
                <div class="text5"><strong>副手武器</strong></div>
                <img class="avatar" src="${getSecondaryweaponPath}" alt="Avatar">
                <div class="text5">【${getSecondaryweaponName}】</div>
                </div>
                <div class="group7">
                <div class="text5"><strong>盔甲</strong></div>
                <img class="avatar" src="${getArmourPath}" alt="Avatar">
                <div class="text5">【${getArmourName}】</div>
                </div>
            </div>
            </div>
            <div class="profile-card2">
            <div class="title-word1"><strong>技能栏☨</strong></div>
            <div class="caption1"></div>
            <div class="group6">
                    <div class="text3"><span style="font-family: pixel,serif"><strong>${getSkill1Name1}</strong></span></div>
                </div>
                <div class="group6">
                    <div class="text3"><span style="font-family: pixel,serif"><strong>${getSkill2Name1}</strong></span></div>
                </div>
                <div class="group6">
                    <div class="text3"><span style="font-family: pixel,serif"><strong>${getSkill3Name1}</strong></span></div>
                </div>
            </div>
            <div class="profile-card3">
                <div class="title-word1"><strong>天赋栏♜</strong></div>
                <div class="caption1"></div>
                <div class="group6">
                    <div class="text3"><span style="font-family: pixel,serif"><strong>${getRaceInnateskill1}</strong></span></div>
                </div>
                <div class="group6">
                    <div class="text3"><span style="font-family: pixel,serif"><strong>${getRaceInnateskill2}</strong></span></div>
                </div>
                <div class="group6">
                    <div class="text3"><span style="font-family: pixel,serif"><strong>${getRaceInnateskill3}</strong></span></div>
                </div>
            </div>
            </div>
        </div>
    </div>
    <footer class="credit">AXLMLYRPG / AXLMLY</footer>
</body>
</html>
    `
    return {
      "httpContent": httpContent,
      "healthpointEnd": healthpointEnd,
      "maxmagicpointEnd": maxmagicpointEnd,
      "sturdypointEnd": sturdypointEnd,
      "staminaEnd": staminaEnd,
      "dexterityEnd": dexterityEnd,
      "spiritualintuitionEnd": spiritualintuitionEnd,
      "luckyvalueEnd": luckyvalueEnd,
      "intelligenceEnd": intelligenceEnd,
      "faithEnd": faithEnd,
      "attackEnd": attackEnd,
      "armourclassEnd": armourclassEnd,
      "physicaldefenseEnd": physicaldefenseEnd,
      "magicdefenseEnd": magicdefenseEnd
    }
  }
}
