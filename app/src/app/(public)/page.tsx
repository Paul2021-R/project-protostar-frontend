import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Target, MessageSquare, Zap } from 'lucide-react';
import { GalaxyBackground } from '@/components/ui/GalaxyBackground';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Galaxy Background */}
      <GalaxyBackground className="text-white">
        <section className="space-y-6 py-16 md:pb-12 md:pt-10 lg:py-32">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 md:px-6">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Career Construction, <br />
              New Approach,{' '}
              <span className="text-cyan-400 font-extrabold">Protostar</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-slate-300 text-base sm:text-xl sm:leading-8">
              AI-powered career management that helps you shine. Organize your
              portfolio, prepare for interviews, and connect with opportunities.
            </p>
          </div>
        </section>
      </GalaxyBackground>

      {/* Features Section - Reverted to Original Styling */}
      <section
        id="features"
        className="container mx-auto space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 px-4 md:px-6"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground text-base sm:text-lg sm:leading-7">
            Protostar provides the tools you need to manage your career journey
            effectively.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:max-w-[64rem]">
          <Card>
            <CardHeader>
              <Sparkles className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Self-Appeal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI identifies your core strengths. With your desired tone and
                mood, AI becomes your unique Agentic assistant to help you stand
                out.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>High Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                HR Managers, make it simple! Instantly summarize and extract key
                points from resumes, portfolios, and even blog posts. Quickly
                inquire and evaluate based on user-prepared materials.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Differentiation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you want to showcase your appeal points in a new and stylish
                way, use the best and latest technology to stand out.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We bridge the gap between job seekers and recruiters. Talent
                search and inquiries are possible based on mutual interests!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Reverted to Original Styling */}
      <section className="container mx-auto py-8 md:py-12 lg:py-24 px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
            Will you join the journey?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground text-base sm:text-lg sm:leading-7">
            Whether it&apos;s a journey to find a shining Protostar in your hand
            or a journey to become a shining Protostar yourself, Protostar is
            with you.
          </p>
          <Link href="/register">
            <Button size="lg" className="mt-4 w-full sm:w-auto">
              Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
