import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import React, { useState } from 'react';
import { toast } from "sonner";


export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Subscribed successfully!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-b from-secondary/30 to-background mt-6">
      <div className="container mx-auto">
        <div className="overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            {/* Illustration side */}
            <div className="bg-primary/5 p-6 lg:p-12 flex items-center justify-center h-full">
              <div className="relative w-full h-64 md:h-full">
                <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" 
                     style={{backgroundImage: "url('/assets/images/newsletter.png')"}}></div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full animate-pulse-slow" 
                     style={{animationDelay: "1s"}}></div>
              </div>
            </div>
            
            {/* Form side */}
            <div className="p-6 lg:p-12 space-y-6">
              <div className="space-y-3 max-w-md">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Stay Updated with iKrishak</h3>
                <p className="text-muted-foreground text-sm">
                  Subscribe to our newsletter for weekly updates on fresh harvests, 
                  seasonal offers, and organic farming tips.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pr-32"
                  />
                  <div className="absolute right-1 top-1">
                    <Button 
                      type="submit" 
                      size="sm"
                      disabled={isSubmitting}
                      className="h-7 font-medium"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our privacy policy. We&apos;ll never share your email.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

