import { Aircraft } from "../api/flightsV2"

type AirForceMapper = {
    [key: string]: string[]
}

const AW_2_SQ: AirForceMapper = {}
const AW_2_FC: AirForceMapper = {}
const AW_2_CM: AirForceMapper = {}

export function parceAircraftsForMapper(aircrafts: Aircraft[]) {
    for (const aircraft of aircrafts) {
        if (aircraft.air_squadron?.length > 0 && aircraft.air_wing?.length > 0) {
            pushToMapper(AW_2_SQ, aircraft.air_wing, aircraft.air_squadron)
        }
        if (aircraft.air_wing?.length > 0 && aircraft.air_forse?.length > 0) {
            pushToMapper(AW_2_FC, aircraft.air_wing, aircraft.air_forse)
        }
        if (aircraft.air_wing?.length > 0 && aircraft.air_command?.length > 0) {
            pushToMapper(AW_2_CM, aircraft.air_wing, aircraft.air_command)
        }


        if (aircraft.air_squadron_alt?.length > 0 && aircraft.air_wing_alt?.length > 0) {
            pushToMapper(AW_2_SQ, aircraft.air_wing_alt, aircraft.air_squadron_alt)
        }
        if (aircraft.air_wing_alt?.length > 0 && aircraft.air_forse_alt?.length > 0) {
            pushToMapper(AW_2_FC, aircraft.air_wing_alt, aircraft.air_forse_alt)
        }
        if (aircraft.air_wing_alt?.length > 0 && aircraft.air_command_alt?.length > 0) {
            pushToMapper(AW_2_CM, aircraft.air_wing_alt, aircraft.air_command_alt)
        }
    }
}

export function sqForAW(aw: string) {
    return AW_2_SQ[aw] ?? []
}

export function awForFC(aw: string) {
    return AW_2_FC[aw] ?? []
}

export function awForCM(aw: string) {
    return AW_2_CM[aw] ?? []
}

function pushToMapper(object: AirForceMapper, key: string, value: string) {
    if (object[key] && !object[key].includes(value)) {
        object[key].push(value)
    } else {
        object[key] = [value]
    }
}