import { IKey } from "@/stores/useSelectedCalendarStore";
import { IndexCurrentCalendar } from "@/utils/keyIndex";

export function getWeekdayName(caltype: IKey, day: number| null, nameType: '2l' | 'full'): string {


    let key: string;

    // Define full names for weekdays
    const fullNames = {
        'G': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'J': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };

    // Define two-letter abbreviations
    const twoLetterAbbrs = {
        'G': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'J': ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']
    };

    if (day===null){
        return '-'
    }else {

            // Determine which type of name to return
    switch (nameType) {
        case 'full':
            key = fullNames[IndexCurrentCalendar(caltype)][day] || 'Unknown'; // Default to 'Unknown' if day is invalid
            break;
        case '2l':
            key = twoLetterAbbrs[IndexCurrentCalendar(caltype)][day] || '??'; // Default to '??' if day is invalid
            break;
        default:
            key = '??'; // If nameType is not '2l' or 'full'
    }

    return key;

    }


}