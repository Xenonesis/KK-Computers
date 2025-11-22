"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What courses do you offer?",
    answer: "We offer a wide range of IT courses including Web Development, Data Science, Digital Marketing, Cybersecurity, Mobile Development, and Cloud Computing. Each course is designed with industry standards in mind."
  },
  {
    question: "Are the certifications recognized by employers?",
    answer: "Yes! Our certifications are industry-recognized and valued by employers worldwide. We partner with leading tech companies to ensure our curriculum meets current market demands."
  },
  {
    question: "Can I learn at my own pace?",
    answer: "Absolutely! Our courses are designed to be flexible. You can learn at your own pace while still having access to live sessions, mentor support, and a community of learners."
  },
  {
    question: "What is the job placement rate?",
    answer: "We have a 95% job placement rate for students who complete our courses. We also provide career counseling, resume building, and interview preparation as part of our program."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with the course within the first 14 days, you can request a full refund, no questions asked."
  },
  {
    question: "How do I access course materials?",
    answer: "Once enrolled, you'll get instant access to our online learning platform where you can find all course materials, videos, assignments, and additional resources available 24/7."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqs.map((faq, index) => (
        <Card 
          key={index} 
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left p-4 sm:p-5 md:p-6 flex justify-between items-start sm:items-center gap-3 sm:gap-4 group"
          >
            <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {faq.question}
            </h3>
            <ChevronDown 
              className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-shrink-0 mt-0.5 sm:mt-0 ${
                openIndex === index ? 'transform rotate-180 text-blue-600 dark:text-blue-400' : ''
              }`}
            />
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <CardContent className="pt-0 pb-5 sm:pb-6 px-4 sm:px-5 md:px-6">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
