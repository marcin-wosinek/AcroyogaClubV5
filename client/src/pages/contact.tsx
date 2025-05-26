import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Menu, X, Sun, Moon, User, LogOut, ArrowLeft, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Contact form schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Mock form submission - in real implementation this would send to your backend
      console.log("Contact form submitted:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form but keep user info if logged in
      form.reset({
        fullName: user?.fullName || "",
        email: user?.email || "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-800 bg-gray-900' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-3xl font-light tracking-wide">Acroyoga Club</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valencia, Spain</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <a className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                }`}>Activities</a>
              </Link>
              <Link href="/about">
                <a className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                }`}>About</a>
              </Link>
              <a href="#" className={`transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>Contact</a>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user?.fullName}</span>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className={`${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-200'
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className={`border-0 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}>
                    Login
                  </Button>
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className={`${
                  isDarkMode 
                    ? 'text-white hover:bg-gray-700' 
                    : 'text-black hover:bg-gray-200'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
            isDarkMode 
              ? 'bg-gray-900 text-white' 
              : 'bg-white text-black'
          } shadow-xl`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className="text-lg font-medium">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 px-4 py-6">
                <nav className="space-y-6">
                  <Link href="/">
                    <a 
                      className={`block text-lg transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Activities
                    </a>
                  </Link>
                  <Link href="/about">
                    <a 
                      className={`block text-lg transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </a>
                  </Link>
                  <a 
                    href="#" 
                    className={`block text-lg transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </nav>
              </div>
              
              {/* Authentication Section */}
              <div className={`p-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 py-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">{user?.fullName}</span>
                    </div>
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-black hover:bg-gray-200'
                      }`}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button 
                      className={`w-full border-0 ${
                        isDarkMode 
                          ? 'bg-white text-black hover:bg-gray-200' 
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button 
                variant="ghost"
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calendar
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-light mb-4">Contact Us</h1>
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Have questions about acroyoga or want to join our community? We'd love to hear from you!
                </p>
              </div>

              <Card className={`border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-black border-gray-700 text-white' 
                  : 'bg-white border-gray-200 text-black'
              }`}>
                <CardHeader>
                  <CardTitle className="text-xl font-light">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        info@acroyogaclubvalencia.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        +34 123 456 789
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-1" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Valencia, Spain<br />
                        Various parks and studios around the city
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-black border-gray-700 text-white' 
                  : 'bg-white border-gray-200 text-black'
              }`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3">Response Time</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We typically respond to messages within 24 hours. For urgent matters related to 
                    upcoming activities, please call us directly.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className={`border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-black border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-black'
            }`}>
              <CardHeader>
                <CardTitle className="text-xl font-light">Send us a Message</CardTitle>
                {isAuthenticated && (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your contact information has been pre-filled from your account.
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name"
                              {...field}
                              className={`${
                                isDarkMode 
                                  ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                                  : 'bg-white border-gray-300 text-black placeholder:text-gray-400'
                              }`}
                              disabled={isAuthenticated}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                              className={`${
                                isDarkMode 
                                  ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                                  : 'bg-white border-gray-300 text-black placeholder:text-gray-400'
                              }`}
                              disabled={isAuthenticated}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this about?"
                              {...field}
                              className={`${
                                isDarkMode 
                                  ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                                  : 'bg-white border-gray-300 text-black placeholder:text-gray-400'
                              }`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your question or interest in acroyoga..."
                              rows={5}
                              {...field}
                              className={`${
                                isDarkMode 
                                  ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                                  : 'bg-white border-gray-300 text-black placeholder:text-gray-400'
                              }`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className={`w-full border-0 ${
                        isDarkMode 
                          ? 'bg-white text-black hover:bg-gray-200' 
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}