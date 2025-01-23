import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog'
import { AuthForm } from '@/components/AuthForm'
import { useAuth } from '@/lib/auth'

const features = [
  {
    title: 'Interactive Learning',
    description: 'Engage with dynamic content, quizzes, and real-time feedback to enhance your learning experience.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    alt: 'Interactive Learning Platform'
  },
  {
    title: 'Resource Library',
    description: 'Access a vast collection of educational materials, research papers, and learning resources.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    alt: 'Digital Resource Library'
  },
  {
    title: 'Project Management',
    description: 'Organize and track your academic projects with powerful project management tools.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    alt: 'Project Management Dashboard'
  },
  {
    title: 'Collaboration Tools',
    description: 'Work together with peers and mentors using our suite of collaboration features.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    alt: 'Team Collaboration'
  }
]

export default function Landing() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup')
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/app/dashboard')
    }
  }, [user, navigate])

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
  }

  const openAuth = (mode: 'signup' | 'signin') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">KUCLASSROOM</h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => openAuth('signin')}>
              Sign In
            </Button>
            <Button onClick={() => openAuth('signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Your Gateway to Academic Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Join our platform to access a comprehensive suite of educational tools,
            collaborate with peers, and excel in your academic journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" onClick={() => openAuth('signup')}>
              Get Started
            </Button>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 3) }}
              className="bg-card rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={feature.image}
                alt={feature.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {authMode === 'signup' ? 'Create an Account' : 'Welcome Back'}
            </DialogTitle>
            <DialogDescription>
              {authMode === 'signup' 
                ? 'Create your account to access all features.' 
                : 'Sign in to your account to continue.'}
            </DialogDescription>
          </DialogHeader>
          <AuthForm mode={authMode} onSuccess={handleAuthSuccess} />
          <div className="text-center text-sm">
            {authMode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('signin')}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
