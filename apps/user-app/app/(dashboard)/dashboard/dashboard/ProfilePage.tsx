'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  CreditCard,
  Settings,
  Edit
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-[#6a51a6] text-white text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600 mb-2">Premium Member</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge className="bg-[#6a51a6]">Verified Account</Badge>
                <Badge variant="secondary">2FA Enabled</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined January 2024
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  New York, NY
                </div>
              </div>
            </div>
            
            <Button className="bg-[#6a51a6] hover:bg-[#5a4496]">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Main St, New York, NY 10001" />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Two-Factor Authentication</p>
                <p className="text-sm text-green-600">Enabled</p>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex space-x-2">
                <Input type="password" value="••••••••••" readOnly />
                <Button variant="outline">Change</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Recovery Email</Label>
              <Input defaultValue="recovery@email.com" />
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Login Notifications</p>
                <p className="text-sm text-blue-600">Get notified of new logins</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 bg-blue-600 rounded"></div>
                  <span className="font-medium">•••• 4242</span>
                </div>
                <Badge>Primary</Badge>
              </div>
              <p className="text-sm text-gray-600">Expires 12/26</p>
              <p className="text-sm text-gray-600">Visa Debit</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 bg-red-600 rounded"></div>
                  <span className="font-medium">•••• 8888</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Expires 08/27</p>
              <p className="text-sm text-gray-600">Mastercard Credit</p>
            </div>
          </div>
          
          <Button variant="outline" className="mt-4">
            <CreditCard className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}