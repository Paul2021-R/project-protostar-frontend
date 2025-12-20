'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface InviteFormProps {
  defaultRole?: 'seeker' | 'recruiter';
}

export function InviteForm({ defaultRole = 'seeker' }: InviteFormProps) {
  return (
    <Card>
      <CardHeader className="p-6 md:p-12 md:pb-6">
        <CardTitle>Request an Invite Code</CardTitle>
        <CardDescription>
          Protostar is currently in private beta. Join the waitlist.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6 md:p-12 pt-0 md:pt-0">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">I am a</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="seeker"
                defaultChecked={defaultRole === 'seeker'}
                className="accent-black"
              />
              <span className="text-sm">Job Seeker</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                defaultChecked={defaultRole === 'recruiter'}
                className="accent-black"
              />
              <span className="text-sm">Recruiter</span>
            </label>
          </div>
        </div>
        <Button className="w-full mt-2">Request Invite</Button>
      </CardContent>
    </Card>
  );
}
