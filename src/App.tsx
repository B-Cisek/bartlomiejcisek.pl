import { Button } from "@/components/ui/button.tsx";
import {Particles} from "@/components/magicui/particles.tsx";
import {useEffect, useState} from "react";
import { useTheme } from "@/components/theme-provider"
import {ModeToggle} from "@/components/mode-toggle.tsx";

function App() {
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

  return (
    <>
        <Particles
            className="absolute inset-0 z-0 min-h-screen w-full"
            quantity={250}
            ease={80}
            color={color}
            refresh
        />
      <div className="relative">
          <Button>Test</Button>
          <ModeToggle />
      </div>
    </>
  );
}

export default App
