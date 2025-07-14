import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Costa Rica Travel Blog',
  description: 'Get in touch with our Costa Rica travel experts. We\'d love to hear from you and help plan your next adventure.',
  openGraph: {
    title: 'Contact Us | Costa Rica Travel Blog',
    description: 'Get in touch with our Costa Rica travel experts. We\'d love to hear from you and help plan your next adventure.',
  },
}

export default function ContactPage() {
  return (
    <div className="container-responsive py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about Costa Rica? Planning your next adventure? We'd love to hear from you and help make your travel dreams come true.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Why Contact Us?
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Travel planning assistance</li>
                  <li>• Local insights and recommendations</li>
                  <li>• Wildlife and nature guidance</li>
                  <li>• Cultural experience suggestions</li>
                  <li>• Sustainable tourism tips</li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  What to Expect
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <strong>Quick Response:</strong> We'll get back to you within 24 hours
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <strong>Personalized Advice:</strong> Tailored recommendations based on your interests
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <strong>Expert Knowledge:</strong> Insights from our local Costa Rica experts
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🌿 Sustainable Tourism
                </h3>
                <p className="text-gray-600 text-sm">
                  We're committed to promoting responsible and sustainable tourism practices that protect Costa Rica's incredible biodiversity and support local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}