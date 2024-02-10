
function getColor(crime) {
    const thresholds = [
        { threshold: 75, color: '#0f0333' },
        { threshold: 70, color: '#2B0667' },
        { threshold: 65, color: '#380A5F' },
        { threshold: 60, color: '#511250' },
        { threshold: 55, color: '#6A1A41' },
        { threshold: 50, color: '#832232' },
        { threshold: 45, color: '#B22E44' },
        { threshold: 40, color: '#DE7D8D' },
        { threshold: 35, color: '#F3CED4' },
        { threshold: 30, color: '#E8CCDA' },
        { threshold: 25, color: '#C6C4EA' },
        { threshold: 20, color: '#88A4F5' },
        { threshold: 15, color: '#6994FA' },
        { threshold: 10, color: '#4983FF' },
    ];

    for (const { threshold, color } of thresholds) {
        if (crime > threshold) {
            return color;
        }
    }

    return '#EBEAEA';
}

export default getColor

