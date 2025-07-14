'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'success' | 'error' | null
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you soon.'
        })
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        const error = await response.json()
        setStatus({
          type: 'error',
          message: error.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          placeholder="Your full name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          <option value="">Select a topic</option>
          <option value="Travel Planning">Travel Planning</option>
          <option value="Wildlife & Nature">Wildlife & Nature</option>
          <option value="Cultural Experiences">Cultural Experiences</option>
          <option value="Adventure Activities">Adventure Activities</option>
          <option value="Sustainable Tourism">Sustainable Tourism</option>
          <option value="Photography Tips">Photography Tips</option>
          <option value="Local Recommendations">Local Recommendations</option>
          <option value="General Question">General Question</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical"
          placeholder="Tell us about your travel plans, questions, or how we can help you discover Costa Rica..."
        />
      </div>

      {/* Status Message */}
      {status.message && (
        <div className={`p-4 rounded-lg ${
          status.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90 text-white'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        * Required fields
      </p>
    </form>
  )
}