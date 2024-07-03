"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBattleLogsHtml = void 0;
// 初始玩家数据
function createPlayer(name, avatarUrl, hp, mp, attack, sturdypoint, dexterity, luckyvalue, spiritualintuition, stamina, intelligence, faith, armourclass, physicaldefense, magicaldefense, criticalhit, Skillid1, Skillname1, Skillharm1, Skilltypes1, Skillskillinfo1, Skillattckinfo1, Skillendinfo1, getSkill1consumptionofmagic, Skillid2, Skillname2, Skillharm2, Skilltypes2, Skillskillinfo2, Skillattckinfo2, Skillendinfo2, getSkill2consumptionofmagic, Skillid3, Skillname3, Skillharm3, Skilltypes3, Skillskillinfo3, Skillattckinfo3, Skillendinfo3, getSkill3consumptionofmagic, getPrimaryweaponname1, getPrimaryweaponharm1, getPrimaryweapontypes1, getPrimaryweaponfightkirelease1, getPrimaryweaponmagicrelease1, getSecondaryweaponname1, getSecondaryweaponharm1, getSecondaryweapontypes1, getSecondaryweaponfightkirelease1, getSecondaryweaponmagicrelease1) {
    return { name: name,
        hp: hp,
        mp: mp,
        avatarUrl: avatarUrl,
        attack: attack,
        sturdypoint: sturdypoint,
        dexterity: dexterity,
        luckyvalue: luckyvalue,
        spiritualintuition: spiritualintuition,
        stamina: stamina,
        intelligence: intelligence,
        faith: faith,
        armourclass: armourclass,
        physicaldefense: physicaldefense,
        magicaldefense: magicaldefense,
        criticalhit: criticalhit,
        Skillid1: Skillid1,
        Skillname1: Skillname1,
        Skillharm1: Skillharm1,
        Skilltypes1: Skilltypes1,
        Skillskillinfo1: Skillskillinfo1,
        Skillattckinfo1: Skillattckinfo1,
        Skillendinfo1: Skillendinfo1,
        getSkill1consumptionofmagic: getSkill1consumptionofmagic,
        Skillid2: Skillid2,
        Skillname2: Skillname2,
        Skillharm2: Skillharm2,
        Skilltypes2: Skilltypes2,
        Skillskillinfo2: Skillskillinfo2,
        Skillattckinfo2: Skillattckinfo2,
        Skillendinfo2: Skillendinfo2,
        getSkill2consumptionofmagic: getSkill2consumptionofmagic,
        Skillid3: Skillid3,
        Skillname3: Skillname3,
        Skillharm3: Skillharm3,
        Skilltypes3: Skilltypes3,
        Skillskillinfo3: Skillskillinfo3,
        Skillattckinfo3: Skillattckinfo3,
        Skillendinfo3: Skillendinfo3,
        getSkill3consumptionofmagic: getSkill3consumptionofmagic,
        getPrimaryweaponname: getPrimaryweaponname1,
        getPrimaryweaponharm: getPrimaryweaponharm1,
        getPrimaryweapontypes: getPrimaryweapontypes1,
        getPrimaryweaponfightkirelease: getPrimaryweaponfightkirelease1,
        getPrimaryweaponmagicrelease: getPrimaryweaponmagicrelease1,
        getSecondaryweaponname: getSecondaryweaponname1,
        getSecondaryweaponharm: getSecondaryweaponharm1,
        getSecondaryweapontypes: getSecondaryweapontypes1,
        getSecondaryweaponfightkirelease: getSecondaryweaponfightkirelease1,
        getSecondaryweaponmagicrelease: getSecondaryweaponmagicrelease1 };
}
function getRandomAction() {
    // 定义动作及其对应的权重
    var actions = [
        // { action: '近身攻击', weight: 0.05 }, // 10% 概率
        { action: '武器攻击', weight: 0.4 }, // 60% 概率
        { action: '技能攻击', weight: 0.6 } // 40% 概率
    ];
    // 计算总权重
    var totalWeight = actions.reduce(function (sum, action) { return sum + action.weight; }, 0);
    // 生成一个介于 0 和 totalWeight 之间的随机数
    var random = Math.random() * totalWeight;
    // 根据权重选择动作
    for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
        var action = actions_1[_i];
        if (random < action.weight) {
            return action.action;
        }
        random -= action.weight;
    }
    // 默认返回第一个动作（理论上不会执行到这里）
    return actions[0].action;
}
function simulateBattle(player1, player2) {
    var battleLogs = [];
    var round = 0;
    var maxRounds = 50;
    // 计算伤害
    //挥拳伤害
    //py1挥拳
    var hurt101 = Math.round(0.7 * player1.sturdypoint) + player1.attack;
    var hurt102 = hurt101 * 1.3;
    //py2挥拳
    var hurt201 = Math.round(0.7 * player2.sturdypoint) + player2.attack;
    var hurt202 = hurt201 * 1.3;
    //技能伤害
    //py1
    var hurt103 = Math.round((player1.attack * 1.7) + (0.7 * player1.sturdypoint) + player1.Skillharm1);
    var hurt104 = hurt103 * 1.5;
    var hurt105 = Math.round((player1.attack * 1.7) + (0.7 * player1.sturdypoint) + player1.Skillharm2);
    var hurt106 = hurt105 * 1.5;
    var hurt107 = Math.round((player1.attack * 1.7) + (0.7 * player1.sturdypoint) + player1.Skillharm3);
    var hurt108 = hurt107 * 1.5;
    var hurt109 = Math.round((player1.intelligence * 1.9) + (0.3 * player1.sturdypoint) + player1.Skillharm1);
    var hurt110 = hurt109 * 1.7;
    var hurt111 = Math.round((player1.intelligence * 1.9) + (0.3 * player1.sturdypoint) + player1.Skillharm2);
    var hurt112 = hurt111 * 1.7;
    var hurt113 = Math.round((player1.intelligence * 1.9) + (0.3 * player1.sturdypoint) + player1.Skillharm3);
    var hurt114 = hurt113 * 1.7;
    //py2
    var hurt203 = Math.round((player2.attack * 1.7) + (0.7 * player2.sturdypoint) + player2.Skillharm1);
    var hurt204 = hurt203 * 1.5;
    var hurt205 = Math.round((player2.attack * 1.7) + (0.7 * player2.sturdypoint) + player2.Skillharm2);
    var hurt206 = hurt205 * 1.5;
    var hurt207 = Math.round((player2.attack * 1.7) + (0.7 * player2.sturdypoint) + player2.Skillharm3);
    var hurt208 = hurt207 * 1.5;
    var hurt209 = Math.round((player2.intelligence * 1.9) + (0.3 * player2.sturdypoint) + player2.Skillharm1);
    var hurt210 = hurt209 * 1.7;
    var hurt211 = Math.round((player2.intelligence * 1.9) + (0.3 * player2.sturdypoint) + player2.Skillharm2);
    var hurt212 = hurt211 * 1.7;
    var hurt213 = Math.round((player2.intelligence * 1.9) + (0.3 * player2.sturdypoint) + player2.Skillharm3);
    var hurt214 = hurt213 * 1.7;
    //武器伤害
    //py1
    var hurt151 = Math.round((player1.attack * 1.7 + player1.getSecondaryweaponharm * 0.7) + (0.9 * player1.sturdypoint) + player1.getPrimaryweaponharm);
    var hurt152 = hurt151 * 1.5;
    var hurt153 = Math.round((player1.attack * 1.5) + (0.9 * player1.sturdypoint) + player1.getPrimaryweaponharm);
    var hurt154 = hurt153 * 1.5;
    var hurt155 = Math.round((player1.attack * 1.5) + (0.9 * player1.sturdypoint) + player1.getSecondaryweaponharm);
    var hurt156 = hurt155 * 1.5;
    var hurt157 = Math.round((player1.intelligence * 1.9 + player1.getSecondaryweaponharm * 0.7 + (0.3 * player1.sturdypoint) + player1.getPrimaryweaponharm));
    var hurt158 = hurt157 * 1.5;
    var hurt159 = Math.round((player1.intelligence * 1.7 + (0.3 * player1.sturdypoint) + player1.getPrimaryweaponharm));
    var hurt160 = hurt159 * 1.5;
    var hurt161 = Math.round((player1.intelligence * 1.7 + (0.3 * player1.sturdypoint) + player1.getSecondaryweaponharm));
    var hurt162 = hurt161 * 1.5;
    //py2
    var hurt251 = Math.round((player2.attack * 1.7 + player2.getSecondaryweaponharm * 0.7) + (0.9 * player2.sturdypoint) + player2.getPrimaryweaponharm);
    var hurt252 = hurt251 * 1.5;
    var hurt253 = Math.round((player2.attack * 1.5) + (0.9 * player2.sturdypoint) + player2.getPrimaryweaponharm);
    var hurt254 = hurt253 * 1.5;
    var hurt255 = Math.round((player2.attack * 1.5) + (0.9 * player2.sturdypoint) + player2.getSecondaryweaponharm);
    var hurt256 = hurt255 * 1.5;
    var hurt257 = Math.round((player2.intelligence * 1.9 + player2.getSecondaryweaponharm * 0.7 + (0.3 * player2.sturdypoint) + player2.getPrimaryweaponharm));
    var hurt258 = hurt257 * 1.5;
    var hurt259 = Math.round((player2.intelligence * 1.7 + (0.3 * player2.sturdypoint) + player2.getPrimaryweaponharm));
    var hurt260 = hurt259 * 1.5;
    var hurt261 = Math.round((player2.intelligence * 1.7 + (0.3 * player2.sturdypoint) + player2.getSecondaryweaponharm));
    var hurt262 = hurt261 * 1.5;
    //治疗伤害
    //py1
    var treatment115 = Math.round((0.7 * player1.intelligence) + (2 * player1.faith) + player1.Skillharm1);
    var treatment116 = treatment115 * 2;
    var treatment117 = Math.round((0.7 * player1.intelligence) + (2 * player1.faith) + player1.Skillharm2);
    var treatment118 = treatment117 * 2;
    var treatment119 = Math.round((0.7 * player1.intelligence) + (2 * player1.faith) + player1.Skillharm3);
    var treatment120 = treatment119 * 2;
    //py2
    var treatment215 = Math.round((0.7 * player2.intelligence) + (2 * player2.faith) + player2.Skillharm1);
    var treatment216 = treatment215 * 2;
    var treatment217 = Math.round((0.7 * player2.intelligence) + (2 * player2.faith) + player2.Skillharm2);
    var treatment218 = treatment217 * 2;
    var treatment219 = Math.round((0.7 * player2.intelligence) + (2 * player2.faith) + player2.Skillharm3);
    var treatment220 = treatment219 * 2;
    //计算暴击率函数
    function calculateMaxCriticalHit(luckyValue) {
        var maxCriticalHit = Math.round(100 - (luckyValue / 50));
        return Math.max(maxCriticalHit, 50);
    }
    // 计算暴击率函数
    function calculateCriticalHitRandom(maxCriticalHit) {
        return Math.floor(Math.random() * maxCriticalHit) + 1;
    }
    // 计算随机伤害加成暴击函数
    function calculateHurtCriticalHitRandom(hurtMin, hurtMax, luckyValue) {
        var hurtCriticalHitRandom = Math.round(Math.floor((Math.random() * (hurtMax - hurtMin + 1) + hurtMin)) + (0.7 * luckyValue));
        return Math.min(hurtCriticalHitRandom, hurtMax);
    }
    //计算治疗函数
    function calculateTheTreatment(randomValue, defense, release) {
        var treatment = Math.round(randomValue * (1 - (defense / 100)) * release);
        if (treatment < 0) {
            treatment = 1;
        }
        return treatment;
    }
    //计算治疗暴击函数
    function calculateCriticaTheTreatment(randomValue, defense, baseTreatment, multiplier, release) {
        if (multiplier === void 0) { multiplier = 1; }
        if (release === void 0) { release = 1; }
        var treatment = Math.round((randomValue * (1 - (defense / 100)) + (multiplier * baseTreatment)) * release);
        if (treatment < 0) {
            treatment = 1;
        }
        return treatment;
    }
    // 计算伤害函数
    function calculateDamage(randomValue, defense, armourClass, sturdyPoint, multiplier, release) {
        if (multiplier === void 0) { multiplier = 1; }
        if (release === void 0) { release = 1; }
        var damage = Math.round((randomValue * (1 - (defense / 100)) - multiplier * (armourClass + 0.2 * sturdyPoint)) * release);
        if (damage < 0) {
            damage = 1;
        }
        return damage;
    }
    // 计算暴击伤害函数
    function calculateCriticalDamage(randomValue, defense, armourClass, sturdyPoint, baseDamage, multiplier, release) {
        if (multiplier === void 0) { multiplier = 1; }
        if (release === void 0) { release = 1; }
        var criticalDamage = Math.round((randomValue * (1 - (defense / 100)) - multiplier * (armourClass + 0.2 * sturdyPoint) + (0.5 * baseDamage)) * release);
        if (criticalDamage < 0) {
            criticalDamage = 1;
        }
        return criticalDamage;
    }
    var _loop_1 = function () {
        round++;
        var action = getRandomAction();
        var result = '';
        // 玩家1的暴击上限和伤害计算
        var maxCriticalHitRandom101 = calculateMaxCriticalHit(player1.luckyvalue);
        var criticalHitRandom1 = calculateCriticalHitRandom(maxCriticalHitRandom101);
        var hurtCriticalHitRandom101 = calculateHurtCriticalHitRandom(hurt101, hurt102, player1.luckyvalue);
        // 玩家1的武器伤害计算
        var hurtCriticalHitRandom151 = calculateHurtCriticalHitRandom(hurt151, hurt152, player1.luckyvalue);
        var hurtCriticalHitRandom152 = calculateHurtCriticalHitRandom(hurt153, hurt154, player1.luckyvalue);
        var hurtCriticalHitRandom153 = calculateHurtCriticalHitRandom(hurt155, hurt156, player1.luckyvalue);
        var hurtCriticalHitRandom154 = calculateHurtCriticalHitRandom(hurt157, hurt158, player1.luckyvalue);
        var hurtCriticalHitRandom155 = calculateHurtCriticalHitRandom(hurt159, hurt160, player1.luckyvalue);
        var hurtCriticalHitRandom156 = calculateHurtCriticalHitRandom(hurt161, hurt162, player1.luckyvalue);
        // 玩家1的技能暴击伤害计算
        var hurtCriticalHitRandom103 = calculateHurtCriticalHitRandom(hurt103, hurt104, player1.luckyvalue);
        var hurtCriticalHitRandom104 = calculateHurtCriticalHitRandom(hurt105, hurt106, player1.luckyvalue);
        var hurtCriticalHitRandom105 = calculateHurtCriticalHitRandom(hurt107, hurt108, player1.luckyvalue);
        var hurtCriticalHitRandom106 = calculateHurtCriticalHitRandom(hurt109, hurt110, player1.luckyvalue);
        var hurtCriticalHitRandom107 = calculateHurtCriticalHitRandom(hurt111, hurt112, player1.luckyvalue);
        var hurtCriticalHitRandom108 = calculateHurtCriticalHitRandom(hurt113, hurt114, player1.luckyvalue);
        //治疗
        var theTreatmentRandom109 = calculateHurtCriticalHitRandom(treatment116, treatment115, player1.luckyvalue);
        var theTreatmentRandom110 = calculateHurtCriticalHitRandom(treatment118, treatment117, player1.luckyvalue);
        var theTreatmentRandom111 = calculateHurtCriticalHitRandom(treatment120, treatment119, player1.luckyvalue);
        // 玩家2的暴击上限和伤害计算
        var maxCriticalHitRandom201 = calculateMaxCriticalHit(player2.luckyvalue);
        var criticalHitRandom2 = calculateCriticalHitRandom(maxCriticalHitRandom201);
        var hurtCriticalHitRandom201 = calculateHurtCriticalHitRandom(hurt201, hurt202, player2.luckyvalue);
        // 玩家2的武器伤害计算
        var hurtCriticalHitRandom251 = calculateHurtCriticalHitRandom(hurt251, hurt252, player2.luckyvalue);
        var hurtCriticalHitRandom252 = calculateHurtCriticalHitRandom(hurt253, hurt254, player2.luckyvalue);
        var hurtCriticalHitRandom253 = calculateHurtCriticalHitRandom(hurt255, hurt256, player2.luckyvalue);
        var hurtCriticalHitRandom254 = calculateHurtCriticalHitRandom(hurt257, hurt258, player2.luckyvalue);
        var hurtCriticalHitRandom255 = calculateHurtCriticalHitRandom(hurt259, hurt260, player2.luckyvalue);
        var hurtCriticalHitRandom256 = calculateHurtCriticalHitRandom(hurt261, hurt262, player2.luckyvalue);
        // 玩家2的技能暴击伤害计算
        var hurtCriticalHitRandom203 = calculateHurtCriticalHitRandom(hurt203, hurt204, player2.luckyvalue);
        var hurtCriticalHitRandom204 = calculateHurtCriticalHitRandom(hurt205, hurt206, player2.luckyvalue);
        var hurtCriticalHitRandom205 = calculateHurtCriticalHitRandom(hurt207, hurt208, player2.luckyvalue);
        var hurtCriticalHitRandom206 = calculateHurtCriticalHitRandom(hurt209, hurt210, player2.luckyvalue);
        var hurtCriticalHitRandom207 = calculateHurtCriticalHitRandom(hurt211, hurt212, player2.luckyvalue);
        var hurtCriticalHitRandom208 = calculateHurtCriticalHitRandom(hurt213, hurt214, player2.luckyvalue);
        //治疗
        var theTreatmentRandom209 = calculateHurtCriticalHitRandom(treatment216, treatment215, player2.luckyvalue);
        var theTreatmentRandom210 = calculateHurtCriticalHitRandom(treatment218, treatment217, player2.luckyvalue);
        var theTreatmentRandom211 = calculateHurtCriticalHitRandom(treatment220, treatment219, player2.luckyvalue);
        // 计算伤害
        //拳击伤害
        //py1
        var hurtEnd101 = calculateDamage(hurtCriticalHitRandom101, player2.physicaldefense, player2.armourclass, player2.sturdypoint);
        var hurtCriticalhitEnd101 = calculateCriticalDamage(hurtCriticalHitRandom101, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd101);
        //py2
        var hurtEnd201 = calculateDamage(hurtCriticalHitRandom201, player1.physicaldefense, player1.armourclass, player1.sturdypoint);
        var hurtCriticalhitEnd201 = calculateCriticalDamage(hurtCriticalHitRandom201, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd201);
        //py1
        //物理武器
        //双手
        var hurtEnd151 = calculateDamage(hurtCriticalHitRandom151, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75);
        var hurtCriticalhitEnd151 = calculateCriticalDamage(hurtCriticalHitRandom151, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd151, 0.75);
        //主武器
        var hurtEnd152 = calculateDamage(hurtCriticalHitRandom152, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75);
        var hurtCriticalhitEnd152 = calculateCriticalDamage(hurtCriticalHitRandom152, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd152, 0.75);
        //副武器
        var hurtEnd153 = calculateDamage(hurtCriticalHitRandom153, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75);
        var hurtCriticalhitEnd153 = calculateCriticalDamage(hurtCriticalHitRandom153, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd153, 0.75);
        //法术武器
        //双手
        var hurtEnd154 = calculateDamage(hurtCriticalHitRandom154, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd154 = calculateCriticalDamage(hurtCriticalHitRandom154, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd154, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        //主武器
        var hurtEnd155 = calculateDamage(hurtCriticalHitRandom155, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd155 = calculateCriticalDamage(hurtCriticalHitRandom155, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd155, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        //副武器
        var hurtEnd156 = calculateDamage(hurtCriticalHitRandom156, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd156 = calculateCriticalDamage(hurtCriticalHitRandom156, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd156, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        //技能
        //物理
        var hurtEnd102 = calculateDamage(hurtCriticalHitRandom103, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75, player1.getPrimaryweaponfightkirelease / 100);
        var hurtCriticalhitEnd102 = calculateCriticalDamage(hurtCriticalHitRandom103, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd102, 0.75, player1.getPrimaryweaponfightkirelease / 100);
        var hurtEnd103 = calculateDamage(hurtCriticalHitRandom104, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75, player1.getPrimaryweaponfightkirelease / 100);
        var hurtCriticalhitEnd103 = calculateCriticalDamage(hurtCriticalHitRandom104, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd103, 0.75, player1.getPrimaryweaponfightkirelease / 100);
        var hurtEnd104 = calculateDamage(hurtCriticalHitRandom105, player2.physicaldefense, player2.armourclass, player2.sturdypoint, 0.75, player1.getPrimaryweaponfightkirelease / 100);
        var hurtCriticalhitEnd104 = calculateCriticalDamage(hurtCriticalHitRandom105, player2.physicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd104, 0.75, player1.getPrimaryweaponfightkirelease / 100);
        //魔力
        var hurtEnd105 = calculateDamage(hurtCriticalHitRandom106, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd105 = calculateCriticalDamage(hurtCriticalHitRandom106, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd105, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtEnd106 = calculateDamage(hurtCriticalHitRandom107, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd106 = calculateCriticalDamage(hurtCriticalHitRandom107, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd106, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtEnd107 = calculateDamage(hurtCriticalHitRandom108, player2.magicaldefense, player2.armourclass, player2.sturdypoint, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd107 = calculateCriticalDamage(hurtCriticalHitRandom108, player2.magicaldefense, player2.armourclass, player2.sturdypoint, hurtEnd107, 0.5, player1.getPrimaryweaponmagicrelease / 100);
        //治疗
        var theTreatmentEnd108 = calculateTheTreatment(theTreatmentRandom109, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentCriticalhitEnd108 = calculateCriticaTheTreatment(theTreatmentRandom109, player2.magicaldefense, theTreatmentEnd108, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentEnd109 = calculateTheTreatment(theTreatmentRandom110, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentCriticalhitEnd109 = calculateCriticaTheTreatment(theTreatmentRandom110, player2.magicaldefense, theTreatmentEnd109, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentEnd110 = calculateTheTreatment(theTreatmentRandom111, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentCriticalhitEnd110 = calculateCriticaTheTreatment(theTreatmentRandom111, player2.magicaldefense, theTreatmentEnd110, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        //py2
        //物理武器
        //双手
        var hurtEnd251 = calculateDamage(hurtCriticalHitRandom251, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75);
        var hurtCriticalhitEnd251 = calculateCriticalDamage(hurtCriticalHitRandom251, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd251, 0.75);
        //主武器
        var hurtEnd252 = calculateDamage(hurtCriticalHitRandom252, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75);
        var hurtCriticalhitEnd252 = calculateCriticalDamage(hurtCriticalHitRandom252, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd252, 0.75);
        //副武器
        var hurtEnd253 = calculateDamage(hurtCriticalHitRandom253, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75);
        var hurtCriticalhitEnd253 = calculateCriticalDamage(hurtCriticalHitRandom253, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd253, 0.75);
        //法术武器
        //双手
        var hurtEnd254 = calculateDamage(hurtCriticalHitRandom254, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd254 = calculateCriticalDamage(hurtCriticalHitRandom254, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd254, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        //主武器
        var hurtEnd255 = calculateDamage(hurtCriticalHitRandom255, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd255 = calculateCriticalDamage(hurtCriticalHitRandom255, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd255, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        //副武器
        var hurtEnd256 = calculateDamage(hurtCriticalHitRandom256, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd256 = calculateCriticalDamage(hurtCriticalHitRandom256, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd256, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        //技能
        //物理
        var hurtEnd202 = calculateDamage(hurtCriticalHitRandom203, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75, player2.getPrimaryweaponfightkirelease / 100);
        var hurtCriticalhitEnd202 = calculateCriticalDamage(hurtCriticalHitRandom203, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd202, 0.75, player2.getPrimaryweaponfightkirelease / 100);
        var hurtEnd203 = calculateDamage(hurtCriticalHitRandom204, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75, player2.getPrimaryweaponfightkirelease / 100);
        var hurtCriticalhitEnd203 = calculateCriticalDamage(hurtCriticalHitRandom204, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd203, 0.75, player2.getPrimaryweaponfightkirelease / 100);
        var hurtEnd204 = calculateDamage(hurtCriticalHitRandom205, player1.physicaldefense, player1.armourclass, player1.sturdypoint, 0.75, player2.getPrimaryweaponfightkirelease / 100);
        var hurtCriticalhitEnd204 = calculateCriticalDamage(hurtCriticalHitRandom205, player1.physicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd204, 0.75, player2.getPrimaryweaponfightkirelease / 100);
        //魔力
        var hurtEnd205 = calculateDamage(hurtCriticalHitRandom206, player1.magicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd205 = calculateCriticalDamage(hurtCriticalHitRandom206, player1.magicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd205, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtEnd206 = calculateDamage(hurtCriticalHitRandom207, player1.magicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd206 = calculateCriticalDamage(hurtCriticalHitRandom207, player1.magicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd206, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtEnd207 = calculateDamage(hurtCriticalHitRandom208, player1.magicaldefense, player1.armourclass, player1.sturdypoint, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var hurtCriticalhitEnd207 = calculateCriticalDamage(hurtCriticalHitRandom208, player1.magicaldefense, player1.armourclass, player1.sturdypoint, hurtEnd207, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        //治疗
        var theTreatmentEnd208 = calculateTheTreatment(theTreatmentRandom209, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentCriticalhitEnd208 = calculateCriticaTheTreatment(theTreatmentRandom209, player2.magicaldefense, theTreatmentEnd208, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentEnd209 = calculateTheTreatment(theTreatmentRandom210, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentCriticalhitEnd209 = calculateCriticaTheTreatment(theTreatmentRandom210, player2.magicaldefense, theTreatmentEnd209, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentEnd210 = calculateTheTreatment(theTreatmentRandom211, player2.magicaldefense, player2.getPrimaryweaponmagicrelease / 100);
        var theTreatmentCriticalhitEnd210 = calculateCriticaTheTreatment(theTreatmentRandom211, player2.magicaldefense, theTreatmentEnd210, 0.5, player2.getPrimaryweaponmagicrelease / 100);
        //计算闪避
        var sidestep1 = Math.round(player1.dexterity + 0.7 * player1.sturdypoint + 0.5 * player1.spiritualintuition + 0.5 * player1.stamina);
        var sidestep3 = Math.floor(Math.random() * ((sidestep1 * 2) - sidestep1 + 1)) + sidestep1;
        var sidestep2 = Math.round(player2.dexterity + 0.7 * player2.sturdypoint + 0.5 * player2.spiritualintuition + 0.5 * player2.stamina);
        var sidestep4 = Math.floor(Math.random() * ((sidestep2 * 2) - sidestep2 + 1)) + sidestep2;
        var maxsidestep3 = Math.round((Math.floor(Math.random() * (sidestep3 - sidestep1 + 1)) + sidestep1) + (0.7 * player1.luckyvalue));
        if (maxsidestep3 > sidestep3) {
            maxsidestep3 = sidestep3;
        }
        var maxsidestep4 = Math.round((Math.floor(Math.random() * (sidestep4 - sidestep2 + 1)) + sidestep2) + (0.7 * player2.luckyvalue));
        if (maxsidestep4 > sidestep4) {
            maxsidestep4 = sidestep4;
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
                case '武器攻击':
                    {
                        var skillEffect1 = Math.floor(Math.random() * 3) + 1;
                        var primaryWeaponEquipped = player1.getPrimaryweapontypes !== 0;
                        var secondaryWeaponEquipped = player1.getSecondaryweapontypes !== 0;
                        var isCriticalHit = criticalHitRandom1 < player1.criticalhit;
                        if (maxsidestep3 * 2.5 > maxsidestep4) {
                            var weaponName = void 0, damage = void 0, text = void 0;
                            if (!primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                // 无武器
                                weaponName = "挥拳";
                                text = "因未装备武器";
                                damage = isCriticalHit ? hurtCriticalhitEnd101 : hurtEnd101;
                            }
                            else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                // 仅主武器
                                if (player1.getPrimaryweapontypes === 1) {
                                    weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                }
                                else if (player1.getPrimaryweapontypes === 2) {
                                    weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                }
                                else if (player1.getPrimaryweapontypes === 3) {
                                    weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                }
                                else if (player1.getPrimaryweapontypes === 4) {
                                    weaponName = "\u67B6\u8D77".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                }
                            }
                            else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
                                // 仅副武器
                                if (player1.getSecondaryweapontypes === 1) {
                                    weaponName = "\u6325\u821E".concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                    damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                }
                                else if (player1.getSecondaryweapontypes === 2) {
                                    weaponName = "\u4F7F\u7528".concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                    damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                }
                                else if (player1.getSecondaryweapontypes === 3) {
                                    weaponName = "\u62C9\u5F00".concat(player1.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                    damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                }
                                else if (player1.getSecondaryweapontypes === 4) {
                                    weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                    damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                }
                            }
                            else {
                                // 双武器
                                if (skillEffect1 === 1) {
                                    if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u53CC\u624B\u6325\u821E".concat(player1.getPrimaryweaponname, "\u4E0E").concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                                    }
                                    else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u6325\u821E").concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u53CC\u6301".concat(player1.getPrimaryweaponname, "\u4E0E").concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd154 : hurtEnd154;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u53CC\u624B\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u6325\u821E").concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u67B6\u8D77".concat(player1.getSecondaryweaponname, "\u4E0E").concat(player1.getPrimaryweaponname, "\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                }
                                else if (skillEffect1 === 2) {
                                    if (player1.getPrimaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4) {
                                        weaponName = "\u67B6\u8D77".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                }
                                else if (skillEffect1 === 3) {
                                    if (player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                    }
                                    else if (player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd156 : hurtEnd156;
                                    }
                                    else if (player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                    }
                                    else if (player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                }
                            }
                            if (text === undefined) {
                                text = "";
                            }
                            player2.hp -= damage;
                            if (player1.getPrimaryweapontypes === 2) {
                                player1.mp -= 4;
                            }
                            player1.mp += 6;
                            result = isCriticalHit
                                ? "\u66B4\u51FB!".concat(text).concat(player1.name, "\u5BF9").concat(player2.name).concat(weaponName, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3")
                                : "".concat(text).concat(player1.name, "\u5BF9").concat(player2.name).concat(weaponName, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3");
                        }
                        else {
                            result = (Math.floor(Math.random() * 2) + 1) === 1
                                ? "".concat(player2.name, "\u6321\u4F4F\u4E86\u653B\u51FB")
                                : "".concat(player2.name, "\u8EB2\u8FC7\u4E86\u653B\u51FB");
                        }
                    }
                    break;
                //py1
                case '技能攻击':
                    {
                        var skillEffect = Math.floor(Math.random() * 3) + 1;
                        var skillCriticalHit_1 = criticalHitRandom1 < player1.criticalhit;
                        var skillManaExhausted_1 = function (mpCost) { return player1.mp < mpCost; };
                        var attackWithFist_1 = function (damage, reason) {
                            player2.hp -= damage;
                            player1.mp += 6;
                            result = skillCriticalHit_1
                                ? "\u66B4\u51FB!\u56E0".concat(reason, ",").concat(player1.name, "\u5BF9").concat(player2.name, "\u6325\u62F3,\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3;")
                                : "\u56E0".concat(reason, ",").concat(player1.name, "\u5BF9").concat(player2.name, "\u6325\u62F3,\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3;");
                        };
                        var weaponWithFist_1 = function (damage, reason, weaponname, mpCost) {
                            if (mpCost === void 0) { mpCost = 0; }
                            player2.hp -= damage;
                            player1.mp -= mpCost;
                            player1.mp += 6;
                            result = skillCriticalHit_1
                                ? "\u66B4\u51FB!\u56E0".concat(reason, ",").concat(player1.name, "\u5BF9").concat(player2.name).concat(weaponname, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3;")
                                : "\u56E0".concat(reason, ",").concat(player1.name, "\u5BF9").concat(player2.name).concat(weaponname, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3;");
                        };
                        var useSkill1_1 = function (skillName, skillInfo, attackInfo, endInfo, damage, mpCost) {
                            player2.hp -= damage;
                            player1.mp -= mpCost;
                            player1.mp += 6;
                            result = skillCriticalHit_1
                                ? "\u66B4\u51FB!".concat(player1.name, "\u5BF9").concat(player2.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3")
                                : "".concat(player1.name, "\u5BF9").concat(player2.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3");
                        };
                        var useSkill2_1 = function (skillName, skillInfo, attackInfo, endInfo, treatment, mpCost) {
                            player1.hp += treatment;
                            player1.mp -= mpCost;
                            player1.mp += 6;
                            result = skillCriticalHit_1
                                ? "\u5927\u795D\u798F!".concat(player1.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u6062\u590D\u4E86").concat(treatment, "\u70B9HP")
                                : "".concat(player1.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u6062\u590D\u4E86").concat(treatment, "\u70B9HP");
                        };
                        var availableSkills = [
                            { type: player1.Skilltypes1, name: player1.Skillname1, info: player1.Skillskillinfo1, attckInfo: player1.Skillattckinfo1, endInfo: player1.Skillendinfo1, mpCost: player1.getSkill1consumptionofmagic, hurt: [hurtEnd101, hurtEnd102, hurtEnd105, theTreatmentEnd108], hurtCritical: [hurtCriticalhitEnd101, hurtCriticalhitEnd102, hurtCriticalhitEnd105, theTreatmentCriticalhitEnd108] },
                            { type: player1.Skilltypes2, name: player1.Skillname2, info: player1.Skillskillinfo2, attckInfo: player1.Skillattckinfo2, endInfo: player1.Skillendinfo2, mpCost: player1.getSkill2consumptionofmagic, hurt: [hurtEnd101, hurtEnd103, hurtEnd106, theTreatmentEnd109], hurtCritical: [hurtCriticalhitEnd101, hurtCriticalhitEnd103, hurtCriticalhitEnd106, theTreatmentCriticalhitEnd109] },
                            { type: player1.Skilltypes3, name: player1.Skillname3, info: player1.Skillskillinfo3, attckInfo: player1.Skillattckinfo3, endInfo: player1.Skillendinfo3, mpCost: player1.getSkill3consumptionofmagic, hurt: [hurtEnd101, hurtEnd104, hurtEnd107, theTreatmentEnd110], hurtCritical: [hurtCriticalhitEnd101, hurtCriticalhitEnd104, hurtCriticalhitEnd107, theTreatmentCriticalhitEnd110] }
                        ].filter(function (skill) { return skill.type !== 0; });
                        var handleSkillUsage = function (skill) {
                            if (skillManaExhausted_1(skill.mpCost)) {
                                var skillEffect1 = Math.floor(Math.random() * 2) + 1;
                                var primaryWeaponEquipped = player1.getPrimaryweapontypes !== 0;
                                var secondaryWeaponEquipped = player1.getSecondaryweapontypes !== 0;
                                var isCriticalHit = criticalHitRandom1 < player1.criticalhit;
                                var weaponName = '';
                                var damage = void 0;
                                var mpCost = 0;
                                if (!primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                    attackWithFist_1(skillCriticalHit_1 ? skill.hurtCritical[0] : skill.hurt[0], '玛娜耗尽');
                                }
                                else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                    // 仅主武器
                                    if (player1.getPrimaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                        mpCost = 4;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4) {
                                        weaponName = "\u67B6\u8D77".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                }
                                else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
                                    // 仅副武器
                                    if (player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                    }
                                    else if (player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                        mpCost = 4;
                                    }
                                    else if (player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                    }
                                    else if (player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                }
                                else {
                                    // 双武器
                                    if (skillEffect1 === 1) {
                                        if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u53CC\u624B\u6325\u821E".concat(player1.getPrimaryweaponname, "\u4E0E").concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                                        }
                                        else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u6325\u821E").concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u53CC\u6301".concat(player1.getPrimaryweaponname, "\u4E0E").concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd154 : hurtEnd154;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u53CC\u624B\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u6325\u821E").concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u67B6\u8D77".concat(player1.getSecondaryweaponname, "\u4E0E").concat(player1.getPrimaryweaponname, "\u51B2\u950B");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                    }
                                    else if (skillEffect1 === 2) {
                                        if (player1.getPrimaryweapontypes === 1) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4) {
                                            weaponName = "\u67B6\u8D77".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                    }
                                    else if (skillEffect1 === 3) {
                                        if (player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u6325\u821E".concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                        }
                                        else if (player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd156 : hurtEnd156;
                                            mpCost = 4;
                                        }
                                        else if (player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                        }
                                        else if (player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                    }
                                }
                            }
                            else {
                                switch (skill.type) {
                                    case 1:
                                        useSkill1_1(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit_1 ? skill.hurtCritical[1] : skill.hurt[1], skill.mpCost);
                                        break;
                                    case 2:
                                        useSkill1_1(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit_1 ? skill.hurtCritical[2] : skill.hurt[2], skill.mpCost);
                                        break;
                                    case 3:
                                        useSkill2_1(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit_1 ? skill.hurtCritical[3] : skill.hurt[3], skill.mpCost);
                                        break;
                                }
                            }
                        };
                        if (maxsidestep3 * 2 > maxsidestep4) {
                            if (availableSkills.length > 0) {
                                var skill = availableSkills.length === 1 ? availableSkills[0] : availableSkills[Math.floor(Math.random() * availableSkills.length)];
                                handleSkillUsage(skill);
                            }
                            else {
                                var skillEffect1 = Math.floor(Math.random() * 2) + 1;
                                var primaryWeaponEquipped = player1.getPrimaryweapontypes !== 0;
                                var secondaryWeaponEquipped = player1.getSecondaryweapontypes !== 0;
                                var isCriticalHit = criticalHitRandom1 < player1.criticalhit;
                                var weaponName = '';
                                var damage = void 0;
                                var mpCost = 0;
                                if (!primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                    attackWithFist_1(skillCriticalHit_1 ? hurtCriticalhitEnd101 : hurtEnd101, '玛娜耗尽');
                                }
                                else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                    // 仅主武器
                                    if (player1.getPrimaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                        mpCost = 4;
                                    }
                                    else if (player1.getPrimaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    else if (player1.getPrimaryweapontypes === 4) {
                                        weaponName = "\u67B6\u8D77".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                }
                                else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
                                    // 仅副武器
                                    if (player1.getSecondaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                    }
                                    else if (player1.getSecondaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                        mpCost = 4;
                                    }
                                    else if (player1.getSecondaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                    }
                                    else if (player1.getSecondaryweapontypes === 4) {
                                        weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                    }
                                    weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                }
                                else {
                                    // 双武器
                                    if (skillEffect1 === 1) {
                                        if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u53CC\u624B\u6325\u821E".concat(player1.getPrimaryweaponname, "\u4E0E").concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                                        }
                                        else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 1 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u6325\u821E").concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u53CC\u6301".concat(player1.getPrimaryweaponname, "\u4E0E").concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd154 : hurtEnd154;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u53CC\u624B\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd151 : hurtEnd151;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u6325\u821E").concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4 && player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u67B6\u8D77".concat(player1.getSecondaryweaponname, "\u4E0E").concat(player1.getPrimaryweaponname, "\u51B2\u950B");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                    }
                                    else if (skillEffect1 === 2) {
                                        if (player1.getPrimaryweapontypes === 1) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 2) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd155 : hurtEnd155;
                                            mpCost = 4;
                                        }
                                        else if (player1.getPrimaryweapontypes === 3) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        else if (player1.getPrimaryweapontypes === 4) {
                                            weaponName = "\u67B6\u8D77".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                    }
                                    else if (skillEffect1 === 3) {
                                        if (player1.getSecondaryweapontypes === 1) {
                                            weaponName = "\u6325\u821E".concat(player1.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                        }
                                        else if (player1.getSecondaryweapontypes === 2) {
                                            weaponName = "\u4F7F\u7528".concat(player1.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                            damage = isCriticalHit ? hurtCriticalhitEnd156 : hurtEnd156;
                                            mpCost = 4;
                                        }
                                        else if (player1.getSecondaryweapontypes === 3) {
                                            weaponName = "\u62C9\u5F00".concat(player1.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                            damage = isCriticalHit ? hurtCriticalhitEnd153 : hurtEnd153;
                                        }
                                        else if (player1.getSecondaryweapontypes === 4) {
                                            weaponName = "\u6325\u821E".concat(player1.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                            damage = isCriticalHit ? hurtCriticalhitEnd152 : hurtEnd152;
                                        }
                                        weaponWithFist_1(damage, '玛娜耗尽', weaponName, mpCost);
                                    }
                                }
                            }
                        }
                        else {
                            if (availableSkills.length > 0) {
                                var skill = availableSkills.length === 1 ? availableSkills[0] : availableSkills[Math.floor(Math.random() * availableSkills.length)];
                                if (skill.type === 3 && !skillManaExhausted_1(skill.mpCost)) {
                                    useSkill2_1(skill.name, skill.info, skill.attckInfo, skill.endInfo, skillCriticalHit_1 ? skill.hurtCritical[3] : skill.hurt[3], skill.mpCost);
                                }
                                else {
                                    result = (Math.floor(Math.random() * 2) + 1) === 1
                                        ? "".concat(player2.name, "\u6321\u4F4F\u4E86\u653B\u51FB")
                                        : "".concat(player2.name, "\u8EB2\u8FC7\u4E86\u653B\u51FB");
                                }
                            }
                            else {
                                result = (Math.floor(Math.random() * 2) + 1) === 1
                                    ? "".concat(player2.name, "\u6321\u4F4F\u4E86\u653B\u51FB")
                                    : "".concat(player2.name, "\u8EB2\u8FC7\u4E86\u653B\u51FB");
                            }
                        }
                    }
                    break;
            }
        }
        else {
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
                case '武器攻击':
                    {
                        var skillEffect1 = Math.floor(Math.random() * 3) + 1;
                        var primaryWeaponEquipped = player2.getPrimaryweapontypes !== 0;
                        var secondaryWeaponEquipped = player2.getSecondaryweapontypes !== 0;
                        var isCriticalHit = criticalHitRandom1 < player2.criticalhit;
                        if (maxsidestep3 * 2.5 > maxsidestep4) {
                            var weaponName = void 0, damage = void 0, text = void 0;
                            if (!primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                // 无武器
                                weaponName = "挥拳";
                                text = "因未装备武器";
                                damage = isCriticalHit ? hurtCriticalhitEnd201 : hurtEnd201;
                            }
                            else if (primaryWeaponEquipped && !secondaryWeaponEquipped) {
                                // 仅主武器
                                if (player2.getPrimaryweapontypes === 1) {
                                    weaponName = "\u6325\u821E".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                    damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                }
                                else if (player2.getPrimaryweapontypes === 2) {
                                    weaponName = "\u4F7F\u7528".concat(player2.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                    damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                }
                                else if (player2.getPrimaryweapontypes === 3) {
                                    weaponName = "\u62C9\u5F00".concat(player2.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                    damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                }
                                else if (player2.getPrimaryweapontypes === 4) {
                                    weaponName = "\u67B6\u8D77".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                    damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                }
                            }
                            else if (!primaryWeaponEquipped && secondaryWeaponEquipped) {
                                // 仅副武器
                                if (player2.getSecondaryweapontypes === 1) {
                                    weaponName = "\u6325\u821E".concat(player2.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                    damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
                                }
                                else if (player2.getSecondaryweapontypes === 2) {
                                    weaponName = "\u4F7F\u7528".concat(player2.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                    damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                }
                                else if (player2.getSecondaryweapontypes === 3) {
                                    weaponName = "\u62C9\u5F00".concat(player2.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                    damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
                                }
                                else if (player2.getSecondaryweapontypes === 4) {
                                    weaponName = "\u6325\u821E".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                    damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                }
                            }
                            else {
                                // 双武器
                                if (skillEffect1 === 1) {
                                    if (player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 1) {
                                        weaponName = "\u53CC\u624B\u6325\u821E".concat(player2.getPrimaryweaponname, "\u4E0E").concat(player2.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd251 : hurtEnd251;
                                    }
                                    else if (player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 2) {
                                        weaponName = "\u6325\u821E".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 3) {
                                        weaponName = "\u6325\u821E".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 1 && player2.getSecondaryweapontypes === 4) {
                                        weaponName = "\u624B\u6301".concat(player2.getSecondaryweaponname, "\u6325\u821E").concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 1) {
                                        weaponName = "\u4F7F\u7528".concat(player2.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                    }
                                    else if (player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 2) {
                                        weaponName = "\u53CC\u6301".concat(player2.getPrimaryweaponname, "\u4E0E").concat(player2.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd254 : hurtEnd254;
                                    }
                                    else if (player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 3) {
                                        weaponName = "\u4F7F\u7528".concat(player2.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                    }
                                    else if (player2.getPrimaryweapontypes === 2 && player2.getSecondaryweapontypes === 4) {
                                        weaponName = "\u624B\u6301".concat(player2.getSecondaryweaponname, "\u4F7F\u7528").concat(player2.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                    }
                                    else if (player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 1) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 2) {
                                        weaponName = "\u62C9\u5F00".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 3) {
                                        weaponName = "\u53CC\u624B\u4F7F\u7528".concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd251 : hurtEnd251;
                                    }
                                    else if (player2.getPrimaryweapontypes === 3 && player2.getSecondaryweapontypes === 4) {
                                        weaponName = "\u624B\u6301".concat(player1.getSecondaryweaponname, "\u4F7F\u7528").concat(player1.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 1) {
                                        weaponName = "\u624B\u6301".concat(player2.getSecondaryweaponname, "\u6325\u821E").concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 2) {
                                        weaponName = "\u624B\u6301".concat(player2.getSecondaryweaponname, "\u4F7F\u7528").concat(player2.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                    }
                                    else if (player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 3) {
                                        weaponName = "\u624B\u6301".concat(player2.getSecondaryweaponname, "\u4F7F\u7528").concat(player2.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 4 && player2.getSecondaryweapontypes === 4) {
                                        weaponName = "\u67B6\u8D77".concat(player2.getSecondaryweaponname, "\u4E0E").concat(player2.getPrimaryweaponname, "\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                }
                                else if (skillEffect1 === 2) {
                                    if (player2.getPrimaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player2.getPrimaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                    }
                                    else if (player2.getPrimaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player2.getPrimaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                    else if (player2.getPrimaryweapontypes === 4) {
                                        weaponName = "\u67B6\u8D77".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                }
                                else if (skillEffect1 === 3) {
                                    if (player2.getSecondaryweapontypes === 1) {
                                        weaponName = "\u6325\u821E".concat(player2.getSecondaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
                                    }
                                    else if (player2.getSecondaryweapontypes === 2) {
                                        weaponName = "\u4F7F\u7528".concat(player2.getSecondaryweaponname, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd256 : hurtEnd256;
                                    }
                                    else if (player2.getSecondaryweapontypes === 3) {
                                        weaponName = "\u62C9\u5F00".concat(player2.getSecondaryweaponname, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd253 : hurtEnd253;
                                    }
                                    else if (player2.getSecondaryweapontypes === 4) {
                                        weaponName = "\u6325\u821E".concat(player2.getPrimaryweaponname, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                    }
                                }
                            }
                            if (text === undefined) {
                                text = "";
                            }
                            player1.hp -= damage;
                            if (player1.getPrimaryweapontypes === 2) {
                                player2.mp -= 4;
                            }
                            player2.mp += 6;
                            result = isCriticalHit
                                ? "\u66B4\u51FB!".concat(text).concat(player2.name, "\u5BF9").concat(player1.name).concat(weaponName, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3")
                                : "".concat(text).concat(player2.name, "\u5BF9").concat(player1.name).concat(weaponName, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3");
                        }
                        else {
                            result = (Math.floor(Math.random() * 2) + 1) === 1
                                ? "".concat(player1.name, "\u6321\u4F4F\u4E86\u653B\u51FB")
                                : "".concat(player1.name, "\u8EB2\u8FC7\u4E86\u653B\u51FB");
                        }
                    }
                    break;
                //py2
                case '技能攻击':
                    {
                        var skillEffect_1 = Math.floor(Math.random() * 3) + 1;
                        var weaponCriticalHit_1 = criticalHitRandom1 < player2.criticalhit;
                        var weaponCriticalHit2 = criticalHitRandom2 < player2.criticalhit;
                        var attackWithSkill = function (skillName, skillInfo, attackInfo, endInfo, mpConsumption, damage) {
                            player1.hp -= damage;
                            player2.mp -= mpConsumption;
                            player2.mp += 6;
                            result = weaponCriticalHit_1
                                ? "\u66B4\u51FB!".concat(player2.name, "\u5BF9").concat(player1.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3")
                                : "".concat(player2.name, "\u5BF9").concat(player1.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3");
                        };
                        var treatmentWithSkill = function (skillName, skillInfo, attackInfo, endInfo, mpConsumption, treatment) {
                            player2.hp += treatment;
                            player2.mp -= mpConsumption;
                            player2.mp += 6;
                            result = weaponCriticalHit_1
                                ? "\u5927\u795D\u798F! ".concat(player2.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u6062\u590D\u4E86").concat(treatment, "\u70B9HP")
                                : "".concat(player2.name, "\u4F7F\u7528").concat(skillName, ",").concat(skillInfo).concat(attackInfo).concat(endInfo, ",\u6062\u590D\u4E86").concat(treatment, "\u70B9HP");
                        };
                        var basicAttack_1 = function (weaponName, text, damage, isCriticalHit) {
                            player1.hp -= damage;
                            player2.mp += 6;
                            result = isCriticalHit
                                ? "\u66B4\u51FB! ".concat(text, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3")
                                : "".concat(text, ",\u9020\u6210\u4E86").concat(damage, "\u70B9\u4F24\u5BB3");
                        };
                        var weaponNameAndDamage_1 = function (weaponEquipped, weaponName, weaponType, isCriticalHit) {
                            var text = "因未装备武器";
                            var damage = isCriticalHit ? hurtCriticalhitEnd201 : hurtEnd201;
                            if (weaponEquipped) {
                                switch (weaponType) {
                                    case 1:
                                        text = "\u6325\u821E".concat(weaponName, "\u8FDB\u884C\u65A9\u51FB");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                        break;
                                    case 2:
                                        text = "\u4F7F\u7528".concat(weaponName, "\u91CA\u653E\u5492\u8BED");
                                        damage = isCriticalHit ? hurtCriticalhitEnd255 : hurtEnd255;
                                        break;
                                    case 3:
                                        text = "\u62C9\u5F00".concat(weaponName, "\u5C04\u51FA\u5229\u7BAD");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                        break;
                                    case 4:
                                        text = "\u67B6\u8D77".concat(weaponName, "\u8FDB\u884C\u51B2\u950B");
                                        damage = isCriticalHit ? hurtCriticalhitEnd252 : hurtEnd252;
                                        break;
                                }
                            }
                            return { text: text, damage: damage };
                        };
                        var attackWithWeapon = function (primaryWeaponEquipped, secondaryWeaponEquipped, isCriticalHit) {
                            var weaponData = { text: "挥拳", damage: isCriticalHit ? hurtCriticalhitEnd201 : hurtEnd201 };
                            if (primaryWeaponEquipped && secondaryWeaponEquipped) {
                                var primary = weaponNameAndDamage_1(true, player2.getPrimaryweaponname, player2.getPrimaryweapontypes, isCriticalHit);
                                var secondary = weaponNameAndDamage_1(true, player2.getSecondaryweaponname, player2.getSecondaryweapontypes, isCriticalHit);
                                switch (skillEffect_1) {
                                    case 1:
                                        weaponData = primary;
                                        weaponData.text = "\u53CC\u624B".concat(primary.text, "\u4E0E").concat(secondary.text);
                                        break;
                                    case 2:
                                        weaponData = primary;
                                        break;
                                    case 3:
                                        weaponData = secondary;
                                        break;
                                }
                            }
                            else if (primaryWeaponEquipped) {
                                weaponData = weaponNameAndDamage_1(true, player2.getPrimaryweaponname, player2.getPrimaryweapontypes, isCriticalHit);
                            }
                            else if (secondaryWeaponEquipped) {
                                weaponData = weaponNameAndDamage_1(true, player2.getSecondaryweaponname, player2.getSecondaryweapontypes, isCriticalHit);
                            }
                            basicAttack_1(weaponData.text, weaponData.text, weaponData.damage, isCriticalHit);
                        };
                        var skillData = [
                            {
                                skillName: player2.Skillname1,
                                skillInfo: player2.Skillskillinfo1,
                                attackInfo: player2.Skillattckinfo1,
                                endInfo: player2.Skillendinfo1,
                                mpConsumption: player2.getSkill1consumptionofmagic,
                                skilldamage1: weaponCriticalHit_1 ? hurtCriticalhitEnd202 : hurtEnd202,
                                skilldamage2: weaponCriticalHit_1 ? hurtCriticalhitEnd205 : hurtEnd205,
                                skilldamage3: weaponCriticalHit_1 ? theTreatmentCriticalhitEnd208 : theTreatmentEnd208,
                                skillType: player2.Skilltypes1
                            },
                            {
                                skillName: player2.Skillname2,
                                skillInfo: player2.Skillskillinfo2,
                                attackInfo: player2.Skillattckinfo2,
                                endInfo: player2.Skillendinfo2,
                                mpConsumption: player2.getSkill2consumptionofmagic,
                                skilldamage1: weaponCriticalHit_1 ? hurtCriticalhitEnd203 : hurtEnd203,
                                skilldamage2: weaponCriticalHit_1 ? hurtCriticalhitEnd206 : hurtEnd206,
                                skilldamage3: weaponCriticalHit_1 ? theTreatmentCriticalhitEnd209 : theTreatmentEnd209,
                                skillType: player2.Skilltypes2
                            },
                            {
                                skillName: player2.Skillname3,
                                skillInfo: player2.Skillskillinfo3,
                                attackInfo: player2.Skillattckinfo3,
                                endInfo: player2.Skillendinfo3,
                                mpConsumption: player2.getSkill3consumptionofmagic,
                                skilldamage1: weaponCriticalHit_1 ? hurtCriticalhitEnd204 : hurtEnd204,
                                skilldamage2: weaponCriticalHit_1 ? hurtCriticalhitEnd207 : hurtEnd207,
                                skilldamage3: weaponCriticalHit_1 ? theTreatmentCriticalhitEnd210 : theTreatmentEnd210,
                                skillType: player2.Skilltypes3
                            }
                        ];
                        var availableSkills = skillData.filter(function (skill) { return skill.skillType !== 0; });
                        if (maxsidestep4 * 2 > maxsidestep3) {
                            if (availableSkills.length > 0) {
                                var skill = void 0;
                                if (availableSkills.length === 1) {
                                    skill = availableSkills[0];
                                }
                                else if (availableSkills.length === 2) {
                                    skill = availableSkills[Math.floor(Math.random() * 2)];
                                }
                                else if (availableSkills.length === 3) {
                                    skill = skillData[skillEffect_1 - 1];
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
                                }
                                else {
                                    attackWithWeapon(player2.getPrimaryweapontypes !== 0, player2.getSecondaryweapontypes !== 0, weaponCriticalHit2);
                                }
                            }
                            else {
                                attackWithWeapon(player2.getPrimaryweapontypes !== 0, player2.getSecondaryweapontypes !== 0, weaponCriticalHit2);
                            }
                        }
                        else {
                            if (availableSkills.length > 0) {
                                var skill = void 0;
                                if (availableSkills.length === 1) {
                                    skill = availableSkills[0];
                                }
                                else if (availableSkills.length === 2) {
                                    skill = availableSkills[Math.floor(Math.random() * 2)];
                                }
                                else if (availableSkills.length === 3) {
                                    skill = skillData[skillEffect_1 - 1];
                                }
                                if (skill && skill.skillType === 3 && player2.mp >= skill.mpConsumption) {
                                    treatmentWithSkill(skill.skillName, skill.skillInfo, skill.attackInfo, skill.endInfo, skill.mpConsumption, skill.skilldamage3);
                                }
                                else {
                                    result = (Math.floor(Math.random() * 2) + 1) === 1
                                        ? "".concat(player1.name, "\u6321\u4F4F\u4E86\u653B\u51FB")
                                        : "".concat(player1.name, "\u8EB2\u8FC7\u4E86\u653B\u51FB");
                                }
                            }
                            else {
                                result = (Math.floor(Math.random() * 2) + 1) === 1
                                    ? "".concat(player1.name, "\u6321\u4F4F\u4E86\u653B\u51FB")
                                    : "".concat(player1.name, "\u8EB2\u8FC7\u4E86\u653B\u51FB");
                            }
                        }
                    }
                    break;
            }
        }
        battleLogs.push({
            player1: __assign({}, player1), // 使用深拷贝确保每回合记录的玩家对象独立
            player2: __assign({}, player2),
            action: action,
            result: result,
            player1Hp: player1.hp,
            player1Mp: player1.mp,
            player2Hp: player2.hp,
            player2Mp: player2.mp,
        });
        if (player1.hp <= 0 || player2.hp <= 0) {
            return "break";
        }
    };
    while (player1.hp > 0 && player2.hp > 0 && round < maxRounds) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    if (round >= maxRounds) {
        battleLogs.push({
            player1: __assign({}, player1),
            player2: __assign({}, player2),
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
function isEven(number) {
    return number % 2 === 0;
}
function generateBattleLogsHtml(avatarUrl1, avatarUrl2, name1, hp1, mp1, attack1, sturdypoint1, dexterity1, luckyvalue1, spiritualintuition1, stamina1, intelligence1, faith1, armourclass1, physicaldefense1, magicaldefense1, name2, hp2, mp2, attack2, sturdypoint2, dexterity2, luckyvalue2, spiritualintuition2, stamina2, intelligence2, faith2, armourclass2, physicaldefense2, magicaldefense2, criticalhit, getSkill1id, getSkill1name, getSkill1harm, getSkill1types, getSkill1skillinfo, getSkill1attckinfo, getSkill1endinfo, getSkill1consumptionofmagic, getSkill2id, getSkill2name, getSkill2harm, getSkill2types, getSkill2skillinfo, getSkill2attckinfo, getSkill2endinfo, getSkill2consumptionofmagic, getSkill3id, getSkill3name, getSkill3harm, getSkill3types, getSkill3skillinfo, getSkill3attckinfo, getSkill3endinfo, getSkill3consumptionofmagic, getSkill4id, getSkill4name, getSkill4harm, getSkill4types, getSkill4skillinfo, getSkill4attckinfo, getSkill4endinfo, getSkill4consumptionofmagic, getSkill5id, getSkill5name, getSkill5harm, getSkill5types, getSkill5skillinfo, getSkill5attckinfo, getSkill5endinfo, getSkill5consumptionofmagic, getSkill6id, getSkill6name, getSkill6harm, getSkill6types, getSkill6skillinfo, getSkill6attckinfo, getSkill6endinfo, getSkill6consumptionofmagic, getPrimaryweaponname1, getPrimaryweaponharm1, getPrimaryweapontypes1, getPrimaryweaponfightkirelease1, getPrimaryweaponmagicrelease1, getSecondaryweaponname1, getSecondaryweaponharm1, getSecondaryweapontypes1, getSecondaryweaponfightkirelease1, getSecondaryweaponmagicrelease1, getPrimaryweaponname2, getPrimaryweaponharm2, getPrimaryweapontypes2, getPrimaryweaponfightkirelease2, getPrimaryweaponmagicrelease2, getSecondaryweaponname2, getSecondaryweaponharm2, getSecondaryweapontypes2, getSecondaryweaponfightkirelease2, getSecondaryweaponmagicrelease2) {
    var playerA = createPlayer(name1, avatarUrl1, hp1, mp1, attack1, sturdypoint1, dexterity1, luckyvalue1, spiritualintuition1, stamina1, intelligence1, faith1, armourclass1, physicaldefense1, magicaldefense1, criticalhit, getSkill1id, getSkill1name, getSkill1harm, getSkill1types, getSkill1skillinfo, getSkill1attckinfo, getSkill1endinfo, getSkill1consumptionofmagic, getSkill2id, getSkill2name, getSkill2harm, getSkill2types, getSkill2skillinfo, getSkill2attckinfo, getSkill2endinfo, getSkill2consumptionofmagic, getSkill3id, getSkill3name, getSkill3harm, getSkill3types, getSkill3skillinfo, getSkill3attckinfo, getSkill3endinfo, getSkill3consumptionofmagic, getPrimaryweaponname1, getPrimaryweaponharm1, getPrimaryweapontypes1, getPrimaryweaponfightkirelease1, getPrimaryweaponmagicrelease1, getSecondaryweaponname1, getSecondaryweaponharm1, getSecondaryweapontypes1, getSecondaryweaponfightkirelease1, getSecondaryweaponmagicrelease1);
    var playerB = createPlayer(name2, avatarUrl2, hp2, mp2, attack2, sturdypoint2, dexterity2, luckyvalue2, spiritualintuition2, stamina2, intelligence2, faith2, armourclass2, physicaldefense2, magicaldefense2, criticalhit, getSkill4id, getSkill4name, getSkill4harm, getSkill4types, getSkill4skillinfo, getSkill4attckinfo, getSkill4endinfo, getSkill4consumptionofmagic, getSkill5id, getSkill5name, getSkill5harm, getSkill5types, getSkill5skillinfo, getSkill5attckinfo, getSkill5endinfo, getSkill5consumptionofmagic, getSkill6id, getSkill6name, getSkill6harm, getSkill6types, getSkill6skillinfo, getSkill6attckinfo, getSkill6endinfo, getSkill6consumptionofmagic, getPrimaryweaponname2, getPrimaryweaponharm2, getPrimaryweapontypes2, getPrimaryweaponfightkirelease2, getPrimaryweaponmagicrelease2, getSecondaryweaponname2, getSecondaryweaponharm2, getSecondaryweapontypes2, getSecondaryweaponfightkirelease2, getSecondaryweaponmagicrelease2);
    var battleLogs = simulateBattle(playerA, playerB);
    var html = '';
    for (var i = 0; i < battleLogs.length; i++) {
        var log = battleLogs[i];
        if (isEven(i)) {
            html += "\n        <div class=\"battle-log\">\n          <div class=\"group\">\n            <div class=\"center\"><strong>\u7B2C ".concat(i + 1, " \u56DE\u5408</strong></div>\n            <div class=\"caption1\"></div>\n            <div class=\"group1\">\n              <img class=\"avatar\" src=\"").concat(log.player1.avatarUrl, "\" alt=\"").concat(log.player1.name, "\">\n              <div class=\"group5\">\n                <div>").concat(log.player1.name, "</div>\n                <div>HP:").concat(log.player1Hp, "</div>\n                <div>MP:").concat(log.player1Mp, "</div>\n              </div>\n              <div class=\"group7\">").concat(log.player1.name, "\u9009\u62E9\u4F7F\u7528 ").concat(log.action, "</div>\n            </div>\n            <div class=\"group2\">\n              <img class=\"avatar\" src=\"").concat(log.player2.avatarUrl, "\" alt=\"").concat(log.player2.name, "\">\n              <div class=\"group4\">\n                <div>").concat(log.player2.name, "</div>\n                <div>HP:").concat(log.player2Hp, "</div>\n                <div>MP:").concat(log.player2Mp, "</div>\n              </div>\n              <div class=\"group6\">\u7ED3\u679C:").concat(log.result, "</div>\n            </div>\n          </div>\n        </div>\n      ");
        }
        else {
            html += "\n        <div class=\"battle-log\">\n          <div class=\"group\">\n            <div class=\"center\"><strong>\u7B2C ".concat(i + 1, " \u56DE\u5408</strong></div>\n            <div class=\"caption1\"></div>\n            <div class=\"group1\">\n              <img class=\"avatar\" src=\"").concat(log.player2.avatarUrl, "\" alt=\"").concat(log.player2.name, "\">\n              <div class=\"group5\">\n                <div>").concat(log.player2.name, "</div>\n                <div>HP:").concat(log.player2Hp, "</div>\n                <div>MP:").concat(log.player2Mp, "</div>\n              </div>\n              <div class=\"group7\">").concat(log.player2.name, "\u9009\u62E9\u4F7F\u7528 ").concat(log.action, "</div>\n            </div>\n            <div class=\"group2\">\n              <img class=\"avatar\" src=\"").concat(log.player1.avatarUrl, "\" alt=\"").concat(log.player1.name, "\">\n              <div class=\"group4\">\n                <div>").concat(log.player1.name, "</div>\n                <div>HP:").concat(log.player1Hp, "</div>\n                <div>MP:").concat(log.player1Mp, "</div>\n                </div class=\"group4\">\n                <div class=\"group6\">\u7ED3\u679C:").concat(log.result, "</div>\n            </div>\n          </div>\n        </div>\n      ");
        }
        if (log.player1Hp <= 0) {
            html += "<div class=\"credit\"><strong>".concat(log.player1.name, " \u88AB\u51FB\u8D25\u4E86!</strong></div>");
        }
        if (log.player2Hp <= 0) {
            html += "<div class=\"credit\"><strong>".concat(log.player2.name, " \u88AB\u51FB\u8D25\u4E86!</strong></div>");
        }
        html += '<hr>';
    }
    // 添加回合数达到最大值的提示信息
    if (battleLogs.length >= 50) {
        html += '<div class="credit"><strong>达到最大回合数，战斗结束!</strong></div>';
    }
    var finalHpValues = {
        player1: {
            name: playerA.name,
            hp: battleLogs[battleLogs.length - 1].player1Hp
        },
        player2: {
            name: playerB.name,
            hp: battleLogs[battleLogs.length - 1].player2Hp
        }
    };
    var player1hp = battleLogs[battleLogs.length - 1].player1Hp;
    var player1mp = battleLogs[battleLogs.length - 1].player1Mp;
    var player2hp = battleLogs[battleLogs.length - 1].player2Hp;
    var player2mp = battleLogs[battleLogs.length - 1].player2Mp;
    return {
        "html": html,
        "player1hp": player1hp,
        "player1mp": player1mp,
        "player2hp": player2hp,
        "player2mp": player2mp,
    };
}
exports.generateBattleLogsHtml = generateBattleLogsHtml;
