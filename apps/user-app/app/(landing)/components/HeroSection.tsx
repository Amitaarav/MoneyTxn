"use client";

import { ArrowRight, Shield, Zap, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useRouter } from "next/navigation"
export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-white to-purple-100 pt-16 pb-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
            Send Money
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Instantly</span>
            <br />
            Anywhere in the World
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Fast, secure, and affordable money transfers to over 190 countries. 
            No hidden fees, no waiting, just instant transfers at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick = {
              () => {
                  router.push("/signin")
              }
            }className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Send Money Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full transition-all duration-300">
              Track Transfer
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="h-8 w-8 text-green-500" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Instant Transfers</h3>
                <p className="text-gray-600">Money arrives in seconds</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Shield className="h-8 w-8 text-blue-500" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Bank-Level Security</h3>
                <p className="text-gray-600">Your money is protected</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <DollarSign className="h-8 w-8 text-purple-500" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Low Fees</h3>
                <p className="text-gray-600">Starting from just $2.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}