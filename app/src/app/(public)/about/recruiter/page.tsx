'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InviteForm } from '@/components/features/about/InviteForm';
import { AboutOverview } from '@/components/features/about/AboutOverview';

export default function AboutRecruiterPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <AboutOverview />

      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">For Recruiters</h2>
        <p className="text-muted-foreground">
          Find the exact talent you need, instantly.
        </p>
      </section>

      <Card className="max-w-4xl mx-auto bg-muted/50 border-none shadow-sm">
        <CardContent className="p-6 md:p-12">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Badge className="mb-2" variant="outline">
              For Companies
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">
              Efficiency & Insight
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Don't struggle with complex recruitment processes. Protostar
              instantly summarizes and extracts key points from resumes,
              portfolios, and blog posts. Use our interactive AI chatbot to
              explore candidate profiles in depth and bridge the gap between
              seekers and recruiters.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <li className="flex items-center gap-2">
                ✅ Instant Resume & Blog Summarization
              </li>
              <li className="flex items-center gap-2">
                ✅ Interactive AI Chatbot Exploration
              </li>
              <li className="flex items-center gap-2">
                ✅ High-Efficiency Screening
              </li>
              <li className="flex items-center gap-2">
                ✅ Talent Search via Mutual Interests
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <section className="max-w-4xl mx-auto pt-8 pb-16">
        <InviteForm defaultRole="recruiter" />
      </section>
    </div>
  );
}
