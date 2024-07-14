import { useState, useEffect, useRef } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Option } from "./types";

type SelectProps = {
  currentValue: Option | undefined;
  options: Option[];
  onOptionChange: (value: Option | undefined) => void;
};

const Select = ({ currentValue, options, onOptionChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    isOpen && setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyboardEvents = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          isOpen && onOptionChange(options[highlightedIndex]);
          break;
        case "ArrowDown":
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newIndex = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newIndex >= 0 && newIndex < options.length) {
            setHighlightedIndex(newIndex);
            optionRefs.current[newIndex]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    const currentContainerRef = containerRef?.current;
    currentContainerRef?.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      currentContainerRef?.removeEventListener("keydown", handleKeyboardEvents);
    };
  }, [isOpen, highlightedIndex, options, onOptionChange]);

  return (
    <div
      className={`min-w-64 max-h-16 flex flex-row h-full p-2 bg-black rounded-md border-2 relative box-border  ${
        isOpen ? "border-white" : "border-gray-800"
      }`}
      ref={containerRef}
      tabIndex={0}
    >
      <span className="flex-1 text-white">{currentValue?.name}</span>
      <button
        className="rotate-45 text-gray-800"
        onClick={(e) => {
          e.stopPropagation();
          onOptionChange(undefined);
        }}
      >
        <Plus />
      </button>
      <div className=" border-[1px] border-gray-800 rounded-md"></div>
      <button className="text-gray-800 pl-1" onClick={() => setIsOpen(!isOpen)}>
        <ChevronDown />
      </button>
      {isOpen && (
        <ul className="absolute top-12 w-full bg-inherit left-0 z-50 rounded-md border-2 border-gray-800 max-h-44 overflow-y-hidden px-2">
          {options.map((option, index) => (
            <li
              className={`w-full px-1.5 py-0.5  text-white cursor-pointer rounded-md ${
                currentValue?.id == option.id ? "bg-gray-600" : ""
              } ${highlightedIndex === index ? "bg-gray-600" : ""} `}
              onClick={(e) => {
                e.stopPropagation();
                if (option.id !== currentValue?.id) {
                  onOptionChange(option);
                  setIsOpen(false);
                }
              }}
              ref={(el) => (optionRefs.current[index] = el)}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={index}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
