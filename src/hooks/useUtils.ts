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

    const getPhotoName = (iconCode: String): String => {
        if (iconCode.startsWith("03") || iconCode.startsWith("04")) return "03d"
        if (iconCode.startsWith("09")) return "09d";
        if (iconCode.startsWith("13")) return "13d";
        if (iconCode.startsWith("50")) return "50d";
        return iconCode;
    }

    return {
        getNameOfTheDay,
        getPhotoName
    }
};

export default useUtils;