import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Play, Book, Rocket, CheckCircle, Github, Lightbulb, Folder, File } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-secondary-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Code className="text-white h-4 w-4" />
              </div>
              <h1 className="text-xl font-semibold text-secondary-600">App Boilerplate</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-secondary-500 hover:text-primary-500 transition-colors duration-200">
                Documentation
              </a>
              <a href="#" className="text-secondary-500 hover:text-primary-500 transition-colors duration-200">
                API
              </a>
              <Button className="bg-primary-500 hover:bg-primary-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-6">
              <Rocket className="mr-2 h-4 w-4" />
              Ready for Development
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-secondary-600 mb-6">
              React + Express<br />
              <span className="text-primary-500">Application Boilerplate</span>
            </h1>
            <p className="text-xl text-secondary-500 mb-8 max-w-3xl mx-auto">
              A clean, minimalistic foundation for building modern web applications. 
              Configured with best practices and ready for your business logic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-500 hover:bg-primary-600 px-8 py-3">
                <Play className="mr-2 h-4 w-4" />
                Start Development
              </Button>
              <Button variant="outline" className="border-secondary-300 text-secondary-600 hover:bg-secondary-50 px-8 py-3">
                <Book className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-secondary-600 mb-4">Application Architecture</h2>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              Modern full-stack architecture with clean separation of concerns and scalable patterns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Frontend Card */}
            <Card className="border-secondary-100 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <FaReact className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary-600">React Frontend</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>React Router for navigation</span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>Component-based architecture</span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>Modern ES6+ syntax</span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>Development server configured</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-secondary-500 font-medium mb-2">Development Port</p>
                  <code className="text-primary-600 font-mono">http://localhost:5000</code>
                </div>
              </CardContent>
            </Card>

            {/* Backend Card */}
            <Card className="border-secondary-100 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <FaNodeJs className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary-600">Express Backend</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>RESTful API structure</span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>CORS configuration</span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>Error handling middleware</span>
                  </div>
                  <div className="flex items-center text-secondary-500">
                    <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                    <span>Environment configuration</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-secondary-500 font-medium mb-2">API Endpoint</p>
                  <code className="text-primary-600 font-mono">http://localhost:5000/api</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Structure */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-secondary-600 mb-4">Project Structure</h2>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              Organized file structure with clear separation between frontend and backend components.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary-600 rounded-xl p-6 font-mono text-sm">
              <div className="text-white">
                <div className="flex items-center mb-2">
                  <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                  <span>project-root/</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center">
                    <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                    <span className="text-blue-300">client/</span>
                  </div>
                  <div className="ml-6 text-gray-300 space-y-1">
                    <div>├── <Folder className="text-yellow-400 mr-1 h-3 w-3 inline" /> src/</div>
                    <div>├── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> index.html</div>
                    <div>└── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> vite.config.ts</div>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                    <span className="text-green-300">server/</span>
                  </div>
                  <div className="ml-6 text-gray-300 space-y-1">
                    <div>├── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> index.ts</div>
                    <div>├── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> routes.ts</div>
                    <div>├── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> storage.ts</div>
                    <div>└── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> vite.ts</div>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                    <span className="text-purple-300">shared/</span>
                  </div>
                  <div className="ml-6 text-gray-300 space-y-1">
                    <div>└── <File className="text-gray-400 mr-1 h-3 w-3 inline" /> schema.ts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-secondary-600 mb-4">Quick Start Guide</h2>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              Get your development environment up and running in minutes with these simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-secondary-100 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold text-secondary-600 mb-3">Install Dependencies</h3>
                <p className="text-secondary-500 mb-4">Install packages for both frontend and backend</p>
                <div className="bg-secondary-50 rounded-lg p-3">
                  <code className="text-sm text-secondary-600 font-mono">npm install</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary-100 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold text-secondary-600 mb-3">Configure Environment</h3>
                <p className="text-secondary-500 mb-4">Set up environment variables and configuration</p>
                <div className="bg-secondary-50 rounded-lg p-3">
                  <code className="text-sm text-secondary-600 font-mono">cp .env.example .env</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary-100 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold text-secondary-600 mb-3">Start Development</h3>
                <p className="text-secondary-500 mb-4">Run both frontend and backend servers</p>
                <div className="bg-secondary-50 rounded-lg p-3">
                  <code className="text-sm text-secondary-600 font-mono">npm run dev</code>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-primary-50 rounded-xl p-8 max-w-2xl mx-auto">
              <Lightbulb className="text-primary-500 text-2xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-secondary-600 mb-3">Ready for Your Ideas</h3>
              <p className="text-secondary-500">
                The boilerplate is intentionally minimal. Add your business logic, database connections, 
                authentication, and custom components as needed for your specific application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Code className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-secondary-600">App Boilerplate</span>
            </div>
            <div className="flex items-center space-x-6 text-secondary-500">
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                <Book className="h-5 w-5" />
              </a>
              <span className="text-sm">Ready for development</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
