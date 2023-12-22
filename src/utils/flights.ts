const ColorByAlt = {
    unknown: {
        h: 0,
        s: 0,
        l: 20
    },
    ground: {
        h: 220,
        s: 0,
        l: 30
    },
    air: {
        h: [{
            alt: 0,
            val: 20
        }, {
            alt: 2000,
            val: 32.5
        }, {
            alt: 4000,
            val: 43
        }, {
            alt: 6000,
            val: 54
        }, {
            alt: 8000,
            val: 72
        }, {
            alt: 9000,
            val: 85
        }, {
            alt: 11000,
            val: 140
        }, {
            alt: 40000,
            val: 300
        }, {
            alt: 51000,
            val: 360
        },],
        s: 88,
        l: [{
            h: 0,
            val: 53
        }, {
            h: 20,
            val: 50
        }, {
            h: 32,
            val: 54
        }, {
            h: 40,
            val: 52
        }, {
            h: 46,
            val: 51
        }, {
            h: 50,
            val: 46
        }, {
            h: 60,
            val: 43
        }, {
            h: 80,
            val: 41
        }, {
            h: 100,
            val: 41
        }, {
            h: 120,
            val: 41
        }, {
            h: 140,
            val: 41
        }, {
            h: 160,
            val: 40
        }, {
            h: 180,
            val: 40
        }, {
            h: 190,
            val: 44
        }, {
            h: 198,
            val: 50
        }, {
            h: 200,
            val: 58
        }, {
            h: 220,
            val: 58
        }, {
            h: 240,
            val: 58
        }, {
            h: 255,
            val: 55
        }, {
            h: 266,
            val: 55
        }, {
            h: 270,
            val: 58
        }, {
            h: 280,
            val: 58
        }, {
            h: 290,
            val: 47
        }, {
            h: 300,
            val: 43
        }, {
            h: 310,
            val: 48
        }, {
            h: 320,
            val: 48
        }, {
            h: 340,
            val: 52
        }, {
            h: 360,
            val: 53
        },],
    },
    selected: {
        h: 0,
        s: 10,
        l: 5
    },
    stale: {
        h: 0,
        s: -35,
        l: 9
    },
    mlat: {
        h: 0,
        s: 0,
        l: 0
    }
};


export function getColorByAlt(altitude: number, airground: boolean = false, darkerColors: boolean = false): string {
    let h, s, l;
    if (airground) {
        h = ColorByAlt.ground.h;
        s = ColorByAlt.ground.s;
        l = ColorByAlt.ground.l;
    } else {
        altitude = altitude / 0.3048
        const altRound = (altitude < 8000) ? 50 : 200;
        altitude = altRound * Math.round(altitude / altRound);
        s = ColorByAlt.air.s;
        let hpoints = ColorByAlt.air.h;
        h = hpoints[0].val;
        for (let i = hpoints.length - 1; i >= 0; --i) {
            if (altitude > hpoints[i].alt) {
                if (i == hpoints.length - 1) {
                    h = hpoints[i].val;
                } else {
                    h = hpoints[i].val + (hpoints[i + 1].val - hpoints[i].val) * (altitude - hpoints[i].alt) / (hpoints[i + 1].alt - hpoints[i].alt)
                }
                break;
            }
        }
        let lpoints: any = ColorByAlt.air.l;
        lpoints = lpoints.length ? lpoints : [{
            h: 0,
            val: lpoints
        }];
        l = lpoints[0].val;
        for (let i = lpoints.length - 1; i >= 0; --i) {
            if (h > lpoints[i].h) {
                if (i == lpoints.length - 1) {
                    l = lpoints[i].val;
                } else {
                    l = lpoints[i].val + (lpoints[i + 1].val - lpoints[i].val) * (h - lpoints[i].h) / (lpoints[i + 1].h - lpoints[i].h)
                }
                break;
            }
        }
    }
    if (darkerColors) {
        l *= 0.8;
        s *= 0.7;
    }
    if (h < 0) {
        h = (h % 360) + 360;
    } else if (h >= 360) {
        h = h % 360;
    }
    if (s < 0)
        s = 0;
    else if (s > 95)
        s = 95;
    if (l < 0)
        l = 0;
    else if (l > 95)
        l = 95;
    return hslToRgb([h, s, l], null);
}


function hslToRgb(arr: [number, number, number], _opacity: string | null): string {
    let h = arr[0];
    let s = arr[1];
    let l = arr[2];
    let r, g, b;
    h /= 360;
    s *= 0.01;
    l *= 0.01;
    if (s == 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHEX = (num: number): string => {
        if (num > 15)
            return num.toString(16)
        return '0' + num.toString(16)
    }
    return '#' + toHEX(Math.round(r * 255)) + '' + toHEX(Math.round(g * 255)) + '' + toHEX(Math.round(b * 255));
}