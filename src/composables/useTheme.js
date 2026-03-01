import { ref, onMounted } from "vue";

export function useTheme() {
  const isDarkMode = ref(false);
  let themeToggleTimer = null;

  const applyThemeChange = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("darkmode", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("darkmode", "light");
    }
  };

  const toggleTheme = async (event) => {
    if (themeToggleTimer) return;

    event.preventDefault();
    event.stopPropagation();

    if (!document.startViewTransition) {
      applyThemeChange();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(async () => {
      applyThemeChange();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath },
        {
          duration: 800,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    themeToggleTimer = setTimeout(() => {
      themeToggleTimer = null;
    }, 800);
  };

  onMounted(() => {
    const darkmode = localStorage.getItem("darkmode");
    isDarkMode.value = darkmode === "dark";
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode.value ? "dark" : "light"
    );
  });

  return { isDarkMode, toggleTheme };
}
