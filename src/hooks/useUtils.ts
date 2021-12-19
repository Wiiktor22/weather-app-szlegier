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

    const getPhoto = (iconCode: string) => {
        if (typeof iconCode !== 'string') return require('../../public/icons/01d.png')

        if (iconCode.startsWith("03") || iconCode.startsWith("04")) {
            return require('../../public/icons/03d.png')
        } else if (iconCode.startsWith("09")) {
            return require('../../public/icons/09d.png')
        } else if (iconCode.startsWith("13")) {
            return require('../../public/icons/13d.png')
        } else if (iconCode.startsWith("50")) {
            return require('../../public/icons/50d.png')
        } else if (iconCode.startsWith("01d")) {
            return require('../../public/icons/01d.png')
        } else if (iconCode.startsWith("01n")) {
            return require('../../public/icons/01n.png')
        } else if (iconCode.startsWith("02d")) {
            return require('../../public/icons/02d.png')
        } else if (iconCode.startsWith("02n")) {
            return require('../../public/icons/02n.png')
        } else if (iconCode.startsWith("10n")) {
            return require('../../public/icons/10n.png')
        } else if (iconCode.startsWith("10d")) {
            return require('../../public/icons/10d.png')
        } else if (iconCode.startsWith("11")) {
            return require('../../public/icons/11d.png')
        } else {
            return require('../../public/icons/01d.png')
        }
    }

    return {
        getNameOfTheDay,
        getPhoto
    }
};

export default useUtils;