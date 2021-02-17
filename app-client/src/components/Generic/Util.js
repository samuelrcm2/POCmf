



export const FormatCalculosResponse = calc => {
    if (!calc) return calc;
    const formattedData = [];
    for (let [Key, value] of Object.entries(calc)) 
        if (value != null) 
            formattedData.push({
                name: Key,
                value: value
            });
        
    return formattedData;
}