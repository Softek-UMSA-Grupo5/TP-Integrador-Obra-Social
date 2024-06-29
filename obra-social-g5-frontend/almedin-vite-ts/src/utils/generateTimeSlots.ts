export function generateTimeSlots(
    start: string,
    end: string,
    interval: number
): { id: number; horario: string }[] {
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    const slots: { id: number; horario: string }[] = [];
    let id = 0;

    while (startTime <= endTime) {
        slots.push({ id: id++, horario: startTime.toTimeString().slice(0, 5) });
        startTime.setMinutes(startTime.getMinutes() + interval);
    }

    return slots;
}