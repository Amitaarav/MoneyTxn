import { UserPlus, CreditCard, Send, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your free account in just 2 minutes with basic information verification.",
      step: "01"
    },
    {
      icon: CreditCard,
      title: "Add Payment Method",
      description: "Securely connect your bank account, card, or digital wallet to fund transfers.",
      step: "02"
    },
    {
      icon: Send,
      title: "Send Money",
      description: "Enter recipient details, amount, and hit send. It's that simple and fast.",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "Money Delivered",
      description: "Your recipient receives the money instantly or within minutes worldwide.",
      step: "04"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sending money internationally has never been easier. 
            Follow these simple steps to transfer money in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 -translate-x-1/2 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-blue-500">
                  <span className="text-sm font-bold text-blue-600">{step.step}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Average transfer time: 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}