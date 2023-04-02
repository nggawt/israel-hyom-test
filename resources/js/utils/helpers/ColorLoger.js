export const ColorLoger = (msg, type, r, g, b, a, bg, p, args) => {
    const style = {
        red: `background:${bg || "black"}; color:rgba(255,${g || 0}, ${
            b || 0
        }, ${a || 1}); padding: ${p || 5}px`,
        green: `background:${bg || "black"}; color:rgba(${r || 0}, 255, ${
            b || 0
        }, ${a || 1}); padding: ${p || 5}px`,
        blue: `background:${bg || "black"}; color:rgba(${r || 0}, ${
            g || 0
        }, 255, ${a || 1}); padding: ${p || 5}px`,
        mix: `background:${bg || "black"}; color:rgba(${r || 0}, ${g || 0}, ${
            b || 1
        }, ${a || 1}); padding: ${p || 5}px`,
    };
    console.log(
        "%c %s\n%s",
        style[type],
        typeof msg === "object" ? JSON.stringify(msg) : msg,
        (typeof args === "object" && JSON.stringify(args)) ||
            (typeof args === "boolean" && args) ||
            ""
    );
};
