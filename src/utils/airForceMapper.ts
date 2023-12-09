import { Aircraft } from "../api/flightsV2"

type AirForceMapper = {
    [key: string]: string[]
}

const SQ_2_AW: AirForceMapper = {}
const AW_2_FC: AirForceMapper = {}
// const AW_2_AB: AirForceMapper = {}
const FC_2_CM: AirForceMapper = {}

export function parceAircraftsForMapper(aircrafts: Aircraft[]) {
    for (const aircraft of aircrafts) {
        if (aircraft.air_squadron?.length > 0 && aircraft.air_wing?.length > 0) {
            pushToMapper(SQ_2_AW, aircraft.air_squadron, aircraft.air_wing)
        }
        if (aircraft.air_wing?.length > 0 && aircraft.air_forse?.length > 0) {
            pushToMapper(AW_2_FC, aircraft.air_wing, aircraft.air_forse)
        }
        if (aircraft.air_forse?.length > 0 && aircraft.air_command?.length > 0) {
            pushToMapper(FC_2_CM, aircraft.air_forse, aircraft.air_command)
        }


        if (aircraft.air_squadron_alt?.length > 0 && aircraft.air_wing_alt?.length > 0) {
            pushToMapper(SQ_2_AW, aircraft.air_squadron_alt, aircraft.air_wing_alt)
        }
        if (aircraft.air_wing_alt?.length > 0 && aircraft.air_forse_alt?.length > 0) {
            pushToMapper(AW_2_FC, aircraft.air_wing_alt, aircraft.air_forse_alt)
        }
        if (aircraft.air_forse_alt?.length > 0 && aircraft.air_command_alt?.length > 0) {
            pushToMapper(FC_2_CM, aircraft.air_forse_alt, aircraft.air_command_alt)
        }
    }
}

export function sqForAW(sq: string) {
    return SQ_2_AW[sq] ?? []
}

export function awForFC(aw: string) {
    return AW_2_FC[aw] ?? []
}

export function fcForCM(fc: string) {
    return FC_2_CM[fc] ?? []
}

function pushToMapper(object: AirForceMapper, key: string, value: string) {
    if (object[key] && !object[key].includes(value)) {
        object[key].push(value)
    } else {
        object[key] = [value]
    }
}