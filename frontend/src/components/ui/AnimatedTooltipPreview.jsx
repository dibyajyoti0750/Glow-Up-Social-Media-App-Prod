import { AnimatedTooltip } from "./animated-tooltip";
const people = [
  {
    id: 1,
    name: "Tyler Durden",
    designation: "Soap Maker",
    image:
      "https://i.pinimg.com/736x/56/88/a4/5688a4754e05a0b7d554f07ebe0bc198.jpg",
  },
  {
    id: 2,
    name: "Patrick Bateman",
    designation: "Investment Banker",
    image:
      "https://i.pinimg.com/736x/97/33/19/973319de51f009fd2a9750ab916bf5f6.jpg",
  },
  {
    id: 3,
    name: "Forrest Gump",
    designation: "Soldier",
    image:
      "https://i.pinimg.com/736x/47/3a/82/473a8245db647adf483e65f22dc5608b.jpg",
  },
  {
    id: 4,
    name: "Tony Stark",
    designation: "Superhero",
    image:
      "https://i.pinimg.com/736x/24/84/70/248470199d7901dd9f5adbed7a6a3932.jpg",
  },
  {
    id: 5,
    name: "The Joker",
    designation: "Criminal",
    image:
      "https://i.pinimg.com/1200x/c3/28/80/c32880465b8e582b058419a0891c2416.jpg",
  },
  {
    id: 6,
    name: "Jack Dawson",
    designation: "Painter",
    image:
      "https://i.pinimg.com/736x/5f/9c/17/5f9c1774e9cbcdb96abaa7b5f4fb144e.jpg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex items-center">
      <AnimatedTooltip items={people} />
    </div>
  );
}
