function getCost(col) {
    const thresholds = [
        {threshold: 10,color:'#FBFDFE'},
        {threshold: 15,color:'#F7FAFD'},
        {threshold:20,color:'#EFF4FB'},
        {threshold: 25,color:'#DEE8F7'},
        {threshold: 30,color:'#CEDDF3'},
        {threshold: 35,color:'#BDD1EF'},
        {threshold: 40,color:'#ADC6EB'},
        {threshold: 45,color:'#9CBAE7'},
        {threshold: 50,color:'#8CAFE3'},
        {threshold: 55,color:'#7CA3DF'},
        {threshold: 60,color:'#6B98DB'},
        {threshold: 65,color:'#6393D9'},
        {threshold: 70,color:'#5B8DD7'},
        {threshold: 75,color:'#4A81D3'},
        {threshold: 80,color:'#3A76CF'},
        {threshold: 85,color:'#306BC5'},
        {threshold: 90,color:'#2C63B5'},
        {threshold: 95,color:'#285AA4'},
        {threshold: 100,color:'#245194'},
        {threshold: 105,color:'#204883'},
        {threshold: 110,color:'#1C3F73'},
        {threshold: 115,color:'#183663'},
        {threshold: 120,color:'#142D52'},
        {threshold: 125,color:'#102442'},
        {threshold: 130,color:'#0C1B31'},
        {threshold: 135,color:'#081221'},
        {threshold: 140,color:'#040910'},        
    ]
    for (const {threshold,color} of thresholds) {
        if (col < threshold) {
            return color
        }
    }
    return '#FFF'
}

export default getCost