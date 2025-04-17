"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, HelpCircle, Search, ShieldCheck, Truck, Users } from "lucide-react";
import { useMemo, useState } from "react";

// FAQ data structure
const faqs = [
  {
    id: "item-1",
    question: "How do I create an account on iKrishak?",
    answer: "Creating an account is simple! Click on the \"Register\" button, choose your role (farmer or consumer), fill in your details, and verify your email address. You can also sign up using your Google account for faster access.",
    category: "Account"
  },
  {
    id: "item-2",
    question: "What payment methods are accepted?",
    answer: "We accept various payment methods including credit/debit cards through Stripe and cash on delivery (COD). All online transactions are secure and encrypted for your safety.",
    category: "Payments"
  },
  {
    id: "item-3",
    question: "How does the delivery system work?",
    answer: "Orders are typically delivered within 24-48 hours. You can track your order status in real-time through your account dashboard. We ensure proper handling and packaging to maintain produce freshness.",
    category: "Delivery"
  },
  {
    id: "item-4",
    question: "Can I cancel or modify my order?",
    answer: "Yes, you can cancel or modify your order within 1 hour of placing it. After that, please contact our customer support team for assistance. Cancellation policies may vary based on the order status.",
    category: "Delivery"
  },
  {
    id: "item-5",
    question: "How do you ensure product quality?",
    answer: "We have strict quality control measures in place. All products are inspected before shipping, and we work directly with verified farmers who follow our quality guidelines. If you're unsatisfied, our satisfaction guarantee ensures easy returns.",
    category: "Security"
  },
  {
    id: "item-6",
    question: "What if I have issues with my order?",
    answer: "Our customer support team is available 24/7. You can reach us through the help center, email, or phone. We aim to resolve all issues within 24 hours of receiving your complaint.",
    category: "Security"
  }
];

const categories = [
  { icon: Users, title: "Account", count: 1 },
  { icon: ShieldCheck, title: "Security", count: 2 },
  { icon: CreditCard, title: "Payments", count: 1 },
  { icon: Truck, title: "Delivery", count: 2 },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter FAQs based on search query and selected category
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative text-white inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920')] bg-cover bg-center">
        <div className="mx-auto text-center py-16 px-6 inset-0 bg-black/60">
          <HelpCircle className="h-16 w-16 text-white mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Find answers to common questions about iKrishak&apos;s platform, services, and features.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Input 
              type="search" 
              placeholder="Search your question..."
              className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-2 h-5 w-5 text-white/70" />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <div 
                key={category.title} 
                className={`bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedCategory === category.title ? 'ring-2 ring-green-600' : ''
                }`}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.title ? null : category.title
                )}
              >
                <category.icon className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.count} articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-center flex-1">
              {selectedCategory ? `${selectedCategory} Questions` : 'Popular Questions'}
            </h2>
            {selectedCategory && (
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCategory(null)}
                className="text-sm"
              >
                Clear Filter
              </Button>
            )}
          </div>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No matching questions found</h3>
              <p className="text-gray-500">
                Try adjusting your search or browse all categories
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg border">
                  <AccordionTrigger className="px-6">{faq.question}</AccordionTrigger>
                  <AccordionContent className="px-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">
            Can&apos;t find the answer you&apos;re looking for? Our dedicated support team is here to help!
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Contact Support</Button>
            <Button size="lg" variant="outline">View Help Center</Button>
          </div>
        </div>
      </section>
    </div>
  );
}