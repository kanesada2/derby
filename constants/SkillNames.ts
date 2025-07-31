import { AlwaysCondition } from "@/domain/models/valueObjects/skills/conditions/alwaysConditions";
import { ExhaustedCondition } from "@/domain/models/valueObjects/skills/conditions/exhaustedCondition";
import { FirstTimeSkillInteractedCondition } from "@/domain/models/valueObjects/skills/conditions/firstTimeSkillInteractedCondition";
import { HasMotivationCondition } from "@/domain/models/valueObjects/skills/conditions/hasMotivationCondition";
import { InteractedCondition } from "@/domain/models/valueObjects/skills/conditions/interactedCondition";
import { AddHealthEffect } from "@/domain/models/valueObjects/skills/effects/addHealthEffect";
import { AddLocationEffect } from "@/domain/models/valueObjects/skills/effects/addLocationEffect";
import { AddMaxSpeedLevelEffect } from "@/domain/models/valueObjects/skills/effects/addMaxSpeedLevelEffect";
import { AddMotivationEffect } from "@/domain/models/valueObjects/skills/effects/addMotivationEffect";
import { AddTargetMaxSpeedLevelEffect } from "@/domain/models/valueObjects/skills/effects/addTargetMaxSpeedLevelEffect";
import { ExpandConcentrateRangeEffect } from "@/domain/models/valueObjects/skills/effects/expandConcentrateRangeEffect";
import { FixPleasantEffect } from "@/domain/models/valueObjects/skills/effects/fixPleasantEffect";
import { FixSpeedLevelToMaxRateEffect } from "@/domain/models/valueObjects/skills/effects/fixSpeedLeveltoMaxRateEffect";
import { ModifyBaseSpeedEffect } from "@/domain/models/valueObjects/skills/effects/modifybaseSpeedEffect";
import { ModifyCrawlHealthSpanEffect } from "@/domain/models/valueObjects/skills/effects/modifyCrawlHealthSpanEffect";
import { ModifyCrawlSpeedLevelEffect } from "@/domain/models/valueObjects/skills/effects/modifyCrawlSpeedLevelEffect";
import { ModifyDecreaseSpanEffect } from "@/domain/models/valueObjects/skills/effects/modifyDecreaseSpanEffect";
import { ModifyHealthSpanEffect } from "@/domain/models/valueObjects/skills/effects/modifyHealthSpanEffect";
import { ModifyMotivatingRangeEffect } from "@/domain/models/valueObjects/skills/effects/modifyMotivatingRangeEffect";
import { ModifyMotivationSpanEffect } from "@/domain/models/valueObjects/skills/effects/modifyMotivationSpanEffect";
import { ModifyPleasntRangeEffect } from "@/domain/models/valueObjects/skills/effects/modifyPleasantRangeEffect";
import { ModifyTargetBaseSpeedEffect } from "@/domain/models/valueObjects/skills/effects/modifyTargetBaseSpeedEffect";
import { ModifyTargetHealthSpanEffect } from "@/domain/models/valueObjects/skills/effects/modifyTargetHealthSpanEffect";
import { ModifyTargetSpeedLevelEffect } from "@/domain/models/valueObjects/skills/effects/modifyTargetSpeedLevelEffect";
import { MovePleasntRangeEffect } from "@/domain/models/valueObjects/skills/effects/movePleasantRangeEffect";
import { Ristriction } from "@/domain/models/valueObjects/skills/ristriction";
import { NeverRistrict } from "@/domain/models/valueObjects/skills/ristrictions/neverRistrict";
import { AlwaysTiming } from "@/domain/models/valueObjects/skills/timings/alwaysTiming";
import { ConcentratedMotivatingTiming } from "@/domain/models/valueObjects/skills/timings/concentratedMotivatingTiming";
import { ConcentratedTiming } from "@/domain/models/valueObjects/skills/timings/concentratedTiming";
import { ExhaustedTiming } from "@/domain/models/valueObjects/skills/timings/exhaustedTiming";
import { HealthIncreasedTiming } from "@/domain/models/valueObjects/skills/timings/healthIncreasedTiming";
import { HealthLteTwentyTiming } from "@/domain/models/valueObjects/skills/timings/healthLteTwentyTiming";
import { HealthMteEightyTiming } from "@/domain/models/valueObjects/skills/timings/healthMteEightyTiming";
import { MotivatingTiming } from "@/domain/models/valueObjects/skills/timings/motivatingTiming";
import { PleasantTiming } from "@/domain/models/valueObjects/skills/timings/pleasantTiming";
import { SkillInteractedTiming } from "@/domain/models/valueObjects/skills/timings/skillInteractedTiming";
import { SpeedLevelMoreThanPlesantMaxTiming } from "@/domain/models/valueObjects/skills/timings/speedLevelMoreThanPlesantMaxTiming";

