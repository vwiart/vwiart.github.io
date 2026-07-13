// Theme handling — loaded in <head> (render-blocking) so the theme is set
// before first paint, avoiding a flash of the wrong theme.
(function () {
    var root = document.documentElement;

    // Resolve the OS preference, defaulting to dark when it's unknown.
    function systemTheme() {
        if (window.matchMedia) {
            if (matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
            if (matchMedia("(prefers-color-scheme: light)").matches) return "light";
        }
        return "dark"; // unknown → dark
    }

    // Apply the saved choice, falling back to the OS preference on first visit.
    try {
        root.setAttribute(
            "data-theme",
            localStorage.getItem("theme") || systemTheme()
        );
    } catch (e) {
        root.setAttribute("data-theme", systemTheme());
    }

    // Delegated click handler: works even though the toggle button is parsed
    // after this script runs, since the listener lives on the document.
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".theme-toggle")) return;
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        root.setAttribute("data-theme", next);
        try {
            localStorage.setItem("theme", next);
        } catch (e) {}
    });
})();
