import { IScore } from "@/types/Score"

export function getScore({ scores, userId, asset }: { scores: IScore[], userId: string | undefined, asset: string }): { rank: number | null, total: number | null } {

    if (userId == undefined) {

        return {
            rank: null,
            total: null
        }


    } else {

        const a = scores[0].assets.find((obj) => obj[asset] !== undefined)
        
        if (a) {

            const u = a[asset].find((obj) => obj[userId] !== undefined)
            if (u) {
                return {
                    rank: u[userId].rank,
                    total: a[asset].length
                }

            } else {
                return {
                    rank: null,
                    total: a[asset].length
                }
            }
        } else {

            return {
                rank: null,
                total: null
            }
        }

    }
}