export const SkillNames = {
    "homura": "homura",
    "gouka": "gouka",
    "magma": "magma",
    "taiyou": "taiyou",
    "houou": "houou",
    "unabara": "unabara",
    "gekiryuu": "gekiryuu",
    "seimei": "seimei",
    "wadatsumi": "wadatsumi",
    "hekireki": "hekireki",
    "raiden": "raiden",
    "shippuu": "shippuu",
    "jinrai": "jinrai",
    "aurora": "aurora",
    "raijin": "raijin",
    "bunpuku": "bunpuku",
    "akatsuki": "akatsuki",
    "tasogare": "tasogare",
    "daichi": "daichi",
    "kongou": "kongou",
    "ankoku": "ankoku",
    "konton": "konton",    
}as const;

export const TimingNames = {
    "always": AlwaysTiming,
    "concentrated": ConcentratedTiming,
    "concentratedMotivating": ConcentratedMotivatingTiming,
    "pleasant": PleasantTiming,
    "skillInteracted": SkillInteractedTiming,
    "motivating": MotivatingTiming,
    "healthLte20": HealthLteTwentyTiming,
    "healthMte80": HealthMteEightyTiming,
    "healthIncreased": HealthIncreasedTiming,
    "exhausted": ExhaustedTiming,
    "speedLevelMoreThanPlesantMax": SpeedLevelMoreThanPlesantMaxTiming, 
} as const

export const ConditionNames = {
    "always": AlwaysCondition,
    "interacted": InteractedCondition,
    "firstTimeSkillInteracted": FirstTimeSkillInteractedCondition,
    "exhausted": ExhaustedCondition,
    "hasMotivation": HasMotivationCondition
} as const;

export const EffectNames = {
    "modifyCrawlSpeedLevel": ModifyCrawlSpeedLevelEffect,
    "modifyCrawlHealthSpan": ModifyCrawlHealthSpanEffect,
    "modifyBaseSpeed": ModifyBaseSpeedEffect,
    "modifyDecreaseSpan": ModifyDecreaseSpanEffect,
    "modifyHealthSpan": ModifyHealthSpanEffect,
    "modifyMotivationSpan": ModifyMotivationSpanEffect,
    "modifyPleasantRange": ModifyPleasntRangeEffect,
    "modifyTargetBaseSpeed": ModifyTargetBaseSpeedEffect,
    "modifyTargetHealthSpan": ModifyTargetHealthSpanEffect,
    "modifyTargetSpeedLevel": ModifyTargetSpeedLevelEffect,
    "modifyMotivatingRange": ModifyMotivatingRangeEffect,
    "addMaxSpeedLevel": AddMaxSpeedLevelEffect,
    "addMotivation": AddMotivationEffect,
    "addHealth": AddHealthEffect,
    "addTargetMaxSpeedLevel": AddTargetMaxSpeedLevelEffect,
    "addLocation": AddLocationEffect,
    "fixPleasant": FixPleasantEffect,
    "fixSpeedLevelToMaxRate": FixSpeedLevelToMaxRateEffect,
    "movePleasantRange": MovePleasntRangeEffect,
    "expandConcetrateRange": ExpandConcentrateRangeEffect,

} as const;

export const RistrictionNames = {
    "ristriction": Ristriction,
    "never": NeverRistrict
}

export type SkillName = typeof SkillNames[keyof typeof SkillNames];
export type TimingName = typeof TimingNames[keyof typeof TimingNames];
export type ConditionName = typeof ConditionNames[keyof typeof ConditionNames];
export type EffectName = typeof EffectNames[keyof typeof EffectNames];
export type RistrictionName = typeof RistrictionNames[keyof typeof RistrictionNames];