import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming this is a custom Button component

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      
      {/* Image with correct usage */}
      <Image 
        src="/path/to/your/image.jpg" // Provide your image path
        alt="Description" 
        width={500} 
        height={300} 
      />

      {/* Using the imported Button component */}
      <Button>Click it</Button>
    </div>
  );
}
