"use client";

import { Shield, Award, Users, Star } from 'lucide-react';
import { useState } from 'react';

export default function TrustSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "USA → India",
      rating: 5,
      text: "Amazing service! I've been sending money to my family in India for 2 years. Always fast and reliable."
    },
    {
      name: "Carlos Rodriguez",
      country: "Spain → Mexico",
      rating: 5,
      text: "The best rates I've found anywhere. Customer service is excellent and transfers are instant."
    },
    {
      name: "Maria Chen",
      country: "Canada → Philippines",
      rating: 5,
      text: "So easy to use! My grandmother receives the money within minutes every time."
    }
  ];

  const stats = [
    { icon: Users, value: "50M+", label: "Happy Customers" },
    { icon: Shield, value: "99.9%", label: "Success Rate" },
    { icon: Award, value: "4.9/5", label: "User Rating" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our commitment to security, reliability, and customer satisfaction 
            has made us the world's most trusted money transfer platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-blue-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Security Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Two-factor authentication</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Anti-fraud monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Regulatory compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-center">What Our Customers Say</h3>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-lg mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{testimonials[activeTestimonial].name}</div>
                  <div className="text-blue-200 text-sm">{testimonials[activeTestimonial].country}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeTestimonial ? 'bg-blue-300' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}