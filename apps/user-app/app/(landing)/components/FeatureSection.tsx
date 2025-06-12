import { Globe, Clock, Users, CreditCard, Smartphone, HeadphonesIcon } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Send money to over 190 countries and territories worldwide with competitive exchange rates.",
      color: "text-blue-500"
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Transfer money anytime, anywhere. Our service never sleeps, so your money is always moving.",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Trusted by Millions",
      description: "Over 50 million customers trust us with their money transfers across the globe.",
      color: "text-purple-500"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay with credit card, debit card, bank transfer, or digital wallet - whatever works for you.",
      color: "text-orange-500"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Our mobile app makes sending money as easy as sending a text message.",
      color: "text-pink-500"
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Get help when you need it with our award-winning customer support team.",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent p-2 rounded-full w-auto text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most comprehensive money transfer platform with features 
            designed to make your life easier and your transfers more secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className=" p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}