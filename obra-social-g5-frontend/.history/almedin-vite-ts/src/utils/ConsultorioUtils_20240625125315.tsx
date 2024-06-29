 export const generateTimeOptions = () => {
        const options: JSX.Element[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const hourStr = String(hour).padStart(2, '0');
                const minuteStr = String(minute).padStart(2, '0');
                options.push(
                    <MenuItem key={`${hourStr}:${minuteStr}`} value={`${hourStr}:${minuteStr}`}>
                        {`${hourStr}:${minuteStr}`}
                    </MenuItem>
                );
            }
        }
        return options;
    };