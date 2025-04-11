import { Clock, Leaf, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on orders above BDT 50",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Same day delivery available",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment methods",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    icon: Leaf,
    title: "Fresh Products",
    description: "100% organic & fresh items",
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/20"
  }
];

export default function FeaturesBanner() {
  return (
    <section className=" bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl ${feature.bgColor} p-3`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-50 blur-2xl group-hover:opacity-75 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}