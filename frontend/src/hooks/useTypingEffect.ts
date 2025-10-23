import { useEffect, useState } from "react";

export const useTypingEffect = (
  texts: string[],
  speed = 100,
  pause = 1500
) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true); // 👈 Nuevo estado

  useEffect(() => {
    if (index === texts.length) setIndex(0);

    const current = texts[index];
    const timeout = setTimeout(() => {
      const nextSubIndex = isDeleting ? subIndex - 1 : subIndex + 1;
      setSubIndex(nextSubIndex);
      setIsTyping(true);

      if (!isDeleting && nextSubIndex === current.length + 1) {
        setIsTyping(false); // 💤 pausa, deja de parpadear
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && nextSubIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? speed / 2 : speed);

    setText(current.substring(0, subIndex));
    return () => clearTimeout(timeout);
  }, [texts, index, subIndex, isDeleting, speed, pause]);

  return { text, isTyping }; // 👈 Devolvemos ambos
};
