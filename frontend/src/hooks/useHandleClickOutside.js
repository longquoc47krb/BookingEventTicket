export default function useHandleClickOutside(
  listening,
  setListening,
  menuRef,
  setIsOpen
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (e) => {
        if (menuRef.current.contains(e.target)) return;
        setIsOpen(false);
      });
    });
  };
}
