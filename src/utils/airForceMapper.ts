import { Aircraft } from "../api/flightsV2"

type AirForceMapper = {
    [key: string]: string[]
}

const AW_2_SQ: AirForceMapper = {}
const AW_2_FC: AirForceMapper = {}
const AW_2_CM: AirForceMapper = {}

export function parceAircraftsForMapper(aircrafts: Aircraft[]) {
    for (const aircraft of aircrafts) {
        if (aircraft.air_squadron && aircraft.air_wing) {
            pushToMapper(AW_2_SQ, aircraft.air_wing, aircraft.air_squadron)
        }
        if (aircraft.air_wing && aircraft.air_forse) {
            pushToMapper(AW_2_FC, aircraft.air_wing, aircraft.air_forse)
        }
        if (aircraft.air_wing && aircraft.air_command) {
            pushToMapper(AW_2_CM, aircraft.air_wing, aircraft.air_command)
        }


        if (aircraft.air_squadron_alt && aircraft.air_wing_alt) {
            pushToMapper(AW_2_SQ, aircraft.air_wing_alt, aircraft.air_squadron_alt)
        }
        if (aircraft.air_wing_alt && aircraft.air_forse_alt) {
            pushToMapper(AW_2_FC, aircraft.air_wing_alt, aircraft.air_forse_alt)
        }
        if (aircraft.air_wing_alt && aircraft.air_command_alt) {
            pushToMapper(AW_2_CM, aircraft.air_wing_alt, aircraft.air_command_alt)
        }
    }
}

export function sqForAW(aw: string | null) {
    if (!aw)
        return []
    return AW_2_SQ[aw] ?? []
}

export function afForAW(aw: string | null) {
    if (!aw)
        return []
    return AW_2_FC[aw] ?? []
}

export function cmForAW(aw: string | null) {
    if (!aw)
        return []
    return AW_2_CM[aw] ?? []
}

function pushToMapper(object: AirForceMapper, key: string, value: string) {
    if (object[key] && !object[key].includes(value)) {
        object[key].push(value)
    } else {
        object[key] = [value]
    }
}