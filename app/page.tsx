import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, CheckCircle, FileText, MessageSquare, Play, Star, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MeetingAI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered Meeting Assistant
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">
                  Revolutionize Your Meetings with AI
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                  Transform every meeting into actionable insights. Our AI automatically transcribes, creates project
                  templates, and assigns tasks based on your conversations.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/dashboard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-border overflow-hidden">
                <img
                  src="/ai-meeting-assistant-dashboard-with-transcription-.png"
                  alt="AI Meeting Assistant Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Everything you need for productive meetings
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Our AI-powered platform transforms how remote teams collaborate, making every meeting more efficient and
              actionable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Transcription</CardTitle>
                <CardDescription>
                  Automatically transcribe meetings with speaker identification and confidence scoring for accurate
                  records.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Smart Project Templates</CardTitle>
                <CardDescription>
                  Generate industry-specific project templates based on meeting context and team requirements.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Intelligent Task Assignment</CardTitle>
                <CardDescription>
                  Automatically assign tasks based on team member skills, availability, and conversation context.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">How it works</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Connect Your Tools</h3>
              <p className="text-muted-foreground">
                Integrate with your existing project management tools like Slack, Jira, and Google Calendar.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mx-auto text-accent-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">Start Your Meeting</h3>
              <p className="text-muted-foreground">
                Our AI joins your video calls and begins real-time transcription and analysis automatically.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Actionable Insights</h3>
              <p className="text-muted-foreground">
                Receive project templates, task assignments, and meeting summaries instantly after your call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Trusted by remote teams worldwide
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "MeetingAI has transformed how our distributed team collaborates. We save hours every week on meeting
                  follow-ups."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">SJ</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The AI-generated project templates are incredibly accurate. It's like having a project manager in
                  every meeting."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-accent">MC</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Mike Chen</p>
                    <p className="text-sm text-muted-foreground">Engineering Lead, StartupXYZ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a tool that actually understands our meetings and creates actionable next steps
                  automatically."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">ER</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Operations Director, RemoteCo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12 text-center">
            <div className="space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
                Ready to transform your meetings?
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Join thousands of remote teams who have revolutionized their collaboration with AI-powered meeting
                assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/dashboard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">MeetingAI</span>
              </div>
              <p className="text-muted-foreground">
                Revolutionizing remote team collaboration with AI-powered meeting assistance.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MeetingAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
