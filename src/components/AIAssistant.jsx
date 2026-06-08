import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2, Mail, Phone, UserCheck, Minimize2, Maximize2 } from 'lucide-react'

// ════════════════════════════════════════════════════════════
// CONFIGURATION - REPLACE THESE WITH YOUR ACTUAL VALUES
// ════════════════════════════════════════════════════════════

const GROK_API_KEY = import.meta.env.GROK_API_KEY
const FORMSPREE_ENDPOINT = import.meta.env.FORMSPREE_ENDPOINT


const SYSTEM_PROMPT = `You are the AI Project Manager for Mehraj U Din Mir's portfolio website. You are professional, friendly, and helpful. You help visitors with:
- Website development (React, Next.js, full-stack)
- AI solutions (machine learning, chatbots, automation)
- Business digitalization
- Educational technology

Keep responses concise but informative. Ask follow-up questions to understand their needs.`

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    content: '👋 Welcome! I am your AI Project Manager. I help coordinate website development and AI projects for Mehraj U Din Mir.\n\nHow can I assist you today? Are you looking to build a website, develop an AI solution, or automate your business?',
    timestamp: new Date().toISOString(),
  }
]

// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
  })
  const [formStep, setFormStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isMinimized])

  // Send to Grok API with better error handling
  const sendToGrok = async (userMessage) => {
    console.log('🤖 Calling Grok API...')
    console.log('API Key present:', GROK_API_KEY.length > 20 ? 'Yes (length: ' + GROK_API_KEY.length + ')' : 'No/Invalid')

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      console.log('📡 API Response Status:', response.status)

      if (response.status === 401) {
        console.error('❌ API Key invalid or expired')
        return 'I apologize, but my AI brain is temporarily offline. Please contact Mehraj directly at meermehraj25@gmail.com for immediate assistance.'
      }

      if (response.status === 429) {
        console.error('❌ Rate limit exceeded')
        return 'I am experiencing high traffic right now. Please try again in a moment, or contact Mehraj directly at meermehraj25@gmail.com'
      }

      if (!response.ok) {
        console.error('❌ API Error:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error details:', errorText)
        return generateSmartResponse(userMessage)
      }

      const data = await response.json()
      console.log('✅ API Success! Response preview:', data.choices?.[0]?.message?.content?.substring(0, 50))
      
      return data.choices[0]?.message?.content || generateSmartResponse(userMessage)
    } catch (error) {
      console.error('❌ Network/Error:', error.message)
      return generateSmartResponse(userMessage)
    }
  }

  // SMART RESPONSE - Varied answers based on topic
  const generateSmartResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase()
    
    // Random response selector
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]
    
    // WEBSITE TOPIC
    if (lowerMsg.includes('website') || lowerMsg.includes('web') || lowerMsg.includes('site')) {
      const responses = [
        'I can help you build a stunning website! Mehraj specializes in:\n• React/Next.js modern web apps\n• AI-integrated platforms\n• E-commerce solutions\n• Portfolio websites\n\nWhat type of website are you looking to build? I can help estimate timeline and cost.',
        
        'Great question about websites! Mehraj has built 50+ projects including:\n• AI-powered business platforms\n• Educational technology portals\n• E-commerce with payment integration\n• Real-time data dashboards\n\nTell me about your project and I will connect you directly!',
        
        'Website development is one of Mehraj\'s core strengths! He creates:\n• Fast, responsive designs\n• SEO-optimized pages\n• Mobile-first experiences\n• Secure, scalable backends\n\nWhat features do you need for your website?'
      ]
      return pickRandom(responses)
    }
    
    // AI TOPIC
    if (lowerMsg.includes('ai') || lowerMsg.includes('machine learning') || lowerMsg.includes('artificial intelligence') || lowerMsg.includes('ml')) {
      const responses = [
        'Excellent choice! AI solutions can transform your business. Mehraj can help with:\n• Custom Machine Learning models\n• Chatbots & virtual assistants\n• Computer vision systems\n• NLP & text analysis\n• Predictive analytics\n\nWhat specific AI capability are you looking for?',
        
        'AI is the future! Mehraj has built AI solutions for:\n• Emotion detection systems\n• Automated content generation\n• Business process automation\n• Intelligent tutoring systems\n\nWhat problem are you trying to solve with AI?',
        
        'Smart move considering AI! Here are some possibilities:\n• Automate repetitive tasks\n• Analyze customer data\n• Create intelligent chatbots\n• Build recommendation engines\n• Process images/videos automatically\n\nWhat\'s your primary goal with AI integration?'
      ]
      return pickRandom(responses)
    }
    
    // PRICE/BUDGET TOPIC
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('budget') || lowerMsg.includes('how much') || lowerMsg.includes('charge') || lowerMsg.includes('rate')) {
      const responses = [
        'Pricing depends on project complexity. Here are general ranges:\n\n• Simple Website: ₹15,000 - ₹50,000\n• Complex Web App: ₹50,000 - ₹2,00,000\n• AI Integration: ₹30,000 - ₹1,50,000\n• Full Business Solution: Custom quote\n\nWould you like to discuss your specific requirements for a detailed estimate?',
        
        'Every project is unique! Here are ballpark figures:\n• Landing Page: ₹15k-₹30k\n• Business Website: ₹30k-₹80k\n• Web Application: ₹80k-₹3L\n• AI-Powered Platform: ₹50k-₹5L\n\nFor an exact quote, please share your project details in the form below!',
        
        'Mehraj offers competitive pricing for premium quality:\n• Starter Package: ₹15,000+\n• Professional: ₹50,000+\n• Enterprise: Custom pricing\n\nThe best way to get an accurate quote is to fill out the inquiry form with your specific requirements.'
      ]
      return pickRandom(responses)
    }
    
    // CONTACT TOPIC
    if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('reach') || lowerMsg.includes('talk') || lowerMsg.includes('call')) {
      setShowForm(true)
      const responses = [
        'I would be happy to connect you with Mehraj. Please fill out the form that will appear, and your inquiry will be sent directly to his email. He typically responds within 24 hours.',
        'You can reach Mehraj directly! Fill out the quick form below and he will get back to you within 24 hours. Or email him at meermehraj25@gmail.com',
        'Let me help you connect! Please share your contact details and project requirements in the form, and Mehraj will personally review and respond.'
      ]
      return pickRandom(responses)
    }
    
    // GREETING
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey') || lowerMsg.includes('start') || lowerMsg.includes('begin')) {
      const responses = [
        '👋 Hello! I am your AI Project Manager. I help Mehraj coordinate website development and AI projects.\n\nHow can I assist you today? Are you looking to:\n• Build a new website\n• Develop an AI solution\n• Automate your business\n• Create an educational platform',
        'Welcome! I am here to help you explore Mehraj\'s services. What brings you here today?\n\n• Website Development\n• AI/ML Solutions\n• Business Automation\n• Educational Platforms\n• Or something else?',
        'Hi there! Ready to build something amazing? Mehraj can help with:\n• Modern websites & web apps\n• AI-powered solutions\n• Business automation\n• EdTech platforms\n\nWhat would you like to create?'
      ]
      return pickRandom(responses)
    }
    
    // DEFAULT - Catch all
    const responses = [
      'Thank you for your message. I am here to help you with website development, AI solutions, and business automation. Could you please tell me more about your project requirements?',
      'I understand! To better assist you, could you share:\n• What type of project you need\n• Your budget range\n• Your timeline\n• Any specific features you want\n\nThis will help me connect you with the right solution!',
      'I appreciate your interest! Let me help you get started. Are you looking for:\n1. A new website\n2. AI integration\n3. Business automation\n4. Something else?\n\nPlease let me know and I will guide you through the next steps.'
    ]
    return pickRandom(responses)
  }

  // Handle user message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    }])

    // Get AI response
    const aiResponse = await sendToGrok(userMessage)

    // Add AI response
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    }])

    setIsLoading(false)
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone || 'Not provided')
    formDataToSend.append('projectType', formData.projectType)
    formDataToSend.append('budget', formData.budget || 'Not specified')
    formDataToSend.append('description', formData.description)
    formDataToSend.append('_subject', `New Project Inquiry: ${formData.projectType}`)
    formDataToSend.append('_replyto', formData.email)

    try {
      console.log('📧 Sending to Formspree:', FORMSPREE_ENDPOINT)
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
      })

      console.log('📧 Formspree response:', response.status)

      if (response.ok) {
        setSubmitted(true)
        setMessages(prev => [...prev, {
          id: Date.now(),
          role: 'assistant',
          content: `✅ Thank you ${formData.name}! Your project inquiry has been sent successfully to Mehraj at meermehraj25@gmail.com. He will review your requirements and contact you within 24 hours.\n\n📋 Reference ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date().toISOString(),
        }])
      } else {
        throw new Error(`Formspree error: ${response.status}`)
      }

    } catch (error) {
      console.error('❌ Submit error:', error)
      
      // Log data for manual follow-up
      console.log('=== CLIENT INQUIRY DATA ===')
      console.log('Name:', formData.name)
      console.log('Email:', formData.email)
      console.log('Phone:', formData.phone)
      console.log('Project:', formData.projectType)
      console.log('Budget:', formData.budget)
      console.log('Description:', formData.description)
      console.log('===========================')

      setSubmitted(true)
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        content: `⚠️ Thank you ${formData.name}! Your inquiry has been recorded. \n\n📧 Please also send an email directly to: meermehraj25@gmail.com\n\n📋 Reference ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date().toISOString(),
      }])
    }

    setIsSubmitting(false)
  }

  // Quick replies
  const handleQuickReply = (text) => {
    setInputValue(text)
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00f5d4] flex items-center justify-center shadow-lg shadow-[#00d4ff]/30 cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">1</span>
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-[#00d4ff]/20 animate-ping" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-[#0f0f1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ${isMinimized ? 'h-14' : 'h-[600px] max-h-[calc(100vh-120px)]'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#00d4ff]/20 to-[#00f5d4]/20 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00f5d4] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Project Manager</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-white/50">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-140px)]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'assistant' ? 'bg-gradient-to-r from-[#00d4ff] to-[#00f5d4]' : 'bg-white/10'}`}>
                        {message.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${message.role === 'assistant' ? 'bg-white/5 text-white/90 border border-white/5' : 'bg-[#00d4ff]/10 text-white border border-[#00d4ff]/20'}`}>
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={line.trim() === '' ? 'h-2' : ''}>{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00f5d4] flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">
                        <Loader2 className="w-4 h-4 text-[#00d4ff] animate-spin" />
                      </div>
                    </div>
                  )}

                  {/* Project Inquiry Form */}
                  {showForm && !submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4"
                    >
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                        Project Inquiry Form
                      </h4>
                      <form onSubmit={handleFormSubmit} className="space-y-3">
                        {formStep === 0 && (
                          <>
                            <div className="relative">
                              <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="tel"
                                placeholder="Phone (Optional)"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setFormStep(1)}
                              className="w-full py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/30 rounded-lg text-sm text-[#00d4ff] font-medium hover:bg-[#00d4ff]/30 transition-colors"
                            >
                              Next Step →
                            </button>
                          </>
                        )}

                        {formStep === 1 && (
                          <>
                            <select
                              value={formData.projectType}
                              onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                              required
                            >
                              <option value="" className="bg-[#0f0f1a] text-white/50">Select Project Type</option>
                              <option value="Website" className="bg-[#0f0f1a]">Website Development</option>
                              <option value="AI Solution" className="bg-[#0f0f1a]">AI Solution</option>
                              <option value="Business Automation" className="bg-[#0f0f1a]">Business Automation</option>
                              <option value="EdTech" className="bg-[#0f0f1a]">Educational Platform</option>
                              <option value="Other" className="bg-[#0f0f1a]">Other</option>
                            </select>
                            <select
                              value={formData.budget}
                              onChange={(e) => setFormData({...formData, budget: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                            >
                              <option value="" className="bg-[#0f0f1a] text-white/50">Budget Range</option>
                              <option value="Under ₹25k" className="bg-[#0f0f1a]">Under ₹25,000</option>
                              <option value="₹25k-₹50k" className="bg-[#0f0f1a]">₹25,000 - ₹50,000</option>
                              <option value="₹50k-₹1L" className="bg-[#0f0f1a]">₹50,000 - ₹1,00,000</option>
                              <option value="₹1L+" className="bg-[#0f0f1a]">Above ₹1,00,000</option>
                              <option value="Custom" className="bg-[#0f0f1a]">Custom Quote</option>
                            </select>
                            <textarea
                              placeholder="Describe your project requirements..."
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              rows={3}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00d4ff]/50 focus:outline-none transition-colors resize-none"
                              required
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setFormStep(0)}
                                className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:bg-white/10 transition-colors"
                              >
                                ← Back
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00f5d4] rounded-lg text-sm text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                              </button>
                            </div>
                          </>
                        )}
                      </form>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {!showForm && (
                  <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none">
                    {['Website Development', 'AI Solution', 'Get Quote', 'Contact Me'].map((text) => (
                      <button
                        key={text}
                        onClick={() => handleQuickReply(text)}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all whitespace-nowrap"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                {!showForm && (
                  <div className="px-4 py-3 border-t border-white/5">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#00f5d4] flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-30"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}