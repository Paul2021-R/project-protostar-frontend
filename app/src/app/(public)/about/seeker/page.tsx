'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InviteForm } from '@/components/features/about/InviteForm';
import { AboutOverview } from '@/components/features/about/AboutOverview';

export default function AboutSeekerPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <AboutOverview />

      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">For Job Seekers</h2>
        <p className="text-muted-foreground">
          Your career narrative, amplified by AI.
        </p>
      </section>

      <Card className="max-w-4xl mx-auto bg-muted/50 border-none shadow-sm">
        <CardContent className="p-6 md:p-12">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Badge className="mb-2" variant="outline">
              For Talent
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">
              Become a Shining Star
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Protostar acts as your unique Agentic assistant. By identifying
              your core strengths and applying your desired tone and mood, we
              help you appeal to recruiters effectively. Differentiate yourself
              with a portfolio that uses the latest technology to showcase your
              unique value.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <li className="flex items-center gap-2">
                ✅ Agentic Self-Appeal & Tone Adjustment
              </li>
              <li className="flex items-center gap-2">
                ✅ Unique Portfolio Differentiation
              </li>
              <li className="flex items-center gap-2">
                ✅ AI-Driven Strengths Analysis
              </li>
              <li className="flex items-center gap-2">
                ✅ Direct Connection via Mutual Interests
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <section className="max-w-4xl mx-auto pt-8 pb-16">
        <InviteForm defaultRole="seeker" />
      </section>
    </div>
  );
}
