import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, FileText, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6 mt-6 p-4 sm:p-6 lg:p-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium lg:text-sm">
              Total Questions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-icon-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold lg:text-2xl">128</div>
            <p className="text-sm text-muted-foreground lg:text-xs">
              +14% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium lg:text-sm">
              Materials Uploaded
            </CardTitle>
            <FileText className="h-4 w-4 text-icon-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold lg:text-2xl">12</div>
            <p className="text-sm text-muted-foreground lg:text-xs">
              +2 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium lg:text-sm">
              Active Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-icon-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold lg:text-2xl">3</div>
            <p className="text-sm text-muted-foreground lg:text-xs">
              Currently active
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-lg lg:text-base">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Mock Activity List */}
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-base font-medium leading-none lg:text-sm">
                    New question from Recruiter A
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "Can you explain your experience with Kubernetes?"
                  </p>
                </div>
                <div className="ml-auto font-medium text-sm text-muted-foreground">
                  2m ago
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-base font-medium leading-none lg:text-sm">
                    Material "Resume_v2.pdf" processed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Successfully embedded and indexed.
                  </p>
                </div>
                <div className="ml-auto font-medium text-sm text-muted-foreground">
                  1h ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
