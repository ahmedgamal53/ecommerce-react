import { Clock, Lock, RotateCcw, Truck } from "lucide-react";

const featur = [
  { icon: Truck, text: "Free shipping", subtext: "on Orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 lg:gap-x-8 gap-y-8">
        {featur?.map((item, index) => {
          return (
            <div key={index} className="flex justify-center  items-center ">
              <item.icon className="size-10  mr-4 text-gray-600 " />
              <div>
                <p className="font-semibold text-gray-900">{item.text}</p>
                <p className="mt-1 text-sm text-gray-500">{item.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;

//  flex justify-center flex-wrap  gap-x-20 gap-y-15 md:gap-30 items-center
