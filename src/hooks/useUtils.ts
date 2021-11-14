import React from "react";

const useUtils = () => {
    const getNameOfTheDay = (indexOfTheDay: number): string => {
        const index = indexOfTheDay >= 7 ? indexOfTheDay - 7 : indexOfTheDay
        
        switch (index) {
            case 0:
                return 'Niedz.'
            case 1:
                return 'Pon.'
            case 2:
                return 'Wt.'
            case 3: 
                return 'Śr.'
            case 4:
                return 'Czw.'
            case 5:
                return 'Pt.'
            case 6:
                return 'Sob.'
            default:
                return ''
        }
    }

    return {
        getNameOfTheDay
    }
};

export default useUtils;