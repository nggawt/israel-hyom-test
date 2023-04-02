const humanAbleFormat = {
    //month: "long",
    //day: "numeric",
    //year: "numeric",
    dateStyle: "medium",
    timeStyle: "medium",
};

const dbFormat = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Jerusalem",
    hourCycle: "h23", // | "h11" | "h12" | "h23" | "h24",
};

export const FormatToDb = (dtArg, humanable = false) => {
    const dtIl = new Intl.DateTimeFormat(
        "he-IL",
        humanable ? humanAbleFormat : dbFormat
    );
    let dtFormat =
        dtArg instanceof Date
            ? dtIl.format(new Date(dtArg))
            : dtIl.format(new Date());

    if (humanable) return dtFormat;

    const dtFormatArr = dtFormat.replace(/,/g, "").split(" ");
    return dtFormatArr[0].split(".").reverse().join("-") + " " + dtFormatArr[1];
};